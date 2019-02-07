/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 * @emails oncall+draft_js
 */

'use strict';

import type DraftEditor from 'DraftEditor.react';

const ContentState = require('ContentState');
const convertFromDraftStateToRaw = require('convertFromDraftStateToRaw');
const getFragmentFromSelection = require('getFragmentFromSelection');

/**
 * If we have a selection, create a ContentState fragment and store
 * it in our internal clipboard. Subsequent paste events will use this
 * fragment if no external clipboard data is supplied.
 */
function editOnCopy(editor: DraftEditor, e: SyntheticClipboardEvent<>): void {
  const editorState = editor._latestEditorState;
  const selection = editorState.getSelection();

  // No selection, so there's nothing to copy.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  const fragment = getFragmentFromSelection(editor._latestEditorState);

  editor.setClipboard(fragment);

  // IE11 does not support ClipboardEvent.clipboardData.
  if (e.clipboardData && fragment) {
    const content = ContentState.createFromBlockArray(fragment.toArray());
    const serialisedContent = JSON.stringify(
      convertFromDraftStateToRaw(content),
    );

    const fragmentElt = document.createElement('div');
    const domSelection = window.getSelection();
    fragmentElt.appendChild(domSelection.getRangeAt(0).cloneContents());
    fragmentElt.setAttribute('data-editor-content', serialisedContent);
    // We set the style property to replicate the browser's behavior of inline
    // styles in rich text copy-paste. This is important for line breaks to be
    // interpreted correctly when pasted into another word processor.
    fragmentElt.setAttribute('style', 'white-space: pre-wrap;');

    e.clipboardData.setData('text/plain', domSelection.toString());
    e.clipboardData.setData('text/html', fragmentElt.outerHTML);

    e.preventDefault();
  }
}

module.exports = editOnCopy;

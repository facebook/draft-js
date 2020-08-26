/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 * @emails oncall+draft_js
 */

'use strict';

import type DraftEditor from 'DraftEditor.react';

import invariant from 'invariant';
import isHTMLElement from 'isHTMLElement';

export default function getContentEditableContainer(
  editor: DraftEditor,
): HTMLElement {
  const editorNode = editor.editorContainer;
  invariant(editorNode, 'Missing editorNode');
  invariant(
    isHTMLElement(editorNode.firstChild),
    'editorNode.firstChild is not an HTMLElement',
  );
  const htmlElement = (editorNode.firstChild: any);
  return htmlElement;
}

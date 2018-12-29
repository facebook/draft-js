/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 * @flow strict-local
 * @emails oncall+draft_js
 */

'use strict';

import type DraftEditor from 'DraftEditor.react';

const EditorState = require('EditorState');

/**
 * The user has begun using an IME input system. Switching to `composite` mode
 * allows handling composition input and disables other edit behavior.
 */
function editOnCompositionStart(
  editor: DraftEditor,
  e: SyntheticEvent<>,
): void {
  editor.setMode('composite');
  editor.update(
    EditorState.set(editor._latestEditorState, {inCompositionMode: true}),
  );
  // Allow composition handler to interpret the compositionstart event
  editor._onCompositionStart(e);
}

module.exports = editOnCompositionStart;

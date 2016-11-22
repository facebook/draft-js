/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftBlockType
 * @flow
 */

'use strict';

/**
 * The list of default valid block types.
 */
export type DraftBlockType = (
  'unstyled' |
  'paragraph' |
  'heading-one' |
  'heading-two' |
  'heading-three' |
  'heading-four' |
  'heading-five' |
  'heading-six' |
  'unordered-list-item' |
  'ordered-list-item' |
  'blockquote' |
  'code-block' |
  'atomic'
);

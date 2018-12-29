/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 * @flow strict
 * @emails oncall+draft_js
 */

'use strict';

const REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

function sanitizeDraftText(input: string): string {
  return input.replace(REGEX_BLOCK_DELIMITER, '');
}

module.exports = sanitizeDraftText;

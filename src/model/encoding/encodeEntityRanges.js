/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule encodeEntityRanges
 * @typechecks
 * @flow
 */

'use strict';

import type ContentBlock from 'ContentBlock';
import type {EntityRange} from 'EntityRange';

var UnicodeUtils = require('UnicodeUtils');

var {strlen} = UnicodeUtils;

/**
 * Convert to UTF-8 character counts for storage.
 */
function encodeEntityRanges(block: ContentBlock): Array<EntityRange> {
  var encoded = [];
  block.findEntityRanges(
    character => !!character.getEntity(),
    (/*number*/ start, /*number*/ end) => {
      var text = block.getText();

      var key = block.getEntityAt(start);
      if (key == null) {
        return;
      }

      encoded.push({
        offset: strlen(text.slice(0, start)),
        length: strlen(text.slice(start, end)),
        key,
      });
    },
  );
  return encoded;
}

module.exports = encodeEntityRanges;

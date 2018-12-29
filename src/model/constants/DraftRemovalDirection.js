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

/*eslint-disable no-bitwise*/

'use strict';

/**
 * A type that allows us to avoid passing boolean arguments
 * around to indicate whether a deletion is forward or backward.
 */
export type DraftRemovalDirection = 'backward' | 'forward';

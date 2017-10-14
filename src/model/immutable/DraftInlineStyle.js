/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftInlineStyle
 * @flow
 */

'use strict';

/** TODO: change type to OrderedSet once we get an update of Immutable.js that
 * includes this fix;
 * https://github.com/facebook/immutable-js/pull/1112
 */
import type {Set} from 'immutable';

export type DraftInlineStyle = Set<string>;
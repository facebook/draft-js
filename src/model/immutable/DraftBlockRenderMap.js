/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftBlockRenderMap
 * @flow
 */

'use strict';

import type {DraftBlockRenderConfig} from 'DraftBlockRenderConfig';
import type {DraftBlockType} from 'DraftBlockType';
import type {Map} from 'immutable';

/* $FlowFixMe this should be fixed when we update to Immutable.js 4.*
 * TODO: update Immutable, see https://github.com/facebook/immutable-js/issues/1371
 */
export type DraftBlockRenderMap = Map<DraftBlockType, DraftBlockRenderConfig>;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 * @flow
 * @emails oncall+draft_js
 */

'use strict';

import type ContentState from 'ContentState';

function updateEntityDataInContentState(
  contentState: ContentState,
  key: string,
  data: {[key: string]: any},
  merge: boolean,
): ContentState {
  const instance = contentState.getEntity(key);
  const entityData = instance.getData();
  const newData = merge ? {...entityData, ...data} : data;

  const newInstance = instance.set('data', newData);
  const newEntityMap = contentState.getEntityMap().set(key, newInstance);
  return contentState.set('entityMap', newEntityMap);
}

module.exports = updateEntityDataInContentState;

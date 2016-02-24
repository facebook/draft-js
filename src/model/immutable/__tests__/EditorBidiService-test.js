/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+ui_infra
 */

'use strict';

jest.autoMockOff();

const ContentBlock = require('ContentBlock');
const ContentState = require('ContentState');
const EditorBidiService = require('EditorBidiService');
const Immutable = require('immutable');
const UnicodeBidiDirection = require('UnicodeBidiDirection');

const {
  OrderedMap,
  Seq,
} = Immutable;

const {
  LTR,
  RTL,
} = UnicodeBidiDirection;

const ltr = new ContentBlock({
  key: 'a',
  text: 'hello',
});
const rtl = new ContentBlock({
  key: 'b',
  text: '\u05e9\u05d1\u05ea',
});
const empty = new ContentBlock({
  key: 'c',
  text: '',
});

describe('EditorBidiService', () => {
  function getContentState(blocks) {
    const keys = Seq(blocks.map(b => b.getKey()));
    const values = Seq(blocks);
    const blockMap = OrderedMap(keys.zip(values));
    return new ContentState({blockMap});
  }

  it('must create a new map', () => {
    const state = getContentState([ltr]);
    const directions = EditorBidiService.getDirectionMap(state);
    expect(
      directions.keySeq().toArray()
    ).toEqual(
      ['a']
    );
    expect(
      directions.valueSeq().toArray()
    ).toEqual(
      [LTR]
    );
  });

  it('must return the same map if no changes', () => {
    const state = getContentState([ltr]);
    const directions = EditorBidiService.getDirectionMap(state);

    const nextState = getContentState([ltr]);
    const nextDirections = EditorBidiService.getDirectionMap(
      nextState,
      directions
    );

    expect(state).not.toBe(nextState);
    expect(directions).toBe(nextDirections);
  });

  it('must return the same map if no text changes', () => {
    const state = getContentState([ltr]);
    const directions = EditorBidiService.getDirectionMap(state);

    const newLTR = new ContentBlock({
      key: 'a',
      text: 'hello',
    });
    expect(newLTR).not.toBe(ltr);

    const nextState = getContentState([newLTR]);
    const nextDirections = EditorBidiService.getDirectionMap(
      nextState,
      directions
    );

    expect(state).not.toBe(nextState);
    expect(directions).toBe(nextDirections);
  });

  it('must return the same map if no directions change', () => {
    const state = getContentState([ltr]);
    const directions = EditorBidiService.getDirectionMap(state);

    const newLTR = new ContentBlock({
      key: 'a',
      text: 'asdf',
    });
    expect(newLTR).not.toBe(ltr);

    const nextState = getContentState([newLTR]);
    const nextDirections = EditorBidiService.getDirectionMap(
      nextState,
      directions
    );

    expect(state).not.toBe(nextState);
    expect(directions).toBe(nextDirections);
  });

  it('must return a new map if block keys change', () => {
    const state = getContentState([ltr]);
    const directions = EditorBidiService.getDirectionMap(state);

    const newLTR = new ContentBlock({
      key: 'asdf',
      text: 'asdf',
    });

    const nextState = getContentState([newLTR]);
    const nextDirections = EditorBidiService.getDirectionMap(
      nextState,
      directions
    );

    expect(state).not.toBe(nextState);
    expect(directions).not.toBe(nextDirections);

    expect(
      nextDirections.keySeq().toArray()
    ).toEqual(
      ['asdf']
    );
    expect(
      nextDirections.valueSeq().toArray()
    ).toEqual(
      [LTR]
    );
  });

  it('must return a new map if direction changes', () => {
    const state = getContentState([ltr, empty]);
    const directions = EditorBidiService.getDirectionMap(state);

    expect(
      directions.valueSeq().toArray()
    ).toEqual(
      [LTR, LTR]
    );

    const nextState = getContentState([ltr, rtl]);
    const nextDirections = EditorBidiService.getDirectionMap(
      nextState,
      directions
    );

    expect(state).not.toBe(nextState);
    expect(directions).not.toBe(nextDirections);
    expect(
      nextDirections.valueSeq().toArray()
    ).toEqual(
      [LTR, RTL]
    );
  });
});

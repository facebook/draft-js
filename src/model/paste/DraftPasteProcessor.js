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

import type {BlockNodeRecord} from 'BlockNodeRecord';
import type CharacterMetadata from 'CharacterMetadata';
import type {DraftBlockRenderMap} from 'DraftBlockRenderMap';
import type {DraftBlockType} from 'DraftBlockType';
import type {EntityMap} from 'EntityMap';

const ContentBlock = require('ContentBlock');
const ContentBlockNode = require('ContentBlockNode');

const convertFromHTMLtoContentBlocksClassic = require('convertFromHTMLToContentBlocks');
const convertFromHTMLtoContentBlocksNew = require('convertFromHTMLToContentBlocks2');
const convertFromRawToDraftState = require('convertFromRawToDraftState');
const generateRandomKey = require('generateRandomKey');
const getSafeBodyFromHTML = require('getSafeBodyFromHTML');
const gkx = require('gkx');
const Immutable = require('immutable');
const sanitizeDraftText = require('sanitizeDraftText');

const {List, Repeat} = Immutable;

const experimentalTreeDataSupport = gkx('draft_tree_data_support');
const ContentBlockRecord = experimentalTreeDataSupport
  ? ContentBlockNode
  : ContentBlock;

const refactoredHTMLImporter = gkx('draft_refactored_html_importer');
const convertFromHTMLtoContentBlocks = refactoredHTMLImporter
  ? convertFromHTMLtoContentBlocksNew
  : convertFromHTMLtoContentBlocksClassic;

const DraftPasteProcessor = {
  processHTML(
    html: string,
    blockRenderMap?: DraftBlockRenderMap,
  ): ?{contentBlocks: ?Array<BlockNodeRecord>, entityMap: EntityMap} {
    const body = getSafeBodyFromHTML(html);
    const fragmentElt = body && body.querySelector('[data-editor-content]');
    const fragmentAttr =
      (fragmentElt && fragmentElt.getAttribute('data-editor-content')) || null;

    // Handle the paste without converting the HTML if it comes from another Draft.js editor.
    if (fragmentAttr) {
      let rawContent;

      try {
        // If JSON parsing fails, handle the paste as normal HTML.
        rawContent = JSON.parse(fragmentAttr);
      } catch (error) {}

      if (rawContent) {
        const content = convertFromRawToDraftState(rawContent);
        return {
          contentBlocks: content.getBlocksAsArray(),
          entityMap: content.getEntityMap(),
        };
      }
    }

    return convertFromHTMLtoContentBlocks(
      html,
      getSafeBodyFromHTML,
      blockRenderMap,
    );
  },

  processText(
    textBlocks: Array<string>,
    character: CharacterMetadata,
    type: DraftBlockType,
  ): Array<BlockNodeRecord> {
    return textBlocks.reduce((acc, textLine, index) => {
      textLine = sanitizeDraftText(textLine);
      const key = generateRandomKey();

      let blockNodeConfig = {
        key,
        type,
        text: textLine,
        characterList: List(Repeat(character, textLine.length)),
      };

      // next block updates previous block
      if (experimentalTreeDataSupport && index !== 0) {
        const prevSiblingIndex = index - 1;
        // update previous block
        const previousBlock = (acc[prevSiblingIndex] = acc[
          prevSiblingIndex
        ].merge({
          nextSibling: key,
        }));
        blockNodeConfig = {
          ...blockNodeConfig,
          prevSibling: previousBlock.getKey(),
        };
      }

      acc.push(new ContentBlockRecord(blockNodeConfig));

      return acc;
    }, []);
  },
};

module.exports = DraftPasteProcessor;

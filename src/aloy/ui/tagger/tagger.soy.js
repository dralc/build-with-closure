// This file was automatically generated from tagger.soy.
// Please don't edit this file by hand.

goog.provide('aloy.ui.soy.Tagger');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
aloy.ui.soy.Tagger.getHtml = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', opt_data.eId, '" class=\'goog-inline-block ', aloy.ui.TaggerRenderer.CSS_CLASS, '\'');
  var keyList53 = opt_data.metaKeys;
  var keyListLen53 = keyList53.length;
  for (var keyIndex53 = 0; keyIndex53 < keyListLen53; keyIndex53++) {
    var keyData53 = keyList53[keyIndex53];
    output.append('data-', keyData53, '="', opt_data.meta[keyData53], '"');
  }
  output.append('><span class="tagText">', opt_data.tagText, '</span></div>');
  return opt_sb ? '' : output.toString();
};

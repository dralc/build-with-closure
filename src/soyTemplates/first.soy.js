// This file was automatically generated from first.soy.
// Please don't edit this file by hand.

goog.provide('aloy.soy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
aloy.soy.hello = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Hello world!');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from paginator.soy.
// Please don't edit this file by hand.

goog.provide('aloy.ui.soy.paginator');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
aloy.ui.soy.paginator.renderHtm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', opt_data.eId, '" class="', aloy.ui.Paginator.classes.BASE, '">', (opt_data.opt_range && opt_data.opt_total) ? '<div class="goog-inline-block ' + aloy.ui.Paginator.classes.STATS + '">' + opt_data.opt_range + ' of ' + opt_data.opt_total + ' results</div>' : '', '<ul class="goog-inline-block">', (opt_data.opt_prev && opt_data.pages.length != 0 && opt_data.pages[0] != 1) ? '<li class="goog-inline-block" data-page="' + (opt_data.clickedPg - 1) + '">&larr;</li>' : '');
  var pgList23 = opt_data.pages;
  var pgListLen23 = pgList23.length;
  for (var pgIndex23 = 0; pgIndex23 < pgListLen23; pgIndex23++) {
    var pgData23 = pgList23[pgIndex23];
    output.append((opt_data.clickedPg == pgData23) ? '<li class="goog-inline-block ' + aloy.ui.Paginator.classes.ACTIVE + '" data-page="' + pgData23 + '">' + pgData23 + '</li>' : '<li class="goog-inline-block" data-page="' + pgData23 + '">' + pgData23 + '</li>');
  }
  output.append((opt_data.opt_next && opt_data.pages[opt_data.pages.length - 1] < opt_data.opt_maxPg) ? '<li class="goog-inline-block" data-page="' + (opt_data.clickedPg + 1) + '">&rarr;</li>' : '', '</ul></div>');
  return opt_sb ? '' : output.toString();
};

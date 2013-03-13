goog.provide('aloy.App');
goog.require('aloy.soy');

/**
 *
 * @constructor
 */
aloy.App = function () {
	alert(aloy.soy.hello());
};

new aloy.App();
/**
 * @fileoverview Contains methods to make working with UI elements easier
 */

goog.provide('aloy.Plugin');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.dom.classes');


/**
 * The wrapper for an Element
 *
 * @param {string|Element|Array|NodeList} item The the DOM node,the node's id, an array of Elements or
 *  a NodeList
 * @constructor
 * @suppress {checkTypes}
 */
aloy.Plugin = function Plugin(item) {
    /**
     * @type {?Element}
     * @private
     */
    this.rootEl_ = null;

    /**
     * @type {?Array|NodeList}
     * @private
     */
    this.elements_ = null;

    if (goog.isArrayLike(item)) {
        this.elements_ = item;
    } else if (goog.isString(item) || goog.dom.isElement(item)) {
        this.rootEl_ = goog.dom.getElement(item);
    }
};

/**
 * Helper function for creating a new instance of {@link aloy.Plugin}
 *
 * @param item See arguments for {@link aloy.Plugin}
 * @return {aloy.Plugin}
 */
aloy.plugin = function (item) {
    return new aloy.Plugin(item);
};

/**
 * For {@link HTMLSelectElement}, this selects the <option> with <code>val</code> as it's value
 *
 * @param {string} val
 */
aloy.Plugin.prototype.setVal = function (val) {
    this.setVal_.apply(this, [val, this.rootEl_]);
};

/**
 * Helper function for {@link aloy.Plugin.setVal}
 *
 * @param {string} val
 * @param {Element} opt_root
 * @private
 */
aloy.Plugin.prototype.setVal_ = function (val, opt_root) {
    var options = goog.dom.getElementsByTagNameAndClass('option', null, opt_root);

    for (var i = 0, opt; opt = options[i]; i++) {
        if (opt.value === val) {
            opt.selected = true;
        }
    }
};

/**
 * @param {string} eventName
 * @param { function(goog.events.Event) } cb
 */
aloy.Plugin.prototype.listenTo = function (eventName, cb) {
    var elements = this.elements_,
        rootEl = this.rootEl_,
        i, el;

    if (elements) {
        for (i = 0; el = elements[i]; i++) {
            goog.events.listen(el, eventName, cb);
        }
    } else if (rootEl) {
        goog.events.listen(rootEl, eventName, cb);
    }
};

/**
 * Shortcut method for adding a click event handler
 * @param {function(goog.events.Event)} cb
 */
aloy.Plugin.prototype.click = function (cb) {
    this.listenTo(goog.events.EventType.CLICK, cb);
    return this;
};

/**
 * Shortcut method for adding a change event handler
 * @param {function(goog.events.Event)} cb
 */
aloy.Plugin.prototype.change = function (cb) {
    this.listenTo(goog.events.EventType.CHANGE, cb);
    return this;
};

/**
 * Shortcut method for adding a submit event handler
 * @param {function(goog.events.Event)} cb
 */
aloy.Plugin.prototype.submit = function (cb) {
    this.listenTo(goog.events.EventType.SUBMIT, cb);
    return this;
}

/**
 * Shortcut method for adding a 'mouseover' event handler
 * @param {function(goog.events.Event)} cb
 */
aloy.Plugin.prototype.mouseover = function (cb) {
    this.listenTo(goog.events.EventType.MOUSEOVER, cb);
    return this;
}

/**
 * Shortcut method for adding a 'mouseout' event handler
 * @param {function(goog.events.Event)} cb
 */
aloy.Plugin.prototype.mouseout = function (cb) {
    this.listenTo(goog.events.EventType.MOUSEOUT, cb);
    return this;
}

/**
 * Prepends 'item' to to 'args' and returns the new array
 * @private
 *
 * @param item {*}
 * @param args {Arguments}
 *
 * @return {Array}
 */
aloy.Plugin.prototype.prependArgs_ = function (item, args) {
    var newArgs  = Array.prototype.slice.call(args);
    newArgs.unshift(item);

    return newArgs;
}

/**
 * Adds css classes to the Element/s
 * @param var_args {...string}
 */
aloy.Plugin.prototype.addClass = function (var_args) {
    var elements = this.elements_,
        rootEl = this.rootEl_,
        i, el;

    if (elements) {
        for (i = 0; el = elements[i]; i++) {
            goog.dom.classes.add.apply(null, this.prependArgs_(el, arguments));
        }
    } else if (rootEl) {
        goog.dom.classes.add.apply(null, this.prependArgs_(rootEl, arguments));
    }
}

/**
 * Removes css classes from the Element/s
 * @param var_args
 */
aloy.Plugin.prototype.removeClass = function (var_args) {
    var elements = this.elements_,
        rootEl = this.rootEl_,
        i, el;

    if (elements) {
        for (i = 0; el = elements[i]; i++) {
            goog.dom.classes.remove.apply(null, this.prependArgs_(el, arguments));

        }
    } else if (rootEl) {
        goog.dom.classes.remove.apply(null, this.prependArgs_(rootEl, arguments));
    }
}
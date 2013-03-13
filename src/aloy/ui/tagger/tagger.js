/**
 * @fileoverview A container comprising of label text and a button (rendered with FlatButtonRenderer)
 *
 * @author Aloysius Chan
 */
goog.provide('aloy.ui.Tagger');
goog.provide('aloy.ui.TaggerConfig');
goog.provide('aloy.ui.TaggerModel');

goog.require('goog.ui.Button');
goog.require('goog.ui.Container');
goog.require('aloy.ui.TaggerRenderer');

/**
 * This is the config's definition
 *
 * @typedef {{tagText :string,   buttonText :string,   meta :Object}}
 */
aloy.ui.TaggerConfig;

/**
 * This is the model's definition
 *
 * @typedef {{eId :string,   tagText :string,   buttonText :string,   meta :Object}}
 */
aloy.ui.TaggerModel;

/**
 * This is the Event object that overrides the default 'ACTION' event
 *
 * @typedef {{type :string, eId :string, meta :Object,
                altKey :boolean, ctrlKey :boolean,
                metaKey :boolean, shiftKey :boolean,
                platformModifierKey :boolean}}
 */
aloy.ui.TaggerActionEvent;

/**
 *
 * @constructor
 * @extends {goog.ui.Container}
 *
 * @param {aloy.ui.TaggerConfig} config
 * @param {goog.ui.ContainerRenderer=} opt_renderer Defaults to {@link aloy.ui.TaggerRenderer}
 * @param {function(aloy.ui.TaggerActionEvent)=} opt_onActionCallback
 */
aloy.ui.Tagger = function Tagger(config, opt_renderer, opt_onActionCallback) {
    goog.base(this,
        goog.ui.Container.Orientation.HORIZONTAL,
        opt_renderer || aloy.ui.TaggerRenderer.getInstance()
    );

    this.onActionCallback = goog.isDef(opt_onActionCallback) ? opt_onActionCallback : null;

    var cssClass = this.getRenderer().getCssClass(),
        model;
        
    model = config;
    model.eId = this.makeId(cssClass);

    // Optionally export external config params
    if (aloy.ui.isExport) {
        model['tagText'] = config['tagText'];
        model['buttonText'] = config['buttonText'];
        model['meta'] = config['meta'];
        model['eId'] = model.eId;
    }

    this.setModel(model);
};
goog.inherits(aloy.ui.Tagger, goog.ui.Container);
//If there's more than 1 renderer to utilize then it's good to set a default renderer
//goog.ui.registry.setDefaultRenderer(aloy.ui.Tagger, aloy.ui.TaggerRenderer);


/**
 * @override
 * @return {aloy.ui.TaggerModel}
 */
aloy.ui.Tagger.prototype.getModel;


/**
 * @inheritDoc
 */
aloy.ui.Tagger.prototype.enterDocument = function () {

    goog.base(this, 'enterDocument');
    
    this.getHandler()
        .listen(this, goog.ui.Component.EventType.ACTION, this.handleAction);
};

/**
 * @inheritDoc
 */
aloy.ui.Tagger.prototype.disposeInternal = function () {

    goog.base(this, 'disposeInternal');

    this.onActionCallback = null;
}

/**
 * Handles the default ACTION event by hijacking it and re-dispatching a new event
 *
 * @param {goog.events.Event} ev
 */
aloy.ui.Tagger.prototype.handleAction = function (ev) {

    // Stops bubbling of the default ACTION event to Tagger's parent/s
    ev.stopPropagation();

    var model,
        newEvent,
        retainProps = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'platformModifierKey'];

    model = this.getModel();
    
    newEvent = {
        'type': aloy.ui.Tagger.EventType.ACTION,
        'eId': model.eId,
        'meta': model.meta
    }

    // Add back in the properties to retain from default ACTION event
    for (var prop, i=0; prop = retainProps[i]; i++) {
        newEvent[prop] = ev[prop];
    }

    ev.target.dispatchEvent(newEvent);

    if (!goog.isNull(this.onActionCallback)) {
        this.onActionCallback.call(this, /** @type aloy.ui.TaggerActionEvent*/ (newEvent));
    }
};

/**
 * @enum {string}
 */
aloy.ui.Tagger.EventType = {
    ACTION: goog.events.getUniqueId('action')
};

// Defaults for build

/** @define {boolean} */
aloy.ui.isExport = false;
/** @define {number} */
var ver = 0;
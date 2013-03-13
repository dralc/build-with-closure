/**
 * @fileoverview Renderer for Tagger. A stateless re-usable singleton.
 * @author Aloysius Chan
 */
goog.provide('aloy.ui.TaggerRenderer');

goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('soy');
goog.require('aloy.ui.soy.Tagger');
goog.require('goog.string');

/**
 *
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
aloy.ui.TaggerRenderer = function TaggerRenderer() {
    goog.base(this);
};
goog.inherits(aloy.ui.TaggerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(aloy.ui.TaggerRenderer);

/** @type {string} */
aloy.ui.TaggerRenderer.CSS_CLASS = 'aloy-ui-tagger';

/**
 * @inheritDoc
 */
aloy.ui.TaggerRenderer.prototype.getCssClass = function () {
    return aloy.ui.TaggerRenderer.CSS_CLASS;
};

/**
 * @suppress {visibility} setElementInternal
 *
 * @param {aloy.ui.Tagger} tagger
 *
 * @return {Element} Root DOM element of tagger
 */
aloy.ui.TaggerRenderer.prototype.createDom = function (tagger) {
    
    var frag,
        model = tagger.getModel(),
        btn;

    // Build DOM from the template and a Button component
    if (aloy.ui.isExport) {
        model.meta = model['meta'];
        model.tagText = model['tagText'];
        model.buttonText = model['buttonText'];
    }

    model.metaKeys = goog.object.getKeys(model.meta);

    frag = soy.renderAsFragment(aloy.ui.soy.Tagger.getHtml, model);

    // We assume that frag is a single node with child nodes
    tagger.setElementInternal(/** @type {Element}*/ (frag));

    btn = new goog.ui.Button(goog.string.unescapeEntities(model.buttonText),
        goog.ui.FlatButtonRenderer.getInstance());

    tagger.addChild(btn, true);

    return /** @type {Element}*/ (frag);
};
/**
 * @fileoverview Used for exporting Tagger as an external library
 * @author Aloysius Chan
 */
goog.provide('aloy.ui.TaggerExport');

goog.require('aloy.ui.Tagger');

goog.exportSymbol('aloy.ui.Tagger', aloy.ui.Tagger);
goog.exportSymbol('aloy.ui.Tagger.prototype.render', aloy.ui.Tagger.prototype.render);
goog.exportSymbol('aloy.ui.Tagger.prototype.dispose', goog.Disposable.prototype.dispose);
goog.exportSymbol('aloy.ui.Tagger.prototype.getElement', aloy.ui.Tagger.prototype.getElement);
goog.exportSymbol('aloy.ui.Tagger.EventType.ACTION', aloy.ui.Tagger.EventType.ACTION);

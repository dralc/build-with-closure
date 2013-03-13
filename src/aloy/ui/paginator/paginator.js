/**
 * @fileoverview A Pagination component
 * @author Aloysius Chan
 */
goog.provide('aloy.ui.Paginator');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('aloy.ui.soy.paginator');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.ui.IdGenerator');

/**
 * Events dispatched:
 * __NAME_______|__DATA__________|__ACTION________|_TYPE____
 * page_clicked | page {number}  | On page click  | aloy.ui.Paginator.PageClickEvent
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 *
 * @param {!Element} container
 * @param {number=} opt_totalItems
 * @param {number=} opt_itemsPerPage
 * @param {number=} opt_maxPagesInSet
 */
aloy.ui.Paginator = function Paginator(container, opt_totalItems, opt_itemsPerPage, opt_maxPagesInSet) {
    goog.base(this);

    this.container = container;

    /** @type {?Array.<number>} */
    this.pages_ = null;

    /** @type {?Node} */
    this.ui = null;

    this.eventHandler_ = new goog.events.EventHandler(this);

    /** @type {number} */
    this.totalItems_ = aloy.ui.Paginator.defaults.TOTAL_ITEMS;

    if (goog.isDef(opt_totalItems)) {
        this.totalItems_ = Number(opt_totalItems);
    }
    
    /** @type {number} */
    this.maxPagesInSet_ = aloy.ui.Paginator.defaults.MAX_PAGES_IN_SET;
    if (goog.isDef(opt_maxPagesInSet)) {
        this.maxPagesInSet_ = Number(opt_maxPagesInSet);
    }

    /** @type {number} */
    this.itemsPerPage_ = aloy.ui.Paginator.defaults.ITEMS_PER_PAGE;

    if (goog.isDef(opt_itemsPerPage)) {
        this.itemsPerPage_ = Number(opt_itemsPerPage);
    }

    /** @type {number} */
    this.maxPg_ = Math.ceil(this.totalItems_ / this.itemsPerPage_);

    /** @type {number} */
    this.clickedPg_ = aloy.ui.Paginator.defaults.CLICKED_PG;

    /** @type {number} */
    this.currentPg_ = aloy.ui.Paginator.defaults.CURRENT_PG;

    /** @type {number} */
    this.currentStartPg_ = aloy.ui.Paginator.defaults.CURRENT_START_PG;


    /** @type {boolean} */
    this.isPrintNextButton_ = aloy.ui.Paginator.defaults.IS_PRINT_NEXT_BUTTON;

    /** @type {boolean} */
    this.isPrintPrevButton_ = aloy.ui.Paginator.defaults.IS_PRINT_PREV_BUTTON;

    /** @type {boolean} */
    this.isPrintStats_ = aloy.ui.Paginator.defaults.IS_PRINT_STATS;
};
goog.inherits(aloy.ui.Paginator, goog.events.EventTarget);

/**@typedef { {type: string, page: number} }*/
aloy.ui.Paginator.PageClickEvent;

/**
 * The default state properties set here are used for generating the page indexes
 * @private
 */
aloy.ui.Paginator.prototype.resetStartPg_ = function () {
    this.currentStartPg_ = 1;
};

/**
 * Resets the Paginator to its initial state instead of creating a new instance.
 * Useful when there's a new set of numbers to render.
 *
 * @param {number=} opt_totalItems
 * @param {number=} opt_itemsPerPage
 * @param {number=} opt_maxPagesInSet
 */
aloy.ui.Paginator.prototype.reset = function (opt_totalItems, opt_itemsPerPage, opt_maxPagesInSet) {
    this.clickedPg_ = aloy.ui.Paginator.defaults.CLICKED_PG;
    this.currentPg_ = aloy.ui.Paginator.defaults.CURRENT_PG;
    this.currentStartPg_ = aloy.ui.Paginator.defaults.CURRENT_START_PG;

    this.totalItems_ = aloy.ui.Paginator.defaults.TOTAL_ITEMS;
    if (goog.isDef(opt_totalItems)) {
        this.totalItems_ = Number(opt_totalItems);
    }

    this.itemsPerPage_ = aloy.ui.Paginator.defaults.ITEMS_PER_PAGE;
    if (goog.isDef(opt_itemsPerPage)) {
        this.itemsPerPage_ = Number(opt_itemsPerPage);
    }

    this.maxPagesInSet_ = aloy.ui.Paginator.defaults.MAX_PAGES_IN_SET;
    if (goog.isDef(opt_maxPagesInSet)) {
        this.maxPagesInSet_ = Number(opt_maxPagesInSet);
    }

    this.maxPg_ = Math.ceil(this.totalItems_ / this.itemsPerPage_);
};

/**
 * Sets the state of the pagination and updates the pages indexes.
 * @private
 * 
 * @param {number=} opt_currentPg The currently selected page
 * @param {number=} opt_maxPg The max no. of pages allowed
 * @param {number=} opt_clickedPg The page index that was clicked. Defaults to 1
 * @param {number=} opt_currentStartPg The start page of an existing paginator. Defaults to 1
 * @param {number=} opt_maxPagesInSet Defaults to 10
 *
 * @return {Array.<number>} An array of the page numbers. An empty array is returned when maxPg ==1
 */
aloy.ui.Paginator.prototype.generatePages_ = function (opt_currentPg, opt_maxPg, opt_clickedPg, opt_currentStartPg, opt_maxPagesInSet) {

    // Set the state properties for generating page indexes

    this.resetStartPg_();

    if (goog.isDef(opt_currentPg)) {
        this.currentPg_ = Number(opt_currentPg);
    }

    if (goog.isDef(opt_maxPg)) {
        this.maxPg_ = Number(opt_maxPg);
    }

    if (goog.isDef(opt_clickedPg)) {
        this.clickedPg_ = Number(opt_clickedPg);
    }

    if (goog.isDef(opt_currentStartPg)) {
        this.currentStartPg_ = Number(opt_currentStartPg);
    }

    if (goog.isDef(opt_maxPagesInSet)) {
        this.maxPagesInSet_ = Number(opt_maxPagesInSet);
    }

    // Update page indexes

    this.pages_ = this.generatePagesHelper_();
    if (this.pages_.length !== 0) {
        this.currentStartPg_ = this.pages_[0];
    }

    return this.pages_;
};

/**
 * Helper function for {@link #generatePages} that generates the page indexes
 * @private
 *
 * @return {Array.<number>} An array of the page numbers. An empty array is returned when this.maxPg_ ===1
 */
aloy.ui.Paginator.prototype.generatePagesHelper_ = function () {
    var ret = [];

    // CASE:
    // _
    // 2 | 1
    if (this.currentPg_ > 1 && this.maxPg_ === 1 && goog.DEBUG) {
        throw new Error(aloy.ui.Paginator.errors.BAD_PAGE_INPUT);
    }
    // CASE:
    //  _
    //  1 | 1
    else if (this.maxPg_ === 1) {
        return ret;
    }

    var i;

    // CASE:
    //  _
    // [1 2 3 4 5] 6 7 8 9 10 | 10
    if (this.maxPg_ <= this.maxPagesInSet_) {
        for (i=1; i<=this.maxPg_; i++) {
            ret.push(i);
        }
        return ret;
    }

    var smallestMid = this.maxPagesInSet_ / 2,
        midPgOfSet,
        startPg, endPg,
        inc = 0;

    midPgOfSet = Math.ceil(smallestMid);

    // When the start of the set of numbers is not 1, we have to offset the midpoint
    if (this.currentStartPg_ > 1) {
        midPgOfSet = this.currentStartPg_ + midPgOfSet - 1;
    }

    inc = this.getInc_(this.clickedPg_, midPgOfSet, this.currentStartPg_, this.currentPg_, smallestMid, this.maxPg_);
    startPg = this.currentStartPg_ + inc;
    endPg = startPg + this.maxPagesInSet_ - 1;

    for (i = startPg; i <= endPg; i++) {
        ret.push(i);
    }

    return ret;
};

/**
 * @private
 *
 * @return {number} A +'ve integer for an increment, a -'ve integer for a decrement
 */
aloy.ui.Paginator.prototype.getInc_ = function (clickedPg, midPgOfSet, currentStartPg, currentPg, smallestMid, maxPg) {

    var offset = 0,
        endPg,
        pagesInSet;

    // CASE:
    // When the LEFT portion inc. the midpoint of a set was clicked
    //  _
    // [1 2 3 4 5] 6 7 8 9 10 | 10...
    //  _
    // [1 2 3] 4 5 | 5...
    if (clickedPg <= midPgOfSet) {

        if (currentStartPg > 1) {

            offset = -(currentPg - clickedPg);
            if (currentStartPg + offset < 1) {
                // calc. max decrement
                offset = -(currentStartPg - 1);
            }
        }
    }
    // CASE:
    // When the RIGHT portion of a set was clicked
    //  _
    //  1 2 3 4 5 [6 7 8 9 10] | 10...
    //  _
    //  1 2 3 [4 5] | 5...
    else if (clickedPg > midPgOfSet) {

        offset = clickedPg - midPgOfSet;

        endPg = midPgOfSet + Math.ceil(smallestMid);

        pagesInSet = smallestMid * 2;
        
        // When the number of pages in the set are odd the endPg is 1 less
        if ((pagesInSet & 1) === 1) {
            endPg += -1;
        }

        if ((endPg+offset) >= maxPg) {
            // calc. max increment
            offset = maxPg - endPg;
        }
    }

    return offset;
};

/**
 * Render the pagination inside <code>this.container</code>
 * and attach listeners
 *
 * @param {boolean=} opt_stats Set to true to render the stats message. Defaults to false
 * @param {boolean=} opt_next Set to true to render the next button. Defaults to false
 * @param {boolean=} opt_prev Set to true to render the prev button. Defaults to false
 */
aloy.ui.Paginator.prototype.render = function (opt_stats, opt_next, opt_prev) {

    var htm = '',
        eId,
        rangeStart, rangeEnd,
        dat;

    // Render the initial set of pages
    this.generatePages_(undefined, undefined, this.clickedPg_);

    if (goog.isNull(this.ui)) {
        eId = aloy.ui.Paginator.classes.BASE + goog.ui.IdGenerator.getInstance().getNextUniqueId();
    } else {
        eId = this.ui.id;
    }
    
    dat = {
        eId: eId,
        pages: this.pages_,
        clickedPg: this.clickedPg_
    }
    
    if (goog.isBoolean(opt_stats) && opt_stats) {
        this.isPrintStats_ = opt_stats;

        rangeStart = this.clickedPg_ === 1 ? 1 : (this.clickedPg_ - 1) * this.itemsPerPage_ + 1;
        rangeEnd = (rangeStart + this.itemsPerPage_ - 1);
        if (rangeEnd > this.totalItems_) {
            rangeEnd = this.totalItems_;
        }

        dat.opt_range = rangeStart + ' - ' + rangeEnd;
        dat.opt_total = this.totalItems_;
    }

    if (goog.isBoolean(opt_next)) {
        this.isPrintNextButton_ = opt_next;

        dat.opt_next = opt_next;
        dat.opt_maxPg = this.maxPg_;
    }

    if (goog.isBoolean(opt_prev)) {
        this.isPrintPrevButton_ = opt_prev;
        dat.opt_prev = opt_prev;
    }

    htm = aloy.ui.soy.paginator.renderHtm(dat);
    
    // Attach rendered pages to doc then add listeners
    if (htm.length > 0) {
        this.ui = goog.dom.htmlToDocumentFragment(htm);

        var el = goog.dom.getElement(eId),
            uiInDoc = !goog.isNull(el);

        if (uiInDoc) {
            goog.dom.replaceNode(this.ui, el);

        } else {
            goog.dom.appendChild(this.container, this.ui);
        }

        // Remove old listeners first
        this.eventHandler_.removeAll();

        this.addListeners_();
    }
};

/**
 * @private
 */
aloy.ui.Paginator.prototype.addListeners_ = function () {

    this.eventHandler_
        .listen(this.ui, goog.events.EventType.CLICK, this.handleClick_)
        .listen(this.ui, goog.events.EventType.MOUSEOVER, this.handleMouseOver_)
        .listen(this.ui, goog.events.EventType.MOUSEOUT, this.handleMouseOut_);
};

/**
 * Update style for a page
 * @private
 *
 * @param {!goog.events.BrowserEvent} e
 */
aloy.ui.Paginator.prototype.handleMouseOver_ = function (e) {
    if (!goog.dom.classes.has(e.target, aloy.ui.Paginator.classes.ACTIVE)
        && e.target.nodeName === 'LI')
    {
        goog.dom.classes.add(e.target, aloy.ui.Paginator.classes.HOVER);
    }
};

/**
 * Update style for a page
 * @private
 *
 * @param {!goog.events.BrowserEvent} e
 */
aloy.ui.Paginator.prototype.handleMouseOut_ = function (e) {
    if (!goog.dom.classes.has(e.target, aloy.ui.Paginator.classes.ACTIVE)
        && e.target.nodeName === 'LI')
    {
        goog.dom.classes.remove(e.target, aloy.ui.Paginator.classes.HOVER);
    }
};

/**
 * Re-generate pages then re-render the component html
 * @private
 *
 * @param {!goog.events.BrowserEvent} e
 */
aloy.ui.Paginator.prototype.handleClick_ = function (e) {

    var targ = /** @type {Element} */ e.target;

    if (targ.nodeName === 'LI') {

        // Stop handler if the active page was clicked
        if (goog.dom.classes.has(targ, aloy.ui.Paginator.classes.ACTIVE)) {
            return;
        }

        this.clickedPg_ = Number(goog.dom.dataset.get(targ, 'page'));

        // On render, retain the state of the stats, next & prev buttons
        this.render(this.isPrintStats_, this.isPrintNextButton_, this.isPrintPrevButton_);

        // Only set the currentPg to the clickedPg after rendering
        this.currentPg_ = this.clickedPg_;

        // Dispatch component event 'page_click' with clickedPg data
        /**@type {aloy.ui.Paginator.PageClickEvent}*/
        var obj = {
            type: aloy.ui.Paginator.EventTypes.PAGE_CLICKED,
            page: this.clickedPg_
        }
        this.dispatchEvent(obj);
    }
};

//TODO implement dispose()

/**
 * @enum {string}
 */
aloy.ui.Paginator.errors = {
    BAD_PAGE_INPUT: 'The current page is incorrectly greater than the max page.',
    UNHANDLED: 'Unhandled point reached.'
};
aloy.ui.Paginator.EventTypes = {
    PAGE_CLICKED: 'page_clicked'
};
aloy.ui.Paginator.classes = {
    BASE: 'al-ui-pagi',
    ACTIVE: 'active',
    HOVER: 'hover',
    STATS: 'stats'
};
aloy.ui.Paginator.defaults = {
    CLICKED_PG: 1,
    CURRENT_PG: 1,
    CURRENT_START_PG: 1,
    TOTAL_ITEMS: 1,
    MAX_PAGES_IN_SET: 10,
    ITEMS_PER_PAGE: 10,
    IS_PRINT_STATS: false,
    IS_PRINT_NEXT_BUTTON: false,
    IS_PRINT_PREV_BUTTON: false
}
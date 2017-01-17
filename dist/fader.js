var Fader = function Fader(element, options) {
    if(!options) { options = {}; }

    /**
     * @prop {String|Number} width The width of the container.
     */
    this.width = options.width || 'full';

    /**
     * @prop {String|Number} height The height of the container.
     */
    this.height = options.height || 400;

    /**
     * @prop {HTMLElement} element The container element.
     */
    this.element = document.querySelector(element);

    /**
     * @prop {Number} wait The time in milliseconds to wait between transitions.
     */
    this.wait = options.wait || 3000;

    /**
     * @prop {Number} transitionTime The time the fade transition takes.
     */
    this.transitionTime = options.transitionTime || 500;

    /**
     * @prop {String} ease The ease to use for the transition. This supports any CSS3 ease the transition property supports.
     */
    this.ease = options.ease || 'ease-in-out';

    /**
     * @prop {Boolean} loop Should the slider loop when it reaches the last slide.
     */
    this.loop = options.loop || false;

    /**
     * @prop {Array} slides Array of slides inside the container.
     * 
     * @private
     */
    this._slides = [];

    /**
     * @prop {Number} currentSlide The current active slide index.
     * 
     * @private 
     */
    this._currentSlide = 0;

    /**
     * @prop {Number|Null} previousSlide The last slide which was active before the current slide.
     * 
     * @private 
     */
    this._previousSlide = null;

    this._getSlides();
    this._resizeSlider();
    this._setupSlides();
    this._setupSlider();
    this._startTimer();
};

/**
 * Search the container element for all list items.
 * 
 * @method _getSlides
 * 
 * @private 
 */
Fader.prototype._getSlides = function _getSlides () {
    this._slides = this.element.querySelectorAll('li');
};

/**
 * Resize the slider to match the set width / height.
 * 
 * @method _resizeSlider
 * 
 * @private
 */
Fader.prototype._resizeSlider = function _resizeSlider () {
    var width = this._calculateWidth();
    var height = this._calculateHeight();
        
    this.element.style.width = width;
    this.element.style.height = height;
};


/**
 * Setup the slides setting their base styles.
 * 
 * @method _setupSlides
 * 
 * @private 
 */
Fader.prototype._setupSlides = function _setupSlides () {
        var this$1 = this;

    this._each(this._slides, function (item, index) {
        item.style.width = '100%';
        item.style.height = '100%';
        item.style.position = 'absolute';
        item.style.top = '0';
        item.style.bottom = '0';
        item.style.opacity = '0';
        item.style.transition = 'opacity ' + this$1.transitionTime + 'ms ' + this$1.ease;
    });
};


/**
 * Set the slider styles and activate the first slide.
 * 
 * @method _setupSlider
 * 
 * @private
 */
Fader.prototype._setupSlider = function _setupSlider () {
    this.element.style.position = 'relative';

    this.element.querySelector('ul').style.padding = '0';

    this._activateSlide(0);
};


/**
 * Active the slide at the given index, this fades the slide in.
 * 
 * @param {Number} index The index of the slide to active.
 * 
 * @method _activateSlide
 * 
 * @private
 */
Fader.prototype._activateSlide = function _activateSlide (index) {
    var slide = this._slides[index];
    slide.className += ' active';
    slide.className = slide.className.trim();

    slide.style.opacity = '1';
};


/**
 * Deactive the slide at the given index, this fades the slide out.
 * 
 * @param {Number} index The index of the slide to deactivate.
 * 
 * @method _deactivateSlide
 * 
 * @private 
 */
Fader.prototype._deactivateSlide = function _deactivateSlide (index) {
    var slide = this._slides[index];
    slide.className = slide.className.replace('active', '').trim();

    slide.style.opacity = '0';
};

/**
 * Start the auto slide change timer.
 * 
 * @method _startTimer
 * 
 * @private
 */
Fader.prototype._startTimer = function _startTimer () {
    this.timer = setInterval(this.nextSlide.bind(this), this.wait);
};

/**
 * Reset the timer.
 * 
 * @method _resetTimer
 * 
 * @private
 */
Fader.prototype._resetTimer = function _resetTimer () {
    clearInterval(this.timer);
    this._startTimer();
};

/**
 * Change the slide to the new index, fading out the old index.
 * 
 * @param {Number} newSlide The index of the new slide to show.
 * @param {Number} oldSlide The index of the old slide to hide.
 * 
 * @method _changeSlide
 * 
 * @private
 */
Fader.prototype._changeSlide = function _changeSlide (newSlide, oldSlide) {
    this._activateSlide(newSlide);

    if(oldSlide !== null) {
        this._deactivateSlide(oldSlide);
    }
};

/**
 * Switch to the next available slide.
 * 
 * @method nextSlide
 */
Fader.prototype.nextSlide = function nextSlide () {
    if(this._currentSlide < this._slides.length - 1) {
        this._previousSlide = this._currentSlide;
        this._currentSlide++;

        this._changeSlide(this._currentSlide, this._previousSlide);
    } else if(this.loop) {
        this._previousSlide = this._currentSlide;
        this._currentSlide = 0;

        this._changeSlide(this._currentSlide, null);
    }

    this._resetTimer();
};

/**
 * Switch the previous slide.
 * 
 * @method prevSlide
 */
Fader.prototype.prevSlide = function prevSlide () {
    if(this._currentSlide > 0) {
        this._previousSlide = this._currentSlide;
        this._currentSlide--;
    } else if(this.loop) {
        this._previousSlide = this._currentSlide;
        this._currentSlide = this._slides.length - 1;
    }

    this._resetTimer();
    this._changeSlide(this._currentSlide, this._previousSlide);
};

/**
 * Set the height of the slider.
 * 
 * @param {Number} height The new height in pixels.
 * 
 * @method setHeight
 */
Fader.prototype.setHeight = function setHeight (height) {
    this.height = height;
        
    this._resizeSlider();
};

/**
 * Set the width of the slider.
 * 
 * @param {Number} width The new width in pixels.
 */
Fader.prototype.setWidth = function setWidth (width) {
    this.width = width;

    this._resizeSlider();
};

/**
 * Calculate the width of the slider, taking into account special values
 * 
 * @method _calculateWidth
 * 
 * @private
 * 
 * @returns {String} The calculated width.
 */
Fader.prototype._calculateWidth = function _calculateWidth () {
    if(this.width === 'full') {
        return '100%';
    } else {
        return this.width + 'px';
    }
};

/**
 * Calculate the height of the slider, taking into account special values.
 * 
 * @method _calculateHeight
 * 
 * @private
 * 
 * @returns {String} The calculated height.
 */
Fader.prototype._calculateHeight = function _calculateHeight () {
    if(this.height === 'full') {
        return '100%';
    } else {
        return this.height + 'px';
    }
};

Fader.prototype._each = function _each (object, callback) {
    for(var i = 0; i < object.length; i++) {
        callback(object[i], i);
    }
};

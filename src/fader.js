class Fader {
    /**
     * @constructor
     * 
     * @param {string} element The selector for the container element.
     * @param {options} options The options for the instance.
     */
    constructor(element, options) {
        if(!options) options = {};

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
    }

    /**
     * Search the container element for all list items.
     * 
     * @method _getSlides
     * 
     * @private 
     */
    _getSlides() {
        this._slides = this.element.querySelectorAll('li');
    }

    /**
     * Resize the slider to match the set width / height.
     * 
     * @method _resizeSlider
     * 
     * @private
     */
    _resizeSlider() {
        let width = this._calculateWidth();
        let height = this._calculateHeight();
        
        this.element.style.width = width;
        this.element.style.height = height;
    }


    /**
     * Setup the slides setting their base styles.
     * 
     * @method _setupSlides
     * 
     * @private 
     */
    _setupSlides() {
        this._each(this._slides, (item, index) => {
            item.style.width = '100%';
            item.style.height = '100%';
            item.style.position = 'absolute';
            item.style.top = '0';
            item.style.bottom = '0';
            item.style.opacity = '0';
            item.style.transition = 'opacity ' + this.transitionTime + 'ms ' + this.ease;
        });
    }


    /**
     * Set the slider styles and activate the first slide.
     * 
     * @method _setupSlider
     * 
     * @private
     */
    _setupSlider() {
        this.element.style.position = 'relative';

        this.element.querySelector('ul').style.padding = '0';

        this._activateSlide(0);
    }


    /**
     * Active the slide at the given index, this fades the slide in.
     * 
     * @param {Number} index The index of the slide to active.
     * 
     * @method _activateSlide
     * 
     * @private
     */
    _activateSlide(index) {
        let slide = this._slides[index];
        slide.className += ' active';
        slide.className = slide.className.trim();

        slide.style.opacity = '1';
    }


    /**
     * Deactive the slide at the given index, this fades the slide out.
     * 
     * @param {Number} index The index of the slide to deactivate.
     * 
     * @method _deactivateSlide
     * 
     * @private 
     */
    _deactivateSlide(index) {
        let slide = this._slides[index];
        slide.className = slide.className.replace('active', '').trim();

        slide.style.opacity = '0';
    }

    /**
     * Start the auto slide change timer.
     * 
     * @method _startTimer
     * 
     * @private
     */
    _startTimer() {
        this.timer = setInterval(this.nextSlide.bind(this), this.wait);
    }

    /**
     * Reset the timer.
     * 
     * @method _resetTimer
     * 
     * @private
     */
    _resetTimer() {
        clearInterval(this.timer);
        this._startTimer();
    }

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
    _changeSlide(newSlide, oldSlide) {
        this._activateSlide(newSlide);
        this._deactivateSlide(oldSlide);
    }

    /**
     * Switch to the next available slide.
     * 
     * @method nextSlide
     */
    nextSlide() {
        if(this._currentSlide < this._slides.length - 1) {
            this._previousSlide = this._currentSlide;
            this._currentSlide++;
        } else if(this.loop) {
            this._previousSlide = this._currentSlide;
            this._currentSlide = 0;
        }

        this._resetTimer();
        this._changeSlide(this._currentSlide, this._previousSlide);
    }

    /**
     * Switch the previous slide.
     * 
     * @method prevSlide
     */
    prevSlide() {
        if(this._currentSlide > 0) {
            this._previousSlide = this._currentSlide;
            this._currentSlide--;
        } else if(this.loop) {
            this._previousSlide = this._currentSlide;
            this._currentSlide = this._slides.length - 1;
        }

        this._resetTimer();
        this._changeSlide(this._currentSlide, this._previousSlide);
    }

    /**
     * Set the height of the slider.
     * 
     * @param {Number} height The new height in pixels.
     * 
     * @method setHeight
     */
    setHeight(height) {
        this.height = height;
        
        this._resizeSlider();
    }

    /**
     * Set the width of the slider.
     * 
     * @param {Number} width The new width in pixels.
     */
    setWidth(width) {
        this.width = width;

        this._resizeSlider();
    }

    /**
     * Calculate the width of the slider, taking into account special values
     * 
     * @method _calculateWidth
     * 
     * @private
     * 
     * @returns {String} The calculated width.
     */
    _calculateWidth() {
        if(this.width === 'full') {
            return '100%';
        } else {
            return this.width + 'px';
        }
    }

    /**
     * Calculate the height of the slider, taking into account special values.
     * 
     * @method _calculateHeight
     * 
     * @private
     * 
     * @returns {String} The calculated height.
     */
    _calculateHeight() {
        if(this.height === 'full') {
            return '100%';
        } else {
            return this.height + 'px';
        }
    }

    _each(object, callback) {
        for(let i = 0; i < object.length; i++) {
            callback(object[i], i);
        }
    }
}

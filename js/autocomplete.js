(function($) {
  'use strict';

  let _defaults = {
    data: {}, // Autocomplete data set
    limit: Infinity, // Limit of results the autocomplete shows
    onAutocomplete: null, // Callback for when autocompleted
    minLength: 0, // Min characters before autocomplete starts
    sortFunction: function(a, b, inputString) {
      // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    },
    addCustom: false
  };

  /**
   * @class
   *
   */
  class Autocomplete extends Component {
    /**
     * Construct Autocomplete instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Autocomplete, el, options);

      this.el.M_Autocomplete = this;

      /**
       * Options for the autocomplete
       * @member Autocomplete#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       * @prop {Boolean} addCustom // if no matches add option 'Add custom'
       */
      this.options = $.extend({}, Autocomplete.defaults, options);

      // Setup
      this.isOpen = false;
      this.count = 0;
      this.activeIndex = -1;
      this.oldVal;
      this.$inputField = this.$el.closest('.input-field');
      this.$active = $();
      this._mousedown = false;
      this._setupDropdown();

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Autocomplete;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._removeDropdown();
      this.el.M_Autocomplete = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleInputBlurBound = this._handleInputBlur.bind(this);
      this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);
      this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(
        this
      );
      this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(
        this
      );
      this._handleCleanClickBound = this._handleCleanClick.bind(this);

      this.el.addEventListener('blur', this._handleInputBlurBound);
      this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
      this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.el.addEventListener('click', this._handleInputClickBound);
      this.container.addEventListener(
        'mousedown',
        this._handleContainerMousedownAndTouchstartBound
      );
      this.container.addEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

      if (typeof window.ontouchstart !== 'undefined') {
        this.container.addEventListener(
          'touchstart',
          this._handleContainerMousedownAndTouchstartBound
        );
        this.container.addEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
      }

      const clean = this.$inputField[0].querySelector('.input-field__clean');
      if (clean) clean.addEventListener('click', this._handleCleanClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('blur', this._handleInputBlurBound);
      this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
      this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      this.el.removeEventListener('click', this._handleInputClickBound);
      this.container.removeEventListener(
        'mousedown',
        this._handleContainerMousedownAndTouchstartBound
      );
      this.container.removeEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

      if (typeof window.ontouchstart !== 'undefined') {
        this.container.removeEventListener(
          'touchstart',
          this._handleContainerMousedownAndTouchstartBound
        );
        this.container.removeEventListener(
          'touchend',
          this._handleContainerMouseupAndTouchendBound
        );
      }

      const clean = this.$inputField[0].querySelector('.input-field__clean');
      if (clean) clean.removeEventListener('click', this._handleCleanClickBound);
    }

    _handleCleanClick(e) {
      e.stopPropagation();
      this._resetAutocomplete();
      this.el.value = '';
      this._toggleFilled(false);
    }

    /**
     * Setup dropdown
     */
    _setupDropdown() {
      this.container = document.createElement('ul');
      this.container.id = `autocomplete-options-${M.guid()}`;
      $(this.container).addClass('autocomplete-content dropdown-content');
      this.$inputField.append(this.container);
      this.el.setAttribute('data-target', this.container.id);
      // Add caret
      if (!this.$inputField.find('.caret').length)
        this.$inputField.append($('<svg class="caret"><use xlink:href="#drop"></use></svg>'));
      if (!this.$inputField.find('.input-field__clean').length)
        this.$inputField.append(
          $(
            `<span class="waves-effect btn-flat btn--icon input-field__clean"><i class='icon'><svg><use xlink:href="#clean"></use></svg></i></span>`
          )
        );

      this.dropdown = M.Dropdown.init(this.el, {
        autoFocus: false,
        closeOnClick: false,
        coverTrigger: false,
        onItemClick: (itemEl) => {
          this.selectOption($(itemEl));
        }
      });

      // Sketchy removal of dropdown click handler
      this.el.removeEventListener('click', this.dropdown._handleClickBound);
    }

    /**
     * Remove dropdown
     */
    _removeDropdown() {
      this.container.parentNode.removeChild(this.container);
    }

    /**
     * Handle Input Blur
     */
    _handleInputBlur() {
      if (!this._mousedown) {
        this.close();
        this._resetAutocomplete();
        this._toggleFilled(this.el.value !== '');
      }
    }

    /**
     * Handle Input Keyup and Focus
     * @param {Event} e
     */
    _handleInputKeyupAndFocus(e) {
      if (e.type === 'keyup') {
        Autocomplete._keydown = false;
      }

      this.count = 0;
      let val = this.el.value.toLowerCase();

      // Don't capture enter or arrow key usage.
      if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
        return;
      }

      // Check if the input isn't empty
      // Check if focus triggered by tab
      if (this.oldVal !== val && (M.tabPressed || e.type !== 'focus')) {
        this.open();
      }

      // Update oldVal
      this.oldVal = val;
    }

    /**
     * Handle Input Keydown
     * @param {Event} e
     */
    _handleInputKeydown(e) {
      Autocomplete._keydown = true;

      // Arrow keys and enter key usage
      let keyCode = e.keyCode,
        liElement,
        numItems = $(this.container).children('li').length;

      // select element on Enter
      if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
        liElement = $(this.container)
          .children('li')
          .eq(this.activeIndex);
        if (liElement.length) {
          this.selectOption(liElement);
          e.preventDefault();
        }
        return;
      }

      // Capture up and down key
      if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
        e.preventDefault();

        if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
          this.activeIndex--;
        }

        if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
          this.activeIndex++;
        }

        this.$active.removeClass('active');
        if (this.activeIndex >= 0) {
          this.$active = $(this.container)
            .children('li')
            .eq(this.activeIndex);
          this.$active.addClass('active');
        }
      }
    }

    /**
     * Handle Input Click
     * @param {Event} e
     */
    _handleInputClick(e) {
      this.open();
    }

    /**
     * Handle Container Mousedown and Touchstart
     * @param {Event} e
     */
    _handleContainerMousedownAndTouchstart(e) {
      this._mousedown = true;
    }

    /**
     * Handle Container Mouseup and Touchend
     * @param {Event} e
     */
    _handleContainerMouseupAndTouchend(e) {
      this._mousedown = false;
    }

    /**
     * Highlight partial match
     */
    _highlight(string, $el) {
      let img = $el.find('img');
      let matchStart = $el
          .text()
          .toLowerCase()
          .indexOf('' + string.toLowerCase() + ''),
        matchEnd = matchStart + string.length - 1,
        beforeMatch = $el.text().slice(0, matchStart),
        matchText = $el.text().slice(matchStart, matchEnd + 1),
        afterMatch = $el.text().slice(matchEnd + 1);
      $el.html(
        `<span>${beforeMatch}<span class='highlight'>${matchText}</span>${afterMatch}</span>`
      );
      if (img.length) {
        $el.prepend(img);
      }
    }

    /**
     * Reset current element position
     */
    _resetCurrentElement() {
      this.activeIndex = -1;
      this.$active.removeClass('active');
    }

    /**
     * Reset autocomplete elements
     */
    _resetAutocomplete() {
      $(this.container).empty();
      this._resetCurrentElement();
      this.oldVal = null;
      this.isOpen = false;
      this._mousedown = false;
    }

    /**
     * Select autocomplete option
     * @param {Element} el  Autocomplete option list item element
     */
    selectOption(el) {
      let text = el.text().trim();
      this.el.value = text;
      this.$el.trigger('change');
      this._resetAutocomplete();
      this.close();

      // Handle onAutocomplete callback.
      if (typeof this.options.onAutocomplete === 'function') {
        this.options.onAutocomplete.call(this, el[0].getAttribute('data-value'));
      }

      this._toggleFilled();
    }

    _toggleFilled(isFilled = true) {
      if (isFilled) {
        this.$inputField[0].classList.add('input-field--filled');
      } else {
        this.$inputField[0].classList.remove('input-field--filled');
      }
    }

    /**
     * Render dropdown content
     * @param {Object} data  data set
     * @param {String} val  current input value
     */
    _renderDropdown(data, val) {
      this._resetAutocomplete();

      if (val.trim() && this.options.addCustom) {
        let $autocompleteOption = $('<li></li>');
        const escape = document.createElement('textarea');
        escape.textContent = val;
        const valEscaped = escape.innerHTML;
        $autocompleteOption[0].setAttribute('data-value', 'addcustom' + valEscaped);
        $autocompleteOption.html(
          '<span>' + this.options.addCustom + ' <strong>`' + valEscaped + '`</strong></span>'
        );
        $(this.container).append($autocompleteOption);
      }

      let matchingData = [];

      // Gather all matching data
      for (let key in data) {
        if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
          let entry = {
            data: data[key],
            key: key
          };
          matchingData.push(entry);

          this.count++;
        }
      }

      // Sort
      if (this.options.sortFunction) {
        let sortFunctionBound = (a, b) => {
          return this.options.sortFunction(
            a.key.toLowerCase(),
            b.key.toLowerCase(),
            val.toLowerCase()
          );
        };
        matchingData.sort(sortFunctionBound);
      }

      // Limit
      matchingData = matchingData.slice(0, this.options.limit);

      // Render
      for (let i = 0; i < matchingData.length; i++) {
        let entry = matchingData[i];
        let $autocompleteOption = $('<li></li>');
        if (!!entry.data) {
          $autocompleteOption[0].setAttribute('data-value', entry.data);
        }
        $autocompleteOption.append('<span>' + entry.key + '</span>');

        $(this.container).append($autocompleteOption);
        this._highlight(val, $autocompleteOption);
      }
    }

    /**
     * Open Autocomplete Dropdown
     */
    open() {
      let val = this.el.value.toLowerCase();

      this._resetAutocomplete();

      if (val.length >= this.options.minLength) {
        this.isOpen = true;
        this._renderDropdown(this.options.data, val);
      }

      // Open dropdown
      if (!this.dropdown.isOpen) {
        this.dropdown.open();
      } else {
        // Recalculate dropdown when its already open
        this.dropdown.recalculateDimensions();
      }
    }

    /**
     * Close Autocomplete Dropdown
     */
    close() {
      this.dropdown.close();
    }

    /**
     * Update Data
     * @param {Object} data
     */
    updateData(data) {
      let val = this.el.value.toLowerCase();
      this.options.data = data;

      if (this.isOpen) {
        this._renderDropdown(data, val);
      }
    }
  }

  /**
   * @static
   * @memberof Autocomplete
   */
  Autocomplete._keydown = false;

  M.Autocomplete = Autocomplete;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }
})(cash);

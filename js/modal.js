(function($, anim) {
  'use strict';

  let _defaults = {
    opacity: 0.25,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true
  };

  /**
   * @class
   *
   */
  class Modal extends Component {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Modal, el, options);

      this.el.M_Modal = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before modal is opened
       * @prop {Function} onOpenEnd - Callback function called after modal is opened
       * @prop {Function} onCloseStart - Callback function called before modal is closed
       * @prop {Function} onCloseEnd - Callback function called after modal is closed
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.id = this.$el.attr('id');
      this._openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');
      this.el.tabIndex = 0;
      this._nthModalOpened = 0;

      if (this.el.classList.contains('modal-gallery')) {
        this.$close = $('<div class="modal__close modal-close"></div>');
        this.$el.append(this.$close);
      }

      this.$container = this.$el.closest('.modal-container');
      if (!this.$container.length) {
        this.$container = $('<div class="modal-container"/>');
        this.$container.insertAfter(this.$el);
        this.$container.append(this.$el);
      }

      Modal._count++;
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
      return domElem.M_Modal;
    }

    /**
     * Teardown component
     */
    destroy() {
      Modal._count--;
      this._removeEventHandlers();
      this.el.removeAttribute('style');
      this.$overlay.remove();
      this.el.M_Modal = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
      this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

      if (Modal._count === 1) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
      this.el.addEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (Modal._count === 0) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
      this.el.removeEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger = $(e.target).closest('.modal-trigger');
      if ($trigger.length) {
        let modalId = M.getIdFromTrigger($trigger[0]);
        let modalInstance = document.getElementById(modalId).M_Modal;
        if (modalInstance) {
          modalInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    /**
     * Handle Overlay Click
     */
    _handleOverlayClick() {
      if (this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Modal Close Click
     * @param {Event} e
     */
    _handleModalCloseClick(e) {
      let $closeTrigger = $(e.target).closest('.modal-close');
      if ($closeTrigger.length) {
        this.close($closeTrigger.hasClass('modal-trigger')); // dont back history if another modal opened
      }
    }

    /**
     * Handle Keydown
     * @param {Event} e
     */
    _handleKeydown(e) {
      // ESC key
      if (e.keyCode === 27 && this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Focus
     * @param {Event} e
     */
    _handleFocus(e) {
      // Only trap focus if this modal is the last model opened (prevents loops in nested modals).
      if (!this.el.contains(e.target) && this._nthModalOpened === Modal._modalsOpen) {
        this.el.focus();
      }
    }

    /**
     * Animate in modal
     */
    _animateIn() {
      // Set initial styles
      this.$container.css('display', 'flex');
      $.extend(this.el.style, {
        display: 'block',
        opacity: 0
      });
      $.extend(this.$overlay[0].style, {
        display: 'block',
        opacity: 0
      });

      // Animate overlay
      anim({
        targets: this.$overlay[0],
        opacity: this.options.opacity,
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });

      // Define modal animation options
      let enterAnimOptions = {
        targets: this.el,
        duration: this.options.inDuration,
        easing: 'easeOutCubic',
        // Handle modal onOpenEnd callback
        complete: () => {
          if (typeof this.options.onOpenEnd === 'function') {
            this.options.onOpenEnd.call(this, this.el, this._openingTrigger);
          }
          this.el.scrollTop = 0;
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        $.extend(enterAnimOptions, {
          bottom: 0,
          opacity: 1
        });
        anim(enterAnimOptions);

        // Normal modal animation
      } else {
        const animOptions =
          window.innerWidth <= 600
            ? {}
            : {
                scaleX: [0.8, 1],
                scaleY: [0.8, 1]
              };
        $.extend(enterAnimOptions, animOptions, {
          opacity: 1,
          translateY: ['5%', '0']
        });
        anim(enterAnimOptions);
      }
    }

    /**
     * Animate out modal
     */
    _animateOut() {
      // Animate overlay
      anim({
        targets: this.$overlay[0],
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuart'
      });

      // Define modal animation options
      let exitAnimOptions = {
        targets: this.el,
        duration: this.options.outDuration,
        easing: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          this.el.style.display = 'none';
          this.$container.css('display', 'none');
          this.$overlay.remove();

          // Call onCloseEnd callback
          if (typeof this.options.onCloseEnd === 'function') {
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        $.extend(exitAnimOptions, {
          bottom: '-100%',
          opacity: 0
        });
        anim(exitAnimOptions);

        // Normal modal animation
      } else {
        const animOptions =
          window.innerWidth <= 600
            ? {
                translateY: '5%'
              }
            : {
                scaleX: 0.8,
                scaleY: 0.8,
                translateY: '5%'
              };
        $.extend(exitAnimOptions, animOptions, {
          opacity: 0
        });
        anim(exitAnimOptions);
      }
    }

    /**
     * Open Modal
     * @param {cash} [$trigger]
     */
    open($trigger) {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      Modal._modalsOpen++;
      this._nthModalOpened = Modal._modalsOpen;

      // Set Z-Index based on number of currently open modals
      this.$overlay[0].style.zIndex = 1000 + Modal._modalsOpen * 2;
      this.el.style.zIndex = 1000 + Modal._modalsOpen * 2 + 1;

      // Set opening trigger, undefined indicates modal was opened by javascript
      this._openingTrigger = !!$trigger ? $trigger[0] : undefined;

      // onOpenStart callback
      if (typeof this.options.onOpenStart === 'function') {
        this.options.onOpenStart.call(this, this.el, this._openingTrigger);
      }

      if (this.options.preventScrolling) {
        document.body.classList.add('modal-blocked');
      }

      this.el.classList.add('open');
      this.el.insertAdjacentElement('afterend', this.$overlay[0]);

      if (this.options.dismissible) {
        this._handleKeydownBound = this._handleKeydown.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        document.addEventListener('keydown', this._handleKeydownBound);
        document.addEventListener('focus', this._handleFocusBound, true);
      }

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);
      this._animateIn();

      // Focus modal
      this.el.focus();

      if (this._openingTrigger && this._openingTrigger.classList.contains('modal-close')) {
        // dont push history if another modal opened
      } else {
        window.history.pushState(null, 'Close modal');
      }
      window.onpopstate = () => this.close(true);

      return this;
    }

    /**
     * Close Modal
     */
    close(isBack = false) {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      Modal._modalsOpen--;
      this._nthModalOpened = 0;

      // Call onCloseStart callback
      if (typeof this.options.onCloseStart === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      this.el.classList.remove('open');

      // Enable body scrolling only if there are no more modals open.
      if (Modal._modalsOpen === 0) {
        document.body.classList.remove('modal-blocked');
      }

      if (this.options.dismissible) {
        document.removeEventListener('keydown', this._handleKeydownBound);
        document.removeEventListener('focus', this._handleFocusBound, true);
      }

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);
      this._animateOut();
      if (!isBack) window.history.back();
      return this;
    }
  }

  /**
   * @static
   * @memberof Modal
   */
  Modal._modalsOpen = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }
})(cash, M.anime);

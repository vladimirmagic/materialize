document.addEventListener('DOMContentLoaded', () => {
    $(function() {
        const params = new URLSearchParams(window.location.search);
        const sc = params.get('sc');
        if (sc && !params.get('ru')) {
            $('html').scrollTop(sc);
        }

        // Detect touch screen and enable scrollbar if necessary
        function is_touch_device() {
            try {
                document.createEvent('TouchEvent');
                return true;
            } catch (e) {
                return false;
            }
        }

        if (is_touch_device()) {
            $('body').removeClass('no-touch').addClass('touch');
        } else {
            $('body').removeClass('touch').addClass('no-touch');
        }

        function compareString(a, b) {
            return a > b ? 1 : (a < b ? -1 : 0);
        }

        // Plugin initialization

        $('.carousel--hero').carousel({
            arrows: false,
            fullWidth: true,
            indicators: true,
            interval: 5000,
            onCycleTo: function(item, dragged) {}
        });

        $('.collapsible:not(.sidenav__collapsible)').collapsible({
            onOpenEnd: (el) => {
                const body = el.querySelector('.collapsible-body');
                if (body) body.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            }
        });
        $('.sidenav__collapsible').collapsible({
            onOpenEnd: (el) => {
                const body = el.querySelector('.collapsible-body');
                if (body) body.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        });
        $('.collapsible.expandable').collapsible({
            accordion: false
        });

        $('.materialboxed').materialbox();
        $('.modal:not(.modal-ajax)').modal();
        $('.tabs').tabs();
        $('select').not('.disabled').formSelect();
        $('.sidenav').sidenav();
        $('input[data-length], textarea[data-length]').characterCounter();

        // AJAX
        if (
            $('.is-ligged-false').length ||
            $('.menu-auctions-links').length ||
            $('.header__bag-number').length
        ) getHeaderUpdate();

        getHomeWhatsNews();
        getHomeTopselling();

        // SIGN OUT SSO
        if ($('.signout-trigger').length) {
            $('.signout-trigger').on('click', function (e) {
                e.preventDefault();
                $('.loader-block').show();
                $.get(this.href)
                    .always(() => {
                        let params = '?action=signout&d=1&ru=/';
                        const scroll = $(window).scrollTop();
                        if (scroll > 100) params += '&sc=' + String(Math.round(scroll));
                        redirectPage(AUCTION_URL + params);
                    });
            });
        }

        // MODAL SIGNIN

        function ssoParams(params) {
            const ruParams = new URLSearchParams(window.location.search);
            if (ruParams.get('sc')) ruParams.delete('sc'); // delete old sc
            params.append('ru', encodeURIComponent(window.location.pathname + '?' + ruParams.toString()));
            const scroll = $(window).scrollTop();
            if (scroll > 100) params.append('sc', String(Math.round(scroll)));
        }

        $('#modal-signin').modal({ // load form on modal open
            onOpenStart: function (el, trigger) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-signin-form');
                const params = new URLSearchParams('d=1');
                if ($(trigger).data('ru')) { // redirect to another page after sam login
                    $('body').data('ru', $(trigger).data('ru'));
                    params.append('ru', encodeURIComponent($(trigger).data('ru')));
                } else { // redirect to this page after sam login
                    ssoParams(params);
                }
                $form.data('params', params.toString());
                $.get('/ajax/modalSignIn.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        initFacebookLoginButton($form.data('params'));
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            },
        });

        $('.modal-signin-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $form = $(this);

            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    if (data && data.trim() === 'success') {
                        $('.loader-block').show();
                        redirectPage('/sso.action?' + $form.data('params'));
                    } else {
                        this.innerHTML = data;
                        M.updateTextFields();
                        initFacebookLoginButton($form.data('params'));
                    }
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // MODAL REGISTER

        $('#modal-register').modal({ // load form on modal open
            onOpenStart: function (el) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-register-form');
                const params = new URLSearchParams('d=1');
                if ($('body').data('ru')) { // redirect to another page after sam login
                    params.append('ru', encodeURIComponent($('body').data('ru')));
                } else { // redirect to this page after sam login
                    ssoParams(params);
                }
                $form.data('params', params.toString());
                $.get('/ajax/modalRegister.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-register');
                        initFacebookLoginButton($form.data('params'));
                        trackEvent('RegistrationForm');
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            },
            onCloseStart: function (el) {
                const $ssoTrigger = $(el).find('.modal-register__sso-trigger');
                if ($ssoTrigger.length) $ssoTrigger.trigger('click');
            },
        });

        $('.modal-register-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $form = $(this);

            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    this.innerHTML = data;
                    M.updateTextFields();
                    grecaptchaRender('g-recaptcha-register');
                    initFacebookLoginButton($form.data('params'));
                    if ($('.modal-register__sso-trigger').length) { // success
                        $('.modal-register__sso-trigger').on('click', function (e) {
                            e.preventDefault();
                            setTimeout(() => redirectPage('/sso.action?' + $form.data('params')));
                        });
                        trackEvent('SignUp');
                    }
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // MODAL PASSWORD

        $('#modal-password').modal({ // load form on modal open
            onOpenStart: function (el) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-password-form');
                $.get('/ajax/modalPasswordAssistance.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-password');
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            }
        });

        $('.modal-password-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    this.innerHTML = data;
                    M.updateTextFields();
                    grecaptchaRender('g-recaptcha-password');
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // CARD
        function cardsHandlers () {
            $('.card__add').on('click', function (e) {
                e.preventDefault();
                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                const url = '/ajax/addProduct.action?product=' + productId;

                $.get(url)
                    .done(data => {
                        if ($('.bag__items').length) { // bag page
                            reloadPage();
                        } else {
                            $card.addClass('card--added');
                            bagCountUpdate();
                            M.toast({html: `<span>Added to cart&nbsp; <a href="/shoppingCart.action" class="h6">Open Cart</a></span>`});
                        }
                    });
            });

            $('.card__added').on('click', function (e) {
                e.preventDefault();
                redirectPage($(this).attr('href'));
            });

            // todo: server response always return OK, no exceptions handling
            $('.card__heart').on('click', function (e) {
                e.preventDefault();
                if (this.classList.contains('modal-trigger')) return; // signin modal

                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                if ($card.hasClass('card--liked')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $card.removeClass('card--liked');
                        });
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $card.addClass('card--liked');
                        });
                }
            });

            $('.card__action-sell').on('click', function (e) {
                e.preventDefault();
                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                redirectPage('/sellRequest.action?productId=' + productId + '#form');
            });

            const currency = document.querySelectorAll('.card__price-i, .product__price-i');
            if (currency) M.Dropdown.init(currency, { container: document.body });
        }
        cardsHandlers();

        // CARDS INFINITE LOADER
        const $cardsInfinite = $('.cards__list.infinite');
        if ($cardsInfinite.length) {
            let autoPagingBusy = false;

            function loadProducts() {
                if (!autoPagingBusy && $(document).height() - $(window).height() - $(window).scrollTop() < 1500) {
                    autoPagingBusy = true;

                    const regularItemsOffset = $('.card').not('.card--archived').length;
                    const archiveItemsOffset = $('.card--archived').length;
                    const auctionAdditionsCount = $('.card-auction').length;

                    $('#itemsOffset').val(regularItemsOffset + archiveItemsOffset + auctionAdditionsCount * 2);
                    $('#regularItemsOffset').val(regularItemsOffset);
                    $('#archiveItemsOffset').val(archiveItemsOffset);

                    $('.footer, .footer-signup').hide();

                    $.get('/ajax/products.action?' + $('#filterForm').serialize() + '&' + $('.header__filters').serialize(), function (data) {
                        if (!checkResponse(data, false)) return data;

                        const trim = $.trim(data);
                        if (trim === 'no results') {
                            $(window).off('scroll', loadProducts);
                            $('.footer, .footer-signup').show();
                        } else if (trim) {
                            $('.cards__list').append(data);
                            autoPagingBusy = false;
                            cardsHandlers();
                        }
                    });
                }
            }
            $(window).on('scroll', loadProducts);
        }

        // HEADER BAG DROPDOWN
        if (!$('.order').length) $('.header__bag').dropdown({ // no dropdown on order pages
            alignment: 'right',
            closeOnClick: false,
            onOpenStart: function () {
                this.isOpened = false;
                const dropdown = this;
                this.onOpenedAndLoaded = () => {
                    if (this.isOpened && !this.isSync) {
                        this.dropdownEl.classList.remove('sync');
                        this.recalculateDimensions();
                        $('.modal-bag__delete').on('click', function (e) {
                            e.preventDefault();
                            if (!this.dataset || !this.dataset.id) return;

                            $.get('/ajax/removeProduct.action?product=' + this.dataset.id)
                                .always(data => {
                                    getBag(true);
                                    const $card = $('.card--added[data-id="' + this.dataset.id + '"]');
                                    if ($card.length) {
                                        $card.removeClass('card--added');
                                    }
                                    const $product = $('.product--added[data-id="' + this.dataset.id + '"]');
                                    if ($product.length) {
                                        $product.removeClass('product--added');
                                    }
                                });
                        });
                        $('.modal-close').on('click', function () {
                            dropdown.close();
                        });
                    }
                }
                const getBag = (isDelete = false) => {
                    this.isSync = true;
                    const $form = $(this.dropdownEl).find('.modal-form');
                    this.dropdownEl.classList.add('sync');
                    $.get('/ajax/rest.action?actions=productBasket&actions=productBasketCount')
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            const $data = $('<div/>').html(data);
                            const bagCount = $data.find('#productBasketCount').text().trim();
                            const $bagItems = $data.find('#productBasket');
                            $form.html($bagItems);
                            bagCountToggle(bagCount);
                            if (isDelete && bagCount == 0) { // close after delete last item in bag
                                dropdown.close();
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            this.isSync = false;
                            this.onOpenedAndLoaded();
                        });
                }
                getBag();
            },
            onOpenEnd: function () {
                this.isOpened = true;
                this.onOpenedAndLoaded();
            }
        });


        // CREDIT CARDS
        function creditCards () {
            $creditCards = $('.credit-cards');
            if ($creditCards.length) {
                const $removedCards = $('select[name="removedCards"] option:selected');
                if ($removedCards.length) {
                    $removedCards.each((i, option) => {
                        $('.credit-cards__item[data-value="' + option.value + '"]').addClass('remove');
                    });
                }
                $('.credit-cards__item-remove').on('click', function (e) {
                    $option = $('select[name="removedCards"] option[value="' + $(this).data('value') + '"]');
                    if ($option.length) {
                        const val = !$option[0].selected;
                        $option[0].selected = val;
                        $creditCard = $(this).closest('.credit-cards__item');
                        if ($creditCard.length) {
                            $creditCard.toggleClass('remove');
                            $input = $creditCard.find('input');
                            if ($input.length) {
                                if (val) $input[0].checked = false;
                                $input[0].disabled = val;
                            }
                        }
                    }
                });

                $('.credit-cards__add-button, .credit-cards__cancel-button').on('click', function (e) {
                    $stripe = $(this).closest('.credit-cards__stripe');
                    if ($stripe.length) {
                        const show = $(this).hasClass('credit-cards__add-button');
                        $stripe.toggleClass('new', show);
                        $stripeElements = $stripe.find('.stripeElements');
                        if ($stripeElements.length) $stripeElements[0].style.display = show ? 'block' : 'none';
                    }
                });
            }
        }
        creditCards();

        // STRIPE
        function stripeElements () {
            try { if ($('.stripeElements').length && !$('#checkoutStep').length) { // checkoutStep in checkout.js
                const stripe = Stripe($('#stripePublicKey').val());
                const elements = stripe.elements();

                const elementStyles = {
                    base: {
                        color: '#2D2E41',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                    },
                    invalid: {
                        color: '#F93838',
                        ':focus': {
                            color: '#2D2E41',
                        },
                    },
                };

                const elementClasses = {
                    focus: 'focus',
                    empty: 'empty',
                    invalid: 'invalid',
                };

                cardNumber = elements.create('cardNumber', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardNumber.mount('#stipeCardNumber');

                const cardExpiry = elements.create('cardExpiry', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardExpiry.mount('#stipeCardExpiry');

                const cardCvc = elements.create('cardCvc', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardCvc.mount('#stipeCardCvc');

                $('.__PrivateStripeElement').attr('style', '');

                const stripeErrors = [];
                $stripeErrors = $('.stripeElements .input-field__helper');

                [cardNumber, cardExpiry, cardCvc].forEach(function (element, key) {
                    element.on('focus', function (event) {
                        $(element._component).addClass('focus');
                    });
                    element.on('blur', function (event) {
                        $(element._component).removeClass('focus');
                    });
                    element.on('change', function (event) {
                        if (event.error) {
                            stripeErrors[key] = event.error.message;
                        } else {
                            stripeErrors[key] = null;
                        }
                        const stripeErrorsExist = stripeErrors.filter(e => !!e);
                        if (stripeErrorsExist.length) {
                            $stripeErrors.addClass('error').html(stripeErrorsExist.join('<br>'));
                        } else {
                            $stripeErrors.removeClass('error').html('');
                        }
                    });
                });

                const cardData = {
                    address_zip: $('stipeCardZip').val()
                };

                $('.stripeElements').closest('form').submit(function (e) {
                    $stripeElements = $(this).find('.stripeElements');
                    if (this.classList.contains('sync') ||
                        !$stripeElements.length ||
                        $stripeElements[0].style.display == 'none') return;

                    e.preventDefault();
                    $('.loader-block').show();
                    $form = $(this);
                    $form.addClass('sync');
                    stripe.createToken(cardNumber, cardData).then(function (result) {
                        if (result.error) {
                            $('#stripeError').val(result.error.message);
                            $('.stripeElements .input-field__helper').text(result.error.message).addClass('error');
                            $('#stripeToken').val('');
                            $form.removeClass('sync');
                            $('.loader-block').hide();
                            $('body').removeClass('blocked');
                            scrollToError();
                        } else {
                            $('#stripeError').val('');
                            $('.stripeElements .input-field__helper').text('').removeClass('error');
                            $('#stripeToken').val(result.token.id);
                            $('#stripeTitle').val("***" + result.token.card.last4 + " " + result.token.card.exp_month + "/" + result.token.card.exp_year);
                            if ($stripeElements.length) $stripeElements[0].style.display = 'none';
                            $form.submit();
                        }
                    });
                });
            }} catch {}
        }
        stripeElements();

        // const out = document.createElement('div');
        // out.classList.add('out');
        // document.body.append(out);

        let isMobileFilter = false;
        let headerDebounce;
        function resize() {
            if (headerDebounce) clearTimeout(headerDebounce);
            headerDebounce = setTimeout(() => {
                headerFloat();
                mobileFilterToggle();
            }, 100);
        }
        resize();
        $(window).on('resize', resize);

        // HEADER
        const headerMainTop = $('.header__settings').height();
        const HEADER_THRESHOLD = 100; // px
        let previousScroll = 0;
        function headerFloat () {
            const $header = $('header');
            const $headerMain = $('.header__main');
            if ($header.length && $headerMain.length) {
                $header.css('maxWidth', $('main').width() + 'px');
                const bottom = $header.height();
                $(window).on('scroll', M.throttle((e) => {
                    const currentScroll = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
                    if (previousScroll - currentScroll > HEADER_THRESHOLD ||
                        currentScroll < headerMainTop
                    ) {
                        if (document.body.classList.contains('autoscroll')) return; // dont show header if autoscroll
                        previousScroll = currentScroll;
                        $header.removeClass('sticky-out');
                        if (currentScroll < headerMainTop * 2) {
                            $header.removeClass('sticky-in');
                        } else if (currentScroll > bottom) {
                            $header.addClass('sticky-in');
                        }
                    } else if (currentScroll - previousScroll > HEADER_THRESHOLD) {
                        previousScroll = currentScroll;
                        if (
                            currentScroll > bottom &&
                            $header.hasClass('sticky-in')
                        ) {
                            $header.removeClass('sticky-in');
                            $header.addClass('sticky-out');
                            $('.header__filters .filters__body').removeClass('active');
                        }
                        menuClose();
                    }
                    filtersFloat(currentScroll);
                }, 100));
            }
        }

        function filtersFloat (currentScroll) {
            if (isMobileFilter) return;

            $filters = $('#filterForm .filters');
            $filtersPlaceholder = $('.filters-placeholder');
            if ($filters.length) {
                const bottom = $filters[0].offsetTop + $filters[0].offsetHeight;
                if (currentScroll > bottom + 40) {
                    if ($filtersPlaceholder.length) {
                        $filtersPlaceholder.show();
                    } else {
                        $('<div class="filters-placeholder" style="height: ' + $('.filters')[0].offsetHeight + 'px" />').insertAfter($filters);
                    }
                    $('.header__filters').append($filters);

                    $inputs = $('.filters .filters__body');
                    if ($inputs.length) {
                        $('.header__filters').append($inputs);
                        if (!$('#filters-in-header').length) {
                            $('<form id="filters-in-header" />').insertAfter($('#filters-search-input'));
                            $('#filters-in-header').append($('#filters-search-input'))
                                .submit(function () {
                                    filter();
                                });
                            $('#filters-search-input').on('change', function (e) {
                                $('main input[name="keyword"]').val(e.target.value);
                            });
                        }
                    }
                }
            } else {
                $filters = $('.header__filters .filters');
                if ($filters.length && $filtersPlaceholder.length) {
                    const bottom = $filtersPlaceholder[0].offsetTop + $filtersPlaceholder[0].offsetHeight;
                    if (currentScroll < bottom - 40) {
                        $filters.insertAfter($filtersPlaceholder);
                        $filtersPlaceholder.hide();

                        $inputs = $('.header__filters .filters__body');
                        if ($inputs.length) {
                            $inputs.removeClass('active');
                            $filters.append($inputs);
                        }
                    }
                }
            }
        }

        $('.filters__open-button-header-button').on('click', () => $('.header__filters .filters__body').toggleClass('active'));

        function mobileFilterToggle () {
            isMobileFilter = false;
            const button = document.querySelector('.filters__open-button');
            if (!button) return;

            if (getComputedStyle(button).display !== 'none') { // mobile button shown
                isMobileFilter = true;
                $('.sidenav__filter-inputs').append($('.filters__body .filters__inputs'));
            } else {
                $('.filters__body').append($('.sidenav__filter-inputs .filters__inputs'));
                const sidenav = M.Sidenav.getInstance($('.sidenav-filter'));
                if (sidenav) sidenav.close();
            }
        }

        // HEADER ACCOUNT DROPDOWN
        const account = document.querySelectorAll('.header__account');
        if (account) M.Dropdown.init(account, { alignment: 'right' });

        // MENU
        const MENU_THRESHOLD_OPEN = 100; // ms
        const MENU_THRESHOLD_CHANGE = 300; // ms
        const $menu = $('.header__menu');
        const $menuItems = $('.header__menu-link');
        let menuOpenTimer;
        function clearTimer () {
            if (menuOpenTimer) clearTimeout(menuOpenTimer);
            menuOpenTimer = null;
        }
        function menuClickOutside (e) {
            const $inside = $(e.target).closest('.header__menu');
            if (!$inside.length) menuClose();
        }
        function menuOpen (e) {
            $menu.addClass('active');
            $menuItems.removeClass('active');
            const $target = $(e.target).closest('.header__menu-link');
            $target.addClass('active');
            $('body').on('click', menuClickOutside);
        }
        function menuClose () {
            clearTimer();
            menuOpenTimer = setTimeout(() => {
                $menu.removeClass('active');
                $menuItems.removeClass('active');
                $('body').off('click', menuClickOutside);
            }, MENU_THRESHOLD_OPEN);
        }
        if ($menu.length && $menuItems.length) {
            function click (e) {
                clearTimer();
                if (e.target.classList.contains('active')) {
                    menuClose();
                } else {
                    menuOpen(e);
                }
            }
            function move (e) {
                clearTimer();
                menuOpenTimer = setTimeout(() => menuOpen(e), menuOpenTimer ? MENU_THRESHOLD_CHANGE : MENU_THRESHOLD_OPEN);
            }
            $menuItems.on('click', click);
            $('.header__menu-link-handle').on('mousemove', move);
            $menu.on('mouseleave', menuClose);
            $('.header__menu-level1').on('mousemove', clearTimer);
        }

        // SIDENAV
        $('.sidenav__menu-back').on('click', function () {
            $('.sidenav__links').focus();
        });

        if (!$('.order').length) { // own errors in checkout
            // ERRORS
            function scrollToError(container = $('body')) {
                const $error = container.find('.error');
                // if ($error.length) $error[0].scrollIntoView({behavior: 'smooth', block: 'center'});
                if ($error.length) {
                    $('html, body').animate({
                        scrollTop: $error.offset().top - $(window).height() / 2
                    }, 200);
                }
            }
            setTimeout(scrollToError, 100); // wait display
        }

        // WHATS NEW
        function getHomeWhatsNews () {
            const $homeNews = $('#whatsnew-auctions');
            if (!$homeNews.length) return;

            $.get('/ajax/rest.action?actions=auctionedNewAdditions')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    let auctions = $data.find('#auctionedNewAdditions').html();
                    if (auctions) auctions = auctions.trim();
                    if (!auctions) {
                        $('.whatsnew__tabs').hide();
                        $homeNews.hide().removeClass('active');
                        $('#whatsnew-buy').show().addClass('active');
                    }
                    $('#whatsnew-auctions .whatsnew__cards-scroll').html(auctions);
                    cardsHandlers();
                });

            $.get('/ajax/rest.action?actions=buyNowNewAdditions')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    $('#whatsnew-buy .whatsnew__cards-scroll').html($data.find('#buyNowNewAdditions').html());
                    cardsHandlers();
                });
        }

        const whatsnewArrowLeft = document.querySelector('.whatsnew__cards-arrow--left');
        const whatsnewArrowRight = document.querySelector('.whatsnew__cards-arrow--right');
        if (whatsnewArrowLeft && whatsnewArrowRight) {
            let whatsnewScrolling;
            let whatsnewScrollingTimer;
            function onScroll () { // debounce while scrolling
                if (whatsnewScrollingTimer) clearTimeout(whatsnewScrollingTimer);
                whatsnewScrollingTimer = setTimeout(() => {
                    whatsnewScrolling.removeEventListener('scroll', onScroll);
                    whatsnewScrolling = null;
                }, 100);
            }
            function move (forward = true) {
                if (whatsnewScrolling) return;
                const cards = document.querySelector('.whatsnew__cards.active .whatsnew__cards-scroll');
                if (cards) {
                    if (!forward && cards.scrollLeft <= 0) return;
                    if (forward && cards.scrollLeft + cards.clientWidth >= cards.scrollWidth) return;
                    const card1 = cards.querySelector('.card');
                    const card2 = cards.querySelector('.card + .card');
                    if (card1 && card2) {
                        const card = card2.getBoundingClientRect().left - card1.getBoundingClientRect().left; // width from the first card left side to the second card left side
                        const cardsWidth = cards.clientWidth;
                        const cardsCount = Math.floor((cardsWidth + 16) / card);
                        const sign = forward ? 1 : -1;
                        cards.scrollLeft += sign * cardsCount * card;
                        whatsnewScrolling = cards;
                        cards.addEventListener('scroll', onScroll); // wait scroll end
                    }
                }
            }
            function left () {
                move(false);
            }
            whatsnewArrowLeft.addEventListener('click', left);
            whatsnewArrowRight.addEventListener('click', move);
        }

        // HOME TOP SELLING
        function getHomeTopselling () {
            const $homeTopselling = $('#home-topselling');
            if (!$homeTopselling.length) return;

            $.get('/ajax/rest.action?actions=recordSelling')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    let html = $data.find('#recordSelling').html();
                    if (html) html = html.trim();
                    $homeTopselling .html(html);
                });
        }

        // CURRENCY DROPDOWN
        const currency = document.querySelectorAll('.card__price-i, .product__price-i');
        if (currency) M.Dropdown.init(currency, { container: document.body });

        // MARGIN DROPDOWN
        const margin = document.querySelectorAll('.margin-dropdown');
        if (margin) M.Dropdown.init(margin, { container: document.body });

        // SET ALERT DROPDOWN
        const setalert = document.querySelectorAll('.setalert-dropdown');
        if (setalert) M.Dropdown.init(setalert, { container: document.body });

        // CART

        if ($('.bag__item').length) {
            $('.bag-item-dec-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartDec.action?product=' + id);
            });

            $('.bag-item-inc-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartInc.action?product=' + id);
            });

            $('.bag-item-remove-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartRemove.action?product=' + id);
            });
        }

        // SELL
        if ($('.sell-from').length) {
            const $valuationFormNext = $('.sell__valuation-form-next-button');
            if ($valuationFormNext.length) {
                function valuationFormNextClick () {
                    $('.sell__valuation-form-thank').hide();
                    $('.sell__valuation-form-container').show();
                }
                $valuationFormNext.on('click', valuationFormNextClick);
            }

            $droppable = $('.droppable');
            if ($droppable.length) {
                $files = $('#files');

                function renderPreview(file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        the_url = e.target.result;
                        $preview = $('<div class="files-preview__item" style="background-image:url(' + the_url + ')" title="' + file.name + '"/>');
                        $('.files-preview').append($preview);
                    }
                    reader.readAsDataURL(file);
                }

                function renderPreviews(files) {
                    $('.files-preview').html('');
                    if (files && files.length) {
                        const filesArray = Array.prototype.slice.call(files);
                        filesArray.forEach(file => {
                            renderPreview(file);
                        });
                    }
                }

                $droppable.on('dragover dragenter', function(e) {
                    e.preventDefault();
                    this.classList.add('drop');
                });

                $droppable.on('dragleave dragend drop', function(e) {
                    this.classList.remove('drop');
                });

                $droppable.on('drop', function(e) {
                    e.preventDefault();
                    const dt = (e.originalEvent.target.files && e.originalEvent.target.files.length > 0) ||
                        (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files);
                    $files[0].files = dt;
                    setTimeout(() => renderPreviews(dt));
                });

                $files.on('change', function() {
                    renderPreviews(this.files);
                });
            }

            function initializeAutocomplete(moviesOptions) {
                $('#moviesAutocomplete').autocomplete({
                    data: moviesOptions,
                    addCustom: ' ',
                    onAutocomplete: function (val) {
                        if (val.substr(0, 9) === 'addcustom') {
                            $('input[name="movieName"]').val(val.substr(9));
                            $('input[name="movieId"]').val(0);
                            $('#moviesAutocomplete').val(val.substr(9));
                        } else {
                            $('input[name="movieName"]').val('');
                            $('input[name="movieId"]').val(val);
                        }
                    },
                    sortFunction: compareString
                });

                const movieName = $('#movieName').val() || '';
                if (movieName) {
                    $('#moviesAutocomplete').val(movieName);
                }
            }

            const movieId = $('#movieId').val() || 0;
            const moviesOptions = {};

            $('#moviesAutocomplete').on('focus keydown', function (e) {
                setTimeout(() => {
                    const autocomplete = M.Autocomplete.getInstance(this);
                    if (!e || !e.target || !e.target.value || e.target.value.length < 2) {
                        if (autocomplete) autocomplete.destroy();
                    } else if (!autocomplete) {
                        initializeAutocomplete(moviesOptions);
                    }
                });
            });
            if (movieId && Number(movieId)) initializeAutocomplete(moviesOptions);

            $.getJSON('/ajax/movies.action', function (json) {
                if (json && json.movies) {
                    $(json.movies).each(function (index, movie) {
                        if (movieId == movie.id) {
                            $('#moviesAutocomplete').val(movie.name);
                        }

                        moviesOptions[movie.name] = movie.id;
                    });
                }
            });

            $('#sellRequestSubmit').submit(function (e) {
                $('.loader-block').show();
            });
        }

        // GUIDE STEPS

        const $sellStepButtons = $('.sell__step-button');
        const $sellSteps = $('.sell__step');
        if ($sellStepButtons.length && $sellSteps.length) {
            function sellStepButtonClick () {
                if (this.dataset && this.dataset.step) {
                    const step = this.dataset.step;
                    $sellSteps.hide();
                    const $stepActive = $('#sell__step-' + step);
                    if ($stepActive.length) {
                        $stepActive.show();
                        if (this.classList.contains('sell__step-button--next')) { // bottom buttons -> scroll up to the step top
                            $('body').addClass('autoscroll');
                            $stepActive[0].scrollIntoView ({behavior: 'smooth', block: 'nearest'});
                            setTimeout(() => {
                                $('body').removeClass('autoscroll');
                            }, 500);
                        }
                    }
                    $sellStepButtons.each((index, button) => {
                        if (button.dataset && button.dataset.step && button.dataset.step <= step) {
                            $(button).addClass('filled');
                        } else {
                            $(button).removeClass('filled');
                        }
                    });
                }
            }
            $sellStepButtons.on('click', sellStepButtonClick);

            const hash = window.location.hash;
            if (hash && hash.includes('#guide-1') &&
                $('#dropdown-account').length) { // signedIn
                $sellStepButtons.eq(1).trigger('click');
            }
        }

        // RELATED
        const $relatedMoviesScroll = $('.related-movies__scroll');
        if ($relatedMoviesScroll.length) {
            const scrollWidth = $relatedMoviesScroll.outerWidth();
            const listWidth = $relatedMoviesScroll[0].scrollWidth;
            if (scrollWidth < listWidth) {
                const isTouch = is_touch_device();
                $relatedMoviesScroll.addClass('arrow-right');
                if (!isTouch) $relatedMoviesScroll.addClass('arrow-left');
                const cardWidth = listWidth / $('.related-movies__item').length;
                const moveWidth = Math.floor(scrollWidth / cardWidth - 1) * cardWidth;
                const SCROLL_THRESHOLD = 50;
                let curScroll = 0;
                let relatedScrolling;
                let relatedScrollingTimer;
                $relatedMoviesScroll.prepend($('.related-movies__item').clone()); // duplicate for infinite
                $relatedMoviesScroll.prepend($('.related-movies__item').clone()); // duplicate for infinite

                function scrollCycle (sign = 1) {
                    let scroll = $relatedMoviesScroll[0].scrollLeft + sign * listWidth;
                    $relatedMoviesScroll[0].style.scrollBehavior = 'unset';
                    $relatedMoviesScroll[0].scrollLeft = scroll;
                    requestAnimationFrame(()=>$relatedMoviesScroll[0].style.scrollBehavior = 'smooth');
                    return scroll;
                }

                setTimeout(()=>{
                    $relatedMoviesScroll.on('scroll', function () {
                        if (relatedScrollingTimer) clearTimeout(relatedScrollingTimer);
                        relatedScrollingTimer = setTimeout(() => { // debounce while scrolling
                            relatedScrolling = null;
                            if (isTouch) return;

                            let scroll = $(this).scrollLeft();
                            if (scroll - curScroll > SCROLL_THRESHOLD) { // right
                                if (scroll > listWidth + scrollWidth) scroll = scrollCycle(-1);
                                curScroll = scroll;
                            } else if (curScroll - scroll > SCROLL_THRESHOLD) { // left
                                if (scroll < listWidth - scrollWidth) scroll = scrollCycle(1);
                                curScroll = scroll;
                            }
                        }, 200);
                    });
                    if (!isTouch) curScroll = scrollCycle(1);
                }, 1000);

                function move (sign = 1) {
                    if (relatedScrolling) return;
                    relatedScrolling = true;
                    $relatedMoviesScroll[0].scrollLeft += sign * moveWidth;
                }

                $('.related-movies__arrow--left').on('click', () => move(-1));
                $('.related-movies__arrow--right').on('click', () => move(1));
            }
        }

        // PRODUCTS
        if ($('.filters__inputs').length) {
            let params = new URLSearchParams(window.location.search);
            let scroll = parseInt(params.get('scroll'));
            if (scroll) $('html').scrollTop(scroll);

            function clearFilters() {
                $('.input-field__clean').click();
                $('input[type="search"]').val('');
            }

            let filterTimeout;

            function filterNow() {
                let $filters = $('#filterForm .filters');
                if (!$filters.length) $filters = $('.filters-placeholder');
                let scroll = $filters.offset().top;
                if ($(window).scrollTop() < scroll) scroll = $(window).scrollTop();
                if (scroll) $('#filterForm').find('#scroll').val(Math.round(scroll));
                
                filtersFloat(0);
                $('#itemsOffset').val('');
                $('#filterForm').submit();
            }

            function filter() {
                if (filterTimeout) clearTimeout(filterTimeout);

                filterTimeout = setTimeout(function () {
                    if (!isMobileFilter) {
                        filterNow();
                    }
                }, 100);
            }

            function initializeAutocomplete(moviesOptions) {
                $('#moviesAutocomplete').autocomplete({
                    data: moviesOptions,
                    onAutocomplete: function (movieId) {
                        $('#movieId').val(movieId);
                        filter();
                    },
                    sortFunction: compareString
                });
            }

            const movieId = $('#movieId').val() || 0;
            const moviesOptions = {};

            $('#moviesAutocomplete').on('focus keydown', function (e) {
                setTimeout(() => {
                    const autocomplete = M.Autocomplete.getInstance(this);
                    if (!e || !e.target || !e.target.value || e.target.value.length < 2) {
                        if (autocomplete) autocomplete.destroy();
                    } else if (!autocomplete) {
                        initializeAutocomplete(moviesOptions);
                    }
                });
            });
            if (movieId && Number(movieId)) initializeAutocomplete(moviesOptions);

            $.getJSON('/ajax/movies.action', function (json) {
                if (json && json.movies) {
                    $(json.movies).each(function (key, movie) {
                        if (movieId == movie.id) {
                            $('#moviesAutocomplete').val(movie.name);
                        }
                        moviesOptions[movie.name] = movie.id;
                    });
                }
            });

            function initializeAuctionsAutocomplete(data) {
                $('#auctionIdAutocomplete').autocomplete({
                    data,
                    onAutocomplete: function (auctionId) {
                        $('#auctionId').val(auctionId);
                        filter();
                    },
                });
            }

            const auctionId = $('#auctionId').val() || 0;
            const auctionsOptions = {};

            $('#auctionIdSelect option').each(function (key, option) {
                $auction = $(option);
                let name = $auction.html();
                let id = $auction.val();
                if (auctionId == id) {
                    $('#auctionIdAutocomplete').val(name);
                }
                auctionsOptions[name] = +id;
            });
            initializeAuctionsAutocomplete(auctionsOptions);

            function countEnabledFilters() {
                setTimeout(function () { // wait inputs
                    const $counter = $('.filters__enabled');
                    if ($counter.length) {
                        const $enabled = $('.filters__inputs .input-field--filled');
                        if ($enabled.length) {
                            $counter.text($enabled.length).show();
                        } else {
                            $counter.text(0).hide();
                        }
                    }
                }, 100);
            }
            countEnabledFilters();

            $('#categoryId').on('change', function () {
                filter();
            });

            $('#moviesList').on('change', function () {
                filter();
            });

            $('#office').on('change', function () {
                filter();
            });

            $('#sortTypeList').on('change', function () {
                filter();
            });

            // language=JQuery-CSS
            $('#moviesAutocompleteDiv .input-field__clean').on('click', function () {
                $('#moviesAutocomplete').val('');
                $('#movieId').val(null);
                filter();
            });

            $('#clearFilters').on('click', function () {
                clearFilters();
            });

            $('#clearAndSearch').on('click', function () {
                clearFilters();
                $('#filterForm').submit();
            });

            $('#auctionIdAutocompleteDiv .input-field__clean').on('click', function () {
                $('#auctionIdAutocomplete').val('');
                $('#auctionId').val(null);
                filter();
            });

            const $autocomplete = $('.sidenav__filter-inputs input.autocomplete');
            $autocomplete.on('focus', function () {
                setTimeout(() => { // wait virtual keyboard
                    if (document.activeElement === this) {
                        this.scrollIntoView();
                    }
                }, 300);
            });

            $tabs = $('.filters__tab');
            if ($tabs.length) {
                $tabs.on('click', function (e) {
                    e.preventDefault();
                    if ($(this).attr('data-archive')) {
                        $('#filterForm').find('#archive').val($(this).data('archive'));
                    } else {
                        if ($(this).attr('data-auction')) {
                            $('#filterForm').find('#auction').val($(this).data('auction'));
                        } else if ($(this).attr('data-buynow')) {
                            $('#filterForm').find('#buyNow').val($(this).data('buynow'));
                        }
                    }
                    filterNow();
                });
            }

            $('#sidenav-filters-search-input').on('change', function (e) {
                $('main input[name="keyword"]').val(e.target.value);
            });

            if ($('.filters__found-plus').length) {
                setTimeout(() => { // wait header ajax
                    const $formClone = $('#filterForm').clone();
                    const $formCloneAuction = $formClone.find('#auction');
                    const $formCloneBuyNow = $formClone.find('#buyNow');
                    const $formCloneArchive = $formClone.find('#archive');
                    if ($formCloneAuction.val() < 1 || $formCloneBuyNow.val() < 1 || $formCloneArchive.val() < 1) {
                        $formCloneAuction.val(1);
                        $formCloneBuyNow.val(1);
                        $formCloneArchive.val(1);
                        const more = [];
                        $('.filters__tab:not(.active)').each(function() {
                            more.push($(this).text());
                        });
                        if (more.length) {
                            $('.filters__found-in').text('in ' + more.join(' & '));
                        }
                    } else {
                        return; // all showed
                    }

                    $.get('/ajax/count.action?' + $formClone.serialize(), function (data) {
                        if (!checkResponse(data, false)) return data;

                        data = Number(data.trim());
                        if (data > 0) data -= $('#productsCount').val();
                        if (data > 0) {
                            const dataCommas = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            $('.filters__found-plus').text('+' + dataCommas);
                            $('.filters__found-all-inner').show();

                            $('.filters__found-all a').on('click', function () {
                                redirectPage($formClone[0].action + '?' + $formClone.serialize());
                            });
                        }
                    });
                }, 100);
            }

            $('#filterForm').submit(function () {
                $('.loader-block').show();
            });
        }

        // PRODUCT
        if ($('.product').length) {
            const $productItems = $('.product__slider .carousel-item');
            const $productThumbnails = $('.product__thumbnail');
            if ($productItems.length && $productThumbnails.length) {
                let productSlider;
                function productCarousel () {
                    if (productSlider && productSlider[0] && productSlider[0].M_Carousel) productSlider[0].M_Carousel.destroy();
                    productSlider = $('.product__slider').carousel({
                        onCycleTo: function(item, dragged) {
                            const index = $productItems.index(item);
                            const $thumbnail = $productThumbnails.eq(index);
                            $productThumbnails.removeClass('active');
                            $thumbnail.addClass('active');
                        },
                        onDestroy: function() {
                            $productThumbnails.off('mousemove', onClickProductThumbnail);
                        },
                    });
                    function onClickProductThumbnail (e) {
                        const index = $productThumbnails.index(e.target);
                        productSlider[0].M_Carousel.set(index);
                    }
                    $productThumbnails.on('mousemove', onClickProductThumbnail);
                }
                productCarousel();
                $(window).on('resize', productCarousel);
            }
            let modalSlider;
            function modalCarousel () {
                if (modalSlider && modalSlider[0] && modalSlider[0].M_Carousel) modalSlider[0].M_Carousel.destroy();
                modalSlider = $('#modal-product-gallery').find('.modal-gallery__carousel').carousel({
                    fullWidth: true,
                    indicators: true,
                    onCycleTo: function(item, dragged) {}
                });
            }
            $('#modal-product-gallery').modal({
                opacity: .75,
                onCloseStart: (el) => {
                    if (modalSlider && modalSlider[0] && modalSlider[0].M_Carousel) modalSlider[0].M_Carousel.destroy();
                    $(window).off('resize', modalCarousel);
                },
                onOpenEnd: (el, trigger) => {
                    modalCarousel();
                    $(window).on('resize', modalCarousel);
                    const $productGallery = $(trigger).closest('.product__gallery');
                    if ($productGallery.length) {
                        const timer = document.body.classList.contains('touch') ? 300 : 0; // on touch wait for active
                        setTimeout(() => {
                            const $active = $productGallery.find('.carousel-item.active');
                            const index = $productItems.index($active);
                            modalSlider[0].M_Carousel.set(index);
                        }, timer);
                    }
                }
            });

            $('.product__add').on('click', function (e) {
                e.preventDefault();
                $.get(this.href)
                    .done(data => {
                        reloadPage();
                    });
            });

            $('#modal-payment-plan').modal({ // load form on modal open
                onOpenStart: function (el) {
                    el.classList.add('sync');
                    const $form = $(el).find('.modal-payment-plan-form');
                    $.get($form.attr('action'))
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            $($('.modal-payment-plan__months-buttons input:checked').data('tab')).show();

                            $('.modal-payment-plan__months-buttons input').on('change', function () {
                                $('.modal-payment-plan__tab').hide();
                                $($(this).data('tab')).show();
                            });

                            $('.modal-payment-plan-form').submit(function (e) {
                                e.preventDefault();
                                this.classList.add('sync');
                                $.get(
                                    '/ajax/addProduct.action?' + $(this).serialize(),
                                )
                                    .done(data => {
                                        reloadPage(); // change added button, update bag count
                                    })
                                    .fail(data => {
                                        if (data && data.statusText) this.innerHTML = data.statusText;
                                    })
                                    .always(data => {
                                        this.classList.remove('sync');
                                    });
                            });
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                }
            });

            $('.product__heart').on('click', function (e) {
                e.preventDefault();
                if (this.classList.contains('modal-trigger')) return; // signin modal

                const $heart = $(this);
                const $product = $(this).closest('.product');
                if (!$product.length) return;

                const productId = $product[0].getAttribute('data-id');
                if ($heart.hasClass('active')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.removeClass('active');
                        });
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.addClass('active');
                        });
                }
            });

            // GET EMAIL NOTICES WHEN WE HAVE NEW ITEMS FROM THIS TITLE
            $('#product-movie-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        $('.loader-block').hide();
                        M.Toast.dismissAll();
                        const toast = `<span>Movie added&nbsp; <a href="/emailNotifications.action" class="h6">Open Email Notifications</a></span>`;
                        setTimeout(() => M.toast({html: toast}), 100);
                    })
                    .fail(data => {
                        redirectPage($('#product-movie-button')[0].href);
                    });
            });
            $('#product-movie-button').on('click', function (e) {
                e.preventDefault();
                $('#product-movie-form').submit();
            });
        }

        //MODAL ASK PRIVATE SALE
        if ($('#modal-private-sales').length) {
            $('#modal-private-sales').modal({ // load form on modal open
                onOpenStart: function (el) {
                    el.classList.add('sync');
                    const $form = $('#modal-private-sales-form');
                    $.get($form.attr('action'))
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            grecaptchaRender('g-recaptcha-private-sales');
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                },
            });

            $('#modal-private-sales-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    '/ajax/requestSubmit.action',
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-private-sales');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });
        }

        // MODAL SHIPPING QUOTE
        if ($('#modal-shipping-quote').length) {
            $('#modal-shipping-quote').modal({ // load form on modal open
                onOpenStart: function (el, trigger) {
                    el.classList.add('sync');
                    const $form = $(el).find('.modal-shipping-quote-form');
                    const contentURL = $(trigger).data('form-content-url');
                    $.get(contentURL)
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            $('#modal-shipping-quote-country').formSelect({dropdownOptions: {container: document.body}});
                            grecaptchaRender('g-recaptcha-quote');
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                }
            });

            $('.modal-shipping-quote-form').submit(function (e) {
                e.preventDefault();
                this.classList.add('sync');
                let data = $(this).serialize();
                if (e.originalEvent.submitter && e.originalEvent.submitter.name === 'question') {
                    data += '&question=1';
                }
                $.post(
                    this.action,
                    data,
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();
                        $('select').formSelect({dropdownOptions: {container: document.body}});
                        grecaptchaRender('g-recaptcha-quote');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(data => {
                        this.classList.remove('sync');
                    });
            });
        }

        // PROFILE
        if ($('#userProfileSubmit').length) {
            $('#userProfileSubmit').submit(function (e) {
                $('.loader-block').show();
            });

            //billingAsShipping
            const $shippingAddressCheckbox = $('#userProfileSubmit input[name="billingAsShipping"]');
            if ($shippingAddressCheckbox.length) {
                function accountBillingAddress() {
                    const $form = $('.account-billing-address-form');
                    $shippingAddressCheckbox[0].checked ? $form.hide() : $form.show();
                }

                $shippingAddressCheckbox.on('change', accountBillingAddress);
                accountBillingAddress();
            }

            // BILLING ADDRESS STATE
            const $billingCountry = $('select[name="billingAddress.countryId"]');
            if ($billingCountry.length) {
                const $billingStateInput = $('.billing-address-state__input input');
                const $billingStateInputDiv = $('.billing-address-state__input');
                const $billingStateSelect = $('.billing-address-state__select select');
                const $billingStateSelectDiv = $('.billing-address-state__select');

                function isBillingStateSelect() {
                    if ($billingCountry.val() == 2) { // USA
                        $billingStateSelectDiv.show();
                        $billingStateSelect.attr('name', 'billingAddress.state');
                        $billingStateInputDiv.hide();
                        $billingStateInput.attr('name', 'billingAddress.state.tmp');
                    } else {
                        $billingStateSelectDiv.hide();
                        $billingStateSelect.attr('name', 'billingAddress.state.tmp');
                        $billingStateInputDiv.show();
                        $billingStateInput.attr('name', 'billingAddress.state');
                    }
                }
                $billingCountry.on('change', isBillingStateSelect);
                isBillingStateSelect();
            }

            // SHIPPING ADDRESS STATE
            const $shippingCountry = $('select[name="shippingAddress.countryId"]');
            if ($shippingCountry.length) {
                const $shippingStateInput = $('.shipping-address-state__input input');
                const $shippingStateInputDiv = $('.shipping-address-state__input');
                const $shippingStateSelect = $('.shipping-address-state__select select');
                const $shippingStateSelectDiv = $('.shipping-address-state__select');

                function isShippingStateSelect() {
                    if ($shippingCountry.val() == 2) { // USA
                        $shippingStateSelectDiv.show();
                        $shippingStateSelect.attr('name', 'shippingAddress.state');
                        $shippingStateInputDiv.hide();
                        $shippingStateInput.attr('name', 'shippingAddress.state.tmp');
                    } else {
                        $shippingStateSelectDiv.hide();
                        $shippingStateSelect.attr('name', 'shippingAddress.state.tmp');
                        $shippingStateInputDiv.show();
                        $shippingStateInput.attr('name', 'shippingAddress.state');
                    }
                }
                $shippingCountry.on('change', isShippingStateSelect);
                isShippingStateSelect();
            }

            // REGISTERED BUSINESS
            const $businessCheckbox = $('#userProfileSubmit_business');
            if ($businessCheckbox.length) {
                function isRegisteredBusiness() {
                    const $form = $('.business-form');
                    if ($businessCheckbox[0].checked) {
                        $form.show();
                    } else {
                        $form.hide();
                        $('#userProfileSubmit_businessNumber').val('');
                    }
                }

                $businessCheckbox.on('change', isRegisteredBusiness);
                isRegisteredBusiness();
            }
        }

        // FAVORITES
        if ($('.account__favorites').length) {
            function initializeAutocomplete(moviesOptions) {
                $('#moviesAutocomplete').autocomplete({
                    data: moviesOptions,
                    addCustom: 'Add',
                    onAutocomplete: (val) => {
                        if (val.substr(0, 9) == 'addcustom') {
                            $('input[name="movieName"]').val(val.substr(9));
                        } else {
                            $('input[name="movieId"]').val(val);
                        }
                        $('#form-movie').submit();
                    },
                    sortFunction: compareString
                });
            }
            const moviesOptions = {};
            $('#moviesAutocomplete').on('focus keydown', function (e) {
                setTimeout(() => {
                    const autocomplete = M.Autocomplete.getInstance(this);
                    if (!e || !e.target || !e.target.value || e.target.value.length < 2) {
                        if (autocomplete) autocomplete.destroy();
                    } else if (!autocomplete) {
                        initializeAutocomplete(moviesOptions);
                    }
                });
            });
            $.getJSON('/ajax/movies.action', function (json) {
                if (json && json.movies) {
                    $(json.movies).each(function (index, movie) {
                        moviesOptions[movie.name] = movie.id;
                    });
                }
            });

            $('#genreId').on('change', function () {
                $('#form-genre').submit();
            });

            $('#form-movie').submit(function (e) {
                const $movieId = $('input[name="movieId"]');
                const $movieName = $('input[name="movieName"]');
                if ((!$movieId.val() || $movieId.val() == 0) && !$movieName.val()) { // submit by enter
                    const val = $('#moviesAutocomplete').val();
                    if (val) {
                        $movieName.val(val);
                    } else {
                        e.preventDefault();
                        return;
                    }
                }
                $('.loader-block').show();
            });

            $('#form-genre').submit(function () {
                $('.loader-block').show();
            });

            $('[name="toggleCategory"]').on('change', function (e) {
                const movieLinkId = $(this).data().movieLinkId;
                const categoryId = $(this).data().categoryId;
                const toast = $(this).prop('checked') ? 'Category added' : 'Category removed';

                $.post('/ajax/accountFavoritesToggleMovieCategory.action', {
                    movieLinkId: movieLinkId,
                    categoryId: categoryId
                }, function (data) {
                    M.Toast.dismissAll();
                    setTimeout(() => M.toast({html: toast}), 300);
                })
            });

            $('.account__favorites-item-delete a').on('click', function () {
                $('.loader-block').show();
            });
        }

        // ACCOUNT PURCHASED
        if ($('#purchasedFilterForm').length) {
            function filter() {
                $('#purchasedFilterForm').submit();
            }
            $('#type').on('change', filter);
            $('#categoryId').on('change', filter);
            $('#movieId').on('change', filter);
            $('#sortTypeList').on('change', filter);

            $('#purchasedFilterForm').submit(function () {
                $('.loader-block').show();
            });
        }

        // ACCOUNT EMAIL PREFERENCES
        if ($('#form-email-preferences').length) {
            $('#form-email-preferences input').on('change', function () {
                $('#form-email-preferences').submit();
            });

            $('#form-email-preferences').submit(function () {
                $('.loader-block').show();
            });
        }

        // BLOG
        $('.card-blog').on('click', function(event) {
            const fakeUrl = $(event.target).data('href');
            if (fakeUrl) {
                event.preventDefault();
                redirectPage(fakeUrl);
            }
        });
        if ($('.wp.blog').length || $('.wp.archive').length || $('.wp.search').length) {
            $('.filters__select-category select').on('change', function(event) {
                redirectPage(event.target.value);
            });
        }

        // FAQ
        if ($('.wp .faq').length) {

            function scrollToElement(elem) {
                if (window.location.hash) {
                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $(elem).offset().top - 50
                        }, 2000);
                    }, 1000);
                    setTimeout(function () {
                        $('.faq__collapsible li.active .collapsible-header').click();
                        $(elem).parent().click();
                        $(elem).parent().parent().addClass('active');
                    }, 1300);
                }
            }

            if (!location.hash.includes('/')) {
                scrollToElement($(location.hash));
            }

            function changeCategory (category) {
                if (category == 0) {
                    $('.faq__item').show();
                } else {
                    $('.faq__item:not(.category-' + category + ')').hide();
                    $('.category-' + category).show();
                }
            }

            $('.filters__menu-category').on('click', function(event) {
                $('.filters__menu-category').removeClass('active');
                $(this).addClass('active');
                $('.faq__collapsible li.active .collapsible-header').click();
                $('.filters__select-category select').val($(this).data('category'));
                changeCategory($(this).data('category'));
            });

            $('.filters__select-category select').on('change', function(event) {
                changeCategory($(this).val());
            });

            try {
                function highlight() {
                    var searchValue = $('.input-field--faq-search input').val();

                    //escape all regex symbols
                    searchValue = searchValue.replace(/[\$\&\+\,\:\:\=\?\@\#\|\/\'\{\}\[\]\>\<\.\^\*\(\)\%\!\-]/g, '\\$&');
                    //search
                    searchValue = searchValue.replace(/[^a-z0-9_\S]/gi, '\\$&');

                    var customFilter = new RegExp(searchValue, 'gi');

                    var replacedString = "<span class='faq__highlight'>$&</span>";

                    $('.faq__content').find('.faq__highlight').contents().unwrap();
                    $('.faq__collapsible-header-text').each(function() {
                        if(searchValue.length > 1) {
                            const textContent = $(this).text();
                            const htmlContent = $(this).html();

                            var textPart =  '';
                            var tagPart = '';
                            const replaceableParts = [];
                            var isOpened = false;

                            htmlContent.split('').forEach((char) => {
                                if (isOpened) {
                                    tagPart += char;
                                    if (char === '>') {
                                        isOpened = false;
                                        replaceableParts.push(tagPart);
                                        tagPart = '';
                                    }
                                } else {
                                    if (char !== '<') {
                                        textPart += char;
                                    } else {
                                        isOpened = true;
                                        tagPart += char;
                                        if (textPart) {
                                            replaceableParts.push(textPart);
                                        }
                                        textPart = '' ;
                                    }
                                }
                            });
                            if(textPart) {
                                replaceableParts.push(textPart);
                            }
                            const processedParts = replaceableParts.map((part) => {
                                var htmlTags = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
                                if (part.match(htmlTags)) {
                                    return part;
                                } else {
                                    part = part.replace(customFilter, replacedString);
                                    return part;
                                }
                            });
                            const content = processedParts.join('');
                            $(this).html(content);
                        }
                    });
                    $('.faq__collapsible .collapsible-body').each(function() {
                        if(searchValue.length > 1) {
                            const textContent = $(this).text();
                            const htmlContent = $(this).html();

                            var textPart =  '';
                            var tagPart = '';
                            const replaceableParts = [];
                            var isOpened = false;

                            htmlContent.split('').forEach((char) => {
                                if (isOpened) {
                                    tagPart += char;
                                    if (char === '>') {
                                        isOpened = false;
                                        replaceableParts.push(tagPart);
                                        tagPart = '';
                                    }
                                } else {
                                    if (char !== '<') {
                                        textPart += char;
                                    } else {
                                        isOpened = true;
                                        tagPart += char;
                                        if (textPart) {
                                            replaceableParts.push(textPart);
                                        }
                                        textPart = '' ;
                                    }
                                }
                            });
                            if(textPart) {
                                replaceableParts.push(textPart);
                            }
                            const processedParts = replaceableParts.map((part) => {
                                var htmlTags = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
                                if (part.match(htmlTags)) {
                                    return part;
                                } else {
                                    part = part.replace(customFilter, replacedString);
                                    return part;
                                }
                            });
                            const content = processedParts.join('');
                            $(this).html(content);
                        }
                    });
                }

                function find(withCategory = false) {
                    const results = [];
                    const search = $('.input-field--faq-search input').val().toLowerCase();
                    const category = $('.filters__select-category select').val();
                    $('.faq__collapsible-header').each((idx, el) => {
                        const headerString = $(el).text();
                        const bodyString = $('.faq__collapsible-body').eq(idx).text();
                        const isMatch = bodyString.toLowerCase().includes(search) || headerString.toLowerCase().includes(search);

                        const $parentEl = $(el).closest('.faq__item');
                        const itemCatClass = $parentEl.attr('class').split(/\s+/).find(className => ~className.indexOf('category'));
                        if (withCategory || search == '') {
                            const isCategory = category == 0 || $parentEl.hasClass('category-' + category);
                            const isShow = isCategory && isMatch;
                            $parentEl.toggle(isShow);
                        }

                        if (isMatch && search) {
                            results.push({idx, headerString, itemCatClass});
                        }
                    });
                    if (search == '') {
                        highlight();
                        $('.faq__collapsible li.active .collapsible-header').click();
                    }
                    return results;
                }

                function onEnter(event) {
                    $('.filters__menu-categories').find(`button[data-category=0]`).click();
                    const results = find(true);
                    highlight();
                }

                $('.input-field--faq-search .input-field__button').on('click', function(event) {
                    $('.filters__menu-categories').find(`button[data-category=0]`).click();
                    const results = find(true);
                    highlight();
                });

                function Search(event) {
                    if (event.key === 'Enter') return onEnter(event);

                    var searchValue = $('.input-field--faq-search input').val();
                    $('.faq__search-suggester').removeClass('faq__search-suggester--init');

                    const results = find();
                    const search = event.target.value.toLowerCase();

                    $('.faq__search-suggester').text('');
                    results.forEach((suggest) => {
                        const $clone = $view.clone();
                        $clone.data(suggest);
                        $clone.find('.faq__search-suggester__item-text').text(suggest.headerString);
                        $('.faq__search-suggester').append($clone);
                    });

                    const isEmpty = results.length === 0 && search !== '';
                    $('.faq__search-suggester').toggleClass('faq__search-suggester--empty', isEmpty);
                }

                const $span = $('<span/>', {class: 'faq__search-suggester__item-text'});
                const $link = $('<a/>', {class: 'faq__search-suggester__item p-s'});
                const $view = $link.append($span);

                $('.faq__search-suggester').on('click', (event) => {
                    const target = event.target;
                    const linkData = $(target).closest('a').data();
                    highlight();
                    const suggesterCategory = linkData.itemCatClass.replace('category-', '');
                    $('.filters__select-category select').val(suggesterCategory);
                    $('.filters__select-category .select-dropdown').trigger('click');
                    $('.filters__menu-category[data-category="' + suggesterCategory + '"]').click();

                    setTimeout(function() {
                        $('.faq__collapsible li.active .collapsible-header').click();
                        $('.faq__collapsible li .faq__collapsible-header').get(linkData.idx).click();
                    }, 300);


                    setTimeout(function() {
                        $('.faq__collapsible li').get(linkData.idx).scrollIntoView({behavior: 'smooth'});
                    }, 600);

                });

                $('.faq__search-container input').on('keyup', Search);
                $('.faq__search-container input').on('click', Search);


                $('.faq__search-container input').on('focusout', function(event) {
                    setTimeout(function() {
                        $('.faq__search-suggester').addClass('faq__search-suggester--init');
                    }, 300);
                });
                    
                if (Location && location) {
                    function setCatByPath(cat) {
                        changeCategory(cat);
                        $('.filters__menu-categories').find('button[data-category=' + cat + ']').click();
                    }
                    
                    const $hash = location.hash;
                    if($hash.includes('#cat/')) {
                        const [_, cat] = $hash.split('#cat/');
                        setCatByPath(cat);
                        location.hash = '';
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        // FOOTER_SIGNUP
        if ($('.footer-signup__form').length) {
            function loadFooterSignupFormContent() {
                const $form = $('.footer-signup__form');

                $.get('/ajax/subscribe.action')
                    .done(data => {
                        if (!checkResponse(data, false)) return data;

                        $form.html(data);
                        M.updateTextFields();

                        grecaptchaRender('g-recaptcha-footer-signup');

                        $('.footer-signup__form input').on('focus', function () {
                            $('.footer-signup__recaptcha').show();
                        });
                    })
                    .fail(data => {
                        console.log('fail');
                    });
            }

            loadFooterSignupFormContent();

            $('.footer-signup__form').submit(function (e) {
                e.preventDefault();
                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();

                        grecaptchaRender('g-recaptcha-footer-signup');
                        $('.footer-signup__recaptcha').show();
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    });
            });
        }

        // SIGN IN FORMS FOR MODAL PAGE
        if ($('.modal-auction-register-form').length) {
            modalLoginForms();
        }

        if ($('.modal-signin-page').length || $('.modal-register-page').length || $('.modal-password-page').length) {
            $('#modal-auction-signin-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        if (data && data.trim() === 'success') {
                            redirectPage('/sso.action' + window.location.search);
                        } else {
                            this.innerHTML = data;
                            modalLoginForms();
                            $('.loader-block').hide();
                        }
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                        $('.loader-block').hide();
                    });
            });

            $('#modal-auction-register-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        modalLoginForms();
                        grecaptchaRender('g-recaptcha-register');
                        if ($('.modal-register__sso-trigger').length) { // success
                            $('.modal-register__sso-trigger').on('click', function (e) {
                                e.preventDefault();
                                redirectPage('/sso.action' + window.location.search);
                            });
                            trackEvent('SignUp');
                        }
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });

            $('#modal-auction-password-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        modalLoginForms();
                        grecaptchaRender('g-recaptcha-password');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });
        }

        function modalLoginForms () {
            if (!$('.modal-auction-register-form .modal-trigger').length) return; // already handled

            $('.modal-auction-register-form .modal-close').removeClass('modal-close');
            $('.modal-auction-register-form .modal-trigger').removeClass('modal-trigger').addClass('modal-trigger-auction-registration');

            $('.modal-trigger-auction-registration[href="#modal-register"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-register-form').show();
                grecaptchaRender('g-recaptcha-register');
                trackEvent('RegistrationForm');
            });
            $('.modal-trigger-auction-registration[href="#modal-signin"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-signin-form').show();
            });
            $('.modal-trigger-auction-registration[href="#modal-password"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-password-form').show();
                grecaptchaRender('g-recaptcha-password');
            });
            initFacebookLoginButton();
            M.updateTextFields();
            if ($('.modal-register-page').length) { // register page from sam
                trackEvent('RegistrationForm');
            }
        }

        // AUCTION REGISTRATION
        auctionRegistration();

        function auctionRegistration () {
            const $inner = $('.auction-registration .auction-registration__inner');
            if (!$inner.length) return;

            $('select').not('.disabled').formSelect();
            modalLoginForms();

            if ($inner.find('#modal-register-auction-form').length && !$inner.find('#modal-register-auction-form').data('submit')) {
                $inner.find('#modal-register-auction-form').data('submit', true); // added submit handler
                $inner.find('#modal-register-auction-form').submit(function (e) {
                    $('.loader-block').show();

                });

                // open second page
                function goBack (e) {
                    e.preventDefault();
                    redirectPage('/auctionRegistration.action?auctionId=' + $('#modal-register-auction-form_auctionId').val() +
                        '&d=' + $('#modal-register-auction-form_d').val() +
                        '&ru=' + encodeURIComponent($('#modal-register-auction-form_ru').val()) +
                        '&sc=' + $('#modal-register-auction-form_sc').val());
                };

                function setStep (step) {
                    $('#modal-register-auction-form_step').val(step);
                    $('.auction-registration__step').hide();
                    $('.auction-registration__step[data-page="' + step + '"]').show();
                };

                $('.auction-registration__page-trigger').on('click', function (e) {
                    setStep($(this).data('page'));
                    $('.auction-registration__info').scrollTop(0);

                    window.history.pushState(null, 'Back');
                    window.onpopstate = goBack;
                });

                $('.auction-registration__page-back').on('click', goBack);

                $('.auction-registration__step[data-page="shipping"] .auction-registration__page-submit').on('click', goBack);

                $('.auction-registration__step[data-page="terms"] .modal-register__submit').on('click', function (e) {
                    $('#modal-register-auction-form_terms')[0].checked = true;
                    $('#modal-register-auction-form_step').val('general');
                });

                //billingAsShipping
                const $shippingAddressCheckbox = $('#modal-register-auction-form_billingAsShipping');
                if ($shippingAddressCheckbox.length) {
                    function registerAuctionBillingAddress() {
                        const shippingAsBilling = $shippingAddressCheckbox[0].checked;
                        $('.form-section--shipping').toggle(!shippingAsBilling);
                    }
                    $shippingAddressCheckbox.on('change', registerAuctionBillingAddress);
                    registerAuctionBillingAddress();
                }

                // BILLING ADDRESS STATE
                const $billingCountry = $('#modal-register-auction-form select[name="billingAddress.countryId"]');
                if ($billingCountry.length) {
                    const $billingStateInput = $('.billing-address-state__input input');
                    const $billingStateInputDiv = $('.billing-address-state__input');
                    const $billingStateSelect = $('.billing-address-state__select select');
                    const $billingStateSelectDiv = $('.billing-address-state__select');

                    function isBillingStateSelect() {
                        if ($billingCountry.val() == 2) { // USA
                            $billingStateSelectDiv.show();
                            $billingStateSelect.attr('name', 'billingAddress.state');
                            $billingStateInputDiv.hide();
                            $billingStateInput.attr('name', 'billingAddress.state.tmp');
                        } else {
                            $billingStateSelectDiv.hide();
                            $billingStateSelect.attr('name', 'billingAddress.state.tmp');
                            $billingStateInputDiv.show();
                            $billingStateInput.attr('name', 'billingAddress.state');
                        }
                    }
                    $billingCountry.on('change', isBillingStateSelect);
                    isBillingStateSelect();
                }

                // SHIPPING ADDRESS STATE
                const $shippingCountry = $('#modal-register-auction-form select[name="shippingAddress.countryId"]');
                if ($shippingCountry.length) {
                    const $shippingStateInput = $('.shipping-address-state__input input');
                    const $shippingStateInputDiv = $('.shipping-address-state__input');
                    const $shippingStateSelect = $('.shipping-address-state__select select');
                    const $shippingStateSelectDiv = $('.shipping-address-state__select');

                    function isShippingStateSelect() {
                        if ($shippingCountry.val() == 2) { // USA
                            $shippingStateSelectDiv.show();
                            $shippingStateSelect.attr('name', 'shippingAddress.state');
                            $shippingStateInputDiv.hide();
                            $shippingStateInput.attr('name', 'shippingAddress.state.tmp');
                        } else {
                            $shippingStateSelectDiv.hide();
                            $shippingStateSelect.attr('name', 'shippingAddress.state.tmp');
                            $shippingStateInputDiv.show();
                            $shippingStateInput.attr('name', 'shippingAddress.state');
                        }
                    }
                    $shippingCountry.on('change', isShippingStateSelect);
                    isShippingStateSelect();
                }
            }

            // SSO
            if ($('#modal-auction-signin-form').length && !$('#modal-auction-signin-form').data('submit')) {
                $('#modal-auction-signin-form').data('submit', true); // added submit handler
                $('#modal-auction-signin-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            if (data && data.trim() === 'success') {
                                redirectPage('/sso.action' + window.location.search);
                            } else {
                                this.innerHTML = data;
                                auctionRegistration();
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(data => {
                            $('.loader-block').hide();
                        });
                });
            }
            if ($('#modal-auction-register-form').length && !$('#modal-auction-register-form').data('submit')) {
                $('#modal-auction-register-form').data('submit', true); // added submit handler
                $('#modal-auction-register-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            this.innerHTML = data;
                            auctionRegistration();
                            grecaptchaRender('g-recaptcha-register');
                            if ($('.modal-register__sso-trigger').length) { // success
                                $('.modal-register__sso-trigger').on('click', function (e) {
                                    e.preventDefault();
                                    redirectPage('/sso.action' + window.location.search);
                                });
                                trackEvent('SignUp');
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(() => {
                            $('.loader-block').hide();
                        }) ;
                });
            }
            if ($('#modal-auction-password-form').length && !$('#modal-auction-password-form').data('submit')) {
                $('#modal-auction-password-form').data('submit', true); // added submit handler
                $('#modal-auction-password-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            this.innerHTML = data;
                            auctionRegistration();
                            grecaptchaRender('g-recaptcha-password');
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(() => {
                            $('.loader-block').hide();
                        }) ;
                });
            }
        }

        // AUCTIONS
        const $auctionRegistrationTrigger = $('.auction-registration-trigger');
        if ($auctionRegistrationTrigger.length) {
            $auctionRegistrationTrigger.on('click', function (e) {
                e.preventDefault();
                const params = new URLSearchParams('d=1');
                ssoParams(params);
                const paramsSymbol = this.href.includes('?') ? '&' : '?';
                redirectPage(this.href + paramsSymbol + params.toString());
            });
        }

        // SHIPPING QUOTE PAGE FOR SAM
        if ($('.modal-shipping-quote-page').length) {
            grecaptchaRender('g-recaptcha-quote');

            $('form').submit(function (e) {
                if (e.originalEvent.submitter && e.originalEvent.submitter.name === 'question') {
                    $('[name="question"]').val(1);
                }
            });
        }

        // COOKIES
        const isCookiesAccepted = $.cookie('cookies_accepted');
        if (!isCookiesAccepted) {
            M.toast({
                html: `<span class="cookies-toast"><span class="cookies-toast__body"><strong class="c-r">This website uses cookies</strong><br/>
We use cookies to personalise content and ads, to provide social media features and to analyse our traffic.
We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
</span><span class="btn cookies-toast__close">Accept</span></span>`,
                classes: 'toast-cookies',
                displayLength: Infinity,
            });
            $('.cookies-toast__close').on('click', function () {
                $.cookie('cookies_accepted', new Date().toISOString().replaceAll(':', '-'), { expires: new Date(2147483647 * 1000), path: '/' });
                M.Toast.dismissAll();
            });
            $('#toast-container').prepend('<div class="toast__overlay"/>');
        }

    }); // end of document ready
});

function grecaptchaRender (id = 'g-recaptcha') {
    try {
        grecaptcha.render(id, {
            'sitekey' : '6LfhkdoZAAAAALO13mfmd1E57vzk-J516oR__cM1'
        });
    } catch (error) {/*possible duplicated instances*/}
}

function bagCountToggle (count) {
    const $number = $('.header__bag-number');
    if (!$number.length) return;
    $number.html(count).toggleClass('empty', count == 0);
}

function bagCountUpdate () {
    $.get('/ajax/rest.action?actions=productBasketCount')
        .done(data => {
            if (!checkResponse(data, false)) return data;

            const $data = $('<div/>').html(data);
            const bagCount = $data.find('#productBasketCount').text().trim();
            bagCountToggle(bagCount);
        });
}

function getHeaderUpdate () {
    if ($('body').hasClass('wp')) {
        $('.is-ligged-false').css('filter', 'blur(4px)');
    }
    $.get('/ajax/rest.action?actions=userLoggedIn&actions=productBasketCount&actions=headerMenuAuctions')
        .done(data => {
            if (!checkResponse(data, false)) return data;

            const $data = $('<div/>').html(data);

            if ($('body').hasClass('wp')) {
                const isLogged = $data.find('#userLoggedIn').text().trim() === 'true';
                if (isLogged) {
                    $('.is-ligged-false').hide();
                    $('.is-ligged-true').show();
                }
            }

            $('.menu-auctions-links').html(
                $data.find('#headerMenuAuctions')
            );

            bagCountToggle($data.find('#productBasketCount').text().trim());
        })
        .always(() => {
            $('.is-ligged-false').css('filter', '');
        });
}

function initFacebookLoginButton(sso = null) {
    // todo: logic from old new-design, requires review
    $('#facebookLoginButtonLogin, #facebookLoginButtonRegister').click(function (e) {
        let url = $(this).attr('data-url');
        const state = {};
        if ($(e.target).closest('#facebookLoginButtonLogin').length) {
            state.action = 'login';
        } else if ($(e.target).closest('#facebookLoginButtonRegister').length) {
            state.action = 'register';
        }
        if (sso) {
            state.redirectUrl = escape(sso);
        }
        if (url.includes('facebookLoginCallback.action&state={')) { // already has state
            url = url.replace(
                'facebookLoginCallback.action&state={',
                'facebookLoginCallback.action&state=' + JSON.stringify(state).slice(0,-1) + ','
            );
        } else {
            url = url.replace(
                'facebookLoginCallback.action&',
                'facebookLoginCallback.action&state=' + JSON.stringify(state) + '&'
            );
        }

        var w = 600;
        var h = 600;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);

        window.open(url, 'facebookLogin', 'width=' + w + ',height=' + h + ',top=' + top + ', left=' + left);

        $button = $(this).next('.modal-register__facebook-or');
        function onMessage (event) {
            if (event.data) {
                if (event.data === 'fbTrackSignUp') {
                    window.removeEventListener('message', onMessage);
                    trackEvent('SignUp');
                } else if (event.data.includes && event.data.includes('fbErrorMessage:')) {
                    $('#facebookError').remove();
                    $(`<div id="facebookError" class="input-field__helper error">
                        ${event.data.replace('fbErrorMessage:', '')}
                    <br/><br/></div>`).insertAfter($button);
                }
            }
        }
        window.addEventListener('message', onMessage);
    });
}

function reloadPage () {
    $('.loader-block').show();
    setTimeout(()=>{
        window.location.reload(true);
    });
}

function redirectPage (url) {
    $('.loader-block').show();
    window.location.href = url.replace(/\/+/g,'/').replace(/^https:\//,'https://');
}

function checkResponse (data, isReload = true) {
    if (data && data.includes('<html')) {
        M.toast({
            html: 'Unfortunately something went wrong',
            classes: 'toast-error'
        });
        if (isReload) setTimeout(()=>window.location.reload(), 2000);
        return false;
    }
    return true;
}

function trackEvent (event) {
    try {
        switch (event) {
            case 'SignUp': {
                fbq('track', 'CompleteRegistration');
                rdt('track', 'SignUp');
                break;
            }
            case 'RegistrationForm': {
                fbq('trackCustom', 'RegistrationForm');
                rdt('track', 'Custom', { customEventName: 'RegistrationForm' }); 
                break;
            }
        }
    } catch (e) {
        setTimeout(()=>trackEvent(event), 100);
    }
}

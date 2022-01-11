document.addEventListener('DOMContentLoaded', () => {
	$(function() {
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
		// $('.datepicker').datepicker();
		// $('.timepicker').timepicker();
		// $('.tooltipped').tooltip();
		// $('.slider').slider();
		// $('.carousel').carousel();
		// $('.carousel.carousel-slider').carousel({
		//     fullWidth: true,
		//     indicators: true,
		//     onCycleTo: function(item, dragged) {}
		// });
	
		// AJAX
		if (
			$('.is-ligged-false').length ||
			$('.menu-auctions-links').length ||
			$('.header__bag-number').length
		) getHeaderUpdate();
	
		if ($('#whatsnew-auctions').length) getWhatsNews();
	
		// MODAL SIGNIN
	
		$('#modal-signin').modal({ // load form on modal open
			onOpenStart: function (el) {
				el.classList.add('sync');
				const $form = $(el).find('.modal-signin-form');
				$.get('/ajax/modalSignIn.action')
					.done(data => {
						$form.html(data);
						M.updateTextFields();
						initFacebookLoginButton();
					})
					.fail(data => {
						if (data && data.statusText) $form.html(data.statusText);
					})
					.always(data => {
						el.classList.remove('sync');
					});
			}
		});
	
		$('.modal-signin-form').submit(function (e) {
			e.preventDefault();
			this.classList.add('sync');
			$.post(
				this.action,
				$(this).serialize(),
			)
				.done(data => {
					if (data && data.trim() === 'success') {
						const $redirect = $('[data-after-signin]');
						if ($redirect.length) {
							window.location.href = $redirect.data('after-signin');
						} else {
							window.location.reload();
						}
					} else {
						this.innerHTML = data;
						M.updateTextFields();
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
				$.get('/ajax/modalRegister.action')
					.done(data => {
						$form.html(data);
						M.updateTextFields();
						grecaptchaRender('g-recaptcha-register');
						initFacebookLoginButton();
					})
					.fail(data => {
						if (data && data.statusText) $form.html(data.statusText);
					})
					.always(data => {
						el.classList.remove('sync');
					});
			}
		});
	
		$('.modal-register-form').submit(function (e) {
			e.preventDefault();
			this.classList.add('sync');
			$.post(
				this.action,
				$(this).serialize(),
			)
				.done(data => {
					this.innerHTML = data;
					M.updateTextFields();
					grecaptchaRender('g-recaptcha-register');
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
							window.location.reload();
						} else {
							$card.addClass('card--added');
							bagCountUpdate();
						}
					});
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
	
					$.get('/ajax/products.action?' + $('#filterForm').serialize(), function (data) {
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
	
		// const out = document.createElement('div');
		// out.classList.add('out');
		// document.body.append(out);

		let isMobileFilter = false;
	
		function resize () {
			headerFloat();
			mobileFilterToggle();
		}
		resize();
		$(window).on('resize', resize);
	
		// HEADER
		const HEADER_THRESHOLD = 100; // px
		let previousScroll = 0;
		function headerFloat () {
			const $header = $('header');
			const $headerMain = $('.header__main');
			if ($header.length && $headerMain.length) {
				$header.css('maxWidth', $('main').width() + 'px');
				const top = $headerMain.offset().top;
				const bottom = $header.height();
				$(window).on('scroll', M.throttle((e) => {
					const currentScroll = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
					if (currentScroll <= previousScroll) {
						if (document.body.classList.contains('autoscroll')) return; // dont show header if autoscroll
						if (
							previousScroll - currentScroll > HEADER_THRESHOLD ||
							currentScroll < top
						) {
							previousScroll = currentScroll;
							$header.removeClass('sticky-out');
							if (currentScroll < top * 2) {
								$header.removeClass('sticky-in');
							} else if (currentScroll > bottom) {
								$header.addClass('sticky-in');
							}
						}
					} else {
						previousScroll = currentScroll;
						if (
							currentScroll > bottom &&
							$header.hasClass('sticky-in')
						) {
							previousScroll = currentScroll;
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

			$filters = $('main .filters');
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
		const MENU_THRESHOLD = 100; // ms
		const $menu = $('.header__menu');
		const $menuItems = $('.header__menu-link');
		let menuOpenTimer;
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
			if (menuOpenTimer) clearTimeout(menuOpenTimer);
			$menu.removeClass('active');
			$menuItems.removeClass('active');
			$('body').off('click', menuClickOutside);
		}
		if ($menu.length && $menuItems.length) {
			function click (e) {
				if (menuOpenTimer) clearTimeout(menuOpenTimer);
				if (e.target.classList.contains('active')) {
					menuClose();
				} else {
					menuOpen(e);
				}
			}
			function move (e) {
				if (menuOpenTimer) clearTimeout(menuOpenTimer);
				menuOpenTimer = setTimeout(() => menuOpen(e), MENU_THRESHOLD);
			}
			$menuItems.on('click', click);
			$('.header__menu-link-handle').on('mousemove', move);
			$menu.on('mouseleave', menuClose);
		}
	
		// SIDENAV
		function onBack () {
			$('.sidenav__links').focus();
		}
		const back = document.querySelectorAll('.sidenav__menu-back');
		if (back) back.forEach(btn => {
			btn.addEventListener('click', onBack);
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
		function getWhatsNews () {
			$.get('/ajax/rest.action?actions=auctionedNewAdditions')
				.done(data => {
					const $data = $('<div/>').html(data);
					let auctions = $data.find('#auctionedNewAdditions').html();
					if (auctions) auctions = auctions.trim();
					if (!auctions) {
						$('.whatsnew__tabs').hide();
						$('#whatsnew-auctions').hide().removeClass('active');
						$('#whatsnew-buy').show().addClass('active');
					}
					$('#whatsnew-auctions .whatsnew__cards-scroll').html(auctions);
					cardsHandlers();
				});
	
			$.get('/ajax/rest.action?actions=buyNowNewAdditions')
				.done(data => {
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
	
		// CURRENCY DROPDOWN
		const currency = document.querySelectorAll('.card__price-i, .product__price-i');
		if (currency) M.Dropdown.init(currency, { container: document.body });
	
		// MARGIN DROPDOWN
		const margin = document.querySelectorAll('.margin-dropdown');
		if (margin) M.Dropdown.init(margin, { container: document.body });
	
		// SELL
		const $sellTabsA = $('.sell__tab a');
		const $sellTabs = $('.sell__tab-content');
		if ($sellTabsA.length && $sellTabs.length) {
			function showSellTab (e) {
				let active;
				window.onpopstate = () => showSellTab();
				if (e) { // click
					e.preventDefault();
					active = this.getAttribute('href');
					window.history.pushState(null, this.innerText, this.href);
				} else { // init
					const hashes = window.location.href.split('#'); // find hash in url
					if (hashes && hashes.length && hashes.length > 1) {
						let hash = hashes[1];
						const query = hash.search(/[^\w]/g);
						if (query > -1) hash = hash.substr(0, query);
						active = '#' + hash;
						setTimeout(() => $('.hero__btn.sell__button-valuation')[0].scrollIntoView({block: 'start'}));
					} else { // if no hash in url - take first tab
						const tabActive = document.querySelector('.sell__tab:first-of-type a');
						if (tabActive) active = tabActive.getAttribute('href');
					}
				}
				if (active) {
					$sellTabs.hide();
					$(active).show();
					$('.sell__tab a.active').removeClass('active');
					$('.sell__tab a[href="' + active + '"]').addClass('active');
				}
			}
			$sellTabsA.on('click', showSellTab);
			showSellTab();
	
			const $sellButtonValuation = $('.sell__button-valuation');
			if ($sellButtonValuation.length) {
				function sellButtonValuationClick () {
					$valuationTab[0].click();
					$valuationForm[0].scrollIntoView({behavior: 'smooth', block: 'start'});
				}
				const $valuationTab = $('.sell__tab a[href="#valuation"]');
				const $valuationForm = $('.sell__valuation-form-title');
				if ($valuationTab.length && $valuationForm.length) {
					$sellButtonValuation.on('click', sellButtonValuationClick);
				}
			}
	
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
			}
	
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
	
			initializeAutocomplete(moviesOptions);
	
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
	
			$('#sellOrConsignSubmit').submit(function (e) {
				$('.loader-block').show();
			});
		}
	
		// PRODUCTS
		if ($('.filters__inputs').length) {
			function clearFilters() {
				$('.input-field__clean').click();
				$('input[type="search"]').val('');
			}
	
			let filterTimeout;
	
			function filter() {
				if (filterTimeout) clearTimeout(filterTimeout);
	
				filterTimeout = setTimeout(function () {
					if (!isMobileFilter) {
						$('#itemsOffset').val('');
						$('#filterForm').submit();
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
	
			initializeAutocomplete(moviesOptions);
			
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
				$('#auctionsAutocomplete').autocomplete({
					data,
					onAutocomplete: function (auctionId) {
						$('#auctionId').val(auctionId);
						filter();
					},
					sortFunction: compareString
				});
			}
	
			const auctionId = $('#auctionId').val() || 0;
			const auctionsOptions = {};
	
			initializeAuctionsAutocomplete(auctionsOptions);
			
			$.getJSON('/ajax/movies.action', function (json) {
				if (json && json.movies) {
					$(json.movies).each(function (key, movie) {
						if (auctionId == movie.id) {
							$('#auctionsAutocomplete').val(movie.name);
						}
						auctionsOptions[movie.name] = movie.id;
					});
				}
			});

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
	
			$('#hideArchived').on('change', function () {
				filter();
			});
	
			$('#categoryId').on('change', function () {
				filter();
			});
	
			$('#moviesList').on('change', function () {
				filter();
			});
	
			$('#office').on('change', function () {
				filter();
			});
	
			$('#auctionType').on('change', function () {
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
	
			const $autocomplete = $('.sidenav__filter-inputs input.autocomplete');
			$autocomplete.on('focus', function () {
				setTimeout(() => { // wait virtual keyboard
					if (document.activeElement === this) {
						this.scrollIntoView();
					}
				}, 300);
			});

			$tabs = $('.filters__tab:not([disabled]):not(.unable)');
			if ($tabs.length) {
				if ($tabs.length === 1) {
					$tabs.addClass('unable');
				} else {
					$tabs.on('click', function () {
						if ($(this).data('hideArchived')) {
							$('#hideArchived')[0].checked = $(this).data('hideArchived');
						} else {
							$(this).toggleClass('active');
							$active = $('.filters__tab.active[data-auctionType]');
							$('#auctionType').val($active.length === 1 ? $active.data('auctionType') : 0);
						}
						filter();
					});
				}
			}
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
						window.location.reload();
					});
			});
	
			$('#modal-payment-plan').modal({ // load form on modal open
				onOpenStart: function (el) {
					el.classList.add('sync');
					const $form = $(el).find('.modal-payment-plan-form');
					$.get($form.attr('action'))
						.done(data => {
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
										window.location.reload(); // change added button, update bag count
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
		if ($('#accountDetailsSubmit').length) {
			$('#accountDetailsSubmit').submit(function (e) {
				$('.loader-block').show();
			});
	
			//billingAsShipping
			const $shippingAddressCheckbox = $('#accountDetailsSubmit input[name="billingAsShipping"]');
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
			initializeAutocomplete(moviesOptions);
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
	
		// BLOG
		if ($('.wp.blog').length || $('.wp.archive').length || $('.wp.search').length) {
			$('.card-blog').on('click', function(event) {
				const fakeUrl = $(event.target).data('href');
				if (fakeUrl) {
					event.preventDefault();
					window.location.href = fakeUrl;
				}
			});
	
			$('.filters__select-category select').on('change', function(event) {
				window.location.href = event.target.value;
			});
		}
	
		// FAQ
		if ($('.wp .faq').length) {
=======
    const URL_SAM = 'https://propstore-staging32-usm.auctionserver.net/';

    $(function() {
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
        // $('.datepicker').datepicker();
        // $('.timepicker').timepicker();
        // $('.tooltipped').tooltip();
        // $('.slider').slider();
        // $('.carousel').carousel();
        // $('.carousel.carousel-slider').carousel({
        //     fullWidth: true,
        //     indicators: true,
        //     onCycleTo: function(item, dragged) {}
        // });

        // AJAX
        if (
            $('.is-ligged-false').length ||
            $('.menu-auctions-links').length ||
            $('.header__bag-number').length
        ) getHeaderUpdate();

        if ($('#whatsnew-auctions').length) getWhatsNews();

        // SIGN OUT SSO
        if ($('.signout-trigger').length) {
            $('.signout-trigger').on('click', function () {
                $('.loader-block').show();
                openSamAndClose(URL_SAM + '/logout?autoclose=true');
            });
        }

        // MODAL SIGNIN

        $('#modal-signin').modal({ // load form on modal open
            onOpenStart: function (el) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-signin-form');
                $.get('/ajax/modalSignIn.action')
                    .done(data => {
                        $form.html(data);
                        M.updateTextFields();
                        initFacebookLoginButton();
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
                if ($ssoTrigger.length) {
                    reloadPage();
                }
            },
        });

        $('.modal-signin-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');

            function openSSO () {
                $('.loader-block').show();
                const SSOwin = window.open('/ajax/sso.action?autoclose=true&reloadopener=true', 'Propstore SSO', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1,height=1,top=2000`);
                const SSOtimer = setTimeout(() => {
                    $('.loader-block').hide();
                    if (SSOwin) SSOwin.close();
                    M.Toast.dismissAll();
                    M.toast({
                        html: '<span><strong>Somthing went wrong.</strong><br/> Check pop-ups blocking and try again.</span>',
                        displayLength: Infinity,
                    });
                }, 5000);
                window.addEventListener('message', function(event) {
                    if (event.data === 'SSOsuccess' || event.data === 'SSOerror') {
                        reloadPage();
                    }
                });
            }

            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    this.innerHTML = data;
                    M.updateTextFields();

                    const $ssoTrigger = $(this).find('.modal-register__sso-trigger');
                    if ($ssoTrigger.length) {
                        $ssoTrigger.on('click', openSSO).trigger('click');
                        const $redirect = $('[data-after-signin]');
                        if ($redirect.length) {
                            redirectPage($redirect.data('after-signin'));
                        }
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
                $.get('/ajax/modalRegister.action')
                    .done(data => {
                        $form.html(data);
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-register');
                        initFacebookLoginButton();
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            }
        });

        $('.modal-register-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    this.innerHTML = data;
                    M.updateTextFields();
                    grecaptchaRender('g-recaptcha-register');
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
                        }
                    });
            });

            // todo: server response always return OK, no exceptions handling
            $('.card__heart').on('click', function (e) {
                e.preventDefault();
                if (this.classList.contains('modal-trigger')) return; // signin modal

                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                const lotUrl = this.getAttribute('data-url');
                if ($card.hasClass('card--liked')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $card.removeClass('card--liked');
                        });
                    if (lotUrl) openSamAndClose(URL_SAM + '/watchlist/remove?autoclose=true&' + lotUrl);
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $card.addClass('card--liked');
                        });
                    if (lotUrl) openSamAndClose(URL_SAM + '/watchlist/add?autoclose=true&' + lotUrl);
                }
            });
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

        function resize () {
            headerFloat();
            mobileFilterToggle();
        }
        resize();
        $(window).on('resize', resize);

        // HEADER
        const HEADER_THRESHOLD = 100; // px
        let previousScroll = 0;
        function headerFloat () {
            const $header = $('header');
            const $headerMain = $('.header__main');
            if ($header.length && $headerMain.length) {
                $header.css('maxWidth', $('main').width() + 'px');
                const top = $headerMain.offset().top;
                const bottom = $header.height();
                $(window).on('scroll', M.throttle((e) => {
                    const currentScroll = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
                    if (currentScroll <= previousScroll) {
                        if (document.body.classList.contains('autoscroll')) return; // dont show header if autoscroll
                        if (
                            previousScroll - currentScroll > HEADER_THRESHOLD ||
                            currentScroll < top
                        ) {
                            previousScroll = currentScroll;
                            $header.removeClass('sticky-out');
                            if (currentScroll < top * 2) {
                                $header.removeClass('sticky-in');
                            } else if (currentScroll > bottom) {
                                $header.addClass('sticky-in');
                            }
                        }
                    } else {
                        previousScroll = currentScroll;
                        if (
                            currentScroll > bottom &&
                            $header.hasClass('sticky-in')
                        ) {
                            previousScroll = currentScroll;
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

            $filters = $('main .filters');
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
        function getWhatsNews () {
            $.get('/ajax/rest.action?actions=auctionedNewAdditions')
                .done(data => {
                    const $data = $('<div/>').html(data);
                    let auctions = $data.find('#auctionedNewAdditions').html();
                    if (auctions) auctions = auctions.trim();
                    if (!auctions) {
                        $('.whatsnew__tabs').hide();
                        $('#whatsnew-auctions').hide().removeClass('active');
                        $('#whatsnew-buy').show().addClass('active');
                    }
                    $('#whatsnew-auctions .whatsnew__cards-scroll').html(auctions);
                    cardsHandlers();
                });

            $.get('/ajax/rest.action?actions=buyNowNewAdditions')
                .done(data => {
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

        // CURRENCY DROPDOWN
        const currency = document.querySelectorAll('.card__price-i, .product__price-i');
        if (currency) M.Dropdown.init(currency, { container: document.body });

        // MARGIN DROPDOWN
        const margin = document.querySelectorAll('.margin-dropdown');
        if (margin) M.Dropdown.init(margin, { container: document.body });

        // SELL
        const $sellTabsA = $('.sell__tab a');
        const $sellTabs = $('.sell__tab-content');
        if ($sellTabsA.length && $sellTabs.length) {
            function showSellTab (e) {
                let active;
                window.onpopstate = () => showSellTab();
                if (e) { // click
                    e.preventDefault();
                    active = this.getAttribute('href');
                    window.history.pushState(null, this.innerText, this.href);
                } else { // init
                    const hashes = window.location.href.split('#'); // find hash in url
                    if (hashes && hashes.length && hashes.length > 1) {
                        let hash = hashes[1];
                        const query = hash.search(/[^\w]/g);
                        if (query > -1) hash = hash.substr(0, query);
                        active = '#' + hash;
                        setTimeout(() => $('.hero__btn.sell__button-valuation')[0].scrollIntoView({block: 'start'}));
                    } else { // if no hash in url - take first tab
                        const tabActive = document.querySelector('.sell__tab:first-of-type a');
                        if (tabActive) active = tabActive.getAttribute('href');
                    }
                }
                if (active) {
                    $sellTabs.hide();
                    $(active).show();
                    $('.sell__tab a.active').removeClass('active');
                    $('.sell__tab a[href="' + active + '"]').addClass('active');
                }
            }
            $sellTabsA.on('click', showSellTab);
            showSellTab();

            const $sellButtonValuation = $('.sell__button-valuation');
            if ($sellButtonValuation.length) {
                function sellButtonValuationClick () {
                    $valuationTab[0].click();
                    $valuationForm[0].scrollIntoView({behavior: 'smooth', block: 'start'});
                }
                const $valuationTab = $('.sell__tab a[href="#valuation"]');
                const $valuationForm = $('.sell__valuation-form-title');
                if ($valuationTab.length && $valuationForm.length) {
                    $sellButtonValuation.on('click', sellButtonValuationClick);
                }
            }

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

            initializeAutocomplete(moviesOptions);

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

            $('#sellOrConsignSubmit').submit(function (e) {
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
        }

        // RELATED
        const $relatedMoviesScroll = $('.related-movies__scroll');
        if ($relatedMoviesScroll.length) {
            let relatedScrolling;
            let relatedScrollingTimer;

            function onScroll() {
                if (relatedScrollingTimer) clearTimeout(relatedScrollingTimer);
                relatedScrollingTimer = setTimeout(() => { // debounce while scrolling
                    relatedScrolling = null;

                    $(this).toggleClass('arrow-left', (
                        this.scrollWidth > this.clientWidth &&
                        this.scrollLeft > 0
                    ));
                    $(this).toggleClass('arrow-right', (
                        this.scrollWidth > this.clientWidth + this.scrollLeft + 1
                    ));
                }, 100);
            }
            $relatedMoviesScroll.on('scroll', onScroll);
            onScroll.call($relatedMoviesScroll[0]);

            function move (forward = true) {
                if (relatedScrolling) return;
                const scroll = $relatedMoviesScroll[0];
                const width = scroll.clientWidth;
                const sign = forward ? 1 : -1;
                relatedScrolling = scroll;
                let x = sign * width * .8;
                if (forward && scroll.scrollWidth - width - scroll.scrollLeft - x < width * .2) { // if close to end, scroll to end
                    x = width;
                } else if (!forward && scroll.scrollLeft + x < width * .2) {
                    x = - width;
                }
                scroll.scrollLeft += x;
            }

            $('.related-movies__arrow--left').on('click', function () { move(false); });
            $('.related-movies__arrow--right').on('click', move);
        }

        // PRODUCTS
        if ($('.filters__inputs').length) {
            function clearFilters() {
                $('.input-field__clean').click();
                $('input[type="search"]').val('');
            }

            let filterTimeout;

            function filterNow() {
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

            initializeAutocomplete(moviesOptions);

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

            $('#auctionType').on('change', function () {
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
                    if ($(this).attr('data-showsold')) {
                        $('#showSold').val($(this).data('showsold'));
                    } else {
                        $(this).toggleClass('active');
                        $active = $('.filters__tab.active[data-auctiontype]');
                        const val = $active.length === 1 ? $active.data('auctiontype') : 0;
                        $('#auctionType').val(val);
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
                    const $formCloneAuctionType = $formClone.find('#auctionType');
                    const $formCloneShowSold = $formClone.find('#showSold');
                    const $formCloneCategoryId = $formClone.find('#categoryId');
                    if ($formCloneAuctionType.val() != 0 || $formCloneShowSold.val() == 0 || $formCloneCategoryId.val() == -2) {
                        $formCloneAuctionType.val(0);
                        $formCloneShowSold.val(1);
                        if ($formCloneCategoryId.val() == -2) $formCloneCategoryId.val(0)
                    } else {
                        return; // all showed
                    }

                    $.get('/ajax/count.action?' + $formClone.serialize(), function (data) {
                        data = Number(data.trim());
                        if (data > 0) data -= $('#productsCount').val();
                        if (data > 0) {
                            $('.filters__found-plus').text('+' + data);
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
                const lotUrl = this.getAttribute('data-url');
                if ($heart.hasClass('active')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.removeClass('active');
                        });
                    if (lotUrl) openSamAndClose(URL_SAM + '/watchlist/remove?autoclose=true&' + lotUrl);
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.addClass('active');
                        });
                    if (lotUrl) openSamAndClose(URL_SAM + '/watchlist/add?autoclose=true&' + lotUrl);
                }
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
        if ($('#accountDetailsSubmit').length) {
            $('#accountDetailsSubmit').submit(function (e) {
                $('.loader-block').show();
            });

            //billingAsShipping
            const $shippingAddressCheckbox = $('#accountDetailsSubmit input[name="billingAsShipping"]');
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
            const $businessCheckbox = $('#accountDetailsSubmit_business');
            if ($businessCheckbox.length) {
                function isRegisteredBusiness() {
                    const $form = $('.business-form');
                    if ($businessCheckbox[0].checked) {
                        $form.show();
                    } else {
                        $form.hide();
                        $('#accountDetailsSubmit_businessNumber').val('');
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
            initializeAutocomplete(moviesOptions);
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

        // BLOG
        if ($('.wp.blog').length || $('.wp.archive').length || $('.wp.search').length) {
            $('.card-blog').on('click', function(event) {
                const fakeUrl = $(event.target).data('href');
                if (fakeUrl) {
                    event.preventDefault();
                    redirectPage(fakeUrl);
                }
            });

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
					//search, ignoring src and hrefs
					searchValue = searchValue.replace(/^[A-Za-z0-9_]+$/gi, '\\$&');
	
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
	
	}); // end of document ready
=======
            scrollToElement($(location.hash));

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
                        if (data.includes('modal-success')) {
                            openSSO();
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

            function openSSO () {
                redirectPage('/ajax/sso.action?autoclose=true&reloadopener=true');
            }

            $('#modal-auction-register-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        this.innerHTML = data;
                        modalLoginForms();
                        grecaptchaRender('g-recaptcha-register');
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
            $('.modal-auction-register-form .modal-close').removeClass('modal-close');
            $('.modal-auction-register-form .modal-trigger').removeClass('modal-trigger').addClass('modal-trigger-auction-registration');

            $('.modal-trigger-auction-registration[href="#modal-register"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-register-form').show();
                grecaptchaRender('g-recaptcha-register');
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
        }

        // AUCTION REGISTRATION
        auctionRegistration();

        $('.modal-auction').modal({ // load form on modal open
            onOpenStart: function (el) {
                loadModalAuctionRegistration(el);
            },
            onCloseStart: function (el) {
                $(el).find('.auction-registration__inner > *').remove();
            },
        });

        function loadModalAuctionRegistration (modal) {
            $('.loader-block').show();
            modal.classList.add('sync');
            const $content = $(modal).find('.auction-registration__inner');
            $.get('/ajax/modalAuctionRegistration.action?auctionId=' + $(modal).data('id'))
                .done(data => {
                    $content.html(data);
                    auctionRegistration($content);
                    creditCards();
                    stripeElements();
                })
                .fail(data => {
                    if (data && data.statusText) $content.html(data.statusText);
                })
                .always(data => {
                    modal.classList.remove('sync');
                    $('.loader-block').hide();
                });
        }

        function auctionRegistration ($inner = null) {
            if (!$inner) $inner = $('.auction-registration .auction-registration__inner');
            if (!$inner.length) $inner = $('.modal-auction.open .auction-registration__inner');
            if ($inner.length) {
                $('select').not('.disabled').formSelect();
                modalLoginForms();

                if ($('.auction-registration').length) { // page on propstore.com
                    $('html').addClass('auction-registration-page');
                    setTimeout(() => $('html').scrollTop(0), 100);
                    const $reloadURL = $('#modal-register-auction-form_reloadURL');
                    if ($reloadURL.length && !$reloadURL.val()) $reloadURL.val(window.location.href);
                }

                if ($inner.find('#modal-register-auction-form').length) {
                    $inner.find('#modal-register-auction-form').submit(function (e) { // todo: no modal
                        $('.loader-block').show();
                        if (!$inner.closest('.modal-auction.open').length) return; // not modal

                        $stripeElements = $(this).find('.stripeElements');
                        if ($('#modal-register-auction-form_step').val() == 'payment' &&
                            $stripeElements.length &&
                            $stripeElements[0].style.display != 'none') return; // stripeElements submit

                        e.preventDefault();
                        $form = $inner.find('#modal-register-auction-form');
                        $.post(
                            $form[0].action,
                            $form.serialize(),
                        )
                            .done(data => {
                                $inner.html(data);
                                auctionRegistration($inner);
                                creditCards();
                                stripeElements();

                                if (window.opener) { // success
                                    reloadOpener();
                                    window.close();
                                }
                            })
                            .fail(data => {
                                if (data && data.statusText) $inner.html(data.statusText);
                            })
                            .always(data => {
                                $('.loader-block').hide();
                            });
                    });

                    // open second page
                    function goBack (e) {
                        e.preventDefault();
                        if ($('.auction-registration').length) { // page on propstore.com
                            const reloadURL = $('#modal-register-auction-form_reloadURL').val();
                            if (reloadURL) {
                                redirectPage(reloadURL);
                            } else {
                                reloadPage();
                            }
                        } else { // modal
                            loadModalAuctionRegistration(e.target.closest('.modal-auction'));
                        }
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

                if ($('.modal-success').length) {
                    reloadOpener();
                }

                // SSO
                if ($('#modal-auction-signin-form').length) {
                    $('#modal-auction-signin-form').submit(function (e) {
                        e.preventDefault();
                        $('.loader-block').show();

                        $.post(
                            this.action,
                            $(this).serialize(),
                        )
                            .done(data => {
                                if (data.includes('modal-success')) {
                                    openSSO();
                                } else {
                                    this.innerHTML = data;
                                    auctionRegistration();
                                    $('.loader-block').hide();
                                }
                            })
                            .fail(data => {
                                if (data && data.statusText) this.innerHTML = data.statusText;
                                $('.loader-block').hide();
                            });
                    });

                    function openSSO () {
                        redirectPage('/ajax/sso.action');
                    }
                }

                if ($('#modal-auction-register-form').length) {
                    $('#modal-auction-register-form').submit(function (e) {
                        e.preventDefault();
                        $('.loader-block').show();

                        $.post(
                            this.action,
                            $(this).serialize(),
                        )
                            .done(data => {
                                this.innerHTML = data;
                                auctionRegistration();
                                grecaptchaRender('g-recaptcha-register');
                            })
                            .fail(data => {
                                if (data && data.statusText) this.innerHTML = data.statusText;
                            })
                            .always(() => {
                                $('.loader-block').hide();
                            }) ;
                    });
                }

                if ($('#modal-auction-password-form').length) {
                    $('#modal-auction-password-form').submit(function (e) {
                        e.preventDefault();
                        $('.loader-block').show();

                        $.post(
                            this.action,
                            $(this).serialize(),
                        )
                            .done(data => {
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
        }

        // AUCTIONS
        const $modalAuctions = $('.modal-auction');
        if ($modalAuctions.length) {
            function openModalAuction (e) {
                if (e) e.preventDefault();
                const modal = M.Modal.getInstance($modalAuctions.last());
                modal.open();
            }

            const hashes = window.location.href.split('#'); // find hash in url
            if (hashes && hashes.length && hashes.length > 1) {
                let hash = hashes[1];
                const query = hash.search(/[^\w]/g);
                if (query > -1) hash = hash.substr(0, query);
                if (hash == 'register') openModalAuction();
            }

            $('.modal-auction-trigger').on('click', openModalAuction);
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

        function openSamAndClose (url) {
            const SSOwin = window.open(url, 'Propstore SSO', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1,height=1,top=2000`);
            setTimeout(() => SSOwin.close(), 1000);
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

function initFacebookLoginButton() {
    // todo: logic from old new-design, requires review
    $('#facebookLoginButtonLogin, #facebookLoginButtonRegister').click(function () {
        var url = $(this).attr('data-url');
        var w = 600;
        var h = 600;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);

        window.open(url, 'facebookLogin', 'width=' + w + ',height=' + h + ',top=' + top + ', left=' + left);
    });
}

function reloadOpener () {
    if (window.opener) window.opener.postMessage('reloadPage', '*');
}

function reloadPage () {
    $('.loader-block').show();
    window.location.reload();
}

function redirectPage (url) {
    $('.loader-block').show();
    window.location.href = url;
}
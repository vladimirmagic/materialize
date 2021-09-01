(function($) {
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
			$('#nav-mobile').css({ overflow: 'auto' });
			document.body.classList.remove('no-touch');
			document.body.classList.add('touch');
		} else {
			document.body.classList.remove('touch');
			document.body.classList.add('no-touch');
		}

		// Plugin initialization
		$('.carousel').carousel();
		$('.carousel.carousel-slider').carousel({
			fullWidth: true,
			indicators: true,
			onCycleTo: function(item, dragged) {}
		});
		$('.carousel--hero').carousel({
			arrows: false,
			fullWidth: true,
			indicators: true,
			interval: 5000,
			onCycleTo: function(item, dragged) {}
		});

		$('.collapsible').collapsible({
			onOpenEnd: (el) => {
				const body = el.querySelector('.collapsible-body');
				if (body) body.scrollIntoView({behavior: 'smooth', block: 'nearest'});
			}
		});
		$('.collapsible.expandable').collapsible({
			accordion: false
		});

		// $('.dropdown-trigger:not(.header__account):not(.card__price-i)').dropdown();
		$('.slider').slider();
		$('.materialboxed').materialbox();
		$('.modal:not(.modal-register):not(.modal-payment-plan)').modal();
		$('.datepicker').datepicker();
		$('.tabs').tabs();
		$('.timepicker').timepicker();
		$('.tooltipped').tooltip();
		$('select')
			.not('.disabled')
			.formSelect();
		$('.sidenav').sidenav();
		$('input.autocomplete:not(#autocomplete-movie):not(#autocomplete-genre)').autocomplete({
			data: { 'Movie 01': 'Movie01', 'Movie 02': 'Movie02', 'Movie 3': 'Movie3' },
		});
		$('input[data-length], textarea[data-length]').characterCounter();

		// Swipeable Tabs Demo Init
		// if ($('#tabs-swipe-demo').length) {
		// 	$('#tabs-swipe-demo').tabs({ swipeable: true });
		// }

		// Fab
		// $('.fixed-action-btn').floatingActionButton();
		// $('.fixed-action-btn.horizontal').floatingActionButton({
		// 	direction: 'left'
		// });
		// $('.fixed-action-btn.click-to-toggle').floatingActionButton({
		// 	direction: 'left',
		// 	hoverEnabled: false
		// });
		// $('.fixed-action-btn.toolbar').floatingActionButton({
		// 	toolbarEnabled: true
		// });
	}); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('DOMContentLoaded', () => {
	// const out = document.createElement('div');
	// out.classList.add('out');
	// document.body.append(out);

	// document.body.classList.add('loaded');

	function resize () {
		headerFloat();
		mobileFilterToggle();
	}
	resize();
	window.addEventListener('resize', resize);

	// HEADER
	const HEADER_THRESHOLD = 100; // px
	let previousScroll = 0;
	function headerFloat () {
		const header = document.querySelector('header');
    	const headerMain = document.querySelector('.header__main');
		const main = document.querySelector('main');
		if (header && headerMain) {
			header.style.maxWidth = main.clientWidth + 'px';
			const top = headerMain.offsetTop;
			const bottom = header.offsetHeight;
			document.addEventListener('scroll', M.throttle((e) => {
				const currentScroll = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
				if (currentScroll <= previousScroll) {
					if (document.body.classList.contains('autoscroll')) return; // dont show header if autoscroll
					if (
						previousScroll - currentScroll > HEADER_THRESHOLD ||
						currentScroll < top
					) {
						previousScroll = currentScroll;
						header.classList.remove('sticky-out');
						if (currentScroll < top * 2) {
							header.classList.remove('sticky-in');
						} else if (currentScroll > bottom) {
							header.classList.add('sticky-in');   
						}
					}
				} else {
					previousScroll = currentScroll;
					if (
						currentScroll > bottom &&
						header.classList.contains('sticky-in')
					) {
						previousScroll = currentScroll;
						header.classList.remove('sticky-in');
						header.classList.add('sticky-out');
					}
					menuClose();
				}
			}, 100));
		}
	}

	// HEADER ACCOUNT DROPDOWN
	const account = document.querySelectorAll('.header__account');
	if (account) M.Dropdown.init(account, { alignment: 'right' });

	// MENU
	const MENU_THRESHOLD = 100; // ms
	var menu = document.querySelector('.header__menu');
	var menuItems = document.querySelectorAll('.header__menu-link');
	var menuOpenTimer;
	function menuClickOutside (e) {
		const inside = e.target.closest('.header__menu');
		if (!inside) menuClose();
	}
	function menuOpen (e) {
		if (menu) menu.classList.add('active');
		if (menuItems) menuItems.forEach(item => item.classList.remove('active'));
		const target = e.target.closest('.header__menu-link');
		target.classList.add('active');
		document.addEventListener('click', menuClickOutside);
	}
	function menuClose () {
		if (menuOpenTimer) clearTimeout(menuOpenTimer);
		if (menu) menu.classList.remove('active');
		if (menuItems) menuItems.forEach(item => item.classList.remove('active'));
		document.removeEventListener('click', menuClickOutside);
	}
	if (menu && menuItems) {
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
		menuItems.forEach(item => {
			item.addEventListener('click', click);
			const handle = item.querySelector('.header__menu-link-handle');
			if (handle) handle.addEventListener('mousemove', move);
		});
		menu.addEventListener('mouseleave', menuClose);
	}

	// SIDENAV
	function onBack () {
		const links = document.querySelector('.sidenav__links');
		if (links) links.focus();
	}
	const back = document.querySelectorAll('.sidenav__menu-back');
	if (back) back.forEach(btn => {
		btn.addEventListener('click', onBack);
	});

	// WHATS NEW
	const whatsnewArrowLeft = document.querySelector('.whatsnew__cards-arrow--left');
	const whatsnewArrowRight = document.querySelector('.whatsnew__cards-arrow--right');
	if (whatsnewArrowLeft && whatsnewArrowRight) {
		function move (forward = true) {
			const cards = document.querySelector('.whatsnew__cards.active .whatsnew__cards-scroll');
			if (cards) {
				const card1 = cards.querySelector('.card');
				const card2 = cards.querySelector('.card + .card');
				if (card1 && card2) {
					const card = card2.getBoundingClientRect().left - card1.getBoundingClientRect().left; // width from the first card left side to the second card left side
					const cardsWidth = cards.clientWidth;
					const cardsCount = Math.floor((cardsWidth + 16) / card);
					const sign = forward ? 1 : -1;
					cards.scrollLeft += sign * cardsCount * card;
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
	const currency = document.querySelectorAll('.card__price-i');
	if (currency) M.Dropdown.init(currency, { container: document.body });

	// FILTER
	function mobileFilterToggle () {
		const button = document.querySelector('.filters__open-button');
		if (button && getComputedStyle(button).display !== 'none') { // mobile button shown
			const inputs = document.querySelector('.filters__body .filters__inputs');
			const sidenav = document.querySelector('.sidenav__filter-inputs');
			if (inputs && sidenav) {
				sidenav.append(inputs);
			} 
		} else {
			const inputs = document.querySelector('.sidenav__filter-inputs .filters__inputs');
			const desktop = document.querySelector('.filters__body');
			if (inputs && desktop) {
				desktop.append(inputs);
			}
			const sidenavElement = document.querySelector('.sidenav-filter');
			if (sidenavElement) { // close sidenav
				const sidenav = M.Sidenav.getInstance(sidenavElement);
				if (sidenav) sidenav.close();
			}
		}
	}

	const filters = document.querySelectorAll('.sidenav__filter-inputs input.autocomplete');
	if (filters) filters.forEach(filter => {
		filter.addEventListener('focus', () => {
			setTimeout(() => { // wait virtual keyboard
				if (document.activeElement === filter) {
					filter.scrollIntoView();
				}
			}, 300);
		});
	});

	// PRODUCT
	const productItems = [...document.querySelectorAll('.carousel-item')];
	const productThumbnails = [...document.querySelectorAll('.product__thumbnail')];
	if (productItems.length && productThumbnails.length) {
		const productSlider = $('.product__slider').carousel({
			onCycleTo: function(item, dragged) {
				const index = productItems.indexOf(item);
				const thumbnail = productThumbnails[index];
				if (thumbnail) {
					productThumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
					thumbnail.classList.add('active');
					// thumbnail.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'}); // scrolls on page load(
				}
			},
			onDestroy: function() {
				productThumbnails.forEach(thumbnail => {
					thumbnail.removeEventListener('mousemove', onClickProductThumbnail);
				});
			},
		});
		function onClickProductThumbnail (e) {
			const index = productThumbnails.indexOf(e.target);
			productSlider[0].M_Carousel.set(index);
		}
		productThumbnails.forEach(thumbnail => {
			thumbnail.addEventListener('mousemove', onClickProductThumbnail);
		});
	}

	// VOUCHER
	const voucherItems = [...document.querySelectorAll('.carousel-item--voucher')];
	if (voucherItems.length) {
		$('.product__slider').carousel();
	}

	$('.modal-gallery').modal({
		opacity: .75,
        dismissible: true,
		onCloseStart: (el) => {
			const carouselElement = el.querySelector('.modal-gallery__carousel');
			if (carouselElement) {
				const carousel = M.Carousel.getInstance(carouselElement);
				if (carousel) carousel.destroy();
			}
		},
		onOpenEnd: (el, trigger) => {
			const modalSlider = $(el).find('.modal-gallery__carousel').carousel({
				fullWidth: true,
				indicators: true,
				onCycleTo: function(item, dragged) {}
			});
			const productGallery = trigger.closest('.product__gallery');
			if (productGallery) {
				const timer = document.body.classList.contains('touch') ? 300 : 0; // on touch wait for active
				setTimeout(() => {
					const active = productGallery.querySelector('.carousel-item.active');
					const index = productItems.indexOf(active);
					modalSlider[0].M_Carousel.set(index);
				}, timer);
			}
		}
	});

	// SELL
	const sellTabsA = document.querySelectorAll('.sell__tab a');
	const sellTabs = document.querySelectorAll('.sell__tab-content');
	if (sellTabsA && sellTabsA.length && sellTabs && sellTabs.length) {
		function showSellTab (e) {
			let active;
			if (e) { // click
				e.preventDefault();
				active = this.getAttribute('href');
				window.history.pushState(null, this.innerText, this.href);
				window.onpopstate = () => showSellTab();
			} else { // init
				const hashes = window.location.href.split('#'); // find hash in url
				if (hashes && hashes.length && hashes.length > 1) {
					let hash = hashes[1];
					const query = hash.search(/[^\w]/g);
					if (query > -1) hash = hash.substr(0, query);
					active = '#' + hash;
				} else { // if no hash in url - take first tab
					const tabActive = document.querySelector('.sell__tab:first-of-type a');
					if (tabActive) active = tabActive.getAttribute('href');
				}
			}
			if (active) {
				sellTabs.forEach(tab => tab.style.display = 'none');
				const tab = document.querySelector(active);
				if (tab) tab.style.display = 'block';
				const tabActive = document.querySelector('.sell__tab a.active');
				if (tabActive) tabActive.classList.remove('active');
				const newActive = document.querySelector('.sell__tab a[href="' + active + '"]');
				if (newActive) newActive.classList.add('active');
			}
		}
		sellTabsA.forEach(a => a.addEventListener('click', showSellTab));
		showSellTab();

		const sellButtonValuation = document.querySelectorAll('.sell__step-button-valuation');
		if (sellButtonValuation && sellButtonValuation.length) {
			function sellButtonValuationClick () {
				valuationTab.click();
				valuationForm.scrollIntoView({behavior: 'smooth', block: 'start'});
			}
			const valuationTab = document.querySelector('.sell__tab a[href="#valuation"]');
			const valuationForm = document.querySelector('.sell__valuation-form-title');
			if (valuationTab && valuationForm) {
				sellButtonValuation.forEach(button => button.addEventListener('click', sellButtonValuationClick));
			}
		}

		const sellStepButtons = document.querySelectorAll('.sell__step-button');
		const sellSteps = document.querySelectorAll('.sell__step');
		if (sellStepButtons && sellStepButtons.length && sellSteps && sellSteps.length) {
			function sellStepButtonClick () {
				if (this.dataset && this.dataset.step) {
					const step = this.dataset.step;
					sellSteps.forEach(step => step.style.display = 'none');
					const stepActive = document.querySelector('#sell__step-' + step);
					if (stepActive) {
						stepActive.style.display = 'block';
						if (this.classList.contains('sell__step-button--next')) { // bottom buttons -> scroll up to the step top
							document.body.classList.add('autoscroll');
							stepActive.scrollIntoView ({behavior: 'smooth', block: 'nearest'});
							setTimeout(() => {
								document.body.classList.remove('autoscroll');
							}, 500);
						}
					}
					sellStepButtons.forEach(button => {
						if (button.dataset && button.dataset.step && button.dataset.step <= step) {
							button.classList.add('filled');
						} else {
							button.classList.remove('filled');
						}
					});
				}
			}
			sellStepButtons.forEach(button => button.addEventListener('click', sellStepButtonClick));
		}
	}
});

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
		$('.modal').modal();
		$('.modal-gallery').modal({
			opacity: .75,
			onCloseStart: (el) => {
				const carouselElement = el.querySelector('.modal-gallery__carousel');
				if (carouselElement) {
					const carousel = M.Carousel.getInstance(carouselElement);
					if (carousel) carousel.destroy();
				}
			},
			onOpenEnd: (el) => {
				$(el).find('.modal-gallery__carousel').carousel({
					fullWidth: true,
					indicators: true,
					onCycleTo: function(item, dragged) {}
				});
			}
		});
		$('.datepicker').datepicker();
		$('.tabs').tabs();
		$('.timepicker').timepicker();
		$('.tooltipped').tooltip();
		$('select')
			.not('.disabled')
			.formSelect();
		$('.sidenav').sidenav();
		$('input.autocomplete').autocomplete({
			data: { 'Movie 01': 'Movie01', 'Movie 02': 'Movie02', 'Movie 3': 'Movie3' }
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
	// out.style.position = 'fixed';
	// out.style.bottom = '40px';
	// out.style.left = '40px';
	// out.style.background = 'white';
	// out.style.zIndex = '2000';
	// document.body.append(out);

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
					if (previousScroll - currentScroll > HEADER_THRESHOLD) {
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
	const menu = document.querySelector('.header__menu');
	const menuItems = document.querySelectorAll('.header__menu-link');
	let menuOpenTimer;
	function menuClickOutside (e) {
		const inside = e.target.closest('.header__menu');
		if (!inside) menuClose();
	}
	function menuOpen (e) {
		if (menu) menu.classList.add('active');
		if (menuItems) menuItems.forEach(item => item.classList.remove('active'));
		e.target.classList.add('active');
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
			item.addEventListener('mousemove', move);
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
	$('.product__slider').carousel({
		onCycleTo: function(item, dragged) {}
	});
});

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
			data: { 'Movie 01': null, 'Movie 02': null, 'Movie 3': 'https://dummyimage.com/100x100/00838f/fff&text=img' }
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

	// HEADER
	const HEADER_THRESHOLD = 100;
	let previousScroll = 0;
	function resize () {
		const header = document.querySelector('header');
    	const headerMain = document.querySelector('.header__main');
		if (header && headerMain) {
			const top = headerMain.offsetTop;
			const bottom = header.offsetHeight;
			document.body.addEventListener('scroll', M.throttle(() => {
				const currentScroll = document.body.scrollTop;
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
				}
			}, 100));
		}
	}
	resize();
	window.addEventListener('resize', resize);

	// HEADER ACCOUNT DROPDOWN
	const account = document.querySelectorAll('.header__account');
	if (account) M.Dropdown.init(account, { alignment: 'right' });

	// MENU
	const menu = document.querySelector('.header__menu');
	const menuItems = document.querySelectorAll('.header__menu-link');
	if (menu && menuItems) {
		function clickOutside (e) {
			const inside = e.target.closest('.header__menu');
			if (!inside) {
				close();
			}
		}
		function close () {
			menu.classList.remove('active');
			menuItems.forEach(item => item.classList.remove('active'));
			document.removeEventListener('click', clickOutside);
		}
		function click (e) {
			if (e.target.classList.contains('active')) {
				close();
			} else {
				menu.classList.add('active');
				menuItems.forEach(item => item.classList.remove('active'));
				e.target.classList.add('active');
				document.addEventListener('click', clickOutside);
			}
		}
		menuItems.forEach(item => item.addEventListener('click', click));
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
});

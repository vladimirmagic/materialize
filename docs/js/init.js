(function($) {
  $(function() {
    var window_width = $(window).width();

    // convert rgb to hex value string
    function rgb2hex(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) {
        return rgb;
      }

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      if (rgb === null) {
        return 'N/A';
      }

      function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
      }

      return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    $('.dynamic-color .col').each(function() {
      $(this)
        .children()
        .each(function() {
          var color = $(this).css('background-color'),
            classes = $(this).attr('class');
          $(this).html('<span>' + rgb2hex(color) + ' ' + classes + '</span>');
          if (classes.indexOf('darken') >= 0 || $(this).hasClass('black')) {
            $(this).css('color', 'rgba(255,255,255,.9');
          }
        });
    });

    // Floating-Fixed table of contents
    setTimeout(function() {
      var tocWrapperHeight = 260; // Max height of ads.
      var tocHeight = $('.toc-wrapper .table-of-contents').length
        ? $('.toc-wrapper .table-of-contents').height()
        : 0;
      var socialHeight = 95; // Height of unloaded social media in footer.
      var footerOffset = $('body > footer').first().length
        ? $('body > footer')
            .first()
            .offset().top
        : 0;
      var bottomOffset = footerOffset - socialHeight - tocHeight - tocWrapperHeight;

    }, 100);

    // BuySellAds Detection
    // var $bsa = $('.buysellads'),
    //   $timesToCheck = 3;
    // function checkForChanges() {
    //   if (!$bsa.find('#carbonads').length) {
    //     $timesToCheck -= 1;
    //     if ($timesToCheck >= 0) {
    //       setTimeout(checkForChanges, 500);
    //     } else {
    //       var donateAd = $(
    //         '<div id="carbonads"><span><a class="carbon-text" href="#!" onclick="document.getElementById(\'paypal-donate\').submit();"><img src="images/donate.png" /> Help support us by turning off adblock. If you still prefer to keep adblock on for this page but still want to support us, feel free to donate. Any little bit helps.</a></form></span></div>'
    //       );

    //       $bsa.append(donateAd);
    //     }
    //   }
    // }
    // checkForChanges();

    // BuySellAds Demos close button.
    $('.buysellads.buysellads-demo .close').on('click', function() {
      $(this)
        .parent()
        .remove();
    });

    // Github Latest Commit
    if ($('.github-commit').length) {
      // Checks if widget div exists (Index only)
      $.ajax({
        url: 'https://api.github.com/repos/dogfalo/materialize/commits/v1-dev',
        dataType: 'json',
        success: function(data) {
          var sha = data.sha,
            date = jQuery.timeago(data.commit.author.date);
          if (window_width < 1120) {
            sha = sha.substring(0, 7);
          }
          $('.github-commit')
            .find('.date')
            .html(date);
          $('.github-commit')
            .find('.sha')
            .html(sha)
            .attr('href', data.html_url);
        }
      });
    }

    // Toggle Flow Text
    var toggleFlowTextButton = $('#flow-toggle');
    toggleFlowTextButton.click(function() {
      $('#flow-text-demo')
        .children('p')
        .each(function() {
          $(this).toggleClass('flow-text');
        });
    });

    //    Toggle Containers on page
    var toggleContainersButton = $('#container-toggle-button');
    toggleContainersButton.click(function() {
      $('body .browser-window .container, .had-container').each(function() {
        $(this).toggleClass('had-container');
        $(this).toggleClass('container');
        if ($(this).hasClass('container')) {
          toggleContainersButton.text('Turn off Containers');
        } else {
          toggleContainersButton.text('Turn on Containers');
        }
      });
    });

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

    // Set checkbox on forms.html to indeterminate
    var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
    if (indeterminateCheckbox !== null) indeterminateCheckbox.indeterminate = true;

    // CSS Transitions Demo Init
    if ($('#scale-demo').length && $('#scale-demo-trigger').length) {
      $('#scale-demo-trigger').click(function() {
        $('#scale-demo').toggleClass('scale-out');
      });
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

    $('.dropdown-trigger:not(.header__account)').dropdown();
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
    if ($('#tabs-swipe-demo').length) {
      $('#tabs-swipe-demo').tabs({ swipeable: true });
    }

    // Fab
    $('.fixed-action-btn').floatingActionButton();
    $('.fixed-action-btn.horizontal').floatingActionButton({
      direction: 'left'
    });
    $('.fixed-action-btn.click-to-toggle').floatingActionButton({
      direction: 'left',
      hoverEnabled: false
    });
    $('.fixed-action-btn.toolbar').floatingActionButton({
      toolbarEnabled: true
    });
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
	M.Dropdown.init(account, { alignment: 'right' });

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
});

document.addEventListener('DOMContentLoaded', () => {
    let URL_PROPSTORE = 'https://new.propstore.com/';
    if (window.location.href.includes('localhost')) URL_PROPSTORE = 'http://propstore.loc/';

    const params = new URLSearchParams(window.location.search);
    const paramsUrl = params.get('url');
    if (paramsUrl) redirectPage(paramsUrl);

	if (window.location.href.includes('#nomaterialize')) { // don't materialize
		document.querySelectorAll('[data-v2]').forEach(item => item.remove());
		return;
	}
	const svgSprite = document.createElement('div');
	svgSprite.id = 'svg-sprite';
	document.body.append(svgSprite);
	const loaded = function () { document.body.classList.add('loaded') };
	if (typeof fetch != "undefined") fetch('https://propstore-ui.netlify.app/dist/defs/svg/sprite.defs.svg', { cache: 'force-cache' })
		.then(response => response.text())
		.then(html => { svgSprite.innerHTML = html; loaded(); })
		.catch(loaded);

	$(function () {
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

        // $('#headsec').remove();
        $('body').prepend($('.auc-header'));
        $('body').append($('.auc-sidenav'));
        $('<main>').append($('#wrapper')).insertAfter($('.auc-header'));
        if (!$('.container').length) $('#wrapper').append('<div class="container">');

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * PRODUCT
 */

		if ($('body').hasClass('lot-details-index')) {
			$('footer').append(`
    <div class="product aucproduct">
        <div class="product__inner">
            <div class="product__gallery">
                <div class="product__slider">
                    <div class="carousel-item modal-trigger" href="#modal-product-gallery"></div>
                </div>
                <div class="product__thumbnails">
                    <div class="product__thumbnails-scroll">
                        <div class="product__thumbnail modal-trigger" href="#modal-product-gallery"></div>
                    </div>
                </div>
                <div id="modal-product-gallery" class="modal-gallery">
                    <div class="modal-gallery__carousel">
                        <div class="carousel-item"></div>
                    </div>
                </div>
            </div>
            <div class="product__info">
                <div class="product__number"></div>
                <div class="product__title h2"></div>

                <div class="aucproduct__details">
                    <div class="aucproduct__details-line"></div>
                </div>

                <div class="aucproduct__button"></div>

                <div class="aucproduct__form" style="display: none;"></div>
                
                <div class="product__buttons-grey" style="display: none;">
                    <span class="product__button-grey waves-effect waves-grey btn btn--secondary" id="modal-shipping-quote-button">
                        <i class='icon'><svg><use xlink:href="#globe"></use></svg></i>
                        <span class="product__buttons-grey-small">Get</span> Shipping Quote
                    </span>
                </div>

                <ul class="product__details collapsible expandable">
                    <li class="product__detail active">
                        <div class="product__detail-title collapsible-header">
                            Our expert’s notes
                            <i class='icon icon--dropdown'><svg><use xlink:href="#drop"></use></svg></i>
                        </div>
                        <div class='collapsible-body'></div>
                    </li>
                </ul>

                <div class="aucproduct__buttons">
                    <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-buyers-guide">
                        <span class="hide-on-small-only">Buyers</span> guide
                    </a>
                    <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-shipping">
                        Shipping info
                    </a>
                    <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-terms">
                        Terms
                    </a>
                </div>

                <a class="product__certificate" href="https://propstore.com/certificate-of-authenticity/" style="display: none;">
                    <div class="product__certificate-icon">
                        <svg class="product__certificate-img"><use xlink:href="#big-authentic"></use></svg>
                    </div>
                    <div class="product__certificate-info">
                        This item comes with a Propstore
                        <span class="product__certificate-link">Certificate of Authenticity</span>
                    </div>
                </a>

                <div class="aucproduct__certificate" style="display: none;"></div>

                <div class="share product__share">
                    <span class="share__title">
                        Share
                    </span>
                    <a href="https://www.facebook.com/share.php?u=" target="_blank" rel="noreferrer" class="waves-effect btn-flat btn--icon share__item">
                        <i class='icon'><svg><use xlink:href="#follow-facebook"></use></svg></i>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=" target="_blank" rel="noreferrer" class="waves-effect btn-flat btn--icon share__item">
                        <i class='icon'><svg><use xlink:href="#follow-twitter"></use></svg></i>
                    </a>
                    <a href="https://www.pinterest.ru/pin/create/button/?url=" target="_blank" rel="noreferrer" class="waves-effect btn-flat btn--icon share__item">
                        <i class='icon'><svg><use xlink:href="#share-pinterest"></use></svg></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="also-like aucproduct__also">
        <div class="also-like__title h3">Other lots in this auction</div>
        <div class="cards">
          <div class="cards__inner">
            <div class="cards__list"></div>
            <div class="also-like__arrows">
                <a href="#left" class="also-like__arrow also-like__arrow--left"></a>    
                <a href="#right" class="also-like__arrow also-like__arrow--right"></a>    
            </div>
          </div>
        </div>
      </div>

    <div id="modal-buyers-guide" class="modal">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal-content"></div>
    </div>

    <div id="modal-shipping" class="modal">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal-content"></div>
    </div>

    <div id="modal-terms" class="modal">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal-content"></div>
    </div>
        `);

			let status;
			if ($('.sale-closed').length) status = 'closed';

            requestAnimationFrame(() => {
                const heroImage = window.getComputedStyle(document.querySelector('.hero__image'));
                const aucPoster = window.getComputedStyle(document.querySelector('.bodybox'), ':before');
                const backgroundImage = aucPoster.backgroundImage !== 'none' ? aucPoster.backgroundImage : heroImage.backgroundImage;
                $('.hero__image').css({ backgroundImage });
                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
            });

			$aucTitle = $('.tle-lot h3').clone();
			$aucTitle.find('span').remove();
			$('.hero__static-title').html($aucTitle.text());
            $('.sale-date').find('br').remove();
			$('.hero__static-date').append($('.sale-date').first()).show();
			if (status) {
				$badge = $('.auc__hero .badge');
				switch (status) {
					case 'closed':
						$badge.addClass('red').append('Closed').show().find('use').attr('xlink:href', '#flag');
						break;
				}
			}

			$itemTitleH = $('.tle-lot + h3');
			$itemTitle = $itemTitleH.find('.lot-name');
			$itemTitleH.find('.lot-name').remove();
			$('.product__number').html($itemTitleH.text());
			$('.product__title').html($itemTitle.text());
			$('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href')).show();
			$('.auc__hero-auccatalog').attr('href', $('.catlg').attr('href')).show();

			$carouselItem = $('.product__slider .carousel-item').clone();
			$slider = $('.product__slider').html('');
			$thumbnailsItem = $('.product__thumbnail').clone();
			$thumbnails = $('.product__thumbnails-scroll').html('');
			$galleryItem = $('.modal-gallery__carousel .carousel-item').clone();
			$gallery = $('.modal-gallery__carousel').html('');

			$('.image-thumb-slide').each((i, item) => {
				const img = { backgroundImage: 'url(' + item.href + ')' };
                const imgPrev = { backgroundImage: 'url(' + item.dataset.image.replace('_8.', '_9.') + ')' };
				$carouselItemNew = $carouselItem.clone();
				$slider.append($carouselItemNew.css(imgPrev));
				$thumbnailsItemNew = $thumbnailsItem.clone();
				$thumbnails.append($thumbnailsItemNew.css(imgPrev));
				$galleryItemNew = $galleryItem.clone();
				$gallery.append($galleryItemNew.css(img));
			});

			$detailsLine = $('.aucproduct__details-line').clone();
			$details = $('.aucproduct__details');
			$details.html('');

            $curBidLabel = $('#bidStatus');
            if ($curBidLabel.length) {
                $lineCurBid = $detailsLine.clone();
				$lineCurBid.append($curBidLabel, ' ', $('#currentBid'), ' ', $('#bidHistory'));
				$details.append($lineCurBid);
            }

            $askingLabel = $('.askingbid');
            if ($askingLabel.length) {
                $lineAsking = $detailsLine.clone();
                $lineAsking.append($askingLabel, ' ', $('<strong>').append($('#asking').parent('span')));
				$details.append($lineAsking);
            }

            $estimateTimed = $('#estimate-timed');
            if ($estimateTimed.length) {
                $lineEstimateTimed = $detailsLine.clone();
                $estimateTimedLabel = $estimateTimed.find('span:first-child');
                $estimateTimedLabel.appendTo($lineEstimateTimed);
                $lineEstimateTimed.append(': ', $('<strong>').append($estimateTimed.html()));
				$details.append($lineEstimateTimed);
            }

            $timeLeft = $('.time-left');
            if ($timeLeft.length) {
                $lineTimeLeft = $detailsLine.clone();
                $lineTimeLeft.append($timeLeft);
				$details.append($lineTimeLeft);
            }

            $nextBid = $('.bidfrm .next-bid');
            if ($nextBid.length) {
                $nextBid.addClass('waves-effect waves-light btn aucproduct__form-item');
                $('.aucproduct__button').show().append($nextBid);
            }

            $bidInput = $('.maxbid');
            if ($bidInput.length) {
                $bidInput.addClass('aucproduct__form-item');
                $('.aucproduct__form').show().append($bidInput);
            }

            $btnPlaceBid = $('.bidfrm .place-bid');
            if ($btnPlaceBid.length) {
                $btnPlaceBid.addClass('waves-effect waves-light btn aucproduct__form-item');
                $('.aucproduct__form').show().append($btnPlaceBid);

                let val = $btnPlaceBid.val(); 
                if (val.includes('Login to bid')) {
                    $btnPlaceBid[0].onclick = null;
                    $btnPlaceBid.val('Sign in to bid')
                        .on('click', function (e) {
                            e.preventDefault();
                            openSSO();
                        });
                }
            }

			$win = $('#lac28, #oai21');
			if ($win.length) {
				$winVal = $win.find('span');
                $win.find('span').remove();
                $lineWin = $detailsLine.clone();
				$lineWin.html($win.text());
                if ($winVal.length) {
				    $winVal.append(' ').append($('.biddingHistoryLink'));
                    $lineWin.html($lineWin.html() + ' <strong>' + $winVal.html() + '</strong>');
                }
				$details.append($lineWin);
			}

			$estimate = $('.estimate');
			$estimateVal = $('.estimate-val');
			if ($estimate.length && $estimateVal.length) {
				$lineEstimate = $detailsLine.clone();
				$lineEstimate.html($estimate.text() + ' <strong>' + $estimateVal.html() + '</strong>');
				$details.append($lineEstimate);
			}

            $barcode = $('#barcode');
            if ($('#shippingQuote').length && $barcode.length) {
                $('.product__buttons-grey').show();
                $('#modal-shipping-quote-button').on('click', openModalShippingQuote);

                function getBarcodeFromJS() {
                    let barcode = '';
                    $('.description-info-content').find('*')
                        .contents().each((i, element) => {
                           if (element.nodeType == 3) {
                                const arr = element.textContent.split('/proxy/shipping-quote/');
                                if (arr.length > 1) {
                                    barcode = parseInt(arr[1], 10);
                                }
                           }
                        });
                    return barcode;
                };

                function openModalShippingQuote () {
                    let barcode = $barcode.val();
                    if (!barcode) barcode = getBarcodeFromJS(); // its for staging only, i guess
                    const url = URL_PROPSTORE + 'modalShippingQuote.action?product=' + barcode;
                    let param = null;
                    const w = window.screen.width;
                    const h = window.screen.height;
                    if (w > 1224) {
                        param = `width=${w-200},height=${h-200},left=100,top=100,menubar=1,toolbar=1,location=1,status=1`;
                    }
                    window.open(url, 'Propstore Shipping Quote', param);
                }
            }

            $watchlist = $('#watchlist_button');
            if ($watchlist.length) {
                $watchlist.addClass('waves-effect waves-grey btn btn--secondary product__button-grey');
                $watchlist.find('.remove-watch').html('<i class="icon"><svg><use xlink:href="#heart-fill"></use></svg></i> <span class="product__buttons-grey-small">In</span> Watchlist');
                $watchlist.find('.add-watch').html('<i class="icon"><svg><use xlink:href="#heart"></use></svg></i> <span class="product__buttons-grey-small">Add to</span> Watchlist');
                $('.product__buttons-grey').show().append($watchlist);
            }

			$('.product__detail .collapsible-body').append($('.l1desctextwhite, .l2desctextwhite, .l3desctextwhite'));
			$('#modal-buyers-guide .modal-content').append($('#buyers-content'));
			$('body').append($('#modal-buyers-guide'));

			$('#modal-shipping .modal-content').append($('.shipping-info-content'));
			$('body').append($('#modal-shipping'));

			$('#modal-terms .modal-content').append($('.terms-content'));
			$('body').append($('#modal-terms'));

			if ($('.description-info-content :contains("Certificate of Authenticity")').length) {
				$('.product__certificate').show();
			}
			$originalNote = $('.description-info-content p:contains("used in the production")');
			if ($originalNote.length) {
				$('.aucproduct__certificate').html($originalNote.html()).show();
			}

			$('.share__item').each((index, item) => {
				item.href += window.location.href;
			});

			$('.container').prepend($('.aucproduct__also'));
			$('.container').prepend($('.aucproduct'));
			$('.container').prepend($('.auc__hero').show());

			// PRODUCT
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

            setInterval(() => { // listen ajax updates
                $others = $('#pnlOtherLots .lot');
                if ($others.length) {
                    $list = $('.cards__list');
                    $list.html('');
                    $others.each((index, item) => {
                        $img = $('<div class="card__img">');
                        $img.css('background-image', 'url(' + $(item).find('.other-lots-image').prop('src').replace('_4.', '_2.') + ')');
                        $title = $('<div class="card__movie">').html($(item).find('.lot-description-timed').html());
                        $list.append($(item).addClass('card aucproduct__card').html('').append($img, $('<div class="card__info">').append($('<div class="card__description">').append($title))));
                    });
                }
            }, 1000);

            $('.also-like__arrow--left').on('click', function (e) {
                e.preventDefault();
                $('#prev')[0].click();
            });

            $('.also-like__arrow--right').on('click', function (e) {
                e.preventDefault();
                $('#next')[0].click();
            });

            function giveLotViewCalendarButtonsLinks(){
                const lotName = $itemTitle.text();
                const $outlookCalendarBtn = $('#outlookCalendarBtn');
                $outlookCalendarBtn.html('Outlook');
                const outlookHref = generateICSFileURL(escape(lotName), window.location.href);
                $outlookCalendarBtn.on('click', function(e){
                    e.preventDefault();
                    window.open(outlookHref, '_blank');
                });

                const $googleCalendarBtn = $('#googleCalendarBtn');
                $googleCalendarBtn.html('Google');
                const googleHref = generateGoogleCalendarURL(lotName, window.location.href);
                $googleCalendarBtn.on('click', function(e){
                    e.preventDefault();
                    window.open(googleHref, '_blank');
                });

                const $textReminderBtn = $('#textReminderBtn');
                $textReminderBtn.html('Text');

                $('.calendarBtn').addClass('waves-effect waves-grey btn btn--secondary');
                $('<div class="aucproduct__calendar">').insertAfter('.product__buttons-grey')
                    .append('<div class="aucproduct__calendar-title h5">Add reminder</div>')
                    .append($('#calendarBtnBox'));
            }
            giveLotViewCalendarButtonsLinks();
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * INDEX
 */
		} else if ($('body').hasClass('index-index') || $('body').hasClass('auctions-index')) {
            $('footer').append(`
        <div class="auccatalog__nav auccatalog__nav--index">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
                    <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
                    <div class="input-field input-field--select"></div>
                </div>
                <div class="auccatalog__nav-paginator"></div>
            </div>
        </div>
        `);
			document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

            $itemsPerPage = $('#alf5').attr('style', '').clone();
            $('#alf5').addClass('browser-default');
            $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
			$('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
			$('.auccatalog__nav-paginator').append($('#c2_ctl'));
            const $pageselector = $('<div class="input-field input-field--select">');
			if ($('.pageselector').length > 1) {
                $('.pageselector:last-child').remove();
            }
            $pageselector.append($('.pageselector'));
            $('.auccatalog__nav-paginator').append($pageselector);
            $('main').prepend($('.auccatalog__nav'));
            $('main').append($('.auccatalog__nav').clone().addClass('auccatalog__nav--footer'));

            $('.auccatalog__nav-perpage-select').on('change', function (e) {
                e.preventDefault();
                const options = $(e.currentTarget).find('option').toArray();
                const itemsPerPage = document.querySelector("#alf5");
                $('#alf5').find('option[selected]').attr('selected', false);
                options.forEach((option, index) => {
                    if (option.selected) {
                        itemsPerPage.value = option.value;
                        $('#alf5').find('option')[index].selected = true
                        itemsPerPage.dispatchEvent(new Event("change"));
                    }
                })
            });

			$('.auclting').each((i, item) => {
				$title = $(item).find('h6');
				$title.addClass('h2')
				const path = $title.find('a').prop('href').split('auctions/info/id/');
				const idString = path.length > 1 ? path[1].split('/') : '';
				const id = idString.length > 1 ? idString[0] : idString || 0;
				if (!id) return;

				$img = $(item).find('.aucimg a');
				$img.addClass('auclting__img').css('background-image', 'url(' + $img.find('img').prop('src') + ')');
				$desc = $(item).find('.aucdes');
				$badge = $desc.find('#auc' + id).hide();
				$badgeNew = $('<span class="badge auclting__badge">');
				if ($badge.find('.in-progress').length) {
					$badgeNew.addClass('green').append(`<i class="icon"><svg><use xlink:href="#live"></use></svg></i>Live`);
				} else if ($badge.find('.ended').length) {
					$badgeNew.addClass('red').append(`<i class='icon'><svg><use xlink:href="#flag"></use></svg></i>Ended`);
				} else {
					$badgeNew.addClass('orange').append(`<i class='icon'><svg><use xlink:href="#clockwise"></use></svg></i>Upcoming`);
				}
				const $bidder = $(item).find('.bidder-status, .bidder-status-closed');
				if ($bidder.length) {
					const $text = $('<div class="auclting__text">');
					$text.append($bidder);
					$desc.append($text);
				}

				$desc.prepend($badgeNew);

				$type = $('<div class="auclting__type"><i class="icon"><svg><use xlink:href="#auction-line"></use></svg></i></div>');
				$type.append($desc.find('#sale' + id));
				$date = $('<div class="auclting__date"><i class="icon"><svg><use xlink:href="#calendar"></use></svg></i></div>');
				$date.append($desc.find('#aucdate' + id));
				$lots = $('<div class="auclting__lots"><i class="icon"><svg><use xlink:href="#ticket"></use></svg></i></div>');
				$lots.append($desc.find('p+p').text());
				$details = $('<div class="auclting__details">');
				$details.append($type).append($date).append($lots);
				$details.insertAfter($title);

				$desc.append($(item).find('.auclink'));

                $reg = $(item).find('.reg');
                if ($reg.length) {
                    $reg[0].onclick = null;
                    $reg.addClass('waves-effect waves-light btn')
                        .on('click', function (e) {
                            e.preventDefault();
                            openAuctionRegistration(id);
                        });
                    let html = $reg.html(); 
                    if (html.includes('Login to bid')) {
                        $reg.html('Sign in to bid').addClass('auc-button--signin');
                    } else if (html.includes('Register to bid!')) {
                        $reg.html('Register for the auction').addClass('auc-button--registerauc');
                    }
                }
				$cat = $(item).find('.cat');
                if ($cat.length) {
                    $cat.html($cat.html().replace('View catalog', 'View catalogue items'));
                    $cat.addClass('waves-effect waves-grey btn btn--secondary');
                }
			});

            $('.filters').hide();
            $('.hero__static-text').show();
            $('main').prepend($('.auc__hero').show());
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * CATALOG
 * SEARCH
 * MY ITEMS
 */
		} else if ($('body').hasClass('auctions-catalog') || $('body').hasClass('search-index') || $('body').hasClass('my-items')) {
			$('footer').append(`
    <div class="auccatalog">
        <div class="auccatalog__search h1">Advanced Search</div>
        <div class="auccatalog__nav">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
                    <div class="auccatalog__nav-perpage-label c-r">Lots per page</div>
                    <div class="input-field input-field--select"></div>
                </div>
                <div class="auccatalog__nav-results c-r"></div>
                <div class="auccatalog__nav-paginator"></div>
                <div class="auccatalog__nav-view"></div>
            </div>
        </div>

        <div class="cards">
          <div class="cards__inner">
            <div class="auccatalog__search-panel"></div>
            <div class="cards__list">
                <div class="card aucproduct__card">
                    <div class="card__img">
                        <span class="heart card__heart" style="display: none;"></span>
                        <span class="badge card__badge" style="display: none;">
                            <i class="icon"><svg><use xlink:href="#"></use></svg></i>
                        </span>
                    </div>
                    <div class="card__info">
                        <div class="card__description">
                            <div class="card__movie"></div>
                            <div class="aucproduct__card-details"></div>
                        </div>
                        <div class="card__actions"></div>
                        <div class="card__bid"></div>
                    </div>
                </div>
            </div>
            
          </div>
        </div>


        <div class="auccatalog__nav auccatalog__nav--footer">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage auccatalog__nav-perpage--footer">
                    <div class="auccatalog__nav-perpage-label c-r">Lots per page</div>
                    <div class="input-field input-field--select"></div>
                </div>
                
                <div class="auccatalog__nav-paginator"></div>
            </div>
        </div>

      </div>
        `);

			let status;
			if ($('.sale-closed').length) status = 'closed';

			requestAnimationFrame(() => {
                const heroImage = window.getComputedStyle(document.querySelector('.hero__image'));
                const aucPoster = window.getComputedStyle(document.querySelector('#AdvancedSearch'), ':before');
                const backgroundImage = aucPoster.backgroundImage !== 'none' ? aucPoster.backgroundImage : heroImage.backgroundImage;
                $('.hero__image').css({ backgroundImage });
                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
            });

			const $searcContent = $('.advSearchAccordionContent');
			const $searchKey = $('<div class="input-field">');
			$searchKey.append($('#advsKey_ctl'));
			$searcContent.prepend($searchKey);
			const $searchInner = $('#ads01 > .adsrch').addClass('collapsible-body');
			const $searchHeader = $('.advSearchAccordionButton').addClass('auccatalog__search-panel-title collapsible-header');
			$searchHeader.find('h3').addClass('h4');
			$searchHeader.append('<i class="icon"><svg><use xlink:href="#close"></use></svg></i>');
			const $searchLi = $('<li class="collapsible-li">').append($searchHeader).append($searchInner);
			$('#ads01').addClass('collapsible').append($searchLi);
			$('#advsSearch').addClass('waves-effect waves-light btn btn--tertiary auccatalog__search-btn');

            const $saleSelect = $('#advsSale');
            if ($saleSelect.length) {
                const $saleSelectContainer = $saleSelect.closest('section.auctions');
                const $searchSale = $('<div class="input-field input-field--label input-field--select">');
                $searchSale.append($saleSelectContainer.find('label').addClass('active')).append($saleSelect);
                $saleSelectContainer.append($searchSale);
                $saleSelectContainer.find('.drplist').hide();
            }

			const $searchSort = $('<div class="input-field input-field--label input-field--select">');
			$searchSort.append($('section.sort-by label').addClass('active')).append($('#advsSort'));
			$('section.sort-by').append($searchSort);
			$('section.sort-by .drplist').hide();

			$('#adv_search_categories .scroll-list').addClass('auccatalog__search-panel-checkboxes');
			$('#adv_search_categories > label').addClass('h6');
			$('#adv_search_categories .accordion-header').click();
			// $('#adv_search_categories .scroll-list').show();

			const $searchMatch = $('<div class="input-field input-field--label input-field--select">');
			$searchMatch.append($('.categories-match label').addClass('active')).append($('#advsCatMatch'));
			$('.categories-match').append($searchMatch);
			$('#advsCatMatch_ctl').hide();

            $('.auction-type').insertBefore('.sort-by');
            $('.auction-type > label').addClass('h6');

			const $searchPriceMin = $('<div class="input-field input-field--label">');
			$searchPriceMin.append($('#advsMinPrice')).append($('<label>Min price</label>'));
			const $searchPriceMax = $('<div class="input-field input-field--label">');
			$searchPriceMax.append($('#advsMaxPrice')).append($('<label>Max price</label>'));
			const $searchPrice = $('<div class="auccatalog__search-panel-row">');
			$searchPrice.append($searchPriceMin).append($searchPriceMax);
			const $searchPriceSource = $searcContent.find('.price-range');
			$searchPrice.insertAfter($searchPriceSource);
			$searchPriceSource.remove();

			const $searchLotSource = $searcContent.find('.lotnum');
			const $searchLot = $('<div class="input-field input-field--label">');
			$searchLot.append($searchLotSource.find('label').addClass('active')).append($('#advsLotNum_ctl'));
			$searchLotSource.append($searchLot);

			$('.auccatalog__search-panel').append($('#ads01'));

			const results = $('.page:contains("Results:")').html();
			$('.auccatalog__nav-results').html(results.replace('<b>Results:</b>&nbsp;Viewing&nbsp;items&nbsp;', 'Results:&nbsp;'));
			$('.auccatalog__nav-paginator').append($('#c2_ctl'));
			$('.pageselector').wrap('<div class="input-field input-field--select" />');
			$('.grid_list .com').remove();
			$('.grid_list .lst').html('<i class="icon"><svg><use xlink:href="#view-list"></use></svg></i>');
			$('.grid_list .sqr').html('<i class="icon"><svg><use xlink:href="#view-grid"></use></svg></i>');
			$('.auccatalog__nav-view').html($('.grid_list').html());

            $itemsPerPage = $('#c3').attr('style', '').clone();
            $('#c3').addClass('browser-default');
            $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
			$('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
            $('.auccatalog__nav-perpage--footer .input-field').append($itemsPerPage.clone());

            $('.auccatalog__nav-perpage-select').on('change', function (e) {
                e.preventDefault();
                const options = $(e.currentTarget).find('option').toArray();
                const itemsPerPage = document.querySelector("#c3");
                $('#c3').find('option[selected]').attr('selected', false);
                options.forEach((option, index) => {
                    if (option.selected) {
                        itemsPerPage.value = +option.value;
                        $('#c3').find('option').eq(index).attr('selected', true);
                        itemsPerPage.dispatchEvent(new Event("change"));
                    }
                })
            });

			$('.aucproduct__card-details').html();
			$card = $('.card').clone();
			$('.cards__list').html('').toggleClass('cards__list--list', $('.compact_container'));
            $('.cards').addClass(sam &&
                sam.serverData &&
                sam.serverData.variables &&
                sam.serverData.variables.default &&
                sam.serverData.variables.default.viewMode === 'list' ? 'cards--list' : 'cards--grid');


			$('.item-block').each((i, item) => {
				$cardItem = $card.clone();
                let bg = $(item).find('figure img').prop('src');
                if (bg) {
                    bg = bg.replace('_6.', '_2.');
                    $cardItem.find('.card__img').css('background-image', 'url(' + bg + ')');
                }
				$cardItem.find('.card__movie').append($(item).find('.yaaa'));
				$badge = $cardItem.find('.card__badge')
				if ($(item).find('.ended.sold').length) {
					$badge.addClass('red').append('Sold').show().find('use').attr('xlink:href', '#flag');
				} else if ($(item).find('.ended.unsold').length) {
					$badge.append('Unsold').show().find('use').attr('xlink:href', '#archive');
				} else if ($(item).find('.ended').length) {
					$badge.append('Closed').show().find('use').attr('xlink:href', '#archive');
				}
                
				$(item).find('.item-status').remove();
				$(item).find('.price-info li').each((k, info) => {
					const $info = $(info);
					if ($info.text()) {
						$info.find('.title').addClass('aucproduct__card-details-label');
						$info.find('.value').addClass('aucproduct__card-details-value');
						$info.addClass('aucproduct__card-details-row');
						$cardItem.find('.aucproduct__card-details').append($info);
					}
				});
				const $timelft = $(item).find('.timelft');
				if ($timelft.length && $timelft.text()) {
					$cardItem.find('.aucproduct__card-details').append(`<div class="aucproduct__card-details-row">
						<div class="aucproduct__card-details-label">Time Left</div>
						<div class="aucproduct__card-details-value aucproduct__card-details-timer"></div>
					</div>`);
					$cardItem.find('.aucproduct__card-details-timer').append($timelft);
				}
				const $btn = $(item).find('.auclistbtn .orng, .auclistbtn .grey');
				if ($btn.length) {
					$btn.addClass('waves-effect waves-light btn aucproduct__card-btn');
					$cardItem.find('.card__actions').append($btn);
				}
                const $bid = $(item).find('[id^="blkRegularBid"]');
                if ($bid.length) {
                    $curInput = $bid.find('.currency-input');
                    $curInputSpan = $('<div>');
                    $curInputSpan.append($curInput.find('span'));
                    $curInputLabel = $('<div class="currency-input__label">');
                    $curInputLabel.html($curInput.html());
                    $curInput.html('')
                    $curInput.append($curInputLabel);
                    $curInput.append($curInputSpan.find('span'));
                    $bid.find('input[type="button"]').addClass('waves-effect waves-light btn btn--tertiary');
                    $bid.find('input[type="text"]').attr('autocomplete', 'off');
                    $cardItem.find('.card__bid').append($bid.addClass('blkRegularBid'));
				}
                const $heart = $(item).find('.bd-chk');
                if ($heart.length) {
                    $cardItem.find('.heart').append($heart).show();
                    if ($heart.find('input').prop('checked')) $cardItem.addClass('card--liked');
                    $heart.find('input').on('change', function(e) {
                        $(e.target).closest('.card').toggleClass('card--liked', $heart.find('input').prop('checked'));
                    });
                }

                $cardItem.on('click', function(e) {
                    if (!$(e.target).is("input") && !$(e.target).is("a") && !$(e.target).closest('a').length) {
                        redirectPage($(e.target).closest('.card').find('.yaaa').attr('href'));
                    }
                });

				$('.cards__list').append($cardItem);
			});

			$('.container').prepend($('.auccatalog'));
            if ($('body').hasClass('auctions-catalog')) {
                $aucTitle = $('.tle h3').clone();
                $aucTitle.find('span').remove();
                $('.hero__static-title').html($aucTitle.text());
                $('.sale-date').find('br').remove();
                $('.hero__static-date').append($('.sale-date').first()).show();
                if (status) {
                    $badge = $('.auc__hero .badge');
                    switch (status) {
                        case 'closed':
                            $badge.addClass('red').append('Closed').show().find('use').attr('xlink:href', '#flag');
                            break;
                    }
                }
                $('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href')).show();
                $('.container').prepend($('.auc__hero').show());
            } else if ($('body').hasClass('my-items')) {
                $('.auccatalog__search').html('My Items');
                $('<div class="auccatalog__tabs" />').insertAfter('.auccatalog__search').append($('#tabnav'));
                $('#tabnav a').addClass('waves-effect btn-flat btn--rounded');
                $('.tab-my-items-all:not(.selected)').hide();
                requestAnimationFrame(() => {
                    function getNodesThatContain(text) {
                        var textNodes = $('.auccatalog__tabs, .auccatalog__nav').find('*')
                            .contents().filter(function() {
                               return this.nodeType == 3 && this.textContent.indexOf(text) > -1;
                            });
                        return textNodes.parent();
                    };
                    $item = getNodesThatContain('Item').add($('.auccatalog__search'));
                    $item.each((i, item) => {
                        item.innerHTML = item.innerHTML.replace('Item', 'Lot');
                    });
                    
                    $('.tabnav-tab.selected')[0].scrollIntoView({inline: 'center'});
                });
            }
            
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * BIDS
 */
 } else if ($('body').hasClass('auctions-bidding-history')) {
    $('footer').append(`
<div class="aucpage">
    <div class="aucpage__h1 h1"></div>
    <div class="auccatalog__nav">
        <div class="auccatalog__nav-inner">
            <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
                <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
                <div class="input-field input-field--select"></div>
            </div>
            <div class="auccatalog__nav-paginator"></div>
        </div>
    </div>
    <div class="aucpage__content"><div class="aucpage__content-inner"></div></div>
</div>
`);
    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

    $itemsPerPage = $('#bhPagesBottom').attr('style', '').clone();
    $('#bhPagesBottom').addClass('browser-default');
    $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
    $('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
    $('.auccatalog__nav-paginator').append($('#c3_ctl'));
    const $pageselector = $('<div class="input-field input-field--select">');
    if ($('.pageselector').length > 1) {
        $('.pageselector:last-child').remove();
    }
    $pageselector.append($('.pageselector'));
    $('.auccatalog__nav-paginator').append($pageselector);
    $('.aucpage').append($('.auccatalog__nav').clone().addClass('auccatalog__nav--footer'));

    $('.auccatalog__nav-perpage-select').on('change', function (e) {
        e.preventDefault();
        const options = $(e.currentTarget).find('option').toArray();
        const itemsPerPage = document.querySelector("#bhPagesBottom");
        $('#bhPagesBottom').find('option[selected]').attr('selected', false);
        options.forEach((option, index) => {
            if (option.selected) {
                itemsPerPage.value = option.value;
                $('#bhPagesBottom').find('option')[index].selected = true
                itemsPerPage.dispatchEvent(new Event("change"));
            }
        })
    });

    $('.aucpage__h1').html($('.ltitle h2').html());
    $('.aucpage__content-inner').append($('.tablesection'));

    $('.container').prepend($('.aucpage'));
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * INFO
 */
		} else if ($('body').hasClass('auctions-info')) {
            $('footer').append(`
    <div id="modal-shipping" class="modal">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal-content"></div>
    </div>

    <div id="modal-terms" class="modal">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal-content"></div>
    </div>
        `);
            const status = $('#status').text().toLowerCase();

            $badge = $('.auc__hero-badge');
            switch (status) {
                case 'upcoming': {
                    $badge.addClass('orange').append('Upcoming').find('use').attr('xlink:href', '#clockwise');
                    break;
                }
                case 'in progress': {
                    $badge.addClass('green').append('Live').find('use').attr('xlink:href', '#live');
                    break;
                }
                case 'closed': {
                    $badge.addClass('red').append('Closed').find('use').attr('xlink:href', '#flag');
                    break;
                }
            }

            $('.hero__static-title').html($('#name').text());

            let start_date = $('#start_date').text();
            if (start_date) {
                start_date = moment(start_date).format('D MMM h:mma');
                const start_date_tz_code = $('#start_date_tz_code').text();
                if (start_date_tz_code) start_date += ` (${start_date_tz_code})`;
            }

            let end_date = $('#end_date').text();
            if (end_date) {
                end_date = moment(end_date).format('D MMM h:mma');
                const end_date_tz_code = $('#end_date_tz_code').text();
                if (end_date_tz_code) end_date += ` (${end_date_tz_code})`;
            }

            if (start_date || end_date) {
                $('.hero__static-date').show().append([start_date, end_date].join(' &minus; '));
            }

            const time_left = $('#time_left').text();
            $timer = $('.hero__timer-panel');
            if (time_left) {
                let label = '';
                let time = '';
                let remain = 0;
                const kk = {
                    'd': 60 * 60 * 24,
                    'h': 60 * 60,
                    'm': 60,
                }
                for (let i = 0; i<time_left.length; i++) { // run string
                    if (Number(time_left[i]) > 0 || time_left[i] === '0') {
                        time += time_left[i];
                    } else {
                        if (time) {
                            const k = kk[time_left[i]] || 0;
                            remain += time * k;
                            time = '';
                        } else if (!remain) {
                            label += time_left[i];
                        }
                    }
                }
                $timer.show();
                // $('.hero__timer-panel-title').html(label);
                setTimer($timer, remain);
            }

            $('.auc-btn__register').attr('href', $('#register_to_bid_url').text());
            $('.auc-btn__catalog').attr('href', $('#catalog_url').text());

            $catalogueTimer = $('.sell-cta__catalog-timer');
            if ($catalogueTimer.length) {
                setTimer($catalogueTimer, $catalogueTimer.data('sec'));
            }

            $('.share__item').each((i, item) => {
                $(item).attr('href', $(item).attr('href') + $('#info_url').text());
            });
            
            if ($('.auc-info').length) { // new template
                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                $('.container').prepend($('.auc-info'));

                $('#modal-shipping .modal-content').append($('div.shipping'));
                $('body').append($('#modal-shipping'));

                $('#modal-terms .modal-content').append($('div.terms'));
                $('body').append($('#modal-terms'));
            } else {
                $('.container').prepend($('div.terms').removeClass('terms'));
                $('.container').prepend($('div.shipping').removeClass('shipping'));
                $('.container').prepend($('.desc').html());
            }
        }
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * SIGN IN, SIGN UP, FORGOT
 */
 if ($('body').hasClass('login') || $('body').hasClass('signup') || $('body').hasClass('forgot-password')) {
    if (window.opener) { // close modal window, becouse it is redirected from modal /logout
        window.opener.postMessage('SSOsuccess', '*');
        window.close();
    }
    redirectPage(URL_PROPSTORE + '/ajax/signIn.action' + window.location.search);
    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * NOT LOGGED IN
 */
if ($('#headsec a:contains("Auction Login")').length) {
    $('.header__settings .header__col--right').append(`
        <a href="/login" class="waves-effect btn-flat header__btn sso-trigger" data-url="/ajax/signIn.action">
            Sign In
        </a>
        <span class="header__settings-divider2 header__settings-divider2--unregistered">/</span>
        <a href="/signup" class="waves-effect btn-flat header__btn sso-trigger" data-url="/ajax/register.action">
            Register
        </a>
    `);
    $('.sidenav__settings').append(`
        <div class="sidenav__settings-sign-register">
            <a href="/login" class="waves-effect btn-flat modal-trigger sidenav__settings-sign sso-trigger" data-url="/ajax/signIn.action">Sign In</a>
            <span class="sidenav__settings-divider">/</span>
            <a href="/signup" class="waves-effect btn-flat modal-trigger sidenav__settings-register sso-trigger" data-url="/ajax/register.action">Register</a>
        </div>
    `);
    $('.menu-link-login').addClass('sso-trigger');
    $('.sso-trigger').on('click', function (e) {
        e.preventDefault();
        openSSO($(this).data('url'));
    });

} else {
    $('.header__settings .header__col--right').append(`
        <a href="/logout" class="waves-effect btn-flat header__btn signout-trigger">
            Sign Out
        </a>
    `);
    $('.sidenav__settings').append(`
        <div class="sidenav__settings-sign-register">
            <a href="/logout" class="waves-effect btn-flat signout-trigger">
                Sign Out
            </a>
        </div>
    `);
    $('.signout-trigger').on('click', function (e) {
        e.preventDefault();
        $('.loader-block').show();
        $.get('/logout')
            .always(data => {
                if (window.location.pathname.includes('/my-items/')) {
                    redirectPage('/');
                } else {
                    reloadPage();
                }
            });
        openPropstoreAndClose(URL_PROPSTORE + 'submitLogout.action?autoclose=true');
    });
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Redirect auction register
 */
const id = window.location.pathname.split('/register/confirm-shipping/id/');
if (id.length && id.length > 1) {
    window.location.href = URL_PROPSTORE + '/ajax/auctionRegistration.action?auctionId=' + id[1];
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Plugin initialization
 */
		$('.collapsible').collapsible({
			onOpenEnd: (el) => {
				const body = el.querySelector('.collapsible-body');
				if (body) body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
		M.updateTextFields();
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * HEADER
 */
		function resize() {
			headerFloat();
		}
		setTimeout(resize, 500);
		$(window).on('resize', resize);

		const HEADER_THRESHOLD = 100; // px
		let previousScroll = 0;
		function headerFloat() {
			if (!$('.header__main').length) return; // no header

			const $header = $('header');
			if ($header.length) {
				$header.css('maxWidth', $('main').width() + 'px');
				const top = 40; // px
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
						}
					}
				}, 100));
			}
		}

		function scrollToWarning () {
			const warning = document.querySelector('main .warning');
			if (warning) warning.scrollIntoView({behavior: 'smooth', block: 'center'});
		}
        requestAnimationFrame(scrollToWarning);

        function setTimer ($timer, seconds) {
			let day = 0;
            let hour = 0;
            let min = 0;
            let sec = seconds;
            if (seconds && seconds > 0) {
                const interval = setInterval(() => {
                    sec = --seconds;
                    if (sec <= 0) {
                        clearInterval(interval);
                        reloadPage();
                    }
                    day = Math.floor(sec / 60 / 60 / 24);
                    sec -= day * 60 * 60 * 24;
                    hour = Math.floor(sec / 60 / 60);
                    sec -= hour * 60 * 60;
                    min = Math.floor(sec / 60 );
                    sec -= min * 60;
                    $timer.find('.day').html(day);
                    $timer.find('.hour').html(hour);
                    $timer.find('.min').html(min);
                    $timer.find('.sec').html(sec);
                }, 1000);
            }
		}

        function openPropstoreAndClose (url) {
            const SSOwin = window.open(url, 'Propstore SSO', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1,height=1,top=2000`);
            setTimeout(() => SSOwin.close(), 1000);
        }

        function openSSO (action = '/ajax/signIn.action') {
            let url = URL_PROPSTORE + action;
            let param = null;
            const w = window.screen.width;
            const h = window.screen.height;
            if (w > 1224) {
                param = `width=${w-200},height=${h-200},left=100,top=100,menubar=1,toolbar=1,location=1,status=1`;
            }
            const win = window.open(url, 'Propstore Sign In', param);
            window.addEventListener('message', function(event) {
                if (event.data === 'reloadPage' || event.data === 'SSOerror') {
                    const queryString = window.location.search;
                    const params = new URLSearchParams(queryString);
                    const url = params.get('url');
                    if (url) {
                        redirectPage(url);
                    } else {
                        reloadPage();
                    }
                    win.close();
                }
            });
        }

        function openAuctionRegistration (id) {
            const url = URL_PROPSTORE + '/ajax/auctionRegistration.action?auctionId=' + id;
            let param = null;
            const w = window.screen.width;
            const h = window.screen.height;
            if (w > 1224) {
                param = `width=${w-200},height=${h-200},left=100,top=100,menubar=1,toolbar=1,location=1,status=1`;
            }
            const ssoWin = window.open(url, 'Propstore Auction Registration', param);
            window.addEventListener('message', function(event) {
                if (event.data === 'SSOsuccess') {
                    ssoWin.location.href = url;
                    reloadPage();
                } else if (event.data === 'reloadPage') {
                    reloadPage();
                }
            });
        }
        
        function reloadPage () {
            $('.loader-block').show();
            window.location.reload();
        }

        function redirectPage (url) {
            $('.loader-block').show();
            window.location.href = url;
        }

        if (window.opener && $('#messages').text().includes('SSO token error')) {
            window.opener.postMessage('SSOerror', '*');
            window.close();
        }

		document.body.classList.add('loaded'); // if svg fail
	}); // end of document ready
});

if (!generateGoogleCalendarURL) function generateGoogleCalendarURL(lotName, urlLink) {
    return 'NeedGenerateGoogleCalendarURL';
}

if (!generateICSFileURL) function generateICSFileURL(lotName, urlLink) {
    return 'NeedGenerateICSFileURL';
}

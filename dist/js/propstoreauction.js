document.addEventListener('DOMContentLoaded', () => {
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

        $('#headsec').remove();
        $('body').prepend($('.auc-header'));
        $('body').append($('.auc-sidenav'));
        $('<main></main>').append($('#wrapper')).insertAfter($('.auc-header'));

		if ($('body').hasClass('lot-details-index')) { // PRODUCT
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
                <a href="#movie" class="product__title h2"></a>

                <div class="aucproduct__details">
                    <div class="aucproduct__details-line"></div>
                </div>

                <div class="aucproduct__button"></div>

                <div class="aucproduct__form" style="display: none;"></div>
                
                <div class="product__buttons-grey" style="display: none;">
                    <a class="product__button-grey waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-shipping-quote">
                        <i class='icon'><svg><use xlink:href="#globe"></use></svg></i>
                        <span class="product__buttons-grey-small">Get</span> Shipping Quote
                    </a>
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

                <a class="product__certificate" href="#certificate" style="display: none;">
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

    <div id="modal-shipping-quote" class="modal modal-ajax modal-shipping-quote">
        <div class="modal-header modal-header--sticky">
            <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
        </div>
        <div class="modal__loader">
            <div class="preloader-wrapper active"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>
        </div>
        <form class="modal-content modal-form modal-shipping-quote-form" action="action"></form>
    </div>
        `);

			let status;
			if ($('.sale-closed').length) status = 'closed';

            requestAnimationFrame(() => {
                const heroImage = window.getComputedStyle(document.querySelector('.hero__image'));
                const aucPoster = window.getComputedStyle(document.querySelector('.bodybox'), ':before');
                $('.hero__image').css({ backgroundImage: heroImage.backgroundImage || aucPoster.backgroundImage });
                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
            });

			$aucTitle = $('.tle-lot h3').clone();
			$aucTitle.find('span').remove();
			$('.hero__static-title').html($aucTitle.text());
            $('.sale-date').find('br').remove();
			$('.hero__static-date').append($('.sale-date').first());
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
                const imgPrev = { backgroundImage: 'url(' + item.dataset.image.replace('_8.', '_2.') + ')' };
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
            }

			$win = $('#lac28');
			if ($win.length) {
				$winVal = $win.find('span');
				$win.find('span').remove();
				$winVal.append(' ').append($('.biddingHistoryLink'));
				$lineWin = $detailsLine.clone();
				$lineWin.html($win.text() + ' <strong>' + $winVal.html() + '</strong>');
				$details.append($lineWin);
			}

			$estimate = $('.estimate');
			$estimateVal = $('.estimate-val');
			if ($estimate.length && $estimateVal.length) {
				$lineEstimate = $detailsLine.clone();
				$lineEstimate.html($estimate.text() + ' <strong>' + $estimateVal.html() + '</strong>');
				$details.append($lineEstimate);
			}

            $shippingQuote = $('#shippingQuote');
            if ($shippingQuote.length) {
                $('.product__buttons-grey').show();

            }

            $watchlist = $('#watchlist_button');
            if ($watchlist.length) {
                $watchlist.addClass('waves-effect waves-grey btn btn--secondary product__button-grey');
                $watchlist.find('.remove-watch').html('<i class="icon"><svg><use xlink:href="#heart-fill"></use></svg></i> <span class="product__buttons-grey-small">In</span> Watchlist');
                $watchlist.find('.add-watch').html('<i class="icon"><svg><use xlink:href="#heart"></use></svg></i> <span class="product__buttons-grey-small">Add to</span> Watchlist');
                $('.product__buttons-grey').show().append($watchlist);
            }

			$('.product__detail .collapsible-body').html($('.l1desctextwhite').html());
			$('#modal-buyers-guide .modal-content').append($('#buyers-content'));
			$('body').append($('#modal-buyers-guide'));

			$('#modal-shipping .modal-content').append($('.shipping-info-content'));
			$('body').append($('#modal-shipping'));

			$('#modal-terms .modal-content').append($('.terms-content'));
			$('body').append($('#modal-terms'));

			if ($('.description-info-content :contains("Certificate of Authenticity")').length) {
				$('.product__certificate').show();
			}
			$originalNote = $('.description-info-content p:contains("original asset")');
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
			const productItems = [...document.querySelectorAll('.carousel-item')];
			const productThumbnails = [...document.querySelectorAll('.product__thumbnail')];
			if (productItems.length && productThumbnails.length) {
				const productSlider = $('.product__slider').carousel({
					onCycleTo: function (item, dragged) {
						const index = productItems.indexOf(item);
						const thumbnail = productThumbnails[index];
						if (thumbnail) {
							productThumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
							thumbnail.classList.add('active');
							// thumbnail.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'}); // scrolls on page load(
						}
					},
					onDestroy: function () {
						productThumbnails.forEach(thumbnail => {
							thumbnail.removeEventListener('mousemove', onClickProductThumbnail);
						});
					},
				});
				function onClickProductThumbnail(e) {
					const index = productThumbnails.indexOf(e.target);
					productSlider[0].M_Carousel.set(index);
				}
				productThumbnails.forEach(thumbnail => {
					thumbnail.addEventListener('mousemove', onClickProductThumbnail);
				});

				$('#modal-shipping-quote-country').formSelect({ dropdownOptions: { container: document.body } });
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
						onCycleTo: function (item, dragged) { }
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

            // MODAL SHIPPING QUOTE
            if ($('#modal-shipping-quote').length) {
                $('body').append($('#modal-shipping-quote'));
                $('#modal-shipping-quote').modal({ // load form on modal open
                    onOpenStart: function (el, trigger) {
                        el.classList.add('sync');
                        const $form = $(el).find('.modal-shipping-quote-form');
                        $.get('#')
                            .done(data => {
                                // $form.html(data);
                                M.updateTextFields();
                                $('#modal-shipping-quote-country').formSelect({dropdownOptions: {container: document.body}});
                                // grecaptchaRender('g-recaptcha-quote');
                            })
                            .fail(data => {
                                if (data && data.statusText) $form.html(data.statusText);
                            })
                            .always(data => {
                                setTimeout(() => {
                                    $form.html(`Need form here`);
                                    el.classList.remove('sync');
                                }, 2000);
                                // el.classList.remove('sync');
                            });
                    }
                });

                $('.modal-shipping-quote-form').on('submit', function (e) {
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
                            // grecaptchaRender('g-recaptcha-quote');
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(data => {
                            this.classList.remove('sync');
                        });
                });
            }

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

		} else if ($('body').hasClass('index-index') || $('body').hasClass('auctions-index')) { // INDEX
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

            $('#alf5').addClass('browser-default').attr('style', '');
			$('.auccatalog__nav-perpage--header .input-field').append($('#alf5_ctl'));
			$('.auccatalog__nav-paginator').append($('#c2_ctl'));
            const $pageselector = $('<div class="input-field input-field--select">');
			if ($('.pageselector').length > 1) {
                $('.pageselector:last-child').remove();
            }
            $pageselector.append($('.pageselector'));
            $('.auccatalog__nav-paginator').append($pageselector);
            $('main').prepend($('.auccatalog__nav'));
            $('main').append($('.auccatalog__nav').clone().addClass('auccatalog__nav--footer'));

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

				$(item).find('.reg').addClass('waves-effect waves-light btn');
				$(item).find('.cat').addClass('waves-effect waves-grey btn btn--secondary');

				$('.filters').hide();
			});
		} else if ($('body').hasClass('auctions-catalog')) { // CATALOG
			$('footer').append(`
    <div class="auccatalog">
        <div class="auccatalog__nav">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
                    <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
                    <div class="input-field input-field--select"></div>
                </div>
                <div class="auccatalog__nav-results c-r"></div>
                <div class="auccatalog__nav-paginator"></div>
                <div class="auccatalog__nav-view"></div>
            </div>
        </div>

        <div class="cards">
          <div class="cards__inner">
            <div class="auccatalog__search-panel">
                <li class="collapsible-li" style="display:none;">
                    <div class="auccatalog__search-panel-title h4 collapsible-header">
                        Advanced Search
                        <i class='icon'><svg><use xlink:href="#close"></use></svg></i>
                    </div>
                    <div class='collapsible-body'>
                        <div class="input-field">
                            <input type="text" placeholder="Search" value="">
                        </div>
                        <div class="input-field input-field--label">
                            <input type="text" placeholder="Any">
                            <label>Lot number</label>
                        </div>
                        <div class="input-field input-field--label input-field--select">
                            <select>
                                <option value="0" title="" data-id="order_num" selected="selected">Default</option><option value="1" title="" data-id="time_left">Time Left</option><option value="2" title="" data-id="lot_num">Lot#</option><option value="3" title="" data-id="lot_name">Lot Name</option><option value="4" title="" data-id="newest">Newest</option><option value="5" title="" data-id="highest">Highest Price</option><option value="6" title="" data-id="lowest">Lowest Price</option><option value="7" title="" data-id="bids">Bids</option><option value="8" title="" data-id="views">Views</option></select>
                            </select>
                            <label>Sort by</label>
                        </div>
                        <div class="auccatalog__search-panel-subtitle c-s">
                            Auction Items
                        </div>
                        <div class="auccatalog__search-panel-checkboxes">
                            <label class="checkbox__label">
                                <input type="checkbox" name="checkout-business" class="filled-in" />
                                <span>Live Auctions</span>
                            </label>
                            <label class="checkbox__label">
                                <input type="checkbox" name="checkout-business" class="filled-in" />
                                <span>Upcoming Only</span>
                            </label>
                            <label class="checkbox__label">
                                <input type="checkbox" name="checkout-business" class="filled-in" />
                                <span>Sold Items</span>
                            </label>
                            <label class="checkbox__label">
                                <input type="checkbox" name="checkout-business" class="filled-in" />
                                <span>Featured</span>
                            </label>
                            <label class="checkbox__label">
                                <input type="checkbox" name="checkout-business" class="filled-in" />
                                <span>Show Closed Lots</span>
                            </label>
                        </div>
    
                        <div class="auccatalog__search-panel-row">
                            <div class="input-field input-field--label">
                                <input type="text" placeholder="0">
                                <label>Min price</label>
                            </div>
                            <div class="input-field input-field--label">
                                <input type="text" placeholder="No">
                                <label>Max price</label>
                            </div>
                        </div>
    
                        <button class="waves-effect waves-light btn btn--tertiary auccatalog__search-btn">
                            Search
                        </button>
                    </div>
                </li>
            </div>
            <div class="cards__list">
                <div class="card aucproduct__card">
                    <div class="card__img">
                        <span class="heart card__heart"></span>
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
                    <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
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
                $('.hero__image').css({ backgroundImage: heroImage.backgroundImage || aucPoster.backgroundImage });
                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
            });

			$aucTitle = $('.tle h3').clone();
			$aucTitle.find('span').remove();
			$('.hero__static-title').html($aucTitle.text());
            $('.sale-date').find('br').remove();
			$('.hero__static-date').append($('.sale-date').first());
			if (status) {
				$badge = $('.auc__hero .badge');
				switch (status) {
					case 'closed':
						$badge.addClass('red').append('Closed').show().find('use').attr('xlink:href', '#flag');
						break;
				}
			}
			$('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href')).show();

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

			$('#c3, #c4').addClass('browser-default').attr('style', '');
			$('.auccatalog__nav-perpage--header .input-field').append($('#c3_ctl'));
			$('.auccatalog__nav-perpage--footer .input-field').append($('#c4_ctl'));
			const results = $('.page:contains("Results:")').html();
			$('.auccatalog__nav-results').html(results.replace('<b>Results:</b>&nbsp;Viewing&nbsp;items&nbsp;', 'Results:&nbsp;'));
			$('.auccatalog__nav-paginator').append($('#c2_ctl'));
			$('.pageselector').wrap('<div class="input-field input-field--select" />');
			$('.grid_list .lst').remove();
			$('.grid_list .com').html('<i class="icon"><svg><use xlink:href="#view-list"></use></svg></i>');
			$('.grid_list .sqr').html('<i class="icon"><svg><use xlink:href="#view-grid"></use></svg></i>');
			$('.auccatalog__nav-view').html($('.grid_list').html());

			$('.aucproduct__card-details').html();
			$card = $('.card').clone();
			$('.cards__list').html('');


			$('.item-block').each((i, item) => {
				$cardItem = $card.clone();
                const bg = $(item).find('figure img').prop('src').replace('_6.', '_2.');
				$cardItem.find('.card__img').css('background-image', 'url(' + bg + ')');
				$cardItem.find('.card__movie').append($(item).find('.yaaa'));
				$badge = $cardItem.find('.card__badge')
				if ($(item).find('.ended.sold').length) {
					$badge.addClass('red').append('Sold').show().find('use').attr('xlink:href', '#flag');
				} else if ($(item).find('.ended.unsold').length) {
					$badge.append('Unsold').show().find('use').attr('xlink:href', '#archive');
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
                    $cardItem.find('.heart').append($heart);
                    if ($heart.find('input').prop('checked')) $cardItem.addClass('card--liked');
                    $heart.find('input').on('change', function(e) {
                        $(e.target).closest('.card').toggleClass('card--liked', $heart.find('input').prop('checked'));
                    });
                }

                $cardItem.on('click', function(e) {
                    if (!$(e.target).is("input") && !$(e.target).is("a") && !$(e.target).closest('a').length) {
                        window.location.href = $(e.target).closest('.card').find('.yaaa').attr('href');
                    }
                });

				$('.cards__list').append($cardItem);
			});

			$('.container').prepend($('.auccatalog'));
			$('.container').prepend($('.auc__hero').show());
		}

		// Plugin initialization
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

		function resize() {
			headerFloat();
		}
		setTimeout(resize, 500);
		$(window).on('resize', resize);

		// HEADER
		const HEADER_THRESHOLD = 100; // px
		let previousScroll = 0;
		function headerFloat() {
			if (!$('.header__main').length) return; // no header

			const $header = $('header');
			if ($header.length) {
				$header.css('maxWidth', $('main').width() + 'px');
				const top = $('.header__main').offset().top;
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

		document.body.classList.add('loaded'); // if svg fail
	}); // end of document ready
});

document.addEventListener('DOMContentLoaded', () => {
  const svgSprite = document.createElement('div');
	svgSprite.id = 'svg-sprite';
	document.body.append(svgSprite);
	const loaded = function() {document.body.classList.add('loaded')};
	if (typeof fetch != "undefined") fetch('http://localhost:8000/dist/defs/svg/sprite.defs.svg', { cache: 'force-cache' })
		.then(response => response.text())
		.then(html => { svgSprite.innerHTML = html; loaded(); })
		.catch(loaded);

  $(function() {
      document.body.classList.add('loaded'); // if svg fail

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



      if ($('body').hasClass('lot-details-index')) { // PRODUCT
        $('footer').append(`
        <header>
        <div class="header__settings">
            <div class="header__col header__col--left"></div>
            <div class="header__col header__col--right">
                <a class="waves-effect btn-flat header__btn" href="https://propstore.com">
                    Go to propstore.com
                    <i class='icon aucheader__settings-icon-blank'><svg><use xlink:href="#target-blank"></use></svg></i>
                </a>
            </div>
        </div>
    
        <div class="header__main">
            <div class="header__col header__col--left">
                <a data-target="sidenav" class="header__burger sidenav-trigger waves-effect btn-flat btn--icon">
                    <i class='icon'><svg><use xlink:href="#burger"></use></svg></i>    
                </a>
    
                <nav class="header__menu">
                    <a class="btn-flat header__menu-link">
                        <span class="header__menu-link-handle">
                            All Auctions
                        </span>
                    </a>
                    
                    <a class="btn-flat header__menu-link">
                        <span class="header__menu-link-handle">
                            My Account
                        </span>
                    </a>
                    
                </nav>
            </div>
            <div class="header__col header__col--center">
                <a class="header__logo" href='/home.html'>
                    <svg><use xlink:href="#propstore"></use></svg>
                </a>
            </div>
            <div class="header__col header__col--right">
                <div class="header__search input-field input-field--search">
                    <input placeholder="Search auctions" type="search">
                    <a class="waves-effect btn-flat btn--icon input-field__button">
                        <i class='icon'><svg><use xlink:href="#search"></use></svg></i>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <div class="hero hero--static auc__hero">
        <div class="hero__inner">
            <div class="hero__image"></div>
            <div class="hero__info">
                <div class="hero__info-item">
                    <div class="hero__info-item-inner">
                        <span class="badge section-auctions__item-bage" style="display: none;">
                            <i class='icon'><svg><use xlink:href="#"></use></svg></i>
                        </span>
                        <div class="hero__static-title">
                        </div>
                        <div class="hero__static-date">
                            <i class='icon'><svg><use xlink:href="#calendar"></use></svg></i>
                        </div>
                        <div class="hero__static-buttons">
                            <a class="waves-effect waves-light btn hero__btn auc__hero-aucinfo">
                                Auction info
                            </a>
                            <a class="waves-effect waves-light btn hero__btn auc__hero-auccatalog">
                                All catalogue items
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                    <div class="aucproduct__details-line">
                    </div>
                </div>

                <div class="aucproduct__form" style="display: none;">
                    <div class="input-field input-field--label aucproduct__form-item">
                        <input type="text" placeholder="">
                    </div>
                    <button class="waves-effect waves-light btn aucproduct__form-item">
                        <span class='btn__title'>Register to bid</span>
                        <i class='icon'><svg><use xlink:href="#arrow-right"></use></svg></i>
                    </button>
                </div>
                
                <div class="product__buttons-grey" style="display: none;">
                    <a class="product__button-grey waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-shipping-quote">
                        <i class='icon'><svg><use xlink:href="#globe"></use></svg></i>
                        <span class="product__buttons-grey-small">Get</span> Shipping Quote
                    </a>
                    <a class="product__button-grey waves-effect waves-grey btn btn--secondary">
                        <i class='icon'><svg><use xlink:href="#heart-fill"></use></svg></i>
                        Add to watchlist
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
            <div class="cards__list">
                <a class="card card--liked aucproduct__card" href="#card-05">
                    <div class="card__img" style="background-image: url(https://www.fillmurray.com/400/800);">
                        <span class="heart card__heart"></span>
                        <span class="badge red card__badge">
                            <i class="icon"><svg><use xlink:href="#flag"></use></svg></i>
                            Sold
                        </span>
                    </div>
                    <div class="card__info">
                        <div class="card__description">
                            <div class="card__movie">
                                Lot # 2: Episode "Lead Balloon" (2008, E96): Episode Blueprint Signed by Eric Haven - Lead Balloon
                            </div>
                            <div class="aucproduct__card-details">
                                <div class="aucproduct__card-details-row">
                                    <div class="aucproduct__card-details-label">Asking:</div>
                                    <div class="aucproduct__card-details-value">£450–£650</div>
                                </div>
                                <div class="aucproduct__card-details-row">
                                    <div class="aucproduct__card-details-label">When:</div>
                                    <div class="aucproduct__card-details-value">04 May 9:00am (PMT) – 13 May 2:00pm (PMT) 2021</div>
                                </div>
                                <div class="aucproduct__card-details-row">
                                    <div class="aucproduct__card-details-label">Time Left:</div>
                                    <div class="aucproduct__card-details-value aucproduct__card-details-timer">17h 20m 0s</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card__actions">
                            <button class="waves-effect waves-light btn" tabindex="0">
                                <span class="btn__title">Register for the auction</span>
                                <i class="icon"><svg><use xlink:href="#arrow-right"></use></svg></i>
                            </button>
                        </div>
                    </div>
                </a><a class="card aucproduct__card" href="#card-06">
    <div class="card__img" style="background-image: url(https://www.fillmurray.com/700/800);">
        <span class="heart card__heart"></span>
        <span class="badge card__badge">
            <i class="icon"><svg><use xlink:href="#auction"></use></svg></i>
            Unsold
        </span>
    </div>
    <div class="card__info">
        <div class="card__description">
            <div class="card__movie" title='Lot # 28: Episode "Dog Myths" and Episode "Voice Flame Extinguisher" (2007, E74/E76): Episode Blueprint Signed by Adam Savage - The Sensitive Flame'>
Lot # 28: Episode "Dog Myths" and Episode "Voice Flame Extinguisher" (2007, E74/E76): Episode Blueprint Signed by Adam Savage - The Sensitive Flame
            </div>
            <div class="aucproduct__card-details">
                <div class="aucproduct__card-details-row">
                    <div class="aucproduct__card-details-label">Asking:</div>
                    <div class="aucproduct__card-details-value">£450–£650</div>
                </div>
                <div class="aucproduct__card-details-row">
                    <div class="aucproduct__card-details-label">When:</div>
                    <div class="aucproduct__card-details-value">04 May 9:00am (PMT) – 13 May 2:00pm (PMT) 2021</div>
                </div>
            </div>
        </div>
        
        <div class="card__actions">
            <button class="waves-effect waves-light btn" tabindex="0">
                <span class="btn__title">Bid now</span>
                <i class="icon"><svg><use xlink:href="#auction"></use></svg></i>
            </button>
        </div>
    </div>
</a><a class="card card--liked aucproduct__card" href="#card-05">
    <div class="card__img" style="background-image: url(https://www.fillmurray.com/400/800);">
        <span class="heart card__heart"></span>
        <span class="badge red card__badge">
            <i class="icon"><svg><use xlink:href="#flag"></use></svg></i>
            Sold
        </span>
    </div>
    <div class="card__info">
        <div class="card__description">
            <div class="card__movie">
                Lot # 2: Episode "Lead Balloon" (2008, E96): Episode Blueprint Signed by Eric Haven - Lead Balloon
            </div>
            <div class="aucproduct__card-details">
                <div class="aucproduct__card-details-row">
                    <div class="aucproduct__card-details-label">Asking:</div>
                    <div class="aucproduct__card-details-value">£450–£650</div>
                </div>
                <div class="aucproduct__card-details-row">
                    <div class="aucproduct__card-details-label">When:</div>
                    <div class="aucproduct__card-details-value">08/20/2021 9:00 AM PDT-09/01/2021 10:33 AM PDT</div>
                </div>
                <div class="aucproduct__card-details-row">
                    <div class="aucproduct__card-details-label">Time Left:</div>
                    <div class="aucproduct__card-details-value aucproduct__card-details-timer">17h 20m 0s</div>
                </div>
            </div>
        </div>
        
        <div class="card__actions">
            <button class="waves-effect waves-light btn" tabindex="0">
                <span class="btn__title">Register for the auction</span>
                <i class="icon"><svg><use xlink:href="#arrow-right"></use></svg></i>
            </button>
        </div>
    </div>
</a><a class="card aucproduct__card" href="#card-06">
<div class="card__img" style="background-image: url(https://www.fillmurray.com/700/800);">
<span class="heart card__heart"></span>
<span class="badge card__badge">
<i class="icon"><svg><use xlink:href="#auction"></use></svg></i>
Unsold
</span>
</div>
<div class="card__info">
<div class="card__description">
<div class="card__movie" title='Lot # 28: Episode "Dog Myths" and Episode "Voice Flame Extinguisher" (2007, E74/E76): Episode Blueprint Signed by Adam Savage - The Sensitive Flame'>
Lot # 28: Episode "Dog Myths" and Episode "Voice Flame Extinguisher" (2007, E74/E76): Episode Blueprint Signed by Adam Savage - The Sensitive Flame
</div>
<div class="aucproduct__card-details">
<div class="aucproduct__card-details-row">
    <div class="aucproduct__card-details-label">Asking:</div>
    <div class="aucproduct__card-details-value">£450–£650</div>
</div>
<div class="aucproduct__card-details-row">
    <div class="aucproduct__card-details-label">When:</div>
    <div class="aucproduct__card-details-value">08/20/2021 9:00 AM PDT-09/01/2021 10:33 AM PDT</div>
</div>
</div>
</div>

<div class="card__actions">
<button class="waves-effect waves-light btn" tabindex="0">
<span class="btn__title">Bid now</span>
<i class="icon"><svg><use xlink:href="#auction"></use></svg></i>
</button>
</div>
</div>
</a>
            </div>
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
        $('#headsec').remove();
        $('body').prepend($('header'));
        $('<main></main>').append($('#wrapper')).insertAfter($('header'));

        let status;
        if ($('.sale-closed').length) status = 'closed';

        let aucPoster = window.getComputedStyle(document.querySelector('.bodybox'), ':before');
        $('.hero__image').css({backgroundImage: aucPoster.backgroundImage});
        document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

        $aucTitle = $('.tle-lot h3').clone();
        $aucTitle.find('span').remove();
        $('.hero__static-title').html($aucTitle.text());
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
        $('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href'));
        $('.auc__hero-auccatalog').attr('href', $('.catlg').attr('href'));

        $carouselItem = $('.product__slider .carousel-item').clone();
        $slider = $('.product__slider').html('');
        $thumbnailsItem = $('.product__thumbnail').clone();
        $thumbnails = $('.product__thumbnails-scroll').html('');
        $galleryItem = $('.modal-gallery__carousel .carousel-item').clone();
        $gallery = $('.modal-gallery__carousel').html('');

        $('.image-thumb-slide').each((i, item) => {
            const img = {backgroundImage: 'url(' + item.href + ')'};
            const imgPrev = {backgroundImage: 'url(' + item.dataset.image + ')'};
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

        $('.product__detail .collapsible-body').html($('.l1desctextwhite').html());
        $('#modal-buyers-guide .modal-content').append($('h4:contains("Product Questions")').parent());
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
        $('.container').prepend($('.auc__hero'));

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

          $('#modal-shipping-quote-country').formSelect({dropdownOptions: {container: document.body}});
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
      } else if ($('body').hasClass('index-index')) { // INDEX
        document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
        $('.auclting').each((i, item) => {
          $title = $(item).find('h6');
          $title.addClass('h2')
          const path = $title.find('a').prop('href').split('/view-auctions/info/id/');
          const idString = path.length > 1 ? path[1].split('/') : '';
          const id = idString.length > 1 ? idString[0] : 0;
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
        <header>
        <div class="header__settings">
            <div class="header__col header__col--left"></div>
            <div class="header__col header__col--right">
                <a class="waves-effect btn-flat header__btn" href="https://propstore.com">
                    Go to propstore.com
                    <i class='icon aucheader__settings-icon-blank'><svg><use xlink:href="#target-blank"></use></svg></i>
                </a>
            </div>
        </div>
    
        <div class="header__main">
            <div class="header__col header__col--left">
                <a data-target="sidenav" class="header__burger sidenav-trigger waves-effect btn-flat btn--icon">
                    <i class='icon'><svg><use xlink:href="#burger"></use></svg></i>    
                </a>
    
                <nav class="header__menu">
                    <a class="btn-flat header__menu-link">
                        <span class="header__menu-link-handle">
                            All Auctions
                        </span>
                    </a>
                    
                    <a class="btn-flat header__menu-link">
                        <span class="header__menu-link-handle">
                            My Account
                        </span>
                    </a>
                    
                </nav>
            </div>
            <div class="header__col header__col--center">
                <a class="header__logo" href='/home.html'>
                    <svg><use xlink:href="#propstore"></use></svg>
                </a>
            </div>
            <div class="header__col header__col--right">
                <div class="header__search input-field input-field--search">
                    <input placeholder="Search auctions" type="search">
                    <a class="waves-effect btn-flat btn--icon input-field__button">
                        <i class='icon'><svg><use xlink:href="#search"></use></svg></i>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <div class="hero hero--static auc__hero">
        <div class="hero__inner">
            <div class="hero__image"></div>
            <div class="hero__info">
                <div class="hero__info-item">
                    <div class="hero__info-item-inner">
                        <span class="badge section-auctions__item-bage" style="display: none;">
                            <i class='icon'><svg><use xlink:href="#"></use></svg></i>
                        </span>
                        <div class="hero__static-title">
                        </div>
                        <div class="hero__static-date">
                            <i class='icon'><svg><use xlink:href="#calendar"></use></svg></i>
                        </div>
                        <div class="hero__static-buttons">
                            <a class="waves-effect waves-light btn hero__btn auc__hero-aucinfo">
                                Auction info
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="auccatalog">
        <div class="auccatalog__nav">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage">
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
            <div class="auccatalog__search-panel collapsible">
                <li class="collapsible-li">
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
                            <div class="aucproduct__card-details">
                                <div class="aucproduct__card-details-row">
                                    <div class="aucproduct__card-details-label"></div>
                                    <div class="aucproduct__card-details-value"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card__actions">
                            <a class="waves-effect waves-light btn aucproduct__card-btn" tabindex="0">
                                <span class="btn__title">View details</span>
                                <i class="icon"><svg><use xlink:href="#arrow-right"></use></svg></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
          </div>
        </div>


        <div class="auccatalog__nav auccatalog__nav--footer">
            <div class="auccatalog__nav-inner">
                <div class="auccatalog__nav-perpage">
                    <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
                    <div class="input-field input-field--select"></div>
                </div>
                
                <div class="auccatalog__nav-paginator"></div>
            </div>
        </div>

      </div>
        `);

        $('#headsec').remove();
        $('body').prepend($('header'));
        $('<main></main>').append($('#wrapper')).insertAfter($('header'));

        let status;
        if ($('.sale-closed').length) status = 'closed';

        let aucPoster = window.getComputedStyle(document.querySelector('#AdvancedSearch'), ':before');
        $('.hero__image').css({backgroundImage: aucPoster.backgroundImage});
        document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

        $aucTitle = $('.tle h3').clone();
        $aucTitle.find('span').remove();
        $('.hero__static-title').html($aucTitle.text());
        $('.hero__static-date').append($('.sale-date').first());
        if (status) {
            $badge = $('.auc__hero .badge');
            switch (status) {
            case 'closed':
                $badge.addClass('red').append('Closed').show().find('use').attr('xlink:href', '#flag');
                break;
            }
        }
        $('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href'));

        $('.auccatalog__nav-perpage .input-field').append($('#c3').removeProp('id'));
        const results = $('.page:contains("Results:")').html();
        $('.auccatalog__nav-results').html(results.replace('<b>Results:</b>&nbsp;Viewing&nbsp;items&nbsp;', 'Results:&nbsp;'));
        $('.auccatalog__nav-paginator').append($('#c2_ctl'));
        $('.pageselector').wrap('<div class="input-field input-field--select" />');
        $('.grid_list .lst').remove();
        $('.grid_list .com').html('<i class="icon"><svg><use xlink:href="#view-list"></use></svg></i>');
        $('.grid_list .sqr').html('<i class="icon"><svg><use xlink:href="#view-grid"></use></svg></i>');
        $('.auccatalog__nav-view').html($('.grid_list').html());

        $cardDetails = $('.aucproduct__card-details-row').clone();
        $('.aucproduct__card-details').html();
        $card = $('.card').clone();
        $('.cards__list').html('');
        

        $('.item-block').each((i, item) => {
            $cardItem = $card.clone();
            $cardItem.find('.card__img').css('background-image', 'url(' + $(item).find('figure img').prop('src') + ')');
            $cardItem.find('.card__movie').append($(item).find('.yaaa'));
            $badge = $cardItem.find('.card__badge')
            if ($(item).find('.ended.sold').length) {
                $badge.addClass('red').append('Sold').show().find('use').attr('xlink:href', '#flag');
            } else if ($(item).find('.ended.unsold').length) {
                $badge.append('Unsold').show().find('use').attr('xlink:href', '#archive');
            }
            $(item).find('.item-status').remove();
            $(item).find('.price-info li').each((k, info) => {
                $infoRow = $cardDetails.clone();
                $infoRow.find('.aucproduct__card-details-label').html($(info).find('.title').html());
                $infoRow.find('.aucproduct__card-details-value').html($(info).find('.value').html());
                $cardItem.find('.aucproduct__card-details').append($infoRow);
            });
            $cardItem.find('.aucproduct__card-btn').prop('href', $(item).find('.orng').prop('href'));

            $('.cards__list').append($cardItem);
        });

        $('.container').prepend($('.auccatalog'));
        $('.container').prepend($('.auc__hero'));
      }












    // Plugin initialization
    $('.collapsible').collapsible({
        onOpenEnd: (el) => {
            const body = el.querySelector('.collapsible-body');
            if (body) body.scrollIntoView({behavior: 'smooth', block: 'nearest'});
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
  
      function resize () {
          headerFloat();
      }
      resize();
      $(window).on('resize', resize);
  
      // HEADER
      const HEADER_THRESHOLD = 100; // px
      let previousScroll = 0;
      function headerFloat () {
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
  }); // end of document ready
});

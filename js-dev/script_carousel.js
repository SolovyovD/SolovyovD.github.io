const setCarouselHeight = () => {
  if (document.querySelector('.carousel')) {
    const imgHeight = document.querySelector('.carousel__main__item').offsetHeight;
    document.querySelector('#carousel__main__images').style.height = imgHeight + 'px';
  }
};

let slideShowTimer;
let allowCarousel;

function clearCarouselInterval(direction) {
  clearInterval(slideShowTimer);
  if (direction == 'right') {
    slideShowTimer = setInterval(carouselRollRight, 3000);
  } else {
    slideShowTimer = setInterval(carouselRollLeft, 3000);
  }
  allowCarousel = !0;
}

const carouselRollLeft = () => {
  if (allowCarousel) {
    allowCarousel = !1;
    const carouselThumbs = $('#carousel__thumbs');
    const carouselImages = $('#carousel__main__images');
    const lastMainImage = document.querySelector('.carousel__main__item:last-of-type');
    lastMainImage.classList.add('fadeOut');

    setTimeout(function () {
      carouselImages
        .prepend(lastMainImage)
        .promise()
        .done(function () {
          document.querySelector('.carousel__main__item:first-of-type').classList.remove('fadeOut');
        });
    }, 550);

    carouselThumbs
      .addClass('movedLeft')
      .promise()
      .done(function () {
        setTimeout(function () {
          carouselThumbs.removeClass('movedLeft');
          carouselThumbs.prepend(document.querySelector('.carousel__thumbs__img:last-of-type'));
          clearCarouselInterval('left');
        }, 550);
      });
  }
};

const carouselRollRight = () => {
  if (allowCarousel) {
    allowCarousel = !1;
    const carouselThumbs = $('#carousel__thumbs');
    const carouselImages = $('#carousel__main__images');
    const firstMainImage = document.querySelector('.carousel__main__item:first-of-type');

    firstMainImage.classList.add('fadeIn');
    carouselImages
      .append(firstMainImage)
      .promise()
      .done(function () {
        setTimeout(function () {
          firstMainImage.classList.remove('fadeIn');
        }, 550);
      });

    carouselThumbs
      .addClass('movedRight')
      .promise()
      .done(function () {
        setTimeout(function () {
          carouselThumbs.removeClass('movedRight');
          carouselThumbs.append(document.querySelector('.carousel__thumbs__img:first-of-type'));
          clearCarouselInterval('right');
        }, 550);
      });
  }
};

const startCarousel = () => {
  if (document.querySelector('.carousel')) {
    clearCarouselInterval('right');
  }
};

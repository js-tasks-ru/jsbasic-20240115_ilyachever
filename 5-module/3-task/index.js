function initCarousel() {
  const carousel = document.querySelector('.carousel');

  if (!carousel) return;

  initialize(carousel);
}

function initialize(carousel) {
  const carouselFeed = carousel.querySelector('.carousel__inner');
  const slides = carouselFeed.querySelectorAll('.carousel__slide');
  let position = 1;
  let currentOffset = 0;

  const getSlidesQuantity = () => {
    return slides.length;
  };

  const updateControls = () => {
    const positionVariants = {
      min: 1,
      max: getSlidesQuantity()
    };
    const prevControl = carousel.querySelector('.carousel__arrow_left');
    const nextControl = carousel.querySelector('.carousel__arrow_right');

    const hideElement = (elem) => elem.style.display = 'none';
    const showElement = (elem) => elem.style.display = '';

    switch (position) {
    case positionVariants.min:
      hideElement(prevControl);
      break;
    case positionVariants.max:
      hideElement(nextControl);
      break;
    default:
      showElement(prevControl);
      showElement(nextControl);
    }
  };

  const getCurrentSlideOffset = (direction, slideWidth) => {
    switch (direction) {
    case 'forward':
      currentOffset -= slideWidth;
      return currentOffset;
    case 'backward':
      currentOffset += slideWidth;
      return currentOffset;
    }
  };

  const getCurrentSlideWidth = () => {
    return slides[position - 1].offsetWidth;
  };

  const toggleSlider = (direction) => {
    const currentSlideWidth = getCurrentSlideWidth();
    const currentSlideOffset = getCurrentSlideOffset(direction, currentSlideWidth);

    carouselFeed.style.transform = `translateX(${currentSlideOffset}px)`;
  };

  updateControls();

  carousel.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target.classList.contains('carousel__arrow_left')) {
      toggleSlider('backward');
      position--;
    }

    if (target.classList.contains('carousel__arrow_right')) {
      toggleSlider('forward');
      position++;
    }

    updateControls();
  });
}

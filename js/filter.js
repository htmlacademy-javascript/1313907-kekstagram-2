import { renderPictures } from './render';

const COUNT = 10;
const TIMEOUT_DELAY = 500;

const imageFilters = document.querySelector('.img-filters');
const filterButtons = imageFilters.querySelectorAll('button');

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const getDefaultPictures = (pictures) => pictures;

const getRandomPictures = (pictures) => {
  const shuffled = pictures.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(COUNT, shuffled.length));
};

const getDiscussedPictures = (pictures) => pictures.slice().sort((a, b) => b.likes - a.likes);
const debouncedRender = debounce(renderPictures);

const handlers = {
  onFilterButton: (evt, pictures) => {
    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');

    let filteredPictures;
    switch(evt.target.id) {
      case 'filter-default':
        filteredPictures = getDefaultPictures(pictures);
        break;
      case 'filter-random':
        filteredPictures = getRandomPictures(pictures);
        break;
      case 'filter-discussed':
        filteredPictures = getDiscussedPictures(pictures);
        break;
      default:
        filteredPictures = getDefaultPictures(pictures);
    }
    debouncedRender(filteredPictures);
  }
};
const showFilters = (pictures) => {
  imageFilters.classList.remove('img-filters--inactive');
  renderPictures(pictures);
  imageFilters.addEventListener('click', (evt) => handlers.onFilterButton(evt, pictures));
};

export {showFilters};

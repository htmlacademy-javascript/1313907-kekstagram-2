const imageFilters = document.querySelector('.img-filters');
const filterButtons = imageFilters.querySelectorAll('button');
// const filterDefault = imageFilters.querySelector('#filter-default');
// const filterRandom = imageFilters.querySelector('#filter-random');
// const filterDiscussed = imageFilters.querySelector('#filter-discussed');

const showDiscussed = () => {
  console.log('обсуждаемые');
};

const showRandom = () => {
  console.log('случайные');
};

const handlers = {
  onFilterButton: null
};

const showFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');

  imageFilters.addEventListener('click', handlers.onFilterButton);
};

handlers.onFilterButton = (evt) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  switch(evt.target.id) {
    case 'filter-discussed':
      showDiscussed();
      break;
    case 'filter-random':
      showRandom();
      break;
    case 'filter-default':
      console.log('по умолчанию');
      break;
    default:
  }
  evt.target.classList.toggle('img-filters__button--active');
};


export {showFilters};

import {createThumbnails} from './thumbnails.js';
import {debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const filterMap = {
  default: (photos) => photos,
  random: (photos) => [...photos]
    .toSorted(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT),
  discussed: (photos) => photos.sort((a, b) => b.comments.length - a.comments.length)
};

const clearPhotos = () => document.querySelectorAll('.pictures .picture').forEach((el) => el.remove());

const setActiveFilter = (button) => {
  filterButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const renderPhotos = (photos) => {
  clearPhotos();
  createThumbnails(photos);
};

const debouncedRender = debounce(renderPhotos);

const onFilterFormClick = (evt, photos) => {
  if (!evt.target.id) {
    return;
  }

  setActiveFilter(evt.target);

  const [, newFilter] = evt.target.id.split('-');

  const filteredPhotos = filterMap[newFilter](photos);

  debouncedRender(filteredPhotos);
};

const initFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', (evt) => onFilterFormClick(evt, data));
};

export { initFilters };

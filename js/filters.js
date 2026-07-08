import {createThumbnails} from './thumbnails.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const filters = document.querySelector('.img-filters');
const filterButtons = {
  default: document.querySelector('.img-filters__button[id="filter-default"]'),
  random: document.querySelector('.img-filters__button[id="filter-random"]'),
  discussed: document.querySelector('.img-filters__button[id="filter-discussed"]')
};

let originalPhotos;

const comparePhotos = (a, b) => b.comments.length - a.comments.length;

const filterMap = {
  default: (photos) => photos,
  random: (photos) => [...photos]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT),
  discussed: (photos) => [...photos].sort(comparePhotos)
};

const clearPhotos = () => document.querySelectorAll('.pictures .picture').forEach((el) => el.remove());

const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active')?.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const renderPhotos = (photos) => {
  clearPhotos();
  createThumbnails(photos);
};

const debouncedRender = debounce(renderPhotos, RERENDER_DELAY);

const handleFilterClick = (evt, filterType) => {
  const photos = filterMap[filterType](originalPhotos);
  debouncedRender(photos);
  setActiveFilter(evt.target);
};

const initFilters = (data) => {
  originalPhotos = data;
  filters.classList.remove('img-filters--inactive');
  Object.entries(filterButtons).forEach(([type, button]) => {
    button.addEventListener('click', (evt) => handleFilterClick(evt, type));
  });
};

export { initFilters };

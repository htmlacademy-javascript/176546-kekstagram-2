import { createThumbnails } from './thumbnails.js';
import { generatePhotos } from './data.js';

const photos = generatePhotos();

createThumbnails(photos);

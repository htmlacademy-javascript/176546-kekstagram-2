import { createThumbnails } from './thumbnails.js';
import { generatePhotos } from './data.js';
import { createModalEvents } from './modal.js';
import { createBigPicture } from './big-picture.js';

const photos = generatePhotos();

createThumbnails(photos);
createModalEvents(photos, createBigPicture);

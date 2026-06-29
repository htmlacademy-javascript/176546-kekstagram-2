import { createThumbnails } from './thumbnails.js';
import { generatePhotos } from './data.js';
import { setPictureListener } from './modal.js';
import { createBigPicture } from './big-picture.js';
import { setUploadListener } from './form/upload-form.js';

const photos = generatePhotos();

createThumbnails(photos);
setPictureListener(photos, createBigPicture);
setUploadListener();


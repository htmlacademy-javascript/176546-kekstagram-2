import { createThumbnails } from './thumbnails.js';
import { setPictureListener } from './modal.js';
import { createBigPicture } from './big-picture.js';
import { setUploadListener } from './form/upload-form.js';
import {getData} from './api.js';
import {showMessage} from './util.js';
import {initFilters} from './filters.js';
import {uploadPhoto} from './photo.js';


getData()
  .then((data) => {
    createThumbnails(data);
    uploadPhoto();
    setPictureListener(data, createBigPicture);
    setUploadListener();
    initFilters(data);
  })
  .catch(() => {
    showMessage('data-error', true);
  });


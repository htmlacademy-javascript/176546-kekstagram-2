import { createThumbnails } from './thumbnails.js';
import { setPictureListener } from './modal.js';
import { createBigPicture } from './big-picture.js';
import { setUploadListener } from './form/upload-form.js';
import {getData} from './api.js';
import {showMessage} from './util.js';



getData()
  .then((data) => {
    createThumbnails(data);
    setPictureListener(data, createBigPicture);
    setUploadListener();
  })
  .catch(() => {
    showMessage('data-error', true);
  });


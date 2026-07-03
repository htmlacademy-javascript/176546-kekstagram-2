import { createThumbnails } from './thumbnails.js';
import { setPictureListener } from './modal.js';
import { createBigPicture } from './big-picture.js';
import { setUploadListener } from './form/upload-form.js';
import {getData} from './form/api.js';
import {showMessage} from './util.js';


const SIMILAR_PICTURE_COUNT = 25;

getData()
  .then((data) => {
    const slicedData = data.slice(0, SIMILAR_PICTURE_COUNT);
    createThumbnails(slicedData);
    return slicedData;
  })
  .then((data) => {
    setPictureListener(data, createBigPicture);
    setUploadListener();
  })
  .catch(() => {
    showMessage('data-error', true);
  });


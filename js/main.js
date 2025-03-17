import {addPictures} from './render.js';
import { closePreviewModal } from './upload.js';
import './upload.js';
import {setImageFormSubmit, addErrorDataMessage} from './validation.js';
import './scale.js';
import './effect.js';
import {getData, sendData} from './api.js';

getData()
  .then((data) => addPictures(data))
  .catch(() => {
    throw new Error(addErrorDataMessage());
  });

setImageFormSubmit(closePreviewModal);

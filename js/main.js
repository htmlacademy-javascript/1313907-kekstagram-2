import {addPictures} from './render.js';
import { closePreviewModal } from './upload.js';
import './upload.js';
import {setImageFormSubmit} from './validation.js';
import './scale.js';
import './effect.js';
import { getData } from './api.js';


getData()
  .then((data) => addPictures(data));

setImageFormSubmit(closePreviewModal);


import {renderPictures} from './render.js';
import { closePreviewModal } from './upload.js';
import './upload.js';
import {setImageFormSubmit} from './validation.js';
import './scale.js';
import './effect.js';
import { getData } from './api.js';
import { showFilters } from './filter';

getData()
  .then((data) => {
    renderPictures(data);
    showFilters();
  });

setImageFormSubmit(closePreviewModal);


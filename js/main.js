import { closePreviewModal } from './upload.js';
import {setImageFormSubmit} from './validation.js';
import {getData} from './api.js';
import { showFilters } from './filter';
import { addErrorDataMessage } from './message.js';
import './upload.js';
import './scale.js';
import './effect.js';
import './photo-upload.js';


getData()
  .then((data) => {
    showFilters(data);
  })
  .catch(() => addErrorDataMessage());

setImageFormSubmit(closePreviewModal);

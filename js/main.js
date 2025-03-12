import {createPhotoData} from './data.js';
import {addPictures} from './render.js';
import './modal.js';
import './upload.js';

const photos = createPhotoData();
addPictures(photos);


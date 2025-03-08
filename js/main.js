import {createPhotoData} from './data.js';
import {addPictures} from './render.js';
import './modal.js';

const photos = createPhotoData();
const renderPhotos = addPictures(photos);


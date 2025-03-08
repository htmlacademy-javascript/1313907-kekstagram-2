import {createPhotoData} from './data.js';
import {addPictures} from './render.js';
import {createComments} from './modal.js';
import './modal.js';

const photos = createPhotoData();
const renderPhotos = addPictures(photos);
const addComments = createComments(photos);

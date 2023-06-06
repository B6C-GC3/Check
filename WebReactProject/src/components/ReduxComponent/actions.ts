import { action } from 'typesafe-actions';

import ActionTypes from './constants';
// open page login
export const watchPageStart = () => action(ActionTypes.WATCH_PAGE_START);
export const watchPageCompleted = () => action(ActionTypes.WATCH_PAGE_COMPLETED);
export const watchPageError = () => action(ActionTypes.WATCH_PAGE_ERROR);
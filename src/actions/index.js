import axios from 'axios';
import { zomatoUrl, header } from '../config';
let CancelToken = axios.CancelToken;
let currentCancel;

export const fetch = function(query) {
  if (currentCancel)
    currentCancel("cancel");
  const request = axios.get(zomatoUrl(query), {
    cancelToken: new CancelToken(function executor(c) {
      currentCancel = c;
    }),
    headers: header
  });
  return {
    payload: request,
    type: 'FETCH_RESTAURANTS'
  }
}
export const setReducer = function(obj) {
  return obj;
}

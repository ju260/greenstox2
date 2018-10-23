import { SEARCH_CHANGE, SEARCH_SUBMIT } from "./constants";

export const searchChange = (payload = '') => ({
  type: SEARCH_CHANGE,
  payload,
});

export const searchSubmit = (payload = '') => ({
  type: SEARCH_SUBMIT,
  payload,
});


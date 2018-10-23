import { SEARCH_CHANGE } from "./constants";
import { SEARCH_SUBMIT } from "./constants";


export const searchChange = (state = '', { type, payload }) => {
  switch (type) {
    case SEARCH_CHANGE:
      return payload;
  }

  return state;
};

export const searchSubmit = (state = [], { type, payload }) => {
  switch (type) {
    case SEARCH_SUBMIT:
      return [
        ...state,
        {text: payload, done: false, id: Math.floor(Math.random() * 10000)}
      ];
  }

  return state;
};
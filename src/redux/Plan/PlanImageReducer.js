import {
  SET_IMAGE_FILE
} from './PlanImageActions.js';

const initialState = {
  imageFiles: []
};

const NoticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_FILE:
      return { ...state, imageFiles: action.payload };
    default:
      return state;
  }
};

export default NoticeReducer;
import { SET_IS_MOBILE } from './AuthActions';

const initialState = {
  isMobile: true,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
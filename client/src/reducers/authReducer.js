const initialState = {
  authData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return { ...state, authData: action.data, loading: false, error: null };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: action.error };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, error: null };
    case "USER_DETAILS_SUCCESS":
      return { ...state, authData: action.data, loading: false, error: null };
    case "USER_DETAILS_FAIL":
      return { ...state, loading: false, error: action.error };
    case "LOG_OUT":
      return { ...state, authData: null, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;

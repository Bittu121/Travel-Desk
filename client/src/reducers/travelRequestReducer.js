const initialState = {
  formData: {},
  loading: false,
  error: null,
};

const travelRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRAVEL_REQUEST_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "TRAVEL_REQUEST_FORM":
      return {
        ...state,
        formData: action.data,
        loading: false,
        error: null,
      };
    case "TRAVEL_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default travelRequestReducer;

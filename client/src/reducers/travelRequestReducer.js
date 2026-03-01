const initialState = {
  formData: {},
  travelRequests: [],
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
    case "GET_USER_TRAVEL_REQUESTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USER_TRAVEL_REQUESTS":
      return {
        ...state,
        travelRequests: action.data,
        loading: false,
        error: null,
      };
    case "GET_USER_TRAVEL_REQUESTS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //Pending request
    case "GET_ALL_TRAVEL_REQUESTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ALL_TRAVEL_REQUESTS":
      return {
        ...state,
        travelRequests: action.data,
        loading: false,
        error: null,
      };
    case "GET_ALL_TRAVEL_REQUESTS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "UPDATE_TRAVEL_REQUEST_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_TRAVEL_REQUEST":
      return {
        ...state,
        travelRequests: Array.isArray(state.travelRequests)
          ? state.travelRequests.map((request) =>
              request._id === action.data._id ? action.data : request,
            )
          : [action.data],
        loading: false,
        error: null,
      };
    case "UPDATE_TRAVEL_REQUEST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //Approved request

    default:
      return state;
  }
};
export default travelRequestReducer;

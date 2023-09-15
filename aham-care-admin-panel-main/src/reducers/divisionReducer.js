export function divisionReducer(state, action) {
    switch (action.type) {
      case "DIVISION_REQUEST":
        return { ...state, loading: true, error: "" };
      case "DIVISION_SUCCESS":
        return {
          ...state,
          loading: false,
          divisions: action.payload,
          error: "",
        };
      case "DIVISION_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
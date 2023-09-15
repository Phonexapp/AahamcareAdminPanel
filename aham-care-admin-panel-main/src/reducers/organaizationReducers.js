export function allOrganaizationReducer(state, action) {
    switch (action.type) {
      // Get all organizations
      case "GET_REQUEST":
        return { ...state, loading: true, error: "" };
      case "GET_SUCCESS":
        return {
          ...state,
          loading: false,
          organaizations: action.payload,
          error: "",
        };





      case "GET_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
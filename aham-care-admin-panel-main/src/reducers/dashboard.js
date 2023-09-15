export function dashboardReducer(state, action) {
    switch (action.type) {
      case "REQUEST":
        return { ...state, loading: true, error: "" };
      case "SUCCESS":
        return {
          ...state,
          loading: false,
          dashboard: action.payload,
          error: "",
        };
      case "ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
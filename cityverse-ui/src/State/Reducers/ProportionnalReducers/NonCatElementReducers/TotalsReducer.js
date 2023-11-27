const initState = {
  Total: 0,
  Required: 0,
  Allocated: 0,
  NonCatTI: 0,
};
 
const TotalsReducer = (state = initState, action) => {
  switch (action.type) {
    case "Total":
      return {
        ...state,
        Total: action.Total,
      };
    case "Required":
      return {
        ...state,
        Required: action.Required,
      };
    case "Allocated":
      return {
        ...state,
        Allocated: action.Allocated,
      };
    case "NonCatTI":
      return {
        ...state,
        NonCatTI: action.NonCatTI,
      };
    default:
      return state;
  }
};

export default TotalsReducer;

const initState = {
    LineSize: 1,
    NetCatROL: 82.3,
  };
  
  const ResultsReducer = (state = initState, action) => {
    switch (action.type) {
      case "LineSize":
        return {
          ...state,
          LineSize: action.LineSize,
        };
      case "NetCatROL":
        return {
          ...state,
          NetCatROL: action.NetCatROL,
        };
      default:
        return state;
    }
  };
  
  export default ResultsReducer;
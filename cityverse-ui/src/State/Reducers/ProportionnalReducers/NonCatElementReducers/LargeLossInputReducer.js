const initState = {
  LargeMean: 0,
  LargeMeanResult: 0,
  Shape1: 0,
  Shape2: 0,
};
 
const LargeLossInputReducer = (state = initState, action) => {
  switch (action.type) {
    case "LargeMean":
      return {
        ...state,
        LargeMean: action.LargeMean,
      };
    case "LargeMeanResult":
      return {
        ...state,
        LargeMeanResult: action.LargeMeanResult,
      };
    case "Shape1":
      return {
        ...state,
        Shape1: action.Shape1,
      };
    case "Shape2":
      return {
        ...state,
        Shape2: action.Shape2,
      };
    default:
      return state;
  }
};

export default LargeLossInputReducer;

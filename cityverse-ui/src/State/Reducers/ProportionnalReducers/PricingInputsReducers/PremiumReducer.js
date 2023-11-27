
const initState = {
  earnedValue: 0,
  catValue: 0,
  nonCatValue: 0,
  catResult: 0,
  nonCatResult: 0,
};

const PremiumReducer = (state = initState, action) => {
  switch (action.type) {
    case "earnedValue":
      return {
        ...state,
        earnedValue: action.earnedValue,
      };
    case "nonCatValue":
      return {
        ...state,
        nonCatValue: action.nonCatValue,
      };
    case "catValue":
      return {
        ...state,
        catValue: action.catValue,
      };
    case "nonCatResult":
      return {
        ...state,
        nonCatResult: action.nonCatResult
      };
    case "catResult":
      return {
        ...state,
        catResult: action.catResult
      };
    default:
      return state;
  }
};
export default PremiumReducer;

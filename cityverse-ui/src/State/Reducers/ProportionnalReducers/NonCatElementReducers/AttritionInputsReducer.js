const initState = {
  AttritionMean: 0,
  AttritionMeanResult: 0,
  AttritionStandard: 0,
  AttritionStandardResult: 0,
};

const AttritionInputsReducer = (state = initState, action) => {
  switch (action.type) {
    case "AttritionMean":
      return {
        ...state,
        AttritionMean: action.AttritionMean,
      };
    case "AttritionMeanResult":
      return {
        ...state,
        AttritionMeanResult: action.AttritionMeanResult,
      };
    case "attritionStandard":
      return {
        ...state,
        AttritionStandard: action.AttritionStandard,
      };
    case "attritionStandardResult":
      return {
        ...state,
        AttritionStandardResult: action.AttritionStandardResult,
      };
    default:
      return state;
  }
};

export default AttritionInputsReducer;

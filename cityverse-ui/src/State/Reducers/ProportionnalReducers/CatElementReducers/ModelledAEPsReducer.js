const initState = {
  Type: 2,
  RMSWeight: 0,
  AIRWeight: 0,
  isManual: false,
  ListAepGood: [],
  ListAepBad: []
};

const ModelledAEPsReducer = (state = initState, action) => {
  switch (action.type) {
    case "Type":
      return {
        ...state,
        Type: action.Type,
        isManual: action.Type === 1 ? true : false,
      };

    case "RMSWeight":
      return {
        ...state,
        RMSWeight: action.RMSWeight,
        AIRWeight: 100 - action.RMSWeight,
      };
    case "AIRWeight":
      return {
        ...state,
        AIRWeight: action.AIRWeight,
      };
    case "ListAepGood":
        return {
          ...state,
          ListAepGood: action.ListAepGood,
        };
    case "ListAepBad":
          return {
            ...state,
            ListAepBad: action.ListAepBad,
          };
    default:
      return state;
  }
};

export default ModelledAEPsReducer;

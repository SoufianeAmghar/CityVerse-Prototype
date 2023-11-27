const initState = {
    poissonCalculeRC: 3.40,
    poissonRetenuRC: 3.40,
    negBinPCalculeRC: 0.017,
    negBinPRetenuRC: 0.100,
    negBinRCalculeRC:44.489,
    negBinRRetenuRC: 1,
    incrementRC: 2,
    mNegBinRetenuRC: 0.111,
    stdevNegBinRetenuRC: 0.351,
  };

  const ParametresNbSinReducerRC = (state = initState, action) => {
    switch (action.type) {
      case "poissonCalculeRC":
        return {
          ...state,
          poissonCalculeRC: action.poissonCalculeRC,
        };
      case "poissonRetenuRC":
        return {
          ...state,
          poissonRetenuRC: action.poissonRetenuRC,
        };
        case "negBinPCalculeRC":
            return {
              ...state,
              negBinPCalculeRC: action.negBinPCalculeRC,
            };
        case "negBinPRetenuRC":
        return {
          ...state,
          negBinPRetenuRC: action.negBinPRetenuRC,
        };
        case "negBinRCalculeRC":
        return {
          ...state,
          negBinRCalculeRC: action.negBinRCalculeRC,
        };
      case "negBinRRetenuRC":
        return {
          ...state,
          negBinRRetenuRC: action.negBinRRetenuRC,
        };
        case "incrementRC":
            return {
              ...state,
              incrementRC: action.incrementRC,
            };
        case "mNegBinRetenuRC":
        return {
          ...state,
          mNegBinRetenuRC: action.mNegBinRetenuRC,
        };
        case "stdevNegBinRetenuRC":
            return {
                ...state,
                stdevNegBinRetenuRC: action.stdevNegBinRetenuRC,
            };
      default:
        return state;
    }
  };
  
  export default ParametresNbSinReducerRC;
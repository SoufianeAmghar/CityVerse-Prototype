const initState = {
    poissonCalcule: 2.84,
    poissonRetenu: 2.89,
    negBinPCalcule: 0.244,
    negBinPRetenu: 0.244,
    negBinRCalcule: 8.804,
    negBinRRetenu: 9,
    increment: 2,
    mNegBinRetenu: 3.95,
    stdevNegBinRetenu: 7,
  };

  const ParametresNbSinReducer = (state = initState, action) => {
    switch (action.type) {
      case "poissonCalcule":
        return {
          ...state,
          poissonCalcule: action.poissonCalcule,
        };
      case "poissonRetenu":
        return {
          ...state,
          poissonRetenu: action.poissonRetenu,
        };
        case "negBinPCalcule":
            return {
              ...state,
              negBinPCalcule: action.negBinPCalcule,
            };
        case "negBinPRetenu":
        return {
          ...state,
          negBinPRetenu: action.negBinPRetenu,
        };
        case "negBinRCalcule":
        return {
          ...state,
          negBinRCalcule: action.negBinRCalcule,
        };
      case "negBinRRetenu":
        return {
          ...state,
          negBinRRetenu: action.negBinRRetenu,
        };
        case "increment":
            return {
              ...state,
              increment: action.increment,
            };
        case "mNegBinRetenu":
        return {
          ...state,
          mNegBinRetenu: action.mNegBinRetenu,
        };
        case "stdevNegBinRetenu":
            return {
                ...state,
                stdevNegBinRetenu: action.stdevNegBinRetenu,
            };
      default:
        return state;
    }
  };
  
  export default ParametresNbSinReducer;
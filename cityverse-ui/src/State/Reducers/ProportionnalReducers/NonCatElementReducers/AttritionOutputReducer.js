const initState = {
    cell11: 85.7,
    cell21: 66.7,
    cell31: 57.8,
    cell41: 44.0,

    cell12: 33.5,
    cell22: 29.0,
    cell32: 22.6,

    sliding11: 0,
    sliding21: 0,
    sliding31: 0,
    sliding41: 0,

    sliding12: 0,
    sliding22: 0,
    sliding32: 0,
  };
  
  const AttritionOutputReducer = (state = initState, action) => {
    switch (action.type) {
      case "cell11":
        return {
          ...state,
          cell11: action.cell11,
        };
      case "cell21":
        return {
          ...state,
          cell21: action.cell21,
        };
      case "cell31":
        return {
          ...state,
          cell31: action.cell31,
        };
      case "cell41":
        return {
          ...state,
          cell41: action.cell41,
        };
        case "cell12":
        return {
          ...state,
          cell12: action.cell12,
        };
      case "cell22":
        return {
          ...state,
          cell22: action.cell22,
        };
      case "cell32":
        return {
          ...state,
          cell32: action.cell32,
        };
        case "sliding11":
        return {
          ...state,
          sliding11: action.sliding11,
        };
      case "sliding21":
        return {
          ...state,
          sliding21: action.sliding21,
        };
      case "sliding31":
        return {
          ...state,
          sliding31: action.sliding31,
        };
      case "sliding41":
        return {
          ...state,
          sliding41: action.sliding41,
        };
        case "sliding12":
        return {
          ...state,
          sliding12: action.sliding12,
        };
      case "sliding22":
        return {
          ...state,
          sliding22: action.sliding22,
        };
      case "sliding32":
        return {
          ...state,
          sliding32: action.sliding32,
        };
      default:
        return state;
    }
  };
  
  export default AttritionOutputReducer;
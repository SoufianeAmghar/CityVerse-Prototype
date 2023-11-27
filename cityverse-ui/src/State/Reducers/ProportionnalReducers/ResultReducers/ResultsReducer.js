const initState = {
    LineSize: 0,
    GrossLossRatio: 0,
    HiscoxCombinedRatio: 0,
    Margin: 0,
    LloydGrossLossRatio: 0,
    CatPremium: 0,
    
  };
  
  const RatioReducer = (state = initState, action) => {
    switch (action.type) {
      case "LineSize" : 
      return{
        ...state,
        LineSize: action.LineSize,
      }
      case "GrossLossRatio":
        return {
          ...state,
          GrossLossRatio: action.GrossLossRatio,
        };
      case "HiscoxCombinedRatio":
        return {
          ...state,
          HiscoxCombinedRatio: action.HiscoxCombinedRatio,
        };
        case "Margin":
        return {
          ...state,
          Margin: action.Margin,
        };
      case "LloydGrossLossRatio":
        return {
          ...state,
          LloydGrossLossRatio: action.LloydGrossLossRatio,
        };
        case "CatPremium":
        return {
          ...state,
          CatPremium: action.CatPremium,
        };
      default:
        return state;
    }
  };
  
  export default RatioReducer;
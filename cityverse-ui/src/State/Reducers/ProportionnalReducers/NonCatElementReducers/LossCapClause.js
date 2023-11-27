const initState = {
    LossRatio: 99999999999,
    ContributionCap: 0,  
  };
   
  const LossCapClauseReducer = (state = initState, action) => {
    switch (action.type) {
      case "LossRatio":
        return {
          ...state,
          LossRatio: action.LossRatio,
        };
      case "ContributionCap":
        return {
          ...state,
          ContributionCap: action.ContributionCap,
        };
      default:
        return state;
    }
  };
  
  export default LossCapClauseReducer;
  
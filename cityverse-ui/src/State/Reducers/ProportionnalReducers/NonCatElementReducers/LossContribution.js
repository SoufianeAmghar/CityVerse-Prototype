const initState = {
    Contribution: 0,
  };
   
  const LossContributionReducer = (state = initState, action) => {
    switch (action.type) {
      case "Contribution":
        return {
          ...state,
          Contribution: action.Contribution,
        };
      default:
        return state;
    }
  };
  
  export default LossContributionReducer;
  
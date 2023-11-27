const initState = {
  grossLossRatioTrigger: 0,
  contributionAmount: 0,
  lossRatioCap: 0,
  totalContribution: 0,
}; 

const LossParticipationClauseReducer = (state = initState, action) => {
  switch (action.type) {
    case "grossLossRatioTrigger":
      return {
        ...state,
        grossLossRatioTrigger: action.grossLossRatioTrigger,
      };
    case "contributionAmount":
      return {
        ...state,
        contributionAmount: action.contributionAmount,
      };
    case "lossRatioCap":
      return {
        ...state,
        lossRatioCap: action.lossRatioCap,
      };
    case "totalContribution":
      return {
        ...state,
        totalContribution: action.totalContribution,
      };
    default:
      return state;
  }
};

export default LossParticipationClauseReducer;

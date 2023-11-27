const initState = {
  PcType: 0,
  ReinsurersExpenses: 0,
  deficitAmount: 0,
  deficitAmountResult: 0,
  PcRate: 0,
  ResultOfPcRate: 0,
};

const PcInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case "PcType":
      return {
        ...state,
        PcType: action.PcType,
      };
    case "ReinsurersExpenses":
      return {
        ...state,
        ReinsurersExpenses: action.ReinsurersExpenses,
      };
    case "deficitAmount":
      return {
        ...state,
        deficitAmount: action.deficitAmount,
      };
    case "deficitAmountResult":
      return {
        ...state,
        deficitAmountResult: action.deficitAmountResult,
      };
    case "PcRate":
      return {
        ...state,
        PcRate: action.PcRate,
      };
    case "ResultOfPcRate":
      return {
        ...state,
        ResultOfPcRate: action.ResultOfPcRate,
      };
    default:
      return state;
  }
};

export default PcInfoReducer;

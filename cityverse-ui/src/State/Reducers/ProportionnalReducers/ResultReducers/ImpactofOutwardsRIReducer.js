const initState = {
    ContractType: 'Israel',
    RICostCharge: 1.5,
    RICostChargeResult: 167244,
    RecoveryRate: 45,
    RecoveryRateResult: 75260,
    FinalCombinedRatio: 96.4,
    NetTI: 95.2,
  };
  
  const ImpactofOutwardsRIReducer = (state = initState, action) => {
    switch (action.type) {
      case "ContractType":
        return {
          ...state,
          ContractType: action.ContractType,
        };
      case "RICostCharge":
        return {
          ...state,
          RICostCharge: action.RICostCharge,
        };
        case "RICostChargeResult":
        return {
          ...state,
          RICostChargeResult: action.RICostChargeResult,
        };
      case "RecoveryRate":
        return {
          ...state,
          RecoveryRate: action.RecoveryRate,
        };
        case "RecoveryRateResult":
        return {
          ...state,
          RecoveryRateResult: action.RecoveryRateResult,
        };
      case "FinalCombinedRatio":
        return {
          ...state,
          FinalCombinedRatio: action.FinalCombinedRatio,
        };
        case "NetTI":
        return {
          ...state,
          NetTI: action.NetTI,
        };
      default:
        return state;
    }
  };
  
  export default ImpactofOutwardsRIReducer;
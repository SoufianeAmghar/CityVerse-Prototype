const initState = {
  netPremium: '',
  estGrossPremiumSubject: 100,
  resultEstGrossPremium: 39151000,
  priorYearDefecit: 0,
  catLR: 13.8,
  largeLossLR: 12.5,
  attritionLR: 46.4,
  minSlidingScale: 30,
  resultMinSlidingScale: 47.5,
  maxSlidingScale: 45,
  resultMaxSlidingScale: 30,
  estimatedSlidingScaleCommission: 0,
};

const FinalNetPremiumReducer = (state = initState, action) => {
  switch (action.type) {
    case "netPremium":
      return {
        ...state,
        netPremium: action.netPremium,
      };
    case "estGrossPremiumSubject":
      return {
        ...state,
        estGrossPremiumSubject: action.estGrossPremiumSubject,
      };
    case "resultEstGrossPremium":
      return {
        ...state,
        resultEstGrossPremium:
          action.resultEstGrossPremium * state.resultEstGrossPremium,
      };
    case "priorYearDefecit":
      return {
        ...state,
        priorYearDefecit: action.priorYearDefecit,
      };
    case "catLR":
      return {
        ...state,
        catLR: action.catLR,
      };
    case "largeLossLR":
      return {
        ...state,
        largeLossLR: action.largeLossLR,
      };
    case "attritionLR":
      return {
        ...state,
        attritionLR: action.attritionLR,
      };
    case "minSlidingScale":
      return {
        ...state,
        minSlidingScale: action.minSlidingScale,
      };
    case "resultMinSlidingScale":
      return {
        ...state,
        resultMinSlidingScale: action.resultMinSlidingScale,
      };
    case "maxSlidingScale":
      return {
        ...state,
        maxSlidingScale: action.maxSlidingScale,
      };
    case "resultMaxSlidingScale":
      return {
        ...state,
        resultMaxSlidingScale: action.resultMaxSlidingScale,
      };
    case "estimatedSlidingScaleCommission":
      return {
        ...state,
        estimatedSlidingScaleCommission: action.estimatedSlidingScaleCommission,
      };
    default:
      return state;
  }
};

export default FinalNetPremiumReducer;

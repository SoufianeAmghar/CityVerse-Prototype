const initState = {
  RateofExchangetoUSD: '',
  catPricing: 0,
  correlation: 0,
  attrition: 0,
  largeLoss: 0,
  occurrence: 0,
  commissionType: 0,
  otherCommision: 0,
  risk_limite:0,
  annual_limite:0
};

const PricingInputsReducer = (state = initState, action) => {
  switch (action.type) {
    case "RateofExchangetoUSD":
      return {
        ...state,
        RateofExchangetoUSD: action.RateofExchangetoUSD,
      };
    case "catPricing":
      return {
        ...state,
        catPricing: action.catPricing,
      };
    case "correlation":
      return {
        ...state,
        correlation: action.correlation,
      };
    case "attrition":
      return {
        ...state,
        attrition: action.attrition,
      };
    case "largeLoss":
      return {
        ...state,
        largeLoss: action.largeLoss,
      };
    case "occurrence":
      return {
        ...state,
        occurrence: action.occurrence,
      };
    case "commissionType":
      return {
        ...state,
        commissionType: action.commissionType,
      };
    case "otherCommision":
      return {
        ...state,
        otherCommision: action.otherCommision,
      };
      case "risk_limite":
        return {
          ...state,
          risk_limite: action.risk_limite,
        };
        case "annual_limite":
          return {
            ...state,
            annual_limite: action.annual_limite,
          };
    default:
      return state;
  }
};
export default PricingInputsReducer;
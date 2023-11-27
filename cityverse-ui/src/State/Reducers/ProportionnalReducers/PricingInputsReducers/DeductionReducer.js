const initState = {
  nonCatCommission: 0,
  resultNonCatCommission: 0,
  catCommission: 0,
  resultCatCommission: 0,
  brokerage: 0,
  resultatBrokerage: 0,
  tax: 0,
  resultTax: 0,
  commonAccount: 0,
  resultCommonAccount: 0,
  Other: 0,
  ResultOther:0
};

const DeductionReducer = (state = initState, action) => {
  switch (action.type) {
    case "totalNonCatCommission":
      return {
        ...state,
        nonCatCommission: action.nonCatCommission,
      };
    case "resultNonCatCommission":
      return {
        ...state,
        resultNonCatCommission: action.resultNonCatCommission,
      };
    case "catCommission":
      return {
        ...state,
        catCommission: action.catCommission,
      };
    case "resultCatCommission":
      return {
        ...state,
        resultCatCommission: action.resultCatCommission,
      };
    case "brokerage":
      return {
        ...state,
        brokerage: action.brokerage,
      };
    case "resultatBrokerage":
      return {
        ...state,
        resultatBrokerage: action.resultatBrokerage,
      };
    case "tax":
      return {
        ...state,
        tax: action.tax,
      };
    case "resultTax":
      return {
        ...state,
        resultTax: action.resultTax,
      };
    case "commonAccount":
      return {
        ...state,
        commonAccount: action.commonAccount,
      };
    case "resultCommonAccount":
      return {
        ...state,
        resultCommonAccount: action.resultCommonAccount,
      };
      case "Other":
        return {
          ...state,
          Other: action.Other,
        };
        case "ResultOther":
        return {
          ...state,
          ResultOther: action.ResultOther,
        };

    default:
      return state;
  }
};

export default DeductionReducer;

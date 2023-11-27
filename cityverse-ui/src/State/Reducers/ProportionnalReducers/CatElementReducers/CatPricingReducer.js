const initState = {
  NetMeanCatLosses: 0,
  NetCatSD: 0,
  NetMeanCatLossesPourcentage: 0,
  RequiredCatPremium: 0,
  AllocatedCatPremium: 0,
  PricingAdequacy: 0,
  CatTI: 0,
  earnedPremuim: [],
  pricing_date: null,
};

const CatPricingReducer = (state = initState, action) => {
  switch (action.type) {
    case "NetMeanCatLosses":
      return {
        ...state,
        NetMeanCatLosses: action.NetMeanCatLosses,
      };
    case "NetCatSD":
      return {
        ...state,
        NetCatSD: action.NetCatSD,
      };
    case "NetMeanCatLossesPourcentage":
      return {
        ...state,
        NetMeanCatLossesPourcentage: action.NetMeanCatLossesPourcentage,
      };
    case "RequiredCatPremium":
      return {
        ...state,
        RequiredCatPremium: action.RequiredCatPremium,
      };
    case "AllocatedCatPremium":
      return {
        ...state,
        AllocatedCatPremium: action.AllocatedCatPremium,
      };
    case "PricingAdequacy":
      return {
        ...state,
        PricingAdequacy: action.PricingAdequacy,
      };
    case "CatTI":
      return {
        ...state,
        CatTI: action.CatTI,
      };
    case "earnedPremuim":
      return {
        ...state,
        earnedPremuim: action.earnedPremuim,
      };
    case "pricing_date":
      return {
        ...state,
        pricing_date: action.pricing_date,
      };
    default:
      return state;
  }
};

export default CatPricingReducer;

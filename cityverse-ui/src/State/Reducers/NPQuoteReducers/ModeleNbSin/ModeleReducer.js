const initState = {
    moyenneNbSin: 1.98,
    ecartTypeNbSin: 1.99,
    varianceNbSin: 3.95,
    nAnneeNbSin: 7,
  };

  const ModeleReducer = (state = initState, action) => {
    switch (action.type) {
      case "moyenneNbSin":
        return {
          ...state,
          moyenneNbSin: action.moyenneNbSin,
        };
      case "ecartTypeNbSin":
        return {
          ...state,
          ecartTypeNbSin: action.ecartTypeNbSin,
        };
        case "varianceNbSin":
            return {
              ...state,
              varianceNbSin: action.varianceNbSin,
            };
        case "nAnneeNbSin":
        return {
          ...state,
          nAnneeNbSin: action.nAnneeNbSin,
        };
      default:
        return state;
    }
  };
  
  export default ModeleReducer;
const initState = {
    moyenneNbSinRC: 1.98,
    ecartTypeNbSinRC: 1.99,
    varianceNbSinRC: 3.95,
    nAnneeNbSinRC: 7,
  };

  const ModeleReducerRC = (state = initState, action) => {
    switch (action.type) {
      case "moyenneNbSinRC":
        return {
          ...state,
          moyenneNbSinRC: action.moyenneNbSinRC,
        };
      case "ecartTypeNbSinRC":
        return {
          ...state,
          ecartTypeNbSinRC: action.ecartTypeNbSinRC,
        };
        case "varianceNbSinRC":
            return {
              ...state,
              varianceNbSinRC: action.varianceNbSinRC,
            };
        case "nAnneeNbSinRC":
        return {
          ...state,
          nAnneeNbSinRC: action.nAnneeNbSinRC,
        };
      default:
        return state;
    }
  };
  
  export default ModeleReducerRC;
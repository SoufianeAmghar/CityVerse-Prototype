  const initState = {
    annee_renouvelmntSL : '',
    commentairesSL : [],
  };

  const InfoInputsReducerSL = (state = initState, action) => {
    switch (action.type) {
      case "commentairesSL":
        return {
          ...state,
          commentairesSL: action.commentairesSL,
        }
      case "annee_renouvelmntSL":
        return {
          ...state,
          annee_renouvelmntSL: action.annee_renouvelmntSL,
        };
      default:
        return state;
    }
  };
  export default InfoInputsReducerSL;
const initState = {
    cedanteRC : "test1",
    paysRC : "Maroc",
    deviseRC : "DMA",
    annee_renouvelmntRC : 2019,
    affaireRC : "RCA + RCG",
    formeRC : "XS",
    brancheCouvertesRC: "RC",
    commentairesRC: [],
  };

  const InfoInputsReducerRC = (state = initState, action) => {
    switch (action.type) {
      case "cedanteRC":
        return {
          ...state,
          cedanteRC: action.cedanteRC,
        };
      case "paysRC":
        return {
          ...state,
          paysRC: action.paysRC,
        };
      case "deviseRC":
        return {
          ...state,
          deviseRC: action.deviseRC,
        };
      case "annee_renouvelmntRC":
        return {
          ...state,
          annee_renouvelmntRC: action.annee_renouvelmntRC,
        };
      case "affaireRC":
        return {
          ...state,
          affaireRC: action.affaireRC,
        };
      case "formeRC":
        return {
          ...state,
          formeRC: action.formeRC,
        };
      case "brancheCouvertesRC":
        return {
          ...state,
          brancheCouvertesRC: action.brancheCouvertesRC,
        };
      case "commentairesRC":
        return {
          ...state,
          commentairesRC: action.commentairesRC,
        };
      default:
        return state;
    }
  };
  export default InfoInputsReducerRC;
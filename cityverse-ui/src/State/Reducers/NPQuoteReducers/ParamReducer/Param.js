const initState = {
    b_chargements: null,
    b_taux_moyen: null,
    b_rapport_tx: null,
    b_type_historique: null,
    b_erreur: null,
  
    s_chargements: null,
    s_taux_moyen: null,
    s_rapport_tx: null,
    s_erreur: null,
  
    loi_cout: null,
    parametre: null,
    seuil_cout: null,
    max_cout: null,
  
    loi_nombres: null,
    parametre1: null,
    parametre2: null,
  };
  
  const Param = (state = initState, action) => {
    switch (action.type) {
      case "b_chargements":
        return {
          ...state,
          b_chargements: action.b_chargements,
        };
      case "b_taux_moyen":
        return {
          ...state,
          b_taux_moyen: action.b_taux_moyen,
        };
      case "b_rapport_tx":
        return {
          ...state,
          b_rapport_tx: action.b_rapport_tx,
        };
      case "b_type_historique":
        return {
          ...state,
          b_type_historique: action.b_type_historique,
        };
      case "b_erreur":
        return {
          ...state,
          b_erreur: action.b_erreur,
        };
      case "s_chargements":
        return {
          ...state,
          s_chargements: action.s_chargements,
        };
      case "s_taux_moyen":
        return {
          ...state,
          s_taux_moyen: action.s_taux_moyen,
        };
      case "s_rapport_tx":
        return {
          ...state,
          s_rapport_tx: action.s_rapport_tx,
        };
      case "s_erreur":
        return {
          ...state,
          s_erreur: action.s_erreur,
        };
      case "loi_cout":
        return {
          ...state,
          loi_cout: action.loi_cout,
        };
      case "parametre":
        return {
          ...state,
          parametre: action.parametre,
        };
      case "seuil_cout":
        return {
          ...state,
          seuil_cout: action.seuil_cout,
        };
      case "max_cout":
        return {
          ...state,
          max_cout: action.max_cout,
        };
      case "loi_nombres":
        return {
          ...state,
          loi_nombres: action.loi_nombres,
        };
      case "parametre1":
        return {
          ...state,
          parametre1: action.parametre1,
        };
      case "parametre2":
        return {
          ...state,
          parametre2: action.parametre2,
        };
      default:
        return state;
    }
  };
  
  export default Param;
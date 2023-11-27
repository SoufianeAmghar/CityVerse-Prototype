const initState = {
  idBcostSL: null,
  tranchesSL: [],

  /** Tableau rol */
  TarifDataRolSL: []
};

const BurningCostSL = (state = initState, action) => {
  switch (action.type) {
    
    case "idBcostSL":
      return {
        ...state,
        idBcostSL: action.idBcostSL,
      }
    case "tranchesSL":
      return {
        ...state,
        tranchesSL: action.tranchesSL,
      };
    case "TarifDataRol":
      return {
        ...state,
        TarifDataRolSL: action.TarifDataRolSL,
      }
    default:
      return state;
  }
};

export default BurningCostSL;

const initState = {
  tranchesRC: [],


  /** Tableau rol */
  TarifDataRolRC: []
};

const BurningCost = (state = initState, action) => {
  switch (action.type) {
    case "tranchesRC":
      return {
        ...state,
        tranchesRC: action.tranchesRC,
      };
    case "TarifDataRolRC":
      return {
        ...state,
        TarifDataRolRC: action.TarifDataRolRC,
      };
    default:
      return state;
  }
};

export default BurningCost;

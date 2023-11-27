const initState = {
  
  tranchesSimulationSL: [],

  /** Tableau rol */
  TarifDataRolSimulSL: [],
  selectedTrancheSimulationSL: 1,
  NonCatInput : '',
  LoiNonCat: '',
  Cat_Input: '',
  LoiCat: '',
  NomTanche: '',


  /** Models */
  
};

const SimulationReducerSL = (state = initState, action) => {
  switch (action.type) {
    case "tranchesSimulationSL":
      return {
        ...state,
        tranchesSimulationSL: action.tranchesSimulationSL,
      };
    case "NonCatInput":
        return {
          ...state,
          NonCatInput: action.NonCatInput,
      };
    case "NomTanche":
        return {
          ...state,
          NomTanche: action.NomTanche,
      };
    case "LoiNonCat":
        return {
          ...state,
          LoiNonCat: action.LoiNonCat,
    };
    case "Cat_Input":
        return {
          ...state,
          Cat_Input: action.Cat_Input,
      };
    case "LoiCat":
        return {
          ...state,
          LoiCat: action.LoiCat,
      };

    case "TarifDataRolSimulSL":
      return {
        ...state,
        TarifDataRolSimulSL: action.TarifDataRolSimulSL,
      };
    case "selectedTrancheSimulationSL":
      return {
        ...state,
        selectedTrancheSimulationSL: action.selectedTrancheSimulationSL,
      };
    default:
      return state;
  }
};

export default SimulationReducerSL;

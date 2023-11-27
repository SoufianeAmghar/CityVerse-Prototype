const initState = {
  idSimulation: null,
  tranchesSimulation: [],

  /** Tableau rol */
  TarifDataRolSimul: [],
  selectedTrancheSimulation: '',

  /** Models */
  listModelesSimulation : [],
  loi_cout : null,
  loi_nombre :null,
};

const SimulationReducer = (state = initState, action) => {
  switch (action.type) {
    case "idSimulation":
      return{
        ...state,
        idSimulation: action.idSimulation,
      }
    case "loi_cout":
      return {
        ...state,
        loi_cout: action.loi_cout,
      };
      case "loi_nombre":
      return {
        ...state,
        loi_nombre: action.loi_nombre,
      };
    case "listModelesSimulation":
      return {
        ...state,
        listModelesSimulation: action.listModelesSimulation,
      };
    case "tranchesSimulation":
      return {
        ...state,
        tranchesSimulation: action.tranchesSimulation,
      };
    case "TarifDataRolSimul":
      return {
        ...state,
        TarifDataRolSimul: action.TarifDataRolSimul,
      };
    case "selectedTrancheSimulation":
      return {
        ...state,
        selectedTrancheSimulation: action.selectedTrancheSimulation,
      };
    case 'reset':
        return initState;
    default:
      return state;
  }
};

export default SimulationReducer;

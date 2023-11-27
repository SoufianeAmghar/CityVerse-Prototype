const initState = {
    tranchesSimulationRC: [],
  
    /** Tableau rol */
    TarifDataRolSimulRC: [],
    selectedTrancheSimulationRC: 1,
  
    /** Models */
    listModelesSimulationRC : [{
        id: 1,
        nom: "model1",
        seuil: 0,
        max_cout: 0,
        loi_cout_nom: "Pareto",
        loi_cout_param_1: 0,
        loi_cout_param_2: 0,
        loi_nombres: "Poisson",
        loi_nombres_param_1: 0,
        loi_nombres_param_2: 0,
      }
    ],
    loi_coutRC : "Pareto",
    loi_nombreRC :"Poisson",
  };
  
  const SimulationReducerRC = (state = initState, action) => {
    switch (action.type) {
      case "idSimulation":
        return{
          ...state,
          idSimulation: action.idSimulation,
        }
      case "loi_coutRC":
        return {
          ...state,
          loi_coutRC: action.loi_coutRC,
        };
        case "loi_nombreRC":
        return {
          ...state,
          loi_nombreRC: action.loi_nombreRC,
        };
      case "listModelesSimulationRC":
        return {
          ...state,
          listModelesSimulationRC: action.listModelesSimulationRC,
        };
      case "tranchesSimulationRC":
        return {
          ...state,
          tranchesSimulationRC: action.tranchesSimulationRC,
        };
      case "TarifDataRolSimulRC":
        return {
          ...state,
          TarifDataRolSimulRC: action.TarifDataRolSimulRC,
        };
      case "selectedTrancheSimulationRC":
        return {
          ...state,
          selectedTrancheSimulationRC: action.selectedTrancheSimulationRC,
        };
      default:
        return state;
    }
  };
  
  export default SimulationReducerRC;
  
const initState = {
  idSinistre: null,
  indiceActualisation: "Morocco CPI WB",
  
};

const Epi = (state = initState, action) => {
  switch (action.type) {
    case "idSinistre":
      return {
        ...state,
        idSinistre: action.idSinistre,
      };
    case "indiceActualisation":
      return {
        ...state,
        indiceActualisation: action.indiceActualisation,
      };
    default:
      return state;
  }
};

export default Epi;

const initState = {
  idEpi: null,
  device: "DMA",
  unite: 1,
  indiceActualisation: "Morocco CPI WB",
  indiceExpo: "EPI",
  epi_list: [],
};

const EpiReducer = (state = initState, action) => {
  switch (action.type) {
    case "idEpi":
      return {
        ...state,
        idEpi: action.idEpi,
      };
    case "device":
      return {
        ...state,
        device: action.device,
      };
    case "unite":
      return {
        ...state,
        unite: action.unite,
      };
    case "indiceActualisation":
      return {
        ...state,
        indiceActualisation: action.indiceActualisation,
      };
    case "indiceExpo":
      return {
        ...state,
        indiceExpo: action.indiceExpo,
      };
    case "epi_list":
      return {
        ...state,
        epi_list: action.epi_list,
      };
    default:
      return state;
  }
};

export default EpiReducer;

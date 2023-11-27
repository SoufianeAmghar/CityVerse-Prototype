const initState = {
  dataIndices: [],
  dataTempIndice: [],
  tempNomIndice: "",
  tempIdIndice: "",
  nomIndice: "-",
  indicesNoms: [],
}

const Indices = (state = initState, action) => {
  switch (action.type) {
    case "indicesNoms":
      return {
        ...state,
        indicesNoms: action.indicesNoms,
      }
    case "dataIndices":
      return {
        ...state,
        dataIndices: action.dataIndices,
      }
    case "dataTempIndice":
      return {
        ...state,
        dataTempIndice: action.dataTempIndice,
      }
    case "tempIdIndice":
      return {
        ...state,
        tempIdIndice: action.tempIdIndice,
      }
    case "tempNomIndice":
      return {
        ...state,
        tempNomIndice: action.tempNomIndice,
      }
    case "nomIndice":
      return {
        ...state,
        nomIndice: action.nomIndice,
      }
    default:
      return state;
  }
};

export default Indices;
const initState = {
  dataIndicesRC: [],
  dataTempIndiceRC: [],
  tempNomIndiceRC: "",
  tempIdIndiceRC: "",
  nomIndiceRC: "-",
  indicesNomsRC: [],
}

const IndiceRcReducer = (state = initState, action) => {
  switch (action.type) {
    case "indicesNomsRC":
      return {
        ...state,
        indicesNomsRC: action.indicesNomsRC,
      }
    case "dataIndicesRC":
      return {
        ...state,
        dataIndicesRC: action.dataIndicesRC,
      }
    case "dataTempIndiceRC":
      return {
        ...state,
        dataTempIndiceRC: action.dataTempIndiceRC,
      }
    case "tempIdIndiceRC":
      return {
        ...state,
        tempIdIndiceRC: action.tempIdIndiceRC,
      }
    case "tempNomIndiceRC":
      return {
        ...state,
        tempNomIndiceRC: action.tempNomIndiceRC,
      }
    case "nomIndiceRC":
      return {
        ...state,
        nomIndiceRC: action.nomIndiceRC,
      }
    default:
      return state;
  }
};

export default IndiceRcReducer;
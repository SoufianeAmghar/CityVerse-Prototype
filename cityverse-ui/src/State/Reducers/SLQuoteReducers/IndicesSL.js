const initState = {
    dataIndicesSL: [],
    dataTempIndiceSL: [],
    tempNomIndiceSL: "",
    tempIdIndiceSL: "",
    nomIndiceSL: "-",
    indicesNomsSL: [],
  }
  
  const IndicesSL = (state = initState, action) => {
    switch (action.type) {
      case "indicesNomsSL":
        return {
          ...state,
          indicesNomsSL: action.indicesNomsSL,
        }
      case "dataIndicesSL":
        return {
          ...state,
          dataIndicesSL: action.dataIndicesSL,
        }
      case "dataTempIndiceSL":
        return {
          ...state,
          dataTempIndiceSL: action.dataTempIndiceSL,
        }
      case "tempIdIndiceSL":
        return {
          ...state,
          tempIdIndiceSL: action.tempIdIndiceSL,
        }
      case "tempNomIndiceSL":
        return {
          ...state,
          tempNomIndiceSL: action.tempNomIndiceSL,
        }
      case "nomIndiceSL":
        return {
          ...state,
          nomIndiceSL: action.nomIndiceSL,
        }
      default:
        return state;
    }
  };
  
  export default IndicesSL;
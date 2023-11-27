const initState = {
    dataParamsRC: [],
    dataTempParamRC: [],
    tempNomParamRC: "",
    tempIdParamRC: "",
    nomParamRC: "-",
    ParamsNomsRC: [],
  }
  
  const ParamReducer = (state = initState, action) => {
    switch (action.type) {
      case "ParamsNomsRC":
        return {
          ...state,
          ParamsNomsRC: action.ParamsNomsRC,
        }
      case "dataParamsRC":
        return {
          ...state,
          dataParamsRC: action.dataParamsRC,
        }
      case "dataTempParamRC":
        return {
          ...state,
          dataTempParamRC: action.dataTempParamRC,
        }
      case "tempIdParamRC":
        return {
          ...state,
          tempIdParamRC: action.tempIdParamRC,
        }
      case "tempnomParamRC":
        return {
          ...state,
          tempnomParamRC: action.tempnomParamRC,
        }
      case "nomParamRC":
        return {
          ...state,
          nomParamRC: action.nomParamRC,
        }
      default:
        return state;
    }
  };
  
  export default ParamReducer;
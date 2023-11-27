const initState = {
  idExpoQuote: "",
  tranchesExpo: [],
  resultTrancheExpo: [],
  selectedTranche: null,

  fraisCedanteExpo: null,
  coutageExpo: null,
  fraisReassExpo: null,
  securiteExpo: null,
  autreFacteurExpo: null,
  primeNonConnueExpo: null,


  nomPort: '',
  oui_nonPort: '',
  courbePort: '',
  resuPort: '',

  portfeuille: [],
  
  primePurParTranche: [],
};

const ExpoReducer = (state = initState, action) => {
  switch (action.type) {
    case "idExpoQuote":
      return {
        ...state,
        idExpoQuote: action.idExpoQuote,
      }
    case "primePurParTranche":
      return {
        ...state,
        primePurParTranche: action.primePurParTranche,
      };
    case "tranchesExpo":
      return {
        ...state,
        tranchesExpo: action.tranchesExpo,
      };
    case "resultTrancheExpo":
      return {
        ...state,
        resultTrancheExpo: action.resultTrancheExpo,
      };
    case "selectedTranche":
      return {
        ...state,
        selectedTranche: action.selectedTranche,
      };
    case "portfeuille":
      return {
        ...state,
        portfeuille: action.portfeuille,
      }
    case "fraisCedanteExpo":
      return {
        ...state,
        fraisCedanteExpo: action.fraisCedanteExpo,
      };
    case "coutageExpo":
      return {
        ...state,
        coutageExpo: action.coutageExpo,
      };
    case "fraisReassExpo":
      return {
        ...state,
        fraisReassExpo: action.fraisReassExpo,
      };
    case "securiteExpo":
      return {
        ...state,
        securiteExpo: action.securiteExpo,
      };
    case "autreFacteurExpo":
      return {
        ...state,
        autreFacteurExpo: action.autreFacteurExpo,
      };
    case "primeNonConnueExpo":
      return {
        ...state,
        primeNonConnueExpo: action.primeNonConnueExpo,
      };
    case "nomPort":
      return {
        ...state,
        nomPort: action.nomPort,
      };
    case "oui_nonPort":
      return {
        ...state,
        oui_nonPort: action.oui_nonPort,
      };
    case "courbePort":
      return {
        ...state,
        courbePort: action.courbePort,
      };
    case "resuPort":
      return {
        ...state,
        resuPort: action.resuPort,
      };
    case 'reset':
        return initState;
    default:
      return state;
  }
};

export default ExpoReducer;

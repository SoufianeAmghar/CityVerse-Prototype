const initState = {
  minNbSinRC: '',
  pasNbSinRC: '',
  emp_histoRC: [],
  poisson_histoRC: [],
  negbin_histoRC: []
};

const HistogrammeReducerRC = (state = initState, action) => {
  switch (action.type) {
    case "poisson_histoRC":
      return {
        ...state,
        poisson_histoRC: action.poisson_histoRC,
      };
    case "negbin_histoRC":
      return {
        ...state,
        negbin_histoRC: action.negbin_histoRC,
      }
    case "emp_histoRC":
      return {
        ...state,
        emp_histoRC: action.emp_histoRC,
      };
    case "pasNbSinRC":
      return {
        ...state,
        pasNbSinRC: action.pasNbSinRC,
      };
    case "minNbSinRC":
      return {
        ...state,
        minNbSinRC: action.minNbSinRC,
      };
    default:
      return state;
  }
};

export default HistogrammeReducerRC;
const initState = {
  minNbSin: '',
  pasNbSin: '',
  emp_histo: [],
  poisson_histo: [],
  negbin_histo: []
};

const HistogrammeReducer = (state = initState, action) => {
  switch (action.type) {
    case "poisson_histo":
      return {
        ...state,
        poisson_histo: action.poisson_histo,
      };
    case "negbin_histo":
      return {
        ...state,
        negbin_histo: action.negbin_histo,
      }
    case "emp_histo":
      return {
        ...state,
        emp_histo: action.emp_histo,
      };
    case "pasNbSin":
      return {
        ...state,
        pasNbSin: action.pasNbSin,
      };
    case "minNbSin":
      return {
        ...state,
        minNbSin: action.minNbSin,
      };
    default:
      return state;
  }
};

export default HistogrammeReducer;
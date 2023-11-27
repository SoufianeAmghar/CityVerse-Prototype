const initState = {
  seuilRC: 7000000,
  emp_stat_inputRC: [],
};

  const StateSinistreReducerRC = (state = initState, action) => {
    switch (action.type) {
      case "seuilRC":
      return {
        ...state,
        seuilRC: action.seuilRC,
      };
    case "emp_stat_inputRC":
      return {
        ...state,
        emp_stat_inputRC: action.emp_stat_inputRC,
      };
      default:
        return state;
    }
  };
  
  export default StateSinistreReducerRC;
const initState = {
  
  idModeleNbSin: null,
};

const StateSinistreReducer = (state = initState, action) => {
  switch (action.type) {
    case "idModeleNbSin":
      return {
        ...state,
        idModeleNbSin: action.idModeleNbSin,
      };
    default:
      return state;
  }
};

export default StateSinistreReducer;
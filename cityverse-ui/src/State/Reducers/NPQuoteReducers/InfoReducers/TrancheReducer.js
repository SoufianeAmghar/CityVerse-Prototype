const initState = {
  
  idTranche: null,
};

const TrancheReducer = (state = initState, action) => {
  switch (action.type) {
    case "idTranche":
      return {
        ...state,
        idTranche: action.idTranche,
      };
    default:
      return state;
  }
};

export default TrancheReducer;

const initState = {
  idModeleCout: null,
};

const ModeleCout = (state = initState, action) => {
  switch (action.type) {
    case "idModeleCout":
      return {
        ...state,
        idModeleCout: action.idModeleCout,
      }
    default:
      return state;
  }
};

export default ModeleCout;

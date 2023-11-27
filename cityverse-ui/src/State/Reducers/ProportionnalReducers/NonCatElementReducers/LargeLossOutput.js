const initState = {
    listLargeLossOutputs: [
        
      ]
  };
  
  const LargeLossOutputs = (state = initState, action) => {
    switch (action.type) {
      case "listLargeLossOutputs":
          return {
              ...state,
              listLargeLossOutputs: action.listLargeLossOutputs,
            };
      default:
        return state;
    }
  };
  
  export default LargeLossOutputs;
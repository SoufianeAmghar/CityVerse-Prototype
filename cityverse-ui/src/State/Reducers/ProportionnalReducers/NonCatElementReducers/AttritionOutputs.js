const initState = {
    list_attrition: []
  };
  
  const AttritionOutputs = (state = initState, action) => {
    switch (action.type) {
      case "list_attrition":
          return {
              ...state,
              list_attrition: action.list_attrition,
            };
      default:
        return state;
    }
  };
  
  export default AttritionOutputs;
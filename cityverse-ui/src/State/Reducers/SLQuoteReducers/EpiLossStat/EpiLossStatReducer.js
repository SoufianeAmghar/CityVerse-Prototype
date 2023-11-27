

const initState = {
    list_non_indexe : []
  };
  
  const EpiLossStatReducer = (state = initState, action) => {
    switch (action.type) {
      case "list_non_indexe":
        return {
          ...state,
          list_non_indexe: action.list_non_indexe,
        }
      default:
        return state;
    }
  };
  
  export default EpiLossStatReducer;
  
const initState = {
    associations: [],

  };
  
  const AssociationReducer = (state=initState,action) => {
      switch (action.type) {
        case "Associations":
          return{
            ...state,
            associations: action.associations,
        }
        default:
          return state;
      }
    };
  
    export default AssociationReducer;
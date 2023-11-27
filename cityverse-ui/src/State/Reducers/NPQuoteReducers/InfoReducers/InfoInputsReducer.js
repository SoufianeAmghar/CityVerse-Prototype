const initState = {
  commentaires: [],
};

const InfoInputsReducer = (state = initState, action) => {
  switch (action.type) {
    
    case "commentaires":
      return {
        ...state,
        commentaires: action.commentaires,
      }
    default:
      return state;
  }
};
export default InfoInputsReducer;
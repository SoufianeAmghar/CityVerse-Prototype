const initState = {
    CommentAccount: [],
    useCommon : 2,
  };
  
  const CommentAccountReducer= (state = initState, action) => {
    switch (action.type) {
      case "CommentAccount":
        return {
          ...state,
          CommentAccount: action.CommentAccount,

        };
      case "useCommon":
       return {
          ...state,
          useCommon : action.useCommon,

        };
      default:
        return state;
    }
  };
  
  export default CommentAccountReducer;
  
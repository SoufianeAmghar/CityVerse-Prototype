const initState = {
  imageProfile: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  coverProfile: require('../../Asset/rose.png'),
};

const FileUploadReducer = (state=initState,action) => {
    switch (action.type) {
      case "ImageProfile":
        return{
          ...state,
          imageProfile: action.imageProfile,
      }
      case "CoverProfile":
        return{
          ...state,
          coverProfile: action.coverProfile,
      }
      default:
        return state;
    }
  };

  export default FileUploadReducer
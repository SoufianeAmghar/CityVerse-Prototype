const initState = {
  imageProfile: require('../../Asset/profiles.png'),
  coverProfile: require('../../Asset/rose.png'),
  imageassociation: null,
  bannerassociation : null,
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
      case "ImageAssociation" :
        return{
          ...state,
          imageAssociation: action.imageAssociation,
      }
      case "BannerAssociation":
        return{
          ...state,
          bannerAssociation: action.bannerAssociation,
      }
      default:
        return state;
    }
  };

  export default FileUploadReducer
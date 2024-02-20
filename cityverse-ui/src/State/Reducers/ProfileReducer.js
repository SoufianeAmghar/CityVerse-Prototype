const initState = {
  firstname: null,
  lastname: null,
  fb_link: null,
  x_link: null,
  y_link: null,
  instagram_link: null,
  score: 0,
  name: "",
  description: "",
  sdg: [],
  address_coordinate: [],
  address: "",
  goals: [],
  following: [],
};

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case "Address_coordinate":
      return {
        ...state,
        address_coordinate: action.address_coordinate,
      };
    case "Firstname":
      return {
        ...state,
        firstname: action.firstname,
      };
    case "Lastname":
      return {
        ...state,
        lastname: action.lastname,
      };
    case "Address":
      return {
        ...state,
        address: action.address,
      };
    case "Score":
      return {
        ...state,
        score: action.score,
      };
    case "Name":
      return {
        ...state,
        name: action.name,
      };
    case "Description":
      return {
        ...state,
        description: action.description,
      };
    case "Sdg":
      return {
        ...state,
        sdg: action.sdg,
      };
    case "Goals":
      return {
        ...state,
        goals: action.goals,
      };
    case "Fb_link":
      return {
        ...state,
        fb_link: action.fb_link,
      };
    case "X_link":
      return {
        ...state,
        x_link: action.x_link,
      };
    case "Y_link":
      return {
        ...state,
        y_link: action.y_link,
      };
    case "Instagram_link":
      return {
        ...state,
        instagram_link: action.instagram_link,
      };
    case "Score":
      return {
        ...state,
        score: action.score,
      };
    case "Following":
      return {
        ...state,
        following: action.following,
      };
    default:
      return state;
  }
};

export default ProfileReducer;

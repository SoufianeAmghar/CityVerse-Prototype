const initState = {
  associations: [],
  id_association: null,
  association_name: null,
  activity: [
    { label: "Arts & Culture", icon: require("../../Asset/cultureArt.png") },
    {
      label: "Sports",
      icon: require("../../Asset/running.png"),
    },
    { label: "Social Action", icon: require("../../Asset/dish.png") },
    {
      label: "Recreation",
      icon: require("../../Asset/park.png"),
    },
    {
      label: "Humanitary",
      icon: require("../../Asset/solidarity.png"),
    },
  ],
  posts: []
};

const AssociationReducer = (state = initState, action) => {
  switch (action.type) {
    case "Associations":
      return {
        ...state,
        associations: action.associations,
      };
    case "Id_association":
      return {
        ...state,
        id_association: action.id_association,
      };
    case "Association_name":
      return {
        ...state,
        association_name: action.association_name,
      };
    case "Activity":
      return {
        ...state,
        activity: action.activity,
      };
    case "Posts":
        return {
          ...state,
          posts: action.posts,
        };
    default:
      return state;
  }
};

export default AssociationReducer;

const initState = {
    idTreaty: null,
    treaties: [],

    updatedTreaty: [],

};

const TreatyReducer = (state = initState, action) => {
    switch (action.type) {
        case "treaties":
            return {
                ...state,
                treaties: action.treaties,
            };
        case "idTreaty":
            return {
                ...state,
                idTreaty: action.idTreaty,
            }
        case "updatedTreaty":
            return {
                ...state,
                updatedTreaty: action.updatedTreaty,
            }
        default:
            return state;
    }
};

export default TreatyReducer;

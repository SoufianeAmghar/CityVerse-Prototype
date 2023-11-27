const initState = {
    OutwardsRefactors: [],
   
};

const OutWardsRefactorReducer = (state = initState, action) => {
    switch (action.type) {
        case "OutwardsRefactors":
            return {
                ...state,
                OutwardsRefactors: action.OutwardsRefactors,
            };
       
        default:
            return state;
    }
};

export default OutWardsRefactorReducer;
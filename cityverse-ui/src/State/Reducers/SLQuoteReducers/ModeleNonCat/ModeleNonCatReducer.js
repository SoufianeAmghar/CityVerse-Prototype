const initState = {
    
    EmpiriqueModeleNonCat: [{proba: 1, val: 3}, {proba: 3, val: 8}],
    LogNModeleNonCat: [{proba: 2, val: 4}, {proba: 4, val: 6}],
    LogNManuelModeleNonCat: [],
    NormaleModeleNonCat: [],
    NormaleManuelModeleNonCat: [],
};

const ModeleNonCatReducerSL = (state = initState, action) => {
    switch (action.type) {
        case "EmpiriqueModeleNonCat":
            return {
                ...state,
                EmpiriqueModeleNonCat: action.EmpiriqueModeleNonCat,
            }
        case "LogNModeleNonCat":
            return {
                ...state,
                LogNModeleNonCat: action.LogNModeleNonCat,
            }
        case "LogNManuelModeleNonCat":
            return {
                ...state,
                LogNManuelModeleNonCat: action.LogNManuelModeleNonCat,
            }
        case "NormaleModeleNonCat":
            return {
                ...state,
                NormaleModeleNonCat: action.NormaleModeleNonCat,
            }
        case "NormaleManuelModeleNonCat":
            return {
                ...state,
                NormaleManuelModeleNonCat: action.NormaleManuelModeleNonCat,
            }
        default:
            return state;
    }
}

export default ModeleNonCatReducerSL
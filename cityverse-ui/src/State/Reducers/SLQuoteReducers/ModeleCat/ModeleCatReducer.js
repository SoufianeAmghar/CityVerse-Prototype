const initState = {
    
    EmpiriqueModeleCat: [],
    RetenueModeleCat: [],
    LogNModeleCat: [{periode: 1, value: 3}, {periode: 3, value: 8}],
    ParetoModeleCat: [{periode: 2, value: 4}, {periode: 4, value: 6}],

    
};

const ModeleCatReducerSL = (state = initState, action) => {
    switch (action.type) {
        case "EmpiriqueModeleCat":
            return {
                ...state,
                EmpiriqueModeleCat: action.EmpiriqueModeleCat,
            }
        case "RetenueModeleCat":
            return {
                ...state,
                RetenueModeleCat: action.RetenueModeleCat,
            }
        case "LogNModeleCat":
            return {
                ...state,
                LogNModeleCat: action.LogNModeleCat,
            }
        case "ParetoModeleCat":
            return {
                ...state,
                ParetoModeleCat: action.ParetoModeleCat,
            }
        default:
            return state;
    }
}

export default ModeleCatReducerSL
const initState = {
    idSimulationSL: null,
    idTrancheSL: null,
    idBcostSL: null,
    idEpiLossSL: null,
    idModeleSL: null,
    idModeleNonCatSL: null,
    idModeleCatSL: null,
};

const idReducersSL = (state = initState, action) => {
    switch (action.type) {
        case "idTrancheSL":
            return {
                ...state,
                idTrancheSL: action.idTrancheSL
            }
        case "idBcostSL":
            return {
                ...state,
                idBcostSL: action.idBcostSL
            }
        case "idEpiLossSL":
            return {
                ...state,
                idEpiLossSL: action.idEpiLossSL
            }
        case "idModeleSL":
            return {
                ...state,
                idModeleSL: action.idModeleSL
            }
        case "idModeleNonCatSL":
            return {
                ...state,
                idModeleNonCatSL: action.idModeleNonCatSL
            }
        case "idModeleCatSL":
            return {
                ...state,
                idModeleCatSL: action.idModeleCatSL
            }
        case "idSimulationSL":
            return {
                ...state,
                idSimulationSL: action.idSimulationSL
            }
        default:
            return state;
    }
};

export default idReducersSL;

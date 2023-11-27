const initState = {
    dataModeleCout: [
    ],
    DistEmpiriqueData: [{proba: 1, val: 3}],
    paretoData: [{proba: 2, val: 4}],
    paretoManuelData: [],
    logNData: [],
    logNManuelData: [],
    courbe1: "ProbaEmpirique",
    courbe2: "Empirique",
    courbe3: "Pareto",
    courbe4: "Pareto Manuel",
    courbe5: "LogN",
    courbe6: "logN Manuel",
    pasX: 0.1,
    pasY: 5000,
};

const ChartModeleCoutReducer = (state = initState, action) => {
    switch (action.type) {
        case "dataModeleCout":
            return {
                ...state,
                dataModeleCout: action.dataModeleCout,
            }
        case "DistEmpiriqueData":
            return {
                ...state,
                DistEmpiriqueData: action.DistEmpiriqueData,
            }
        case "paretoData":
            return {
                ...state,
                paretoData: action.paretoData,
            }
        case "paretoManuelData":
            return {
                ...state,
                paretoManuelData: action.paretoManuelData,
            }
        case "logNData":
            return {
                ...state,
                logNData: action.logNData,
            }
        case "logNManuelData":
            return {
                ...state,
                logNManuelData: action.logNManuelData,
            }
        case "courbe1":
            return {
                ...state,
                courbe1: action.courbe1,
            }
        case "courbe2":
            return {
                ...state,
                courbe2: action.courbe2,
            }
        case "courbe3":
            return {
                ...state,
                courbe3: action.courbe3,
            }
        case "courbe4":
            return {
                ...state,
                courbe4: action.courbe4,
            }
        case "courbe5":
            return {
                ...state,
                courbe5: action.courbe5,
            }
        case "courbe6":
            return {
                ...state,
                courbe6: action.courbe6,
            }
        case "pasX":
            return {
                ...state,
                pasX: action.pasX,
            }
        case "pasY":
            return {
                ...state,
                pasY: action.pasY,
            }
        default:
            return state;
    }
}

export default ChartModeleCoutReducer
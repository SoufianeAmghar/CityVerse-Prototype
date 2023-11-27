const initState = {
  dataModeleCoutRC: [
  ],
  DistEmpiriqueDataRC: [{proba: 1, val: 3}],
  paretoDataRC: [{proba: 2, val: 4}],
  paretoManuelDataRC: [],
  logNDataRC: [],
  logNManuelDataRC: [],
  
};

const ChartModeleCoutReducerRC = (state = initState, action) => {
  switch (action.type) {
    case "dataModeleCoutRC":
        return {
            ...state,
            dataModeleCoutRC: action.dataModeleCoutRC,
        }
    case "DistEmpiriqueDataRC":
        return {
            ...state,
            DistEmpiriqueDataRC: action.DistEmpiriqueDataRC,
        }
    case "paretoDataRC":
        return {
            ...state,
            paretoDataRC: action.paretoDataRC,
        }
    case "paretoManuelDataRC":
        return {
            ...state,
            paretoManuelDataRC: action.paretoManuelDataRC,
        }
    case "logNDataRC":
        return {
            ...state,
            logNDataRC: action.logNDataRC,
        }
    case "logNManuelDataRC":
        return {
            ...state,
            logNManuelDataRC: action.logNManuelDataRC,
        }
    default:
        return state;
}
};

export default ChartModeleCoutReducerRC;

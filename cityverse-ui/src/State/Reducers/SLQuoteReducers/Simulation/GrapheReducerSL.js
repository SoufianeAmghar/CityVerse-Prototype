const initState = {
    dataGrapheSumNPSL: [],
    dataGrapheDistributionNPSL: [],
};

const GrapheReducerSL = (state = initState, action) => {
    switch (action.type) {
        case "dataGrapheSumNPSL":
            return {
                ...state,
                dataGrapheSumNPSL: action.dataGrapheSumNPSL,
            }
        case "dataGrapheDistributionNPSL":
            return {
                ...state,
                dataGrapheDistributionNPSL: action.dataGrapheDistributionNPSL,
            }
        default:
            return state;
    }
}

export default GrapheReducerSL
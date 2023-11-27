const initState = {
    dataQuantilleNPSL: [],
};

const QuantilleReducerSL = (state = initState, action) => {
    switch (action.type) {
        case "dataQuantilleNPSL":
            return {
                ...state,
                dataQuantilleNPSL: action.dataQuantilleNPSL,
            }
        default:
            return state;
    }
}

export default QuantilleReducerSL
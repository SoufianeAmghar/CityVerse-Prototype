const initState = {
    dataQuantilleNP: [
        { "x": 80.0, "periode": 5.0, "charge" : null},
        { "x": 85.0, "periode": 6.7, "charge" : null},
        { "x": 90.0, "periode": 10.0, "charge" : null},
        { "x": 95.0, "periode": 20.0, "charge" : null},
        { "x": 96.0, "periode": 25.0, "charge" : null},
        { "x": 97.0, "periode": 33.3, "charge" : null},
        { "x": 98.0, "periode": 50.0, "charge" : null},
        { "x": 99.0, "periode": 100.0, "charge" : null},
        { "x": 99.5, "periode": 200.0, "charge" : null},
    ],
};

const QuantilleReducer = (state = initState, action) => {
    switch (action.type) {
        case "dataQuantilleNP":
            return {
                ...state,
                dataQuantilleNP: action.dataQuantilleNP,
            }
        default:
            return state;
    }
}

export default QuantilleReducer
const initState = {
    dataGrapheSumNP: [
        { "P(S<X)": 0.0, "courbe": 1},
        { "P(S<X)": 1.0, "courbe": 3},
        { "P(S<X)": 2.0, "courbe": 2},
        { "P(S<X)": 3.0, "courbe": 3},
        { "P(S<X)": 4.0, "courbe": 6},
        { "P(S<X)": 5.0, "courbe": 3},
        { "P(S<X)": 6.0, "courbe": 3},
        { "P(S<X)": 7.0, "courbe": 2},
        { "P(S<X)": 8.0, "courbe": 5},
        { "P(S<X)": 9.0, "courbe": 4},
        { "P(S<X)": 10.0, "courbe": 6},
        { "P(S<X)": 11.0, "courbe": 2},
        { "P(S<X)": 12.0, "courbe": 3},
        { "P(S<X)": 13.0, "courbe": 3},
        { "P(S<X)": 14.0, "courbe": 2},
        { "P(S<X)": 15.0, "courbe": 1},
        { "P(S<X)": 16.0, "courbe": 1},
        { "P(S<X)": 17.0, "courbe": 7},
        { "P(S<X)": 18.0, "courbe": 4},
        { "P(S<X)": 19.0, "courbe": 2},
        { "P(S<X)": 20.0, "courbe": 4},
    ],
    courbe1: "courbe",
};

const GrapheReducer = (state = initState, action) => {
    switch (action.type) {
        case "dataGrapheSumNP":
            return {
                ...state,
                dataGrapheSumNP: action.dataGrapheSumNP,
            }
        case "courbe1":
            return {
                ...state,
                courbe1: action.courbe1,
            }
        default:
            return state;
    }
}

export default GrapheReducer
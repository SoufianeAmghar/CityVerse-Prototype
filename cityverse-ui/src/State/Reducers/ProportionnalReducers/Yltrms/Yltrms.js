const initState = {
    YltRmsFile : null,
    useYLT:1
};

const YltRmsReducer = (state = initState, action) => {
    switch (action.type) {
        case "YltRmsFile":
            return {
                ...state,
                YltRmsFile: action.YltRmsFile,
            };
   
        case "useYLT":
            return {
                ...state,
                useYLT: action.useYLT,
            };
        default:
            return state;
    }
};

export default YltRmsReducer;

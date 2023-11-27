const initState = {
    Information: [
        {label: "LAE", val: "100%"},
        {label: "ITV", val: "100%"},
        {label: "Growth", val: "100%"},
        {label: "Model", val: "100%"},
        {label: "Other", val: "100%"},
      ],
    ListCatLosses: [],
    ManualNumbers: [
        {rank: 1, loss: 900000, selected: 900000000},
        {rank: 2, loss: 900000, selected: 900000000},
        {rank: 3, loss: 900000, selected: 900000000},
        {rank: 4, loss: 900000, selected: 900000000},
        {rank: 5, loss: 900000, selected: 900000000},
        {rank: 6, loss: 900000, selected: 900000000},
      ],
    ManualWorking: [
        {percentile: "0.0%", manualCurve: 900000},
        {percentile: "0.1%", manualCurve: 900000},
      ],
    Nbitteration:100
   
};

const CatLossesReducer = (state = initState, action) => {
    switch (action.type) {
        case "Information":
            return {
                ...state,
                Information: action.Information,
            };
        case "ListCatLosses":
            return {
                ...state,
                ListCatLosses: action.ListCatLosses,
            };
        case "ManualNumbers":
            return {
                ...state,
                ManualNumbers: action.ManualNumbers,
            };

        case "ManualWorking":
            return {
                ...state,
                ManualWorking: action.ManualWorking,
            };
        case "Nbitteration":
            return {
                ...state,
                Nbitteration: action.Nbitteration,
            };
        default:
            return state;
    }
};

export default CatLossesReducer;

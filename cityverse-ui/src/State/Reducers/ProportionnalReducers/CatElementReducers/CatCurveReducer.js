const initState = {
    Pays: 0,
    ZoneRef: 0,
    NbrPoint: '',
    Exposition: '',
    NbrExposition: '',
    FacteurEvExpo: '',
    EpiN: '',
    EpiN1: '',
    FacteurEvPrime: '',
    Scaling: '',
    Tradeline: '',
    Source : '',
    Peril: '',
};

const CatCurveReducer = (state = initState, action) => {
    switch (action.type) {
        case "Type":
            return {
                ...state,
                Type: action.Type,
            };
        case "Pays":
            return {
                ...state,
                Pays: action.Pays,
            };
        case "NbrPoint":
            return {
                ...state,
                NbrPoint: action.NbrPoint,
            };

        case "Exposition":
            return {
                ...state,
                Exposition: action.Exposition,
            };
        case "FacteurEvExpo":
            return {
                ...state,
                FacteurEvExpo: action.FacteurEvExpo,
            };

        case "ZoneRef":
            return {
                ...state,
                ZoneRef: action.ZoneRef,
            };
        
        case "NbrExposition":
            return {
                ...state,
                NbrExposition: action.NbrExposition,
            };
        case "EpiN":
            return {
                ...state,
                EpiN: action.EpiN,
            };
        case "EpiN1":
            return {
                ...state,
                EpiN1: action.EpiN1,
            };
        case "FacteurEvPrime":
            return {
                ...state,
                FacteurEvPrime: action.FacteurEvPrime,
                };  
        case "Scaling":
            return {
                ...state,
                Scaling: action.Scaling,
                }; 
        case "Tradeline":
            return {
                ...state,
                Tradeline: action.Tradeline,
                };   
        case "Source":
            return {
                ...state,
                Source: action.Source,
                };  
        case "Peril":
            return {
                ...state,
                Peril: action.Peril,
                };      
        default:
            return state;
    }
};

export default CatCurveReducer;

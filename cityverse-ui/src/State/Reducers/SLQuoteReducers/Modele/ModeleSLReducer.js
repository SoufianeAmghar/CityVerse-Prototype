const initState = {

    histogrammeModele : [],

    emp_nonCat_SL: [
        {
            proba: "0-1",
            nonCat: 0.1,
        }
    ],
    emp_Cat_SL: [
        {
            proba: "0-1",
            car: 0.2,
        }
    ],
    Simulation_histo_SL: [
        {
            proba: "0-1",
            val: 0.2,
        },
        {
            proba: "1-2",
            val: 0.5,
        }
    ],

    base_Sur: '',
    Type: ''
};

const HistogrammeReducerSL = (state = initState, action) => {
    switch (action.type) {
        case "histogrammeModele":
            return {
                ...state,
                histogrammeModele: action.histogrammeModele,
            }
        case "emp_Cat_SL":
            return {
                ...state,
                emp_Cat_SL: action.emp_Cat_SL,
            };
        case "Simulation_histo_SL":
            return {
                ...state,
                Simulation_histo_SL: action.Simulation_histo_SL,
            }
        case "emp_nonCat_SL":
            return {
                ...state,
                emp_nonCat_SL: action.emp_nonCat_SL,
            };
        case "base_Sur":
            return {
                ...state,
                base_Sur: action.base_Sur,
            };
        case "Type":
            return {
                ...state,
                Type: action.Type,
                };
        default:
            return state;
    }
};

export default HistogrammeReducerSL;
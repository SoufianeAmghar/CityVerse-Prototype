const initState = {
    countries: [], 
    regions : [],
};

const RpMultiPerilsReducer = (state=initState,action)=>{
    switch(action.type){
        case "regions":
            return {
                ...state,
                regions: action.regions,
            }
        case "countries":
            return {
                ...state,
                regions: action.regions,
                }
        
        default:
            return state;
 
    }
};

export default RpMultiPerilsReducer

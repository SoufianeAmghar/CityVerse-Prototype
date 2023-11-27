const initState = {
    firstauth:false
};

const FirstAuthReducer=(state=initState,action)=>{
    switch (action.type){
        case  "FisrtAuth":
            return{
                ...state,
                firstauth:action.FisrtAuth,
            }
        case "NotFirstAuth":
            return{
                ...state,
                firstauth:action.NotFirstAuth,
            }
        default:
            return{
                state
            }
    }
};
export default FirstAuthReducer
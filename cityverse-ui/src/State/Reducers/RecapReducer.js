const initState = {
    recapTreaty:[],
    value:{},
    params:{},
    status:""

};

const RecapReducer=(state=initState,action)=>{
    switch (action.type){
        case  "recapTreaty":
            return{
                ...state,
                recapTreaty:action.recapTreaty,
            }
        case  "value":
            return{
                ...state,
                value:action.value,
            }
        case  "params":
            return{
                ...state,
                params:action.params,
            }
        case  "status":
            return{
                ...state,
                status:action.status,
            }
        default:
            return{
                state
            }
    }
};
export default RecapReducer
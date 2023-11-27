const initstate={
    lobs:[],
}

const riskReducer=(state=initstate,action)=>{
    switch(action.type){
        case "lobs" :
            return {
                ...state,
                lobs:action.lobs,
            }
        default :
        return{
            state
        }
    }
}
export default riskReducer;
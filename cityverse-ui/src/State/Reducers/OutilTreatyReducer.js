const initstate={
    outilName:"",
    outil:"",
    id:""
}

const OutilTreatyReducer=(state=initstate,action)=>{
    switch(action.type){
        case "outilName" :
            return {
                ...state,
                outilName: action.outilName,
            }
        case "outil" :
                return {
                    ...state,
                    outil: action.outil,
                }
        case "id" : 
        return{
            ...state,
            id: action.id,
        }
            
        default:
                return state;
        }
    };
export default OutilTreatyReducer;
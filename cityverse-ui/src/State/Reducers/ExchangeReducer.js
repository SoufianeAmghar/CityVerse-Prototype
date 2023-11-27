const initState = {
    exchangedata:[
    
    ],
   
};

const ExchangeReducer=(state=initState,action)=>{
    switch(action.type){
        case "getData":
            return{
                ...state,
                exchangedata:action.getData,
            }
        
        default:
            return{
                state
            }
        
    }
};
export default ExchangeReducer

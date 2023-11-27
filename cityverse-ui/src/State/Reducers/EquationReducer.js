const initstate={
    equation:[],
    countries:[]
}

const EquationReducer=(state=initstate,action)=>{
    switch(action.type){
        case "equation" :
            return {
                ...state,
                equation:action.equation,
            }
            case "countries" :
                return {
                    ...state,
                    countries:action.countries,
                }

        default :
        return{
            state
        }
    }
}
export default EquationReducer
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const FirstAuthRoute = ({children, ...rest}) => {
    
    const firstauth=useSelector((state)=>state.FirstAuthReducer.firstauth)
    return(
        <Route {...rest}>
                {firstauth 
                    ?
                    children
                    : 
                    <Redirect to="/" /> }
        </Route>
    )
}
export default FirstAuthRoute
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserLoginContext } from './usercontextlogin/UserLoginContext'
const PrivateRoute = ({children, ...rest}) => {
    var {isAuthenticated,setisAuthenticated}=useContext(UserLoginContext)
    const access_token=sessionStorage.getItem('acces_token')
    
    return(
        <Route {...rest}>
                {access_token 
                    ?
                    children
                    : 
                    <Redirect to="/" /> }
        </Route>
    )
}
export default PrivateRoute
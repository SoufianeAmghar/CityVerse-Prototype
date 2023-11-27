import React, { useState } from 'react';
import App from './App';
import { UserLoginContext } from './Components/LogIn/usercontextlogin/UserLoginContext';

const AppWrapper = () => {

    const [isAuthenticated,setisAuthenticated]=useState(false)
   
{
    return(
        <UserLoginContext.Provider value={{isAuthenticated,setisAuthenticated}}>
            <App />
        </UserLoginContext.Provider>
    )
  }
 
  }

export default AppWrapper
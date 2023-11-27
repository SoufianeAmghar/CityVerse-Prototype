import React, { useEffect } from 'react';
import { useCountdown } from './useCountdown';
import { useHistory } from 'react-router-dom';
import {UserLoginContext} from '../LogIn/usercontextlogin/UserLoginContext'
import ShowCounter from './ShowCounter';
import { useContext } from 'react';

const CountdownTimer = ({ targetDate , onClose}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const history=useHistory()
  const {isAuthenticated,setisAuthenticated}=useContext(UserLoginContext)
  const deconnexion=()=>{
    sessionStorage.clear();
    setisAuthenticated(false)
    history.push("/")
     
  }
  useEffect(()=>{
if(days+hours+minutes+seconds<=0){
  onClose()
  deconnexion()
}
  })
  
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  
};
export default CountdownTimer
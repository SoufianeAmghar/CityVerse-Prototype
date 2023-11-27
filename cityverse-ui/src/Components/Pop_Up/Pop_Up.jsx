import { Button,Box,Typography,Stack,Divider,Card } from '@mui/material'
import React, { useContext } from 'react'
import CountdownTimer from '../countdown/CountdownTimer';
import { useHistory } from 'react-router-dom';
import {UserLoginContext} from '../LogIn/usercontextlogin/UserLoginContext'
import axios from 'axios';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // height: "90%",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 4,
};


const Pop_Up = ({onClose}) => {

  const targetdate=sessionStorage.getItem("exp")

  const history=useHistory()
  const {isAuthenticated,setisAuthenticated}=useContext(UserLoginContext)
  const deconnexion=()=>{
    sessionStorage.clear(); 
    setisAuthenticated(false)
    history.push("/")  
  }
  const refresh_token=sessionStorage.getItem('refresh_token')
  const headers = {
    'Authorization': 'Bearer '+refresh_token.toString()
};
const call_api_auth=async ()=>{

  axios.get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER+'/api/refreshtoken',{headers}).then(data=>{
    sessionStorage.setItem('acces_token',data.data.acces_token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.acces_token}`;
      sessionStorage.setItem('refresh_token',data.data.refresh_token)
      let array=parseJwt(data.data.acces_token)
      sessionStorage.setItem('roles',array.roles)
      let timer=(new Date().getTime()+60*60*1000 )/1000
      sessionStorage.setItem('timer',timer)
	    sessionStorage.setItem('exp', array.exp)
      sessionStorage.setItem('email',array.sub)
      sessionStorage.setItem('check-validity',timer)
  }).catch((err)=>{
    deconnexion()
    
  })
}
  
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
  
  return (
    <Card sx={style}>
      <Box sx={{ p: 2, display: 'flex',justifyContent: 'space-between' }}>
        <Stack spacing={1} direction='row'>
        <HelpOutlineIcon sx={{ color: "#FF7900" }} />
          <Typography fontWeight={700}>
            {sessionStorage.getItem("language") === "fr" ? "Votre session va expirer dans":"Your session will expires in"} 
          </Typography>
          <Typography fontWeight={700} sx={{translate:'0px -15px'}}>
            <CountdownTimer
                targetDate={targetdate}
                onClose={onClose}
            />
          </Typography>
         
        </Stack>
        
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ px: 2, py: 1,gap:"10px", bgcolor: 'background.default' }}
      >
        <Button variant="contained" color="success"
        onClick={()=>{
          call_api_auth()
          onClose()
        }}>
          {sessionStorage.getItem("language") === 'fr' ? "Continuez" : " Continue"} 
        </Button>
        <Button variant="text" color="success" onClick={()=>{
          onClose()
          deconnexion()

        }}>
         {sessionStorage.getItem("language") === 'fr' ? "Quitter" : "Exit"} 
        </Button>
      </Stack>
</Card>
  )
}


export default Pop_Up
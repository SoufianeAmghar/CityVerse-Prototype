import {
  MenuItem,
} from "@material-ui/core";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { UserLoginContext } from "./usercontextlogin/UserLoginContext";


const Login = (props) => {  
  var [error, setError] = useState(false);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassWord] = useState(false);
  const [langue, setLangue] = useState("");
  const [inprogress, setInprogress] = useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(UserLoginContext);
  const dispatch = useDispatch();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  const call_api_auth = async () => {
    setInprogress(true);
    let options = {
      password: passwordValue,
      email: loginValue,
    };
   
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/auth/login",
        options
      )
      .then((data) => {     
        sessionStorage.setItem("acces_token", data.data.Authorization);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.Authorization}`;
        //sessionStorage.setItem("refresh_token", data.data.refresh_token);
        let array = parseJwt(data.data.Authorization);
        // sessionStorage.setItem("roles", array.roles);
        // let timer = (new Date().getTime() + 60 * 60 * 1000) / 1000;
        // sessionStorage.setItem("timer", timer);
        // sessionStorage.setItem("exp", array.exp);
        // sessionStorage.setItem("email", array.sub);
        // sessionStorage.setItem("check-validity", timer);
        console.log('tessst', array )
        history.push("/explore");
        setInprogress(false);
        // axios
        //   .post(
        //     process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
        //       "/api/activated",
        //     {
        //       email: loginValue,
        //     }
        //   )
        //   .then((data) => {
        //     if (data.data === false) {
        //       dispatch({ type: "FisrtAuth", FisrtAuth: true });
        //       history.push("/firstauth");
           
           
        //     } else {
        //       setisAuthenticated(true);
        //       dispatch({ type: "NotFirstAuth", FisrtAuth: false });
        //       history.push("/explore");
    
        //       setError(false);
        //     }
        //   });
      })
      .catch((err) => {
      
        setError(true);
        setInprogress(false);
      });

    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
  };

  const langues = [
    {
      value: "en",
      label: "Anglais",
    },
    {
      value: "fr",
      label: "Francais",
    },
  ];

  //change language
  function changeLanguage(e) {
    setLangue(e.target.value);
    
    sessionStorage.setItem("language", e.target.value);
  }
  return (
    <>
       <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"       
        />
      </head>
      <div
        class=" h-screen overflow-hidden flex items-center justify-center"
        // style={{ background: "#edf2f7" }}
      >
        <body class="bg-video px-50 py-50 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="container flex flex-col mx-auto  rounded-lg pt-12 my-24 mx-24 ">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
              <div class="flex items-center justify-center w-full lg:p-12">
                <div class="flex items-center xl:p-10" >
                  <form class="flex flex-col w-full h-full pb-6 text-center  rounded-3xl">
                    <h3 class="mb-3 text-4xl font-extrabold text-white">
                      Sign In
                    </h3>
                    <p class="mb-4 text-grey-700">
                      Enter your email and password
                    </p>
                    {error ? (
                <>
                  <Typography className="error_message">
                    {
                    sessionStorage.getItem("language") === "fr"
                      ? "Authentification échouée"
                      : "Authentication failed"
                  }
                  </Typography>
                </>
              ) : (
                <></>
              )}
                    {/* <a class="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                      <img
                        class="h-5 mr-2"
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                        alt=""
                      />
                      Sign in with Google
                    </a> */}
                    {/* <div class="flex items-center mb-3">
                      <hr class="h-0 border-b border-solid border-grey-500 grow" />
                      <p class="mx-4 text-grey-600">or</p>
                      <hr class="h-0 border-b border-solid border-grey-500 grow" />
                    </div> */}
                    <label
                      for="email"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="mail@loopple.com"
                      class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                      onChange={(e) => {
                        setError(false);
                        setLoginValue(e.target.value);
                      }}
                    />
                    <label
                      for="password"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Password*
                    </label>
                    <input
                      id="password"
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e) => {
                                setError(false);
                                setShowPassWord(!showPassword);
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleMouseDownPassword();
                              }}
                              onMouseUp={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setPasswordValue(e.target.value);
                      }}
                    />
                    <div class="flex flex-row justify-between mb-8">
                      <label class="relative inline-flex items-center mr-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked
                          value=""
                          class="sr-only peer"
                        />
                        {/* <div class="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                          <img
                            class=""
                            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                            alt="tick"
                          />
                        </div> */}
                        {/* <span class="ml-3 text-sm font-normal text-white">
                          Keep me logged in
                        </span> */}
                      </label>
                      <button   
                        // href="javascript:void(0)"
                        class="mr-4 text-sm font-medium text-purple-blue-500"
                        onClick={(e)=>{
                          history.push("/forgetpassword")
                        }}
                      >
                        Forget password?
                      </button>
                    </div>
                    <button class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"  variant="contained"
                disabled={
                  passwordValue === "" || loginValue === "" || inprogress
                }
                loading={inprogress}
                loadingPosition="end"
                endIcon={<NavigateNextIcon />}
                size="large"
                onClick={() => {
                  call_api_auth();
                }} >
                      Sign In
                    </button>
                    <p class="text-sm leading-relaxed text-white">
                      Not registered yet?{" "}
                      <a
                        href="/signup"
                        class="font-bold text-grey-700"
                      >
                        Create an Account
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>


      {/* <div className="login">
        <div className="login_flex">
          <div className="left_panel">
            
            <img
              style={{ height: "100px", width: "auto" }}
              className="img"
              src={logo}
            />
            
          </div>
          <div className="right_panel">
            

            <>
              <Typography className="text_center" component="h1"
                  variant="h5"
                  color="text.primary" >
                 {
                    sessionStorage.getItem("language") === "fr"
                      ? "Bienvenue a SCR treaty"
                      : "welcome to SCR treaty"
                  }
              </Typography>
              <Typography
              component="h1"
              variant="h5"
              color="text.primary" className="text_center" >
                {
                    sessionStorage.getItem("language") === "fr"
                      ? "Connectez-vous"
                      : "Login"
                  }
              </Typography>
              {error ? (
                <>
                  <Typography className="error_message">
                    {
                    sessionStorage.getItem("language") === "fr"
                      ? "Authentification échouée"
                      : "Authentication failed"
                  }
                  </Typography>
                </>
              ) : (
                <></>
              )}

              <Stack direction="column" spacing={2}>
                <TextField
                  id="outlined-select-lange"
                  required
                  select
                  fullWidth={true}
                  size="small"
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Langue"
                      : "Language"
                  }
                  value={langue}
                  color="success"
                  onChange={changeLanguage}
                  variant="outlined"
                >
                  {langues.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  className="login_field"
                  color="success"
                  label="Adresse E-mail"
                  onChange={(e) => {
                    setError(false);
                    setLoginValue(e.target.value);
                  }}
                />
                <TextField
                  required
                  type={showPassword ? "text" : "password"}
                  color="success"
                  className="login_field"
                  label="Mot de Passe"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => {
                            setError(false);
                            setShowPassWord(!showPassword);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleMouseDownPassword();
                          }}
                          onMouseUp={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPasswordValue(e.target.value);
                  }}
                />
              </Stack>
              <Button
                  color="success"
                  size="large"
                  onClick={(e)=>{
                    history.push("/forgetpassword")
                  }}
                  style={{ textTransform: "none",
                  fontWeight: 400, color : "#08089C" , fontSize: 14}}
                >
                   {sessionStorage.getItem("language") === 'fr' ? "Mot de passe oublié":"Forget password"}
            </Button>
              <LoadingButton
                id="start_btn"
                className="btn"
                variant="contained"
                color="success"
                disabled={
                  passwordValue === "" || loginValue === "" || inprogress
                }
                loading={inprogress}
                loadingPosition="end"
                endIcon={<NavigateNextIcon />}
                size="large"
                onClick={() => {
                  call_api_auth();
                }}
              >
                {
                    sessionStorage.getItem("language") === "fr"
                      ? "Se Connecter"
                      : "Login"
                  }
              </LoadingButton>
            </>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;

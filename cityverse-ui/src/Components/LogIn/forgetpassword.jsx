import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import "./Backdrop.css";
import "./Login.css";

import axios from "axios";
const Forgetpassword = () => {
  const [email, setemail] = useState("");
  const [open, setopen] = useState(false);
  const [error, seterror] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const call_api_forgetpassword = () => {
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/forget_password",
        {
          email: email,
        }
      )
      .then((data) => {
        setopen(true);
        seterror(false);
        setbackdrop(false);
      })
      .catch((err) => {
        setopen(false);
        seterror(true);
        setbackdrop(false);
      });
  };
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"
        />
      </head>
      <div
        class="h-screen overflow-hidden flex items-center justify-center"
        // style={{ background: "#edf2f7" }}
      >
        <body class="bg-video px-50 py-50 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="container flex flex-col mx-auto  rounded-lg pt-12 my-24 mx-24 ">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
              <div class="flex items-center justify-center w-full lg:p-12">
                <div class="flex items-center xl:p-10">
                  <form class="flex flex-col w-full h-full pb-6 text-center  rounded-3xl">
                    <h3 class="mb-3 text-4xl font-extrabold text-white">
                      {sessionStorage.getItem("language") === "fr"
                        ? "Mot de passe oublié"
                        : "Forgot Password"}
                    </h3>
                    <p class="mb-4 text-grey-700">Enter your email</p>
                    {error ? (
                      <>
                        <Typography className="error_message">
                          {sessionStorage.getItem("language") === "fr"
                            ? "Authentification échouée"
                            : "Authentication failed"}
                        </Typography>
                      </>
                    ) : (
                      <></>
                    )}
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
                        setemail(e.target.value)      
                      }}
                    />

                    <button
                      class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300  rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                      variant="contained"
                      // disabled={}
                      // loading={inprogress}
                      loadingPosition="end"
                      style={
                        backdrop
                          ? { backgroundColor: "#dddddd", color: "#FFF" }
                          : { backgroundColor: "#08089C", color: "#FFF" }
                      }
                      // endIcon={<NavigateNextIcon />}
                      disabled={backdrop}
                      size="large"
                      onClick={() => {

                        call_api_forgetpassword();
                        setbackdrop(true);
                        
                      }}
                    >
                      Continue
                    </button>
                    <div className="margin_top margin_bottom padding">
              <Collapse in={open}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setopen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Un e-mail de réinitialisation du mot de passe a été envoyé. Veuillez vérifier votre boîte de réception"
                    : "A reset password email has been sent. Please check your inbox"}
                </Alert>
              </Collapse>
              <Collapse in={error}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        seterror(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Erreur est survenue"
                    : "Error occured"}
                </Alert>
              </Collapse>
            </div>
            <div>
              <Collapse in={backdrop}>
                <CircularProgress color="secondary" />
              </Collapse>
            </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
      {/* <div>
        <Grid
          container
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#F2F2F2",
          }}
        >
          <CssBaseline />

          <div
            style={{
              width: 400,
              backgroundColor: "#FFFF",
              margin: 0,
              boxShadow: "5px 10px 18px #888888",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: 80,
                textAlign: "center",
                padding: 10,
                fontSize: 20,
              }}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Mot de passe oublié"
                : "Forgot Password"}
            </Typography>
            <div className="margin_bottom">
              <Typography
                variant="h6"
                style={{
                  fontWeight: 80,
                  textAlign: "center",
                  padding: 10,
                  fontSize: 15,
                }}
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Saisir votre address email"
                  : "Enter your email address"}
              </Typography>
            </div>

            <div className="margin_top margin_bottom">
              <TextField
                size="small"
                focused
                color="success"
                placeholder={
                  sessionStorage.getItem("language") === "fr"
                    ? "Saisir votre address email"
                    : "Enter your email address"
                }
                label="Email"
                variant="outlined"
                value={email}
                required
                fullWidth
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="margin_top margin_bottom">
              <Button
                onClick={(e) => {
                  call_api_forgetpassword();
                  setbackdrop(true);
                }}
                disabled={backdrop}
                variant="contained"
                size="large"
                style={
                  backdrop
                    ? { backgroundColor: "#dddddd", color: "#FFF" }
                    : { backgroundColor: "#08089C", color: "#FFF" }
                }
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Continuez"
                  : "Continue"}
              </Button>
            </div>
            <div className="margin_top margin_bottom padding">
              <Collapse in={open}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setopen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Un e-mail de réinitialisation du mot de passe a été envoyé. Veuillez vérifier votre boîte de réception"
                    : "A reset password email has been sent. Please check your inbox"}
                </Alert>
              </Collapse>
              <Collapse in={error}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        seterror(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Erreur est survenue"
                    : "Error occured"}
                </Alert>
              </Collapse>
            </div>
            <div>
              <Collapse in={backdrop}>
                <CircularProgress color="secondary" />
              </Collapse>
            </div>
          </div>
        </Grid>
      </div> */}
    </>
  );
};

export default Forgetpassword;

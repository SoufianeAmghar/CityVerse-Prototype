import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Backdrop.css";
import { UserLoginContext } from "./usercontextlogin/UserLoginContext";

const FirstAuth = () => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();
  const { isAuthenticated, setisAuthenticated } = useContext(UserLoginContext);
  const dispatch = useDispatch();

  function handleAjouter() {
    if (
      password === confirmPassword &&
      password.length >= 10 &&
      password.match(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) &&
      password.match(/[0-9]/g) &&
      password.match(/[A-Z]/g) &&
      password.match(/[a-z]/g)
    ) {
      return false;
    } else {
      return true;
    }
  }

  const access_token = sessionStorage.getItem("acces_token");
  const headers = {
    Authorization: "Bearer " + access_token.toString(),
  };
  const call_api_change_password = () => {
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/firsauth",
        {
          password: password,
        },
        { headers }
      )
      .then((data) => {
        dispatch({ type: "NotFirstAuth", FisrtAuth: false });
        setisAuthenticated(true);
        history.push("/explore");
      })
      .catch((err) => {
        setisAuthenticated(false);
        
      });
  };

  return (
    <div>
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
            borderRadius: "0px",
            borderTop: "2px solid blue",
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
              ? "Votre première authentification merci de changer votre mot de passe"
              : "Your first authentification please change your password"}
          </Typography>
          <FormControl variant="outlined" className="margin_top margin_bottom">
            <InputLabel htmlFor="Password">
              {sessionStorage.getItem("language") === "fr"
                ? "Mot de passe"
                : "Password"}
            </InputLabel>
            <OutlinedInput
              id="PassInput"
              size="medium"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      setShowPassword(!showPassword);
                    }}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <div className="margin_top margin_bottom">
            <FormControl variant="outlined">
              <InputLabel htmlFor="ConfirmPassword">
                {sessionStorage.getItem("language") === "fr"
                  ? "Confirmez mot de passe"
                  : "Confirm password"}
              </InputLabel>
              <OutlinedInput
                id="ConfirmPassword"
                size="medium"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        setShowPassword(!showPassword);
                      }}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {sessionStorage.getItem("language") === "fr" ? (
                <FormHelperText>
                  {password === confirmPassword
                    ? "Le mot de passe correspond"
                    : "Le mot de passe ne correspond pas"}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  {password === confirmPassword
                    ? "Password does match"
                    : "Password doesnt match"}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="margin_top margin_bottom">
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(e) => {
                    setChecked(!checked);
                  }}
                  color="success"
                  size="md"
                />
              }
              label={
                sessionStorage.getItem("language") === "fr"
                  ? "Afficher les détails du mot de passe"
                  : "Show password details"
              }
            />
            {checked && (
              <div style={{}}>
                {password && (
                  <div
                    style={{
                      background: "#f2f2f2",
                      color: "#000",
                      position: "relative",
                      padding: "10px",
                      fontSize: 14,
                      borderRadius: 8,
                      mb: 6,
                    }}
                  >
                    {password.match(/[a-z]/g) ? (
                      <div>
                        <CheckCircleIcon
                          style={{ marginLeft: 2, color: "#008000" }}
                        />
                        <span style={{ marginLeft: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins une lettre miniscule"
                            : "Contains at least one lowercase letter"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon
                          style={{ marginLeft: 2, color: "#F5211B" }}
                        />
                        <span style={{ marginLeft: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins une lettre miniscule"
                            : "Contains at least one lowercase letter"}
                        </span>
                      </div>
                    )}
                    {password.match(/[A-Z]/g) ? (
                      <div>
                        <CheckCircleIcon
                          style={{ marginLeft: 2, color: "#008000" }}
                        />
                        <span style={{ marginLeft: 2, marginBottom: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins une lettre majiscule"
                            : "Contains at least one uppercase letter"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon
                          style={{ marginLeft: 2, color: "#F5211B" }}
                        />
                        <span style={{ marginLeft: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins une lettre majiscule"
                            : "Contains at least one uppercase letter"}
                        </span>{" "}
                      </div>
                    )}
                    {password.match(/[0-9]/g) ? (
                      <div>
                        <CheckCircleIcon
                          style={{ marginLeft: 2, color: "#008000" }}
                        />
                        <span style={{ marginLeft: 2, marginBottom: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins un chiffre"
                            : "Contains at least one digit"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon
                          style={{ marginLeft: 2, color: "#F5211B" }}
                        />
                        <span style={{ marginLeft: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins un chiffre"
                            : "Contains at least one digit"}
                        </span>
                      </div>
                    )}
                    {password.match(
                      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/
                    ) ? (
                      <div>
                        <CheckCircleIcon
                          style={{ marginLeft: 2, color: "#008000" }}
                        />
                        <span style={{ marginLeft: 2, marginBottom: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins un caractère spécial"
                            : "Contains at least one special caracter"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon
                          style={{ marginLeft: 2, color: "#F5211B" }}
                        />
                        <span style={{ marginLeft: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins un caractère spécial"
                            : "Contains at least one special caracter"}
                        </span>
                      </div>
                    )}
                    {password.length >= 10 ? (
                      <div>
                        <CheckCircleIcon
                          style={{ marginLeft: 2, color: "#008000" }}
                        />
                        <span style={{ marginLeft: 2, marginBottom: 2 }}>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins 10 caractère "
                            : "Contains at least 10  caracter"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <ErrorIcon
                          style={{ marginLeft: 2, color: "#F5211B" }}
                        />
                        <span>
                          {sessionStorage.getItem("language") === "fr"
                            ? "Contient au moins 10 caractère "
                            : "Contains at least 10  caracter"}
                        </span>
                      </div>
                    )}
                  </div>
                )}{" "}
              </div>
            )}
          </div>
          <div className="margin_top margin_bottom">
            <Button
              color="success"
              variant="text"
              disabled={handleAjouter()}
              onClick={(e) => {
                call_api_change_password();
              }}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Soumettre"
                : "Submit"}
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default FirstAuth;

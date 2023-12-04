import { Suspense, lazy, useEffect } from "react";
import "./App.css";

import { Modal } from "@mui/material";
import { useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FirstAuth from "./Components/LogIn/FirstAuth";
import FirstAuthRoute from "./Components/LogIn/FirstAuthRoute";
import PrivateRoute from "./Components/LogIn/PrivateRoute";
import { useCountdown } from "./Components/countdown/useCountdown";
import ThemeConfig from "./theme/index";

import Pop_Up from "./Components/Pop_Up/Pop_Up";
const MapCart = lazy(() => import("./Components/Map/map"));
const ForgetPassword = lazy(() => import("./Components/LogIn/forgetpassword"));
const Login = lazy(() => import("./Components/LogIn/login"));
const signup = lazy(() => import("./Components/LogIn/sinup"));
const Notifications = lazy(() =>
  import("./Components/Notifications/notifications")
);
const Settings = lazy(() => import("./Components/Settings/settings"));
const Sidebar = lazy(() => import("./Components/Layout/sideBar"));
const Event = lazy(() => import("./Components/Event/event"));

function App(props) {
  // const [open, setopen] = useState(false);
  // const handleClose = () => {
  //   setopen(false);
  // };
  // const handleOpen = () => {
  //   setopen(true);
  // };
  // const [days, hours, minutes, seconds] = useCountdown(
  //   sessionStorage.getItem("timer")
  // );

  // useEffect(() => {
  //   if (days === 0 && hours === 0 && minutes === 0 && seconds === 59) {
  //     handleOpen();
  //   }
  // }, [seconds]);
  {
    console.log("App 00");
  }
  return (
    <ThemeConfig>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <CircularProgress
                color="success"
                disableShrink
                sx={{
                  animationDuration: "550ms",
                }}
                size={60}
                thickness={2}
              />
            </div>
          }
        >
          <Switch>
            <FirstAuthRoute path="/firstauth" component={FirstAuth} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={signup} />
            <Route element={<PrivateRoute />}>
              <Sidebar>
                <Route exact path="/explore"  render={() => <MapCart />} />
                <Route
                  path="/notifications"
                  exact
                  render={(props) => <Notifications {...props} />}
                />
                <Route
                  path="/settings"
                  exact
                  render={(props) => <Settings {...props} />}
                />
                <Route
                  exact
                  path="/events"
                  render={(props) => <Event {...props} />}
                />
                {/* <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{ height: "90%", top: "5%" }}
                >
                  <Pop_Up onClose={handleClose} />
                </Modal> */}
              </Sidebar>
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeConfig>
  );
}

export default App;

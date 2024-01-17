import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FirstAuth from "./Components/LogIn/FirstAuth";
import FirstAuthRoute from "./Components/LogIn/FirstAuthRoute";
import PrivateRoute from "./Components/LogIn/PrivateRoute";
import { useCountdown } from "./Components/countdown/useCountdown";
import ThemeConfig from "./theme/index";
import { PlayGround } from "./Components/PlayGround/playGround";
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
const PointInteret = lazy(() =>
  import("./Components/PointInteret/pointInteret")
);
const Profil = lazy(() => import('./Components/Profil/Profil'))
const Product = lazy(() => import('./Components/Product/product'))
// const PlayGround = lazy(() => import('./Components/PlayGround/playGround'))




function App(props) {
 
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
                <Route exact path="/explore" render={() => <MapCart />} />
                <Route
                  path="/notifications"
                  exact
                  render={(props) => <Notifications {...props} />}
                />
                <Route
                  path="/PointInteret"
                  exact
                  render={(props) => <PointInteret {...props} />}
                />
                <Route
                  path="/Profil"
                  exact
                  render={(props) => <Profil {...props} />}
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
                <Route
                  exact
                  path="/product"
                  render={(props) => <Product {...props} />}
                />
                 <Route
                  exact
                  path="/playground"
                  render={(props) => <PlayGround {...props} />}
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

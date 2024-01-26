import { Tune } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TranslateIcon from "@mui/icons-material/Translate";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Link as LinkDom, useHistory } from "react-router-dom";
import { Card, Container } from "@mui/material";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TerminalIcon from "@mui/icons-material/Terminal";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../LogIn/usercontextlogin/UserLoginContext";
import { useCountdown } from "../countdown/useCountdown";
import "./style.css";
import { Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import Badge from "@mui/material/Badge";
import MapIcon from "@mui/icons-material/Map";
import ExploreIcon from "@mui/icons-material/Explore";
import StarIcon from "@mui/icons-material/Star";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} )`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} )`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 0.2),
  ...theme.mixins.toolbar,
}));

const langues2 = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
];
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

const ITEM_HEIGHT = 48;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#189446",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,

  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ children }) => {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const changeLanguage = (e) => {
    sessionStorage.setItem("language", e.target.value);
  };
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openItems, setOpenItems] = React.useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(UserLoginContext);
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpenItems = () => {
    setOpenItems(!openItems);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const userRole = sessionStorage.getItem("roles");
  // const useremail = sessionStorage.getItem("email");
  const [data, setdata] = useState([]);
  const headers = {
    Authorization: sessionStorage.getItem("acces_token")?.toString(),
  };

  const call_api_get_user_info = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "auth/info", {
        headers,
      })
      .then((value) => {
        setdata(value.data.data);
        console.log( value.data?.data.id.S)
        sessionStorage.setItem("user_Id", value.data?.data.id.S);
       
      })
      .catch((err) => {
        deconnexion();
      });
  };

  useEffect(() => {
    call_api_get_user_info();
  }, []);

  const deconnexion = () => {
    sessionStorage.clear();
    setisAuthenticated(false);
    history.push("/");
  };
  const [focused, setfocused] = useState(true);
  const [focused1, setfocused1] = useState(false);
  const [focused2, setfocused2] = useState(false);
  const [focused3, setfocused3] = useState(false);
  const [focused4, setfocused4] = useState(false);
  const [focused5, setfocused5] = useState(false);
  const [focused6, setfocused6] = useState(false);
  const [focused7, setfocused7] = useState(false);
  const [focused8, setfocused8] = useState(false);
  const [focused9, setfocused9] = useState(false);
  const [focused10, setfocused10] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BrowserRouter>
        <Drawer
          variant="permanent"
          sx={{ display: "flex", height: "100%" }}
          open={open}
        >
          <Box style={{ borderBottom: "1px solid  #d3d9ee " }}>
            {!open && (
              <>
                <IconButton
                  onClick={handleDrawerOpen}
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    marginLeft: "16px",
                    color: "rgb(25, 118, 210)",
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}
            {open && (
              <IconButton
                onClick={handleDrawerClose}
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  marginLeft: "40%",
                  color: "rgb(25, 118, 210)",
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}

            <div
              style={{
                alignItems: "center",
                justifyContent: "flex-center",
                marginBottom: "25%",
              }}
            >
              <br />
              {open && (
                <>
                  <div style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                    <img
                      style={{
                        width: "auto",
                        height: "100px",
                        borderRadius: "100%",
                      }}
                      src={imageProfile}
                      alt="webscript"
                    />
                  </div>
                </>
              )}
              {open && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "25%",
                      paddingRight: "25%",
                    }}
                  >
                    {data && (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1e1e82",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {data?.first_name?.S} {data?.last_name?.S} {data?.score?.N}{" "}
                          <StarIcon sx={{ color: "#FFD700" }} />          
                        </Typography>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </Box>
          {!open && (
            <List style={{ paddingTop: "0px", paddingBottom: "20%" }}>
              <ListItem>
                <img
                  style={{
                    width: "auto",
                    height: "30px",
                    borderRadius: "100%",
                  }}
                  src={imageProfile}
                  alt="webscript"
                />
              </ListItem>
            </List>
          )}

          <List style={{ paddingTop: "0px", paddingBottom: "30%" }}>
            <ListItem
              style={{
                fontFamily: "sans-serif",
                padding: "20px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused ? "active" : ""}
              component={LinkDom}
              to="/explore"
              onClick={(e) => {
                setfocused(true);
                setfocused1(false);
                setfocused2(false);
                setfocused3(false);
                setfocused4(false);
                setfocused5(false);
                setfocused6(false);
                setfocused7(false);
                setfocused8(false);
                setfocused9(false);
                setfocused10(false);
              }}
            >
              <ListItemIcon>
                <ExploreIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Georgia, serif, bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Acceuil"
                    : "Acceuil"
                }
              />
            </ListItem>
            <ListItem
              style={{
                fontFamily: "sans-serif",
                padding: "20px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused1 ? "active" : ""}
              component={LinkDom}
              to="/Profil"
              onClick={(e) => {
                setfocused(false);
                setfocused1(true);
                setfocused2(false);
                setfocused3(false);
                setfocused4(false);
                setfocused5(false);
                setfocused6(false);
                setfocused7(false);
                setfocused8(false);
                setfocused9(false);
                setfocused10(false);
              }}
            >
              <ListItemIcon>
                <AccountBoxIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Georgia, serif, bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Profil"
                    : "Profil"
                }
              />
            </ListItem>
            <ListItem
              style={{
                fontFamily: "Georgia, serif",
                padding: "20px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused2 ? "active" : ""}
              component={LinkDom}
              to="/PointInteret"
              onClick={(e) => {
                setfocused(false);
                setfocused1(false);
                setfocused2(true);
                setfocused3(false);
                setfocused4(false);
                setfocused5(false);
                setfocused6(false);
                setfocused7(false);
                setfocused8(false);
                setfocused9(false);
                setfocused10(false);
              }}
            >
              <ListItemIcon>
                <PinDropIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Avenir Medium, sans-serif , bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Point d'intérêt"
                    : "Point d'intérêt"
                }
              />
            </ListItem>
            <ListItem
              style={{
                fontFamily: "Georgia, serif",
                padding: "20px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused3 ? "active" : ""}
              component={LinkDom}
              to="/events"
              onClick={(e) => {
                setfocused(false);
                setfocused1(false);
                setfocused2(false);
                setfocused3(true);
                setfocused4(false);
                setfocused5(false);
                setfocused6(false);
                setfocused7(false);
                setfocused8(false);
                setfocused9(false);
                setfocused10(false);
              }}
            >
              <ListItemIcon>
                <EventAvailableRoundedIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Avenir Medium, sans-serif , bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Events"
                    : "Events"
                }
              />
            </ListItem>
          </List>
          <List style={{ paddingTop: "0px" }}>
            <ListItem
              style={{
                fontFamily: "sans-serif",
                px: "20px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              //className={focused1 ? "active" : ""}
              component={LinkDom}
              to="/settings"
              onClick={(e) => {
                setfocused1(true);
                setfocused(false);
                setfocused2(false);
                setfocused3(false);
                setfocused4(false);
                setfocused5(false);
                setfocused6(false);
                setfocused7(false);
                setfocused8(false);
                setfocused9(false);
                setfocused10(false);
              }}
            >
              <ListItemIcon>
                <SettingsIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Georgia, serif, bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Settings"
                    : "Settings"
                }
              />
            </ListItem>
          </List>
          <Box sx={{ flexDirection: "row" }}>
            <MenuItem
              sx={{ px: "10px", color: "#1e1e82" }}
              onClick={() => deconnexion()}
            >
              <LogoutIcon sx={{ mx: "10px", color: "#1e1e82" }} />
              <p>&nbsp;&nbsp;{"  "}&nbsp;</p>
              {sessionStorage.getItem("language") === "fr"
                ? "  Se déconnecter"
                : "  Logout"}
            </MenuItem>
          </Box>
        </Drawer>

        <main style={{ flexGrow: 1, padding: theme.spacing(0) }}>
          <Box width="99%" component="main" sx={{ pt: 1 }}>
            <div disableGutters width="99%" height="auto">
              <Card>
                <Container maxWidth="99%" sx={{ paddingTop: "20px" }}>
                  <img
                    style={{
                      width: "auto",
                      height: "32.5px",
                    }}
                    src={require("../../Asset/logo.png")}
                  />
                </Container>
              </Card>
            </div>
          </Box>
          {children}
        </main>
      </BrowserRouter>
    </Box>
  );
};

export default Sidebar;

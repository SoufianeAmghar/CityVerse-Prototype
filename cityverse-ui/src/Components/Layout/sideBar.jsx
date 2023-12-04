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
  const [open, setOpen] = React.useState(false);
  const [openItems, setOpenItems] = React.useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(UserLoginContext);

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

  const userRole = sessionStorage.getItem("roles");
  const useremail = sessionStorage.getItem("email");
  const [data, setdata] = useState([]);
  const access_token = sessionStorage.getItem("acces_token");
  const headers = {
    Authorization:  sessionStorage.getItem("acces_token").toString(),
  };

  const call_api_get_user_info = () => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/auth/info",
        {
          headers,
        }
      )
      .then((value) => {

        setdata(value.data.data)
        console.log(value.data.data)
       
      })
      .catch((err) => {
        //deconnexion();
      });
  };
  const [days, hours, minutes, seconds] = useCountdown(
    sessionStorage.getItem("check-validity")
  );
  useEffect(() => {
    call_api_get_user_info();
  }, [minutes]);
  const deconnexion = () => {
    sessionStorage.clear();
    setisAuthenticated(false);
    history.push("/");
  };
  const [focused, setfocused] = useState(false);
  const [focused1, setfocused1] = useState(true);
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
      {/* <AppBar
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(30,30,130,1) 77%, rgba(63,158,177,1) 100%);",
          borderBottom: "1px solid  #d3d9ee",
        }}
        elevation={1}
      >
        <Toolbar
          style={{
            background:
              "linear-gradient(141deg, rgba(2,0,36,1) 0%, rgba(30,30,130,0.9529061624649859) 84%, rgba(63,158,177,1) 100%)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          Logo
       
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "20px",
            }}
          >
            {sessionStorage.getItem("language") === "fr" ? (
              <div>
                <IconButton
                  sx={{ width: 32, height: 32, color: "#34469D" }}
                  aria-label="more"
                  id="long-button"
                  aria-controls={open1 ? "long-menu" : undefined}
                  aria-expanded={open1 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                >
                  <TranslateIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {langues.map((langues) => (
                    <MenuItem key={langues.value} onClick={handleClose1}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={sessionStorage.getItem("language")}
                          name="radio-buttons-group"
                          onChange={changeLanguage}
                        >
                          <FormControlLabel
                            value={langues.value}
                            control={<Radio color="success" />}
                            label={langues.label}
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <div>
                <IconButton
                  sx={{ width: 32, height: 32, color: "#34469D" }}
                  aria-label="more"
                  id="long-button"
                  aria-controls={open1 ? "long-menu" : undefined}
                  aria-expanded={open1 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                >
                  <TranslateIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {langues2.map((langues) => (
                    <MenuItem key={langues.value} onClick={handleClose1}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={sessionStorage.getItem("language")}
                          name="radio-buttons-group"
                          onChange={changeLanguage}
                        >
                          <FormControlLabel
                            value={langues.value}
                            control={<Radio color="success" />}
                            label={langues.label}
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}
            <Divider orientation="vertical" flexItem></Divider>
            <Box>
              <IconButton
                onClick={handleClick}
                sx={{ width: 32, height: 32, color: "#34469D" }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  style={{ background: "#34469D", width: 30, height: 30 }}
                >
                  {data.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open2}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <PersonIcon sx={{ mr: 2 }} />
                {data.name}
              </MenuItem>
              <MenuItem>
                <TaskAltIcon sx={{ mr: 2 }} />
                {data.role}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => deconnexion()}>
                <LogoutIcon sx={{ mr: 2 }} />
                {sessionStorage.getItem("language") === "fr"
                  ? "Se déconnecter"
                  : "Logout"}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar> */}
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
                    marginLeft: "20px",
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
                paddingLeft: "30%",
                paddingRight: "30%",
                alignItems: "center",
                justifyContent: "flex-center",
                marginBottom: "25%",
              }}
            >
              {open && (
                <Typography
                  variant="h4"
                  style={{ color: "rgba(2,0,36,1)", marginBottom: "10%" }}
                >
                  CityVerse.
                </Typography>
              )}
              <br />
              {open && (
                <div style={{}}>
                  <img
                    style={{
                      width: "auto",
                      height: "100px",
                      borderRadius: "100%",
                    }}
                    src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt="webscript"
                  />

                  <Typography variant="h6" sx={{ color: "#1e1e82" }}>
                  {data?.first_name?.S} {data?.last_name?.S} 
                  </Typography>
                </div>
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
                  src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt="webscript"
                />
              </ListItem>
            </List>
          )}
          <br />
          <br />
          <List style={{ paddingTop: "0px", paddingBottom: "20%" }}>
            <ListItem
              style={{
                fontFamily: "sans-serif",
                padding: "15px",
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
                fontFamily: "Georgia, serif",
                padding: "15px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused1 ? "active" : ""}
              component={LinkDom}
              to="/notifications"
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
                <Badge color="error" badgeContent={9}>
                  <NotificationsIcon style={{ color: "#1e1e82" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Avenir Medium, sans-serif , bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Notifications"
                    : "Notifications"
                }
              />
            </ListItem>
            <ListItem
              style={{
                fontFamily: "Georgia, serif",
                padding: "15px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused2 ? "active" : ""}
              component={LinkDom}
              to="/events"
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
            <ListItem
              style={{
                fontFamily: "Georgia, serif",
                padding: "15px",
                color: "#1e1e82",
                display: "flex",
                flexDirection: "row",
              }}
              button
              className={focused3 ? "active" : ""}
              component={LinkDom}
              to="/settings"
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
                <SettingsIcon style={{ color: "#1e1e82" }} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#00000",
                  fontWeight: 150,
                  fontFamily: "Avenir Medium, sans-serif , bold",
                }}
                primary={
                  sessionStorage.getItem("language") === "fr"
                    ? "Settings"
                    : "Settings"
                }
              />
            </ListItem>
          </List>
          <Box>
            <MenuItem
              sx={{ padding: "10px", color: "#1e1e82" }}
              onClick={() => deconnexion()}
            >
              <LogoutIcon sx={{ ml: "10px", mr: "10px", color: "#1e1e82" }} />
              <p>&nbsp;&nbsp;{"  "}&nbsp;</p>
              {sessionStorage.getItem("language") === "fr"
                ? "  Se déconnecter"
                : "  Logout"}
            </MenuItem>
          </Box>
        </Drawer>

        <main style={{ flexGrow: 1, padding: theme.spacing(0) }}>
          <Box width="99%" component="main" sx={{ pt: 1 }}>
            {children}
          </Box>
        </main>
      </BrowserRouter>
    </Box>
  );
};

export default Sidebar;

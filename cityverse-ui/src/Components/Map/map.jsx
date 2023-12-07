import {
  Alert,
  Card,
  Container,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useRef, useEffect, useState } from "react";
import { Marker } from "react-leaflet/Marker";
import { v4 as uuidv4 } from "uuid";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
  Map,
  CircleMarker,
  Popup,
} from "react-leaflet";
import L, { MarkerCluster } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Polyline } from "react-leaflet/Polyline";
import data from "../Data/data.json";
import dataVélo from "../Data/dataVélo.json";
import dataWifi from "../Data/dataWifi.json";
import dataEvent from "../Data/event.json";
import CardVelo from "../Card/cardVelo";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Chip } from "@material-ui/core";
import CardWifi from "../Card/cardWifi";
import WifiIcon from "@mui/icons-material/Wifi";
import EventIcon from "@mui/icons-material/Event";
import "./map.css";
import BikeMarker from "./MarkerBike";
import CardEvent from "../Card/CardEvent";
import { styled, Drawer as MuiDrawer } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { bikeApi } from "../Data/data";

const Drawer = styled(MuiDrawer)({
  width: 300, //drawer width
  "& .MuiDrawer-paper": {
    width: 300, //drawer width
    transition: "none !important",
  },
});

export default function MapCart() {
  const [openVelo, setOpenVelo] = useState(false);
  const [openWifi, setOpenWifi] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const iconWifi = L.icon({
    iconSize: [35, 35],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/wifi.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconEvent = L.icon({
    iconSize: [35, 35],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/event.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  // NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
  // eslint-disable-next-line
  const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(60, 60),
    });
  };

  function handleOpenVelo() {
    setOpenVelo(!openVelo);
  }
  function handleOpenWifi() {
    setOpenWifi(!openWifi);
  }
  function handleOpenEvent() {
    setOpenEvent(!openEvent);
  }

  const [map, setMap] = useState(null);

  return (
    <div disableGutters width="99%" height="auto">
      {/* <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div> */}
      <Card>
        <Container maxWidth="99%" sx={{ px: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "background.paper",
              borderRadius: 0,
            }}
          >
            <Button
              startIcon={<DirectionsBikeIcon sx={{ color: "#000" }} />}
              variant={openVelo ? "contained" : "outlined"}
              sx={
                openVelo
                  ? {
                      display: "flex",
                      padding: "16px",
                      mx: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: "2px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
                  : {
                      display: "flex",
                      padding: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      mx: "10px",
                      borderBottom: "4px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.00) 0%, #9FFF6F 100%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
              }
              onClick={handleOpenVelo}
            >
              Bikecycle
            </Button>
            <Button
              variant={openWifi ? "contained" : "outlined"}
              startIcon={<WifiIcon />}
              sx={
                openWifi
                  ? {
                      display: "flex",
                      padding: "16px",
                      mx: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: "2px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
                  : {
                      display: "flex",
                      padding: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      mx: "10px",
                      borderBottom: "4px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.00) 0%, #9FFF6F 100%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
              }
              onClick={handleOpenWifi}
            >
              wifi
            </Button>
            <Button
              variant={openEvent ? "contained" : "outlined"}
              startIcon={<EventIcon />}
              sx={
                openEvent
                  ? {
                      display: "flex",
                      padding: "16px",
                      mx: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: "2px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
                  : {
                      display: "flex",
                      padding: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      mx: "10px",
                      borderBottom: "4px solid #000",
                      background:
                        "linear-gradient(180deg, rgba(190, 255, 157, 0.00) 0%, #9FFF6F 100%)",
                      boxShadow: "0px 7px 0px 0px #FFF",
                      color: "#000",
                    }
              }
              onClick={handleOpenEvent}
            >
              Event
            </Button>
          </Box>
          <br />
          <MapContainer
            ref={setMap}
            center={[48.871084, 2.352386]}
            zoom={4}
            maxZoom={16}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%", borderRadius: "2%" }}
          >
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              showCoverageOnHover={false}
            >
              {openVelo &&
                dataVélo &&
                dataVélo?.map((item, index) => (
                  <BikeMarker
                    key={item?.stationcode}
                    index={item?.stationcode}
                    position={[
                      item.coordonnees_geo.lat,
                      item.coordonnees_geo.lon,
                    ]}
                    item={item}
                  />
                ))}
              {openWifi &&
                dataWifi?.map((item, index) => (
                  <Marker
                    key={index}
                    position={[item.geo_point_2d.lat, item.geo_point_2d.lon]}
                    icon={iconWifi}
                  >
                    <Popup>
                      <CardWifi key={index} item={item} />
                    </Popup>
                  </Marker>
                ))}
              {openEvent &&
                dataEvent &&
                dataEvent?.map((item, index) => (
                  <>
                    {item?.lat_lon !== null && item?.lat_lon !== undefined ? (
                      <Marker
                        key={index}
                        position={[item.lat_lon.lat, item.lat_lon.lon]}
                        icon={iconEvent}
                      >
                        <Popup
                        className="popup"
                        >
                          <CardEvent key={index} />
                        </Popup>
                      </Marker>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
            </MarkerClusterGroup>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Container>
      </Card>
    </div>
  );
}

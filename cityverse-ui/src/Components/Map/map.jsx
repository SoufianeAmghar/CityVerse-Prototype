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
import dataStation from "../Data/bornes-irve.json";
import CardVelo from "../Card/cardVelo";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Chip } from "@material-ui/core";
import CardWifi from "../Card/cardWifi";
import WifiIcon from "@mui/icons-material/Wifi";
import EventIcon from "@mui/icons-material/Event";
import "./map.css";
import BikeMarker from "./MarkerBike";
import CardEvent from "../Card/CardEvent";
import CardMetaVerse from "../Card/CardMetaVerse";
import { styled, Drawer as MuiDrawer } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GamesIcon from "@mui/icons-material/Games";
import EvStationIcon from "@mui/icons-material/EvStation";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useHistory } from "react-router-dom";
import CardPlace from "../Card/CardPlaceOfInterset";

import { bikeApi } from "../Data/data";
import CardHome from "../Card/CardHome";

const Drawer = styled(MuiDrawer)({
  width: 300, //drawer width
  "& .MuiDrawer-paper": {
    width: 300, //drawer width
    transition: "none !important",
  },
});

export default function MapCart() {
  const [openVelo, setOpenVelo] = useState(false);
  const [openStation, setOpenStation] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openMetaVerse, setOpenMetaVerse] = useState(false);
  const [openPointInterset, setopenPointInterset] = useState(false);

  const iconWifi = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/Frame.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconEvent = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/event.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconMetaVerse = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/play.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconHome = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/HomeIcon.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconPointOfInterset = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/placeOfInterest.png"),
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
  function handleOpenStation() {
    setOpenStation(!openStation);
  }
  function handleOpenEvent() {
    setOpenEvent(!openEvent);
  }
  function handleOpenMetaVerse() {
    setOpenMetaVerse(!openMetaVerse);
  }

  function handleOpenPointInterest() {
    setopenPointInterset(!openPointInterset);
  }

  const [map, setMap] = useState(null);
  const history = useHistory();

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={iconHome}>
        <Popup className="popupHome">
          <CardHome />
        </Popup>
      </Marker>
    );
  }

  return (
    <div disableGutters width="99%" height="auto">
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
              variant={openStation ? "contained" : "outlined"}
              startIcon={<EvStationIcon />}
              sx={
                openStation
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
              onClick={handleOpenStation}
            >
              charging station
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
            <Button
              variant={openMetaVerse ? "contained" : "outlined"}
              startIcon={<SportsEsportsIcon />}
              sx={
                openMetaVerse
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
              onClick={handleOpenMetaVerse}
            >
              Metaverse
            </Button>
            <Button
              variant={openMetaVerse ? "contained" : "outlined"}
              startIcon={<GroupsIcon />}
              sx={
                openMetaVerse
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
              onClick={handleOpenPointInterest}
            >
              Place of interest
            </Button>
          </Box>
          <br />
          <MapContainer
            ref={setMap}
            center={[48.871084, 2.352386]}
            zoom={8}
            maxZoom={16}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%", borderRadius: "2%" }}
          >
            <LocationMarker />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              showCoverageOnHover={false}
            >
              {/* tOUR EIFFEL */}
              <Marker position={[48.85837, 2.294481]} icon={iconMetaVerse}>
                <Popup className="popupmeta">
                  <CardMetaVerse />
                </Popup>
              </Marker>
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
              {openStation &&
                dataStation?.map((item, index) => (
                  <Marker
                    key={index}
                    position={[
                      item.geo_point_borne.lat,
                      item.geo_point_borne.lon,
                    ]}
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
                        <Popup className="popup">
                          <CardEvent key={index} />
                        </Popup>
                      </Marker>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              {openMetaVerse &&
                dataEvent &&
                dataEvent?.map((item, index) => (
                  <>
                    {item?.lat_lon !== null && item?.lat_lon !== undefined ? (
                      <Marker
                        key={index}
                        position={[item.lat_lon.lat, item.lat_lon.lon]}
                        icon={iconMetaVerse}
                      >
                        <Popup className="popup">
                          <CardEvent key={index} />
                        </Popup>
                      </Marker>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              {/* {openPointInterset &&
                dataEvent &&
                dataEvent?.map((item, index) => (
                  <>
                    {item?.lat_lon !== null && item?.lat_lon !== undefined ? (
                      <Marker
                        key={index}
                        position={[item.lat_lon.lat, item.lat_lon.lon]}
                        icon={iconPointOfInterset}
                      >
                        <Popup className="popup">
                          <CardPlace key={index} />
                        </Popup>
                      </Marker>
                    ) : (
                      <></>
                    )}
                  </>
                ))} */}
              {openPointInterset && (
                <Marker
                  // key={index}
                  position={[ 48.921329648, 2.355998576]}
                  icon={iconPointOfInterset}
                >
                  <Popup className="popup">
                    <CardPlace  />
                  </Popup>
                </Marker>
              )}
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

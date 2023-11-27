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
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Map,
  CircleMarker,
  // Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./Marker";
import { Polyline } from "react-leaflet/Polyline";
import data from "../Data/data.json";
import dataVélo from "../Data/dataVélo.json";
import dataWifi from "../Data/dataWifi.json";
import dataEvent from "../Data/event.json";
import CardVelo from "../Card/cardVelo";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Chip } from "@material-ui/core";
import CardWifi from "../Card/cardWifi";

// {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -70.219841,
//           8.6310997
//         ]
//       },
//       "properties": {
//         "id": 336,
//         "id_user": 1,
//         "id_device": 1,
//         "timestamp": 1446571154,
//         "date": "12:49PM 03-11-2015",
//         "Latitude": 8.6310997,
//         "Longitude": -70.219841,
//         "speedKPH": 0,
//         "heading": "",
//         "Name": "N\/D",
//         "City": "N\/D",
//         "estatus": "Stop"
//       }
//     }
//   ]
// }

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
  });
}
const limeOptions = { color: "red" };
const multiPolyline = [
  [
    [48.871084, 2.352386],
    [48.856127, 2.346525],
  ],
  [
    [48.856127, 2.346525],
    [48.856127, 2.326525],
  ],
];

function MyMap() {
  const [loc, setLoc] = useState(null);
  const map = useMapEvents({
    click: (e) => {
      setLoc(e.latlng);
    },
  });
  return null;
}

export default function MapCart() {
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);
  const position = [48.871084, 2.352386];
  const redOptions = { color: "red" };
  // const data = [
  //   {
  //     name: "Paris",
  //     fillColor: "#7FC9FF",
  //     id: 1,
  //     position: {
  //       lat: 48.871084,
  //       lng: 2.352386,
  //     },
  //   },
  //   {
  //     name: "Paris 1",
  //     fillColor: "#7FC9FF",
  //     id: 2,
  //     position: {
  //       lat: 48.856127,
  //       lng: 2.346525,
  //     },
  //   },
  //   {
  //     name: "Paris 2",
  //     fillColor: "#7FC9FF",
  //     id: 2,
  //     position: {
  //       lat: 48.856127,
  //       lng: 2.326525,
  //     },
  //   },
  // ];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleClick(e) {
    setSelectedIndex(e.target.options.index);
  }

  function getMarkerIcon(index) {
    if (index === selectedIndex)
      return createIcon(
        "https://user-images.githubusercontent.com/1596072/85960867-3baf9700-b9af-11ea-854e-7ef6e656d447.png"
      );
    return createIcon(
      "https://user-images.githubusercontent.com/1596072/85960806-0145fa00-b9af-11ea-91ab-a107d0a64b66.png"
    );
  }

  const [reviewData, setReviewData] = useState([]);
  const [selectedReview, selectReview] = useState();
  const icon = L.icon({
    iconSize: [25, 30],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/piste-cyclable.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
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

  const [openVelo, setOpenVelo] = useState(false);
  const [openWifi, setOpenWifi] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  function handleOpenVelo() {
    setOpenVelo(!openVelo);
  }
  function handleOpenWifi() {
    setOpenWifi(!openWifi);
  }
  function handleOpenEvent() {
    setOpenEvent(!openEvent);
  }

  useEffect(() => {
    console.log("teeest");
  }, [openWifi]);

  return (
    <div disableGutters width="99%" height="auto">
      <Card>
        <Container maxWidth="99%" sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {/* <Chip
                variant="outlined"
                size="small"
                icon={<DirectionsBikeIcon />}
                label="bike"
                clickable
                color="primary"
                onClick={handleOpenVelo}
                // deleteIcon={<DoneIcon />}
              />
              <Chip
                variant="outlined"
                size="small"
                icon={<DirectionsBikeIcon />}
                label="Wifi"
                clickable
                color="primary"
                onClick={handleOpenWifi}
                // deleteIcon={<DoneIcon />}
              />
               <Chip
                variant="outlined"
                size="small"
                icon={<DirectionsBikeIcon />}
                label="Event"
                clickable
                color="primary"
                onClick={handleOpenEvent}
                // deleteIcon={<DoneIcon />}
              /> */}
             <Button
              variant="outlined"
              sx={{
               // backgroundColor: "success",
                minWidth: "5%",
                borderRadius: "20px",
                mb: "1%",
                mr: "0.5%"
               // color: "#fff",
              }}
              color="info"
              onClick={handleOpenVelo}
            >
              Bikecycle
            </Button>
            <Button
              variant="outlined"
              sx={{
               // backgroundColor: "success",
                minWidth: "5%",
                borderRadius: "20px",
                mb: "1%",
                mr: "0.5%"
               // color: "#fff",
              }}
              color="warning"
              onClick={handleOpenWifi}
            >
             wifi
            </Button>
            <Button
              variant="outlined"
              sx={{
               // backgroundColor: "success",
                minWidth: "5%",
                borderRadius: "20px",
                mb: "1%",
               // color: "#fff",
              }}
              color="error"
              onClick={handleOpenEvent}
            >
              Event
            </Button>
          </Box>

          <MapContainer
            center={[48.871084, 2.352386]}
            zoom={13}
            // scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* <LocationMarker /> */}
            {/* <MyMap /> */}
            {/* <CircleMarker
                center={[48.849083, 2.352440]}
                pathOptions={redOptions}
                radius={20}
              ></CircleMarker> */}
            {/* <Polyline pathOptions={limeOptions} positions={multiPolyline} /> */}
            {/* {data?.filter(it => it?.address.country === "France")?.map((item, index) => (
                <Marker
                  key={item?.id}             
                  position={[item.gps.latitude, item.gps.longitude]}
                  icon={icon}
                >
                  <Popup>       
                    <h2>Name: {item.name}</h2>
                    <p>status: {item.status}</p>
                    <p>Number of charging stations: {item.stallCount}</p>
                  </Popup>
                </Marker>
              ))} */}
            {openVelo &&
              dataVélo?.map((item, index) => (
                <Marker
                  key={index}
                  position={[
                    item.coordonnees_geo.lat,
                    item.coordonnees_geo.lon,
                  ]}
                  icon={icon}
                >
                  <Popup>
                    <CardVelo key={index} item={item} />
                  </Popup>
                </Marker>
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
              dataEvent?.map((item, index) => (
                <>
                  {item?.lat_lon !== null && item?.lat_lon !== undefined ? (
                    <Marker
                      key={index}
                      position={[item.lat_lon.lat, item.lat_lon.lon]}
                      icon={iconEvent}
                    >
                      {/* <Popup>
                      <CardVelo key={index} item={item} />
                    </Popup> */}
                    </Marker>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </MapContainer>
        </Container>
      </Card>
    </div>
  );
}

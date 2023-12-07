import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import TurnRightOutlinedIcon from "@mui/icons-material/TurnRightOutlined";
import BikeMarker from "../Map/MarkerBike";

import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
  Map,
  CircleMarker,
  Popup,
  Marker,
} from "react-leaflet";
import L, { MarkerCluster } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Polyline } from "react-leaflet/Polyline";
import data from "../Data/data.json";
import dataVélo from "../Data/dataVélo.json";
import dataWifi from "../Data/dataWifi.json";
import dataEvent from "../Data/event.json";

export default function Event() {

  const svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="64" viewBox="0 0 56 64" fill="none">
    <mask id="path-1-outside-1_24_533" maskUnits="userSpaceOnUse" x="3.80908" y="33.0529" width="48" height="31" fill="black">
      <rect fill="white" x="3.80908" y="33.0529" width="48" height="31"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.80919 35.0529H5.80908L5.80912 35.053L5.80919 35.0529ZM5.80922 35.0531L27.6563 62.1245L49.844 35.2991L27.9996 50.8296L5.80922 35.0531Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.80919 35.0529H5.80908L5.80912 35.053L5.80919 35.0529ZM5.80922 35.0531L27.6563 62.1245L49.844 35.2991L27.9996 50.8296L5.80922 35.0531Z" fill="white"/>
    <path d="M5.80908 35.0529V33.0529L4.25269 36.309L5.80908 35.0529ZM5.80919 35.0529L6.96807 36.6829L5.80919 33.0529V35.0529ZM5.80912 35.053L4.25273 36.309L6.96801 36.683L5.80912 35.053ZM27.6563 62.1245L26.0999 63.3805L29.1975 63.3992L27.6563 62.1245ZM5.80922 35.0531L6.96811 33.4231L4.25283 36.3091L5.80922 35.0531ZM49.844 35.2991L51.3851 36.5738L48.6851 33.6691L49.844 35.2991ZM27.9996 50.8296L26.8407 52.4597H29.1585L27.9996 50.8296ZM5.80908 37.0529H5.80919V33.0529H5.80908V37.0529ZM7.36551 33.7969L7.36548 33.7969L4.25269 36.309L4.25273 36.309L7.36551 33.7969ZM6.96801 36.683L6.96807 36.6829L4.6503 33.4229L4.65023 33.4229L6.96801 36.683ZM29.2127 60.8684L7.36562 33.7971L4.25283 36.3091L26.0999 63.3805L29.2127 60.8684ZM48.3028 34.0244L26.1152 60.8497L29.1975 63.3992L51.3851 36.5738L48.3028 34.0244ZM48.6851 33.6691L26.8407 49.1996L29.1585 52.4597L51.0029 36.9291L48.6851 33.6691ZM29.1585 49.1996L6.96811 33.4231L4.65033 36.6831L26.8407 52.4597L29.1585 49.1996Z" fill="black" mask="url(#path-1-outside-1_24_533)"/>
    <mask id="path-3-outside-2_24_533" maskUnits="userSpaceOnUse" x="27.1655" y="33.2891" width="25" height="30" fill="black">
      <rect fill="white" x="27.1655" y="33.2891" width="25" height="30"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M46.4683 37.699L29.1655 50.4927L29.1658 61.1245L49.858 35.2891L46.4683 37.699Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M46.4683 37.699L29.1655 50.4927L29.1658 61.1245L49.858 35.2891L46.4683 37.699Z" fill="#C8C8C8"/>
    <path d="M29.1655 50.4927L27.9765 48.8845C27.4664 49.2617 27.1655 49.8584 27.1655 50.4927L29.1655 50.4927ZM46.4683 37.699L45.3094 36.069C45.2993 36.0762 45.2892 36.0835 45.2792 36.0909L46.4683 37.699ZM29.1658 61.1245L27.1658 61.1245C27.1658 61.9737 27.702 62.7302 28.5032 63.0115C29.3045 63.2928 30.196 63.0375 30.7268 62.3747L29.1658 61.1245ZM49.858 35.2891L51.4191 36.5393C52.0428 35.7606 51.9971 34.6413 51.3121 33.9159C50.6271 33.1905 49.5123 33.0809 48.6991 33.659L49.858 35.2891ZM30.3546 52.1008L47.6573 39.3072L45.2792 36.0909L27.9765 48.8845L30.3546 52.1008ZM31.1658 61.1244L31.1655 50.4926L27.1655 50.4927L27.1658 61.1245L31.1658 61.1244ZM48.297 34.0388L27.6047 59.8742L30.7268 62.3747L51.4191 36.5393L48.297 34.0388ZM48.6991 33.659L45.3094 36.069L47.6272 39.3291L51.0169 36.9191L48.6991 33.659Z" fill="black" mask="url(#path-3-outside-2_24_533)"/>
    <path d="M28.8331 1.07139H27.1669L4.97633 34.4998L5.23003 35.8679L27.4206 51.6446H28.5794L50.77 35.8679L51.0237 34.4998L28.8331 1.07139Z" fill="url(#paint0_linear_24_533)" stroke="black" stroke-width="2" stroke-linejoin="bevel"/>
    <path d="M31.3344 19.0967C30.7992 19.0967 30.341 18.9062 29.9598 18.525C29.5786 18.1438 29.3881 17.6856 29.3881 17.1504C29.3881 16.6151 29.5786 16.1569 29.9598 15.7757C30.341 15.3946 30.7992 15.204 31.3344 15.204C31.8697 15.204 32.3279 15.3946 32.7091 15.7757C33.0902 16.1569 33.2808 16.6151 33.2808 17.1504C33.2808 17.6856 33.0902 18.1438 32.7091 18.525C32.3279 18.9062 31.8697 19.0967 31.3344 19.0967ZM26.7604 23.9627L28.9015 26.201V32.2348H26.9551V27.3688L23.8409 24.6439C23.6138 24.4493 23.4597 24.2465 23.3786 24.0357C23.2975 23.8248 23.257 23.5734 23.257 23.2815C23.257 22.9895 23.3016 22.7421 23.3908 22.5394C23.48 22.3366 23.63 22.1298 23.8409 21.919L26.5658 19.1941C26.7767 18.9832 26.9997 18.8332 27.2349 18.744C27.4701 18.6547 27.7336 18.6101 28.0256 18.6101C28.3175 18.6101 28.5811 18.6547 28.8163 18.744C29.0515 18.8332 29.2745 18.9832 29.4854 19.1941L31.3344 21.0431C31.7724 21.481 32.2833 21.8338 32.8672 22.1015C33.4511 22.3691 34.108 22.5029 34.8379 22.5029V24.4493C33.8161 24.4493 32.8915 24.2668 32.0643 23.9019C31.2371 23.5369 30.5072 23.0382 29.8746 22.4056L29.0961 21.627L26.7604 23.9627ZM21.1159 25.4225C22.4946 25.4225 23.6503 25.8888 24.5829 26.8214C25.5156 27.7541 25.9819 28.9097 25.9819 30.2884C25.9819 31.6671 25.5156 32.8228 24.5829 33.7554C23.6503 34.688 22.4946 35.1544 21.1159 35.1544C19.7373 35.1544 18.5816 34.688 17.649 33.7554C16.7163 32.8228 16.25 31.6671 16.25 30.2884C16.25 28.9097 16.7163 27.7541 17.649 26.8214C18.5816 25.8888 19.7373 25.4225 21.1159 25.4225ZM21.1159 33.6946C22.0405 33.6946 22.8393 33.358 23.5124 32.6849C24.1855 32.0118 24.5221 31.2129 24.5221 30.2884C24.5221 29.3639 24.1855 28.5651 23.5124 27.8919C22.8393 27.2188 22.0405 26.8822 21.1159 26.8822C20.1914 26.8822 19.3926 27.2188 18.7195 27.8919C18.0463 28.5651 17.7098 29.3639 17.7098 30.2884C17.7098 31.2129 18.0463 32.0118 18.7195 32.6849C19.3926 33.358 20.1914 33.6946 21.1159 33.6946ZM34.7406 25.4225C36.1193 25.4225 37.2749 25.8888 38.2076 26.8214C39.1402 27.7541 39.6065 28.9097 39.6065 30.2884C39.6065 31.6671 39.1402 32.8228 38.2076 33.7554C37.2749 34.688 36.1193 35.1544 34.7406 35.1544C33.3619 35.1544 32.2062 34.688 31.2736 33.7554C30.341 32.8228 29.8746 31.6671 29.8746 30.2884C29.8746 28.9097 30.341 27.7541 31.2736 26.8214C32.2062 25.8888 33.3619 25.4225 34.7406 25.4225ZM34.7406 33.6946C35.6651 33.6946 36.4639 33.358 37.1371 32.6849C37.8102 32.0118 38.1468 31.2129 38.1468 30.2884C38.1468 29.3639 37.8102 28.5651 37.1371 27.8919C36.4639 27.2188 35.6651 26.8822 34.7406 26.8822C33.8161 26.8822 33.0172 27.2188 32.3441 27.8919C31.671 28.5651 31.3344 29.3639 31.3344 30.2884C31.3344 31.2129 31.671 32.0118 32.3441 32.6849C33.0172 33.358 33.8161 33.6946 34.7406 33.6946Z" fill="black"/>
    <defs>
      <linearGradient id="paint0_linear_24_533" x1="25.8862" y1="48.7211" x2="28" y2="18.7113" gradientUnits="userSpaceOnUse">
        <stop stop-color="#97FF63"/>
        <stop offset="1" stop-color="#C6FFA9"/>
      </linearGradient>
    </defs>
  </svg>`,
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });

  return (
    <div style={{ backgroundColor: "#FFFF" }}>
      <div style={{ position: "relative" }}>
        <Card
          sx={{
            backgroundColor: "#ADD8E6",
            height: "220px",
            alignSelf: "stretch",
          }}
        ></Card>
        <img
          src={require("../../Asset/market.png")}
          style={{
            width: "auto",
            height: "100px",
            display: "flex",
            position: "absolute",
            top: "80%",
            left: "3%",
            padding: "0px 64px",
            alignItems: "flex-start",
            gap: "10px",
          }}
        />
      </div>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={8} sx={{ display: "flex", justifyItems: "center" }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: "flex", justifyItems: "center" }}>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                style={{ paddingLeft: "10%", paddingTop: "3%" }}
              >
                Bricolage 3B{" "}
              </Typography>
              <img
                src={require("../../Asset/fav.png")}
                style={{
                  width: "26px",
                  marginTop: "4%",
                  marginBottom: "2%",
                  marginLeft: "4%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderTop: "2px solid #000",
                  boxShadow: "0px -7px 0px 0px #A9FF7F",
                }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ paddingLeft: "1%", paddingTop: "4%" }}
              >
                18{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginLeft: "10%",
                  paddingBottom: "2%",
                  display: "flex",
                  flexDirection: "rows",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  sx={{
                    marginRight: "2%",
                    display: "flex",
                    padding: "8px 16px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    border: "2px solid #000",
                    background: "#A9FF7F",
                    color: "#000",
                  }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Fave"
                    : "Fave"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  sx={{
                    marginX: "2%",
                    display: "flex",
                    padding: "8px 16px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    border: "2px solid #000",
                    //background: "#A9FF7F",
                    color: "#000",
                  }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Appel"
                    : "Appel"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "2%" }}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                style={{ paddingLeft: "10%" }}
              >
                Recommandations
              </Typography>
              <br />
              <Box
                sx={{
                  marginLeft: "10%",
                  display: "flex",
                  flexDirection: "rows",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "42px",
                    height: "42px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    border: "3px solid #000",
                    background: "#FFF",
                    marginRight: "3%",
                  }}
                >
                  <p
                    style={{
                      color: "#000",
                      fontFamily: "Inter",
                      fontSize: "25px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal",
                    }}
                  >
                    N
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    height: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Rédigez votre recommandation"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { fontStyle: "italic" } }}
                  />
                </div>
              </Box>
            </Grid>
            <Card>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  padding: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "7%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "1%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      //display: "flex",
                      width: "auto",
                      height: "40px",
                      // justifyContent: "center",
                      // alignItems: "center",
                      //flexDirection: "rows",
                    }}
                  >
                    <Typography
                      gutterBottoms
                      variant="subtitle1"
                      component="div"
                      style={{ paddingLeft: "10%" }}
                    >
                      Michel Path
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ paddingLeft: "10%" }}
                    >
                      Argenteuil, 11 - 20 nov
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <p
                  style={{
                    marginLeft: "7%",
                  }}
                >
                  Je suis peintre bâtiment 13 ans d’expérience, Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Duis volutpat
                  mattis lectus, eget lobortis nibh venenatis in. Morbi in
                  pharetra ipsum. Nulla consectetur augue et venenatis
                  malesuada.
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  paddingTop: "3%",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    marginLeft: "7%",
                    flexDirection: "rows",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={require("../../Asset/fav.png")}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "5%",
                        marginBottom: "5%",
                        marginLeft: "4%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        background: "#fff",
                        padding: "6%",
                        borderTop: "2px solid #000",
                        boxShadow: "0px -7px 0px 0px #A9FF7F",
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ paddingLeft: "4%", paddingTop: "4%" }}
                    >
                      18{" "}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <FavoriteBorderOutlinedIcon /> 18 J'aime
                    </div>{" "}
                    <div style={{ display: "flex" }}>
                      <ModeCommentOutlinedIcon /> 1 Commentaires
                    </div>
                    <div style={{ display: "flex" }}>
                      <TurnRightOutlinedIcon /> 1 Partage
                    </div>
                  </div>
                </Box>
                <Box
                  sx={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "3%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Rédigez votre recommandation"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { fontStyle: "italic", borderRadius: "50px" },
                      }}
                    />
                  </div>
                </Box>
                <br />
              </Grid>
            </Card>
            <br />
            <Card>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  padding: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "7%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "1%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      //display: "flex",
                      width: "auto",
                      height: "40px",
                      // justifyContent: "center",
                      // alignItems: "center",
                      //flexDirection: "rows",
                    }}
                  >
                    <Typography
                      gutterBottoms
                      variant="subtitle1"
                      component="div"
                      style={{ paddingLeft: "10%" }}
                    >
                      Michel Path
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ paddingLeft: "10%" }}
                    >
                      Argenteuil, 11 - 20 nov
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <p
                  style={{
                    marginLeft: "7%",
                  }}
                >
                  Je suis peintre bâtiment 13 ans d’expérience, Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Duis volutpat
                  mattis lectus, eget lobortis nibh venenatis in. Morbi in
                  pharetra ipsum. Nulla consectetur augue et venenatis
                  malesuada.
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  paddingTop: "3%",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    marginLeft: "7%",
                    flexDirection: "rows",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={require("../../Asset/fav.png")}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "5%",
                        marginBottom: "5%",
                        marginLeft: "4%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        background: "#fff",
                        padding: "6%",
                        borderTop: "2px solid #000",
                        boxShadow: "0px -7px 0px 0px #A9FF7F",
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ paddingLeft: "4%", paddingTop: "4%" }}
                    >
                      18{" "}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <FavoriteBorderOutlinedIcon /> 18 J'aime
                    </div>{" "}
                    <div style={{ display: "flex" }}>
                      <ModeCommentOutlinedIcon /> 1 Commentaires
                    </div>
                    <div style={{ display: "flex" }}>
                      <TurnRightOutlinedIcon /> 1 Partage
                    </div>
                  </div>
                </Box>
                <Box
                  sx={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "3%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Rédigez votre recommandation"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { fontStyle: "italic", borderRadius: "50px" },
                      }}
                    />
                  </div>
                </Box>
                <br />
              </Grid>
            </Card>
            <br />
            <Card>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  padding: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "7%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "1%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      //display: "flex",
                      width: "auto",
                      height: "40px",
                      // justifyContent: "center",
                      // alignItems: "center",
                      //flexDirection: "rows",
                    }}
                  >
                    <Typography
                      gutterBottoms
                      variant="subtitle1"
                      component="div"
                      style={{ paddingLeft: "10%" }}
                    >
                      Michel Path
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ paddingLeft: "10%" }}
                    >
                      Argenteuil, 11 - 20 nov
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <p
                  style={{
                    marginLeft: "7%",
                  }}
                >
                  Je suis peintre bâtiment 13 ans d’expérience, Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Duis volutpat
                  mattis lectus, eget lobortis nibh venenatis in. Morbi in
                  pharetra ipsum. Nulla consectetur augue et venenatis
                  malesuada.
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  paddingTop: "3%",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    marginLeft: "7%",
                    flexDirection: "rows",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={require("../../Asset/fav.png")}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "5%",
                        marginBottom: "5%",
                        marginLeft: "4%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        background: "#fff",
                        padding: "6%",
                        borderTop: "2px solid #000",
                        boxShadow: "0px -7px 0px 0px #A9FF7F",
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ paddingLeft: "4%", paddingTop: "4%" }}
                    >
                      18{" "}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <FavoriteBorderOutlinedIcon /> 18 J'aime
                    </div>{" "}
                    <div style={{ display: "flex" }}>
                      <ModeCommentOutlinedIcon /> 1 Commentaires
                    </div>
                    <div style={{ display: "flex" }}>
                      <TurnRightOutlinedIcon /> 1 Partage
                    </div>
                  </div>
                </Box>
                <Box
                  sx={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "3%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Rédigez votre recommandation"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { fontStyle: "italic", borderRadius: "50px" },
                      }}
                    />
                  </div>
                </Box>
                <br />
              </Grid>
            </Card>
            <br />
            <Card>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  padding: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "7%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "1%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      //display: "flex",
                      width: "auto",
                      height: "40px",
                      // justifyContent: "center",
                      // alignItems: "center",
                      //flexDirection: "rows",
                    }}
                  >
                    <Typography
                      gutterBottoms
                      variant="subtitle1"
                      component="div"
                      style={{ paddingLeft: "10%" }}
                    >
                      Michel Path
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ paddingLeft: "10%" }}
                    >
                      Argenteuil, 11 - 20 nov
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <p
                  style={{
                    marginLeft: "7%",
                  }}
                >
                  Je suis peintre bâtiment 13 ans d’expérience, Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Duis volutpat
                  mattis lectus, eget lobortis nibh venenatis in. Morbi in
                  pharetra ipsum. Nulla consectetur augue et venenatis
                  malesuada.
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingX: "32px",
                  paddingTop: "3%",
                  flexDirection: "column",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "#F1FBEC",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    marginLeft: "7%",
                    flexDirection: "rows",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={require("../../Asset/fav.png")}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginTop: "5%",
                        marginBottom: "5%",
                        marginLeft: "4%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        background: "#fff",
                        padding: "6%",
                        borderTop: "2px solid #000",
                        boxShadow: "0px -7px 0px 0px #A9FF7F",
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ paddingLeft: "4%", paddingTop: "4%" }}
                    >
                      18{" "}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <FavoriteBorderOutlinedIcon /> 18 J'aime
                    </div>{" "}
                    <div style={{ display: "flex" }}>
                      <ModeCommentOutlinedIcon /> 1 Commentaires
                    </div>
                    <div style={{ display: "flex" }}>
                      <TurnRightOutlinedIcon /> 1 Partage
                    </div>
                  </div>
                </Box>
                <Box
                  sx={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "rows",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "3px solid #000",
                      background: "#FFF",
                      marginRight: "3%",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "25px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      N
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Rédigez votre recommandation"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { fontStyle: "italic", borderRadius: "50px" },
                      }}
                    />
                  </div>
                </Box>
                <br />
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <MapContainer
            center={[48.871084, 2.352386]}
            zoom={4}
            maxZoom={16}
            scrollWheelZoom={true}
            style={{ height: "200px", width: "90%", borderRadius: "2%" }}
          >
            <Marker
              key={"16107"}
              index={"16107"}
              position={[48.871084, 2.352386]}
              icon={svgIcon}
              // item={{
              //   "stationcode": "16107",
              //   "name": "Benjamin Godard - Victor Hugo",
              //   "is_installed": "OUI",
              //   "capacity": 35,
              //   "numdocksavailable": 26,
              //   "numbikesavailable": 9,
              //   "mechanical": 4,
              //   "ebike": 5,
              //   "is_renting": "OUI",
              //   "is_returning": "OUI",
              //   "duedate": "2023-11-23T10:26:51+01:00",
              //   "coordonnees_geo": { "lon": 2.275725, "lat": 48.865983 },
              //   "nom_arrondissement_communes": "Paris",
              //   "code_insee_commune": null
              // }}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Grid>
      </Grid>
    </div>
  );
}

import { Alert, Card, Container, Box, Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Marker } from "react-leaflet/Marker";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
  Map,
  CircleMarker,
  Circle,
  Popup,
} from "react-leaflet";
import L, { Icon, MarkerCluster, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Polyline } from "react-leaflet/Polyline";

import data from "../Data/data.json";
import dataVélo from "../Data/dataVélo.json";
import dataVéloGeo from "../Data/dataVeloGeo.json";
import dataStattionGeo from "../Data/datachargingStationGeo.json";
import dataWifi from "../Data/dataWifi.json";
import dataEvent from "../Data/event.json";
import dataStation from "../Data/bornes-irve.json";
import dataRéseau_cyclable from "../Data/réseau_cyclable.json";
import dataterrasses from "../Data/terrasses-autorisations.json";

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
import nearestPointOnLine from "@turf/nearest-point-on-line";
import * as turf from "@turf/turf";
import { bikeApi } from "../Data/data";
import CardHome from "../Card/CardHome";
import leafletKnn from "leaflet-knn";
import Avatar from "@mui/material/Avatar";
import goal1 from "../../Asset/goal_1.png";
import goal2 from "../../Asset/goal_2.png";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CoffeeIcon from "@mui/icons-material/Coffee";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import SdgweelImage from "../../Asset/SDG_weel.png";
import ActivityImage from "../../Asset/activity.png";
import Tooltip from "@mui/material/Tooltip";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ModaladdnewPoint from "./modalAddnewPoint";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import FamilyRestroom from "@mui/icons-material/FamilyRestroom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  TextField,
  Modal,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InputAdornment from "@mui/material/InputAdornment";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import UnityScene from "./webScene";

const styleValidate = {
  background:
    "linear-gradient(180deg, rgba(190, 255, 157, 0.00) 0%, #9FFF6F 10%)",
  color: "#556B2F",
  borderRadius: "20px",
};

const styleCancelDelete = {
  background: "#fff",
  minWidth: "20%",
  borderRadius: "14px",
  color: "#556B2F",
  borderColor: "#556B2F",
};

const Drawer = styled(MuiDrawer)({
  width: 300, //drawer width
  "& .MuiDrawer-paper": {
    width: 300, //drawer width
    transition: "none !important",
  },
});

export default function MapCart() {
  const dispatch = useDispatch();
  const association = useSelector(
    (state) => state.AssociationReducer?.associations
  );
  const address_coordinate = useSelector(
    (state) => state.ProfileReducer?.address_coordinate
  );
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const goals = useSelector((state) => state.ProfileReducer?.goals);
  const Activity = useSelector((state) => state.AssociationReducer?.activity);
  // const [association, setAssociation] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [openVelo, setOpenVelo] = useState(false);
  const [openStation, setOpenStation] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openMetaVerse, setOpenMetaVerse] = useState(false);
  const [openPointInterset, setopenPointInterset] = useState(false);
  const [goal, setgoal] = useState();
  const [fav, setFav] = useState(false);
  const [selectedActivity, setselecteDAcitivity] = useState();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedAssocition, setSelectedAssociation] = useState([]);
  const [switch3d, setSwitch3d] = useState(false);
  function handleSelectedGoals(arr, str) {
    const index = arr.indexOf(str);
    if (index !== -1) {
      arr.splice(index, 1); // Remove the string if it exists
    } else {
      arr.push(str); // Add the string if it doesn't exist
    }
    return arr;
  }

  function handleselectedActivities(arr, str) {
    const index = arr.indexOf(str);
    if (index !== -1) {
      arr.splice(index, 1); // Remove the string if it exists
    } else {
      arr.push(str); // Add the string if it doesn't exist
    }
    return arr;
  }
  //association menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const call_api_get_associations = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "association/")
      .then((value) => {
        console.log("association", value?.data);
        // setAssociation(value?.data)
        dispatch({
          type: "Associations",
          associations: value?.data,
        });
      })
      .catch((err) => {});
  };
  const call_api_get_SDG_goals = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "goal/")
      .then((value) => {
        dispatch({
          type: "Goals",
          goals: value.data,
        });
      })
      .catch((err) => {});
  };
  const headers = {
    Authorization: sessionStorage.getItem("acces_token")?.toString(),
  };

  const [data, setdata] = useState();
  const call_api_get_user_info = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "auth/info", {
        headers,
      })
      .then((value) => {
        console.log(
          "test",
          convertStringArrayToNumberArray([
            value?.data?.data?.address_coordinates?.M?.latitude?.S,
            value?.data?.data?.address_coordinates?.M?.longitude?.S,
          ])
        );

        if (
          value?.data?.data?.address_coordinates?.L?.length === 0 &&
          value?.data?.data?.address?.S === ""
        ) {
          HandleOpenAddAdress();
          dispatch({
            type: "Address_coordinate",
            address_coordinate: [],
          });
        } else {
          if (
            value?.data?.data?.address_coordinates?.M?.latitude?.S !==
              undefined &&
            value?.data?.data?.address_coordinates?.M?.longitude?.S !==
              undefined
          ) {
            dispatch({
              type: "Address_coordinate",
              address_coordinate: convertStringArrayToNumberArray([
                value?.data?.data?.address_coordinates?.M?.latitude?.S,
                value?.data?.data?.address_coordinates?.M?.longitude?.S,
              ]),
            });
          }
        }
        dispatch({
          type: "ImageProfile",
          imageProfile: value?.data?.data?.profile_image?.S,
        });
        sessionStorage.setItem("user_Id", value.data?.data.id.S);
        setdata(value?.data?.data);
      })
      .catch((err) => {
        //  deconnexion();
      });
  };

  useEffect(() => {
    // call_api_get_SDG_goals();
    // call_api_get_associations();
    call_api_get_user_info();
  }, []);

  const iconWifi = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/Frame.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconBike = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/bike.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconEvent = L.icon({
    iconSize: [40, 45],
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
  const iconMarket = L.icon({
    iconSize: [45, 50],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/Market-icon.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const iconPin = L.icon({
    iconSize: [45, 50],
    iconAnchor: [10, 10],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/pin.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
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
  const svgIconBike = L.divIcon({
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
  function handleAddnewPointInterest() {
    setOpenModal(true);
    handleClose();
  }
  const [map, setMap] = useState(null);
  const history = useHistory();
  function distance(lat1, lon1, lat2, lon2) {
    /* Return float. Unit is the metter */
    if (
      parseFloat(lat1) != lat1 ||
      parseFloat(lon1) != lon1 ||
      parseFloat(lat2) != lat2 ||
      parseFloat(lon1) != lon1
    )
      throw "Error params. Only float value accepted.";

    if (lat1 < 0 || lat1 > 90 || lat2 < 0 || lat2 > 90)
      throw (
        "Error params. The params lat1 and lat2 must be 0< ? <90. Here lat1 = " +
        lat1 +
        " and lat2 = " +
        lat2
      );
    if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180)
      throw (
        "Error params. The params lon1 and lon2 must be -180< ? <180. Here lon1 = " +
        lon1 +
        " and lon2 = " +
        lon2
      );

    var a = Math.PI / 180;
    lat1 = lat1 * a;
    lat2 = lat2 * a;
    lon1 = lon1 * a;
    lon2 = lon2 * a;

    var t1 = Math.sin(lat1) * Math.sin(lat2);
    var t2 = Math.cos(lat1) * Math.cos(lat2);
    var t3 = Math.cos(lon1 - lon2);
    var t4 = t2 * t3;
    var t5 = t1 + t4;
    var rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);
    console.log(rad_dist * 3437.74677 * 1.1508 * 1.6093470878864446 * 1000);
    return rad_dist * 3437.74677 * 1.1508 * 1.6093470878864446 * 1000;
  }
  function LocationMarker({ testCities }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
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
  function NearestMarkerBike() {
    const [position, setPosition] = useState(null);
    var point = L.geoJson(dataVéloGeo);
    var nearestIndex = leafletKnn(point);
    var [distancebetween, setDistanceBetween] = useState();
    const map = useMapEvents({
      click(e) {
        var nearestResult = nearestIndex.nearest(e.latlng, 1)[0];
        setDistanceBetween(
          distance(
            e.latlng.lat,
            e.latlng.lng,
            nearestResult.lat,
            nearestResult.lon
          )
        );
        setPosition(nearestResult);
      },
      locationfound(e) {
        // setPosition();
        map.flyTo(position, map.getZoom());
      },
    });

    return position === null ? null : (
      <>
        <Marker position={position} icon={svgIcon}>
          <Popup className="popupHome">
            I m the nearest , distance : {distancebetween} m
          </Popup>
        </Marker>
      </>
    );
  }
  function NearestMarkerEvent() {
    const [position, setPosition] = useState(null);
    const [locatMe, setlocateMe] = useState(null);
    var point = L.geoJson(dataStattionGeo);
    var nearestIndex = leafletKnn(point);
    const map = useMapEvents({
      click(e) {
        var nearestResult = nearestIndex.nearest(e.latlng, 1)[0];
        setPosition(nearestResult);
        setlocateMe(e?.latlng);
      },
      locationfound(e) {
        // setPosition();
        // map.flyTo(position, map.getZoom());
      },
    });

    return position === null ? null : (
      <>
        <Marker position={position} icon={iconWifi}>
          <Popup className="popupHome">I m the nearest Event</Popup>
        </Marker>
      </>
    );
  }
  function LocateZone() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        setPosition(e?.latlng);
      },
    });

    return position === null ? null : (
      <>
        <Circle center={position} radius={200}>
          {" "}
        </Circle>
        <Marker position={position} icon={iconPin}>
          <Popup className="popupHome">I'm here</Popup>
        </Marker>
      </>
    );
  }
  const ReseauCyclable = ({ data }) => {
    var line = data.features
      .filter(function (feature) {
        return feature.geometry.type == "LineString";
      })
      .map(function (feature) {
        var coordinates = feature.geometry.coordinates;
        coordinates.forEach(function (coordinate) {
          coordinate.reverse();
        });
        return coordinates;
      });

    return (
      <>
        {line?.map((item, id) => {
          return (
            <Polyline key={id} positions={item} color={"red"}>
              <Popup className="popupHome">
                <p style={{ color: "blue" }}>
                  {data?.features[id]?.properties?.voie}
                </p>
                <p>
                  status:{" "}
                  <span style={{ color: "blue" }}>
                    {data?.features[id]?.properties?.statut}
                  </span>
                </p>
                <p>
                  Longeur:{" "}
                  <span style={{ color: "blue" }}>
                    {data?.features[id]?.properties?.length} KM
                  </span>
                </p>
                <p>
                  Typologie simple:{" "}
                  <span style={{ color: "blue" }}>
                    {" "}
                    {data?.features[id]?.properties?.typologie_simple}
                  </span>
                </p>
              </Popup>
            </Polyline>
          );
        })}
      </>
    );
  };
  const TerrassesAutorisation = ({ data }) => {
    var line = data.features
      .filter(function (feature) {
        return feature.geometry.type == "Point";
      })
      .map(function (feature) {
        var coordinates = feature.geometry.coordinates.reverse();
        return coordinates;
      });
    return (
      <>
        {line?.map((item, id) => {
          return (
            <Marker key={id} position={item} icon={iconMarket}>
              <Popup className="popupmeta">
                <p style={{ color: "blue" }}>
                  <span style={{ color: "blue" }}>
                    {" "}
                    {data?.features[id]?.properties?.nom_societe}
                  </span>
                </p>
                <p>
                  adress:
                  <span style={{ color: "blue" }}>
                    {" "}
                    {data?.features[id]?.properties?.adresse}
                  </span>
                </p>
                <p>
                  periode d'installation:{" "}
                  <span style={{ color: "blue" }}>
                    {" "}
                    {data?.features[id]?.properties?.periode_installation}
                  </span>
                </p>
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  };

  // const Activity = [
  //   { label: "Arts & Culture", icon: require("../../Asset/cultureArt.png") },
  //   {
  //     label: "Sports",
  //     icon: require("../../Asset/running.png"),
  //   },
  //   { label: "Social Action", icon: require("../../Asset/dish.png") },
  //   {
  //     label: "Recreation",
  //     icon: require("../../Asset/park.png"),
  //   },
  //   {
  //     label: "Humanitary",
  //     icon: require("../../Asset/solidarity.png"),
  //   },
  // ];

  function filterArrayOfObjects(
    association,
    selectedGoals,
    selectedActivities
  ) {
    return association.filter((item, key) => {
      // Check if item's arrays contain values from filterArray1 and filterArray2
      return (
        selectedGoals.every((value) =>
          item?.sdg?.find((ob) => ob.short === value)
        ) &&
        selectedActivities.every((value) =>
          item?.activity?.find((obj) => obj.label === value)
        )
      );
    });
  }
  useEffect(() => {
    const filteredArray = filterArrayOfObjects(
      association,
      selectedGoals,
      selectedActivities
    );
    setSelectedAssociation(
      filterArrayOfObjects(association, selectedGoals, selectedActivities)
    );
    console.log(filteredArray);
  }, [openPointInterset, selectedActivity, goal]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Profile Configiration
  const [openAddAdress, setOpenAddAdress] = useState(false);
  const [adress, setAdress] = useState("");
  const [coor_siege, setcoor_siege] = useState([]);
  const [valuesSiege, setValuesSiege] = useState({
    valideSiege: false,
    error: false,
  });
  const HandleOpenAddAdress = () => {
    setOpenAddAdress(true);
  };
  const HandleCloseAddAdress = () => {
    setOpenAddAdress(false);
  };
  const handleClickVerifierSiege = () => {
    verifierSiege();
  };
  const verifierSiege = () => {
    const object = {
      siege: adress,
    };
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "association/verify-siege",
        object
      )
      .then((value) => {
        setcoor_siege([
          (value?.data.lat).toFixed(10),
          (value?.data.long).toFixed(10),
        ]);
        setValuesSiege({
          ...valuesSiege,
          valideSiege: true,
          error: false,
        });
      })
      .catch((err) => {
        setValuesSiege({
          ...valuesSiege,
          valideSiege: false,
          error: true,
        });
      });
  };
  const add_Adress = () => {
    var json = new FormData();
    const obj = JSON.stringify({
      address: adress,
      address_coordinates: coor_siege,
    });
    json.append("json", obj);
    json.append("profile_image", imageProfile);
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        dispatch({
          type: "Address_coordinate",
          address_coordinate: coor_siege,
        });
      })
      .catch((err) => {});
  };
  function convertStringArrayToNumberArray(stringArray) {
    return stringArray.map((str) => Number(str));
  }

  const call_api_badge = () => {
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/" +
          sessionStorage.getItem("user_Id") +
          "/badge" 
      )
      .then((value) => {
        call_api_get_user_info();
        handleClose();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Dialog
        open={openAddAdress}
        onClose={() => {
          HandleCloseAddAdress();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "ADD YOUR HOME"
            : "ADD YOUR HOME"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              HandleCloseAddAdress();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" spacing={1}>
              <FormControl variant="outlined" color="success" focused>
                <InputLabel
                  variant="outlined"
                  color="success"
                  size="small"
                  InputLabelProps={{ style: { color: "black", width: "90%" } }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "your address.*"
                    : "your address.*"}
                </InputLabel>
                <OutlinedInput
                  color="success"
                  size="small"
                  variant="outlined"
                  type="text"
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "your address."
                      : "your address."
                  }
                  multiline
                  rows={2}
                  value={adress}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Please provide a Valid address."
                      : "Entrer une adresse valide"
                  }
                  onChange={(e) => setAdress(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickVerifierSiege}
                        edge="end"
                      >
                        {valuesSiege.valideSiege ? (
                          <CheckCircleIcon
                            sx={{
                              height: "20px",
                              width: "auto",
                              color: "green",
                            }}
                          />
                        ) : valuesSiege.error ? (
                          <ErrorIcon
                            sx={{
                              height: "20px",
                              width: "auto",
                              color: "red",
                            }}
                          />
                        ) : (
                          <CheckCircleOutlineIcon
                            sx={{ height: "20px", width: "auto" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              add_Adress();
              HandleCloseAddAdress();
            }}
            variant="contained"
            style={styleValidate}
            color="success"
          >
            {sessionStorage.getItem("language") === "fr"
              ? "Confirmer"
              : "Confirmer"}
          </Button>
          <Button
            onClick={() => {
              HandleCloseAddAdress();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Skip" : "Skip"}
          </Button>
        </DialogActions>
      </Dialog>
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
              {/* <Button
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
            </Button> */}

              <Button
                variant={openPointInterset ? "contained" : "outlined"}
                startIcon={<GroupsIcon />}
                sx={
                  openPointInterset
                    ? {
                        display: "flex",
                        padding: "16px",
                        mx: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        borderBottom: "4px solid #000",
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
                onClick={(e) => handleClick(e)}
              >
                Association
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <MenuItem onClick={handleAddnewPointInterest}>
                  <ListItemIcon>
                    <AddLocationIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create an association" />
                </MenuItem>
                <MenuItem onClick={handleOpenPointInterest}>
                  <ListItemIcon>
                    <VisibilityIcon
                      sx={{ color: openPointInterset ? "red" : "" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Show on map" />
                </MenuItem>
              </Menu>
            </Box>
            <div className="edit-vr-button">
              <Box>
                <Tooltip title="3D" placement="left-start">
                  <IconButton
                    onClick={() => {
                      setSwitch3d(!switch3d);
                      call_api_badge();
                    }}
                  >
                    <ViewInArIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
            {/* <Box>
            <Button
              variant="contained"
              sx={{
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
              }}
              endIcon={<AddLocationIcon />}
            >
              Add new
            </Button>
          </Box> */}
            <br />
            {switch3d ? (
              <UnityScene />
            ) : (
              <MapContainer
                // whenReady={setMap}
                center={[48.85837, 2.294481]}
                zoom={12}
                maxZoom={20}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%", borderRadius: "2%" }}
              >
                <MarkerClusterGroup
                  chunkedLoading
                  iconCreateFunction={createClusterCustomIcon}
                  showCoverageOnHover={false}
                >
                  {address_coordinate.length !== 0 && (
                    <Marker
                      position={convertStringArrayToNumberArray(
                        address_coordinate
                      )}
                      icon={iconHome}
                    >
                      <Popup className="popupmeta">
                        <CardHome />
                      </Popup>
                    </Marker>
                  )}

                  <Marker position={[48.85837, 2.294481]} icon={iconMetaVerse}>
                    <Popup className="popupmeta">
                      <CardMetaVerse />
                    </Popup>
                  </Marker>
                  {/* <LocationMarker /> */}
                  <NearestMarkerBike />
                  <NearestMarkerEvent />
                  {openVelo &&
                    dataVélo &&
                    dataVélo?.map((item, index) => (
                      <Marker
                        key={index}
                        position={[
                          item.coordonnees_geo.lat,
                          item.coordonnees_geo.lon,
                        ]}
                        icon={svgIconBike}
                      >
                        <Popup className="popup">
                          <CardVelo item={item} />
                        </Popup>
                      </Marker>
                    ))}
                  {openStation &&
                    dataStation?.map((item, index) => (
                      <>
                        {" "}
                        {item?.geo_point_borne !== null &&
                        item?.geo_point_borne !== undefined ? (
                          <Marker
                            key={index}
                            position={[
                              item.geo_point_borne.lat,
                              item.geo_point_borne.lon,
                            ]}
                            icon={iconWifi}
                          >
                            <Popup className="popup">
                              <CardWifi key={index} item={item} />
                            </Popup>
                          </Marker>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  {openEvent &&
                    dataEvent &&
                    dataEvent?.map((item, index) => (
                      <>
                        {item?.lat_lon !== null &&
                        item?.lat_lon !== undefined ? (
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
                        {item?.lat_lon !== null &&
                        item?.lat_lon !== undefined ? (
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

                  {openPointInterset &&
                    selectedAssocition?.map((item, index) => (
                      <Marker
                        key={index}
                        position={[
                          item?.siege_coordinates[0] !== undefined
                            ? parseFloat(item?.siege_coordinates[0])
                            : 0,
                          item?.siege_coordinates[1] !== undefined
                            ? parseFloat(item?.siege_coordinates[1])
                            : 0,
                        ]}
                        icon={iconPointOfInterset}
                      >
                        <Popup className="popup">
                          <CardPlace item={item} />
                        </Popup>
                      </Marker>
                    ))}
                  {dataRéseau_cyclable.features
                    .filter(function (feature) {
                      return feature.geometry.type == "LineString";
                    })
                    .map(function (feature) {
                      var coordinates = feature.geometry.coordinates;
                      coordinates.forEach(function (coordinate) {
                        coordinate.reverse();
                      });
                      return coordinates;
                    })
                    ?.map((item, id) => {
                      return (
                        <Polyline key={id} positions={item} color={"red"}>
                          <Popup className="popupHome">
                            <p style={{ color: "blue" }}>
                              {
                                dataRéseau_cyclable?.features[id]?.properties
                                  ?.voie
                              }
                            </p>
                            <p>
                              status:{" "}
                              <span style={{ color: "blue" }}>
                                {
                                  dataRéseau_cyclable?.features[id]?.properties
                                    ?.statut
                                }
                              </span>
                            </p>
                            <p>
                              Longeur:{" "}
                              <span style={{ color: "blue" }}>
                                {
                                  dataRéseau_cyclable?.features[id]?.properties
                                    ?.length
                                }{" "}
                                KM
                              </span>
                            </p>
                            <p>
                              Typologie simple:{" "}
                              <span style={{ color: "blue" }}>
                                {" "}
                                {
                                  dataRéseau_cyclable?.features[id]?.properties
                                    ?.typologie_simple
                                }
                              </span>
                            </p>
                          </Popup>
                        </Polyline>
                      );
                    })}
                  {/* <TerrassesAutorisation data={dataterrasses} /> */}
                  {dataterrasses.features
                    .filter(function (feature) {
                      return feature.geometry.type == "Point";
                    })
                    .map(function (feature) {
                      var coordinates = feature.geometry.coordinates.reverse();
                      return coordinates;
                    })
                    ?.map((item, id) => {
                      return (
                        <Marker key={id} position={item} icon={iconMarket}>
                          <Popup className="popupmeta">
                            <p style={{ color: "blue" }}>
                              <span style={{ color: "blue" }}>
                                {" "}
                                {
                                  dataterrasses?.features[id]?.properties
                                    ?.nom_societe
                                }
                              </span>
                            </p>
                            <p>
                              adress:
                              <span style={{ color: "blue" }}>
                                {" "}
                                {
                                  dataterrasses?.features[id]?.properties
                                    ?.adresse
                                }
                              </span>
                            </p>
                            <p>
                              periode d'installation:{" "}
                              <span style={{ color: "blue" }}>
                                {" "}
                                {
                                  dataterrasses?.features[id]?.properties
                                    ?.periode_installation
                                }
                              </span>
                            </p>
                          </Popup>
                        </Marker>
                      );
                    })}
                </MarkerClusterGroup>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxNativeZoom={19}
                  minZoom={0}
                  maxZoom={22}
                />

                <LocateZone />
              </MapContainer>
            )}
          </Container>
          <div className="edit-location-button">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Tooltip title="SDG GOALS" placement="left-start">
                  <IconButton>
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "100%",
                      }}
                      src={SdgweelImage}
                      alt="webscript"
                    />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  mb={1}
                  display="flex"
                  flexDirection="column"
                  // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                  height="400px" // fixed the height
                  style={{
                    overflow: "scroll",
                    overflowY: "scroll",
                  }}
                >
                  {goals.map((item, index) => {
                    return (
                      <Tooltip
                        title={`${item?.goal}.${item.short}`}
                        placement="left-start"
                      >
                        <IconButton
                          onClick={() => {
                            setgoal(item?.goal);
                            console.log(
                              "sdg",
                              handleSelectedGoals(selectedGoals, item?.short)
                            );
                          }}
                        >
                          <img
                            style={{
                              width: "auto",
                              height:
                                selectedGoals.indexOf(item?.short) !== -1
                                  ? "50px"
                                  : "40px",
                              borderRadius:
                                selectedGoals.indexOf(item?.short) !== -1
                                  ? "20%"
                                  : "5%",
                            }}
                            src={item?.icon_url}
                            alt="webscript"
                          />
                        </IconButton>
                      </Tooltip>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Tooltip title="Activity" placement="left-start">
                  <IconButton>
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "0%",
                      }}
                      src={ActivityImage}
                      alt="webscript"
                    />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  mb={1}
                  display="flex"
                  flexDirection="column"
                  // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                  height="250px" // fixed the height
                  // style={{
                  //   overflow: "scroll",
                  //   overflowY: "scroll",
                  // }}
                >
                  {Activity.map((item, index) => {
                    return (
                      <Tooltip title={item?.label} placement="left-start">
                        <IconButton
                          onClick={() => {
                            setselecteDAcitivity(item?.label);
                            console.log(
                              "activities",
                              handleselectedActivities(
                                selectedActivities,
                                item?.label
                              )
                            );
                          }}
                        >
                          <img
                            style={{
                              width: "auto",
                              borderRadius: "5%",
                              height:
                                selectedActivities.indexOf(item?.label) !== -1
                                  ? "40px"
                                  : "30px",
                            }}
                            src={item?.icon}
                            alt="webscript"
                          />
                        </IconButton>
                      </Tooltip>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>
      </div>
      <ModaladdnewPoint open={openModal} setOpen={setOpenModal} goals={goals} />
    </>
  );
}

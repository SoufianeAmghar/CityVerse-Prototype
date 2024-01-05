import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
  Map,
  CircleMarker,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { MarkerCluster } from "leaflet";
import CardMetaVerse from "../Card/CardMetaVerse";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "#F0F5FB",
    color: "#08089C",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  borderRadius: "2%",
  boxShadow: 4,
};
const styleValidate = {
  backgroundColor: "success",
  minWidth: "25%",
  left: "50%",
  borderRadius: "20px",
  color: "#fff",
};

const styleCancelDelete = {
  color: "#008000",
  right: "0%",
  border: "1px solid #008000",
  borderRadius: "4px",
  backgroundColor: "#fff",
  width: "20%",
};

const ModalPreview = ({
  handleClose,
  handleOpenErrTranche,
  handleCloseErrTracnhe,
  setErrTrancheMsg,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const iconMetaVerse = L.icon({
    iconSize: [65, 70],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/play.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  return (
    <div>
      <Box sx={style}>
        <MapContainer
          center={[48.871084, 2.352386]}
          zoom={12}
          maxZoom={16}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%", borderRadius: "2%" }}
        >
          {/* tOUR EIFFEL */}
          <Marker position={[48.85837, 2.294481]} icon={iconMetaVerse}>
            <Popup className="popupmeta">
              <CardMetaVerse />
            </Popup>
          </Marker>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Box>
    </div>
  );
};

export default ModalPreview;

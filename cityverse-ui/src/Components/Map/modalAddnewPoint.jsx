import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { MapContainer, useMap, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// material
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  Typography,
  Card,
  Container,
  Modal,
  Stack,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Autocomplete from "@mui/material/Autocomplete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import L, { Icon, MarkerCluster, point } from "leaflet";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //overflow: "scroll",
  // height: "90%",
  width: "50%",
  bgcolor: "background.paper",
  //border: "2px solid #08089C",
  borderRadius: "5%",
  boxShadow: 4,
  p: 0,
};

const styleValidate = {
  backgroundColor: "success",
  minWidth: "25%",
  left: "35%",
  borderRadius: "20px",
  color: "#fff",
};

export default function ModaladdnewPoint({ open, setOpen, goals }) {
  const [location, setLocation] = useState({});
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };
  const [Name, setName] = useState("");
  const [Rna, setRna] = useState("");
  const [desc, setDesc] = useState("");
  const [adress, setAdress] = useState("");
  const [coor_siege, setcoor_siege] = useState([]);
  const [fblink, setFblink] = useState("");
  const [instagramLink, setinstagramLink] = useState("");
  const [xLink, setXLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [passWord, setPassWord] = useState("");
  const [valuesRna, setValuesRna] = useState({
    valideRna: false,
    error: false,
  });
  const [valuesSiege, setValuesSiege] = useState({
    valideSiege: false,
    error: false,
  });

  //message error
  const [openSnack, setopenSnack] = React.useState(false);
  const [message, setmessage] = React.useState({ msg: "", error: false });

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const handleImageBannerChange = (e) => {
    const file = e.target.files[0];
    setSelectedBannerImage(file);
  };
  const handleClickVerifierRna = () => {
    verifierRna();
    // setValues({
    //   ...values,
    //   showPassword: !values.showPassword,
    // });
  };
  const handleClickVerifierSiege = () => {
    verifierSiege();
  };

  const iconPin = L.icon({
    iconSize: [45, 50],
    iconAnchor: [10, 10],
    popupAnchor: [2, -40],
    iconUrl: require("../../Asset/pin.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const countries = [
    { label: "Arts & Culture" },
    {
      label: "Sports",
    },
    { label: "Social Action" },
    {
      label: "Recreation",
    },
    {
      label: "Humanitary",
    },
  ];

  const SetViewToCurrentLocation = ({ location, setLocation }) => {
    const map = useMap();

    function getGeo() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(
            "--------- ERROR WHILE FETCHING LOCATION ----------- ",
            error
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }

    useEffect(() => {
      getGeo();
    }, []);

    useEffect(() => {
      if (location.lat && location.lng) {
        map.setView([location.lat, location.lng]);
      }
    }, [location]);

    return null;
  };

  const CustomizeMarker = ({ location, setLocation }) => {
    const [draggable, setDraggable] = useState(false);

    let lat = location.lat;
    let lng = location.lng;

    const [position, setPosition] = useState({ lat, lng });

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            setDraggable(false);
          }
        },
      }),
      []
    );

    const toggleDraggable = useCallback(() => {
      setDraggable(true);
    }, []);

    const saveLocation = () => {
      if (markerRef.current)
        console.log(
          "+++++++++++ THE OUTPUT OF getLatLng IS ++++++++++++ ",
          markerRef.current.getLatLng()
        );
    };

    return (
      <>
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={[position.lat, position.lng]}
          icon={iconPin}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <label>
              <Button variant="outlined" color="success" onClick={saveLocation}>
                Submit
              </Button>
            </label>
          </Popup>
        </Marker>
        <button
          type="button"
          onClick={toggleDraggable}
          className="edit-pin-location-button"
        >
          Edit Your Location
        </button>
        {/* <label>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{
                          minWidth: "25%",
                          borderRadius: "20px",
                        }}
                        component="span"
                        startIcon={<AddLocationIcon sx={{ color: "red" }} />}
                        onClick={handleOpenChild}
                      >
                        Pin Location
                      </Button>
                    </label> */}
      </>
    );
  };
  const verifierRna = () => {
    const object = {
      rna: Rna,
    };
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "association/verify-rna",
        object
      )
      .then((value) => {
        setValuesRna({
          ...valuesRna,
          valideRna: true,
          error: false,
        });
      })
      .catch((err) => {
        setValuesRna({
          ...valuesRna,
          valideRna: false,
          error: true,
        });
      });
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
  const handleClickSnack = () => {
    setopenSnack(true);
  };
  const handleCloseSnack = () => {
    setopenSnack(false);
  };
  useEffect(() => {
    if (openSnack === true) {
      setTimeout(() => {
        handleCloseSnack();
      }, 3000);
    }
  }, [openSnack]);
  
  const call_api_get_associations = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "association/")
      .then((value) => {
        console.log('association', value?.data)
        // setAssociation(value?.data)
        dispatch({
          type: "Associations",
          associations: value?.data,
        });
      })
      .catch((err) => {});
  };
  const save = () => {
    var json = new FormData();
    const object = JSON.stringify({
      created_by: sessionStorage.getItem("user_Id"),
      modified_by: sessionStorage.getItem("user_Id"),
      name: Name,
      rna: Rna === "" ? undefined : Rna,
      description: desc,
      siege: adress === "" ? undefined : adress,
      siege_coordinates: coor_siege,
      sdg: selectedGoals,
      activity: selectedActivity,
      social_links: [xLink, fblink, instagramLink, youtubeLink],

      // banner_image: "string",
      // profile_image: selectedImage,
    });
    json.append("json", object);
    json.append("banner_image", selectedBannerImage);
    json.append("profile_image", selectedImage);
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/association/",
        json,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
          },
        }
      )
      .then((value) => {
        handleClickSnack();
        call_api_get_associations();
        setmessage({
          ...message,
          msg: "Successfully stored.",
          error: false,
        });
        dispatch({
          type: "ImageAssociation",
          imageAssociation: selectedImage,
        });
        dispatch({
          type: "BannerAssociation",
          bannerAssociation: selectedBannerImage,
        });
      })
      .catch((err) => {
        handleClickSnack();
        setmessage({
          ...message,
          msg: `Failed to store.`,
          error: true,
        });
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box disableGutters component="main" width="50%" sx={style}>
          <Card sx={{ borderRadius: "0px" }}>
            <div className="border"></div>
            <br></br>
            <Container
              disableGutters
              maxWidth="80%"
              component="main"
              sx={{ padding: "20px" }}
            >
              {/* <Box
            sx={{
              display: "flex",
              justifyContent:"flex-start",
              bgcolor: "background.paper",
              alignItems: "center",
              borderRadius: 1,
            }}
          >
            <div
              style={{
                marginLeft: "20px",
              }}
            >
              <Typography
                color="text.primary"
                style={{
                  fontWeight: "600",
                  marginLeft: "0.5%",
                  paddingBottom: "5%",
                }}
                component="h1"
                variant="h4"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Add Association"
                  : "Add Association"}
              </Typography>
            </div>
          </Box> */}
              <Box
                component="form"
                // onSubmit={() => ()}
                sx={{
                  p: 4,
                  paddingLeft: 6,
                  background: "#0000",
                  "& > :not(style)": { m: 2, width: "44.2%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}

                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Name*"
                      : "Name*"
                  }
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormControl variant="outlined" color="success" focused>
                  <InputLabel
                    variant="outlined"
                    color="success"
                    size="small"
                    InputLabelProps={{ style: { color: "black" } }}
                  >
                    {sessionStorage.getItem("language") === "fr"
                      ? "Numero RNA*"
                      : "Numero RNA*"}
                  </InputLabel>
                  <OutlinedInput
                    color="success"
                    id="Password"
                    size="small"
                    variant="outlined"
                    type="text"
                    value={Rna}
                    onChange={(e) => {
                      setRna(e.target.value);
                    }}
                    placeholder={
                      sessionStorage.getItem("language") === "fr"
                        ? "Entrer un RNA valid"
                        : "Entrer un RNA valid"
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickVerifierRna}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {valuesRna.valideRna ? (
                            <CheckCircleIcon
                              sx={{
                                height: "20px",
                                width: "auto",
                                color: "green",
                              }}
                            />
                          ) : valuesRna.error ? (
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
                    label={
                      sessionStorage.getItem("language") === "fr"
                        ? "Numero RNA*"
                        : "Numero RNA*"
                    }
                  />
                </FormControl>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  // InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Description"
                      : "Description"
                  }
                  multiline
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <FormControl variant="outlined" color="success" focused>
                  <InputLabel
                    variant="outlined"
                    color="success"
                    size="small"
                    InputLabelProps={{ style: { color: "black" } }}
                  >
                    {sessionStorage.getItem("language") === "fr"
                      ? "Siège Social*"
                      : "Siège Social*"}
                  </InputLabel>
                  <OutlinedInput
                    color="success"
                    size="small"
                    variant="outlined"
                    type="text"
                    label={
                      sessionStorage.getItem("language") === "fr"
                        ? "Siège Social"
                        : "Siège Social"
                    }
                    multiline
                    rows={2}
                    value={adress}
                    placeholder={
                      sessionStorage.getItem("language") === "fr"
                        ? "Entrer une adresse valide"
                        : "Entrer une adresse valide"
                    }
                    onChange={(e) => setAdress(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickVerifierSiege}
                          onMouseDown={handleMouseDownPassword}
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
                {/* <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  // InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Siége Social"
                      : "Siége Social"
                  }
                  multiline
                  rows={2}
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <CheckCircleIcon
                            sx={{
                              height: "20px",
                              width: "auto",
                              color: "green",
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
                /> */}
                <FormControl variant="outlined" color="success" focused>
                  <Autocomplete
                    multiple
                    size="small"
                    focused
                    variant="outlined"
                    color="success"
                    limitTags={1}
                    options={goals}
                    value={selectedGoals}
                    type="text"
                    onChange={(event, newValue) => {
                      setSelectedGoals(newValue);
                    }}
                    getOptionLabel={(option) => option.short}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string[], index: number) => (
                        <Chip
                          variant="outlined"
                          label={option.short}
                          sx={{
                            color: "#FFF",
                            backgroundColor: `${option?.colorInfo?.hex}`,
                          }}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderOption={(props, option) => (
                      <Box
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={option?.icon_url}
                          src={option?.icon_url}
                          alt=""
                        />
                        {option.goal} - {option.short}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="SDG Goals*"
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        placeholder={
                          sessionStorage.getItem("language") === "fr"
                            ? "Choose goals"
                            : "Choose goals"
                        }
                        inputProps={{
                          ...params.inputProps,
                          // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl variant="outlined" color="success" focused>
                  <Autocomplete
                    multiple
                    size="small"
                    focused
                    variant="outlined"
                    color="success"
                    limitTags={1}
                    options={countries}
                    value={selectedActivity}
                    onChange={(event, newValue) => {
                      setSelectedActivity(newValue);
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {/* <img
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          alt=""
                        /> */}
                        {option.label}
                      </Box>
                    )}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string[], index: number) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Activity*"
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        placeholder={
                          sessionStorage.getItem("language") === "fr"
                            ? "Choose activities"
                            : "Choose activities"
                        }
                        inputProps={{
                          ...params.inputProps,
                          // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </FormControl>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}

                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "https://www.facebook.com/username/"
                      : "https://www.facebook.com/username/"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Facebook Link"
                      : "Facebook Link"
                  }
                  value={fblink}
                  onChange={(e) => setFblink(e.target.value)}
                />
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}

                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "https://www.twitter.com/username"
                      : "https://www.twitter.com/username"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "X Link"
                      : "X Link"
                  }
                  value={xLink}
                  onChange={(e) => setXLink(e.target.value)}
                />
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}

                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Instagram Link"
                      : "Instagram Link"
                  }
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "https://www.instagram.com/username"
                      : "https://www.instagram.com/username"
                  }
                  value={instagramLink}
                  onChange={(e) => setinstagramLink(e.target.value)}
                />
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  // InputProps={{
                  //   className: classes.input,
                  // }}

                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Youtube channel Link"
                      : "Youtube channel Link"
                  }
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "https://www.youtube.com/username"
                      : "https://www.youtube.com/username"
                  }
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  px: 2,
                  "& > :not(style)": { mx: 1 },
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          backgroundColor: "success",
                          minWidth: "25%",
                          borderRadius: "20px",
                          color: "#fff",
                        }}
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Profile Image
                      </Button>
                    </label>
                    <div style={{ position: "relative", paddingTop: "2%" }}>
                      {selectedImage && (
                        <>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "100%",
                            }}
                            src={URL.createObjectURL(selectedImage)}
                            alt="Uploaded"
                          />
                          <CancelIcon
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              color: "#08089C",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-uploadBanner"
                      type="file"
                      onChange={handleImageBannerChange}
                    />
                    <label htmlFor="image-uploadBanner">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          backgroundColor: "success",
                          minWidth: "25%",
                          borderRadius: "20px",
                          color: "#fff",
                        }}
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Banner Image
                      </Button>
                    </label>
                    <div style={{ position: "relative", paddingTop: "2%" }}>
                      {selectedBannerImage && (
                        <>
                          <img
                            style={{
                              width: "200px",
                              height: "100px",
                              borderRadius: "1%",
                            }}
                            src={URL.createObjectURL(selectedBannerImage)}
                            alt="Uploaded"
                          />
                          <CancelIcon
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "-5",
                              color: "#08089C",
                            }}
                            onClick={() => {
                              setSelectedBannerImage(null);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </Box>
                </Stack>
              </Box>
              <Box
                component="form"
                sx={{
                  p: 2,
                  "& > :not(style)": { m: 1 },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                noValidate
                autoComplete="off"
              >
                <Button
                  variant="contained"
                  color="success"
                  // disabled={handleAdd()}
                  sx={styleValidate}
                  onClick={() => {
                    save();
                  }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Sauvegarder"
                    : "Save"}
                </Button>
                <Collapse
                  in={openSnack}
                  className={openSnack ? "" : "dontDisplay"}
                  onClose={handleCloseSnack}
                  sx={{
                    position: "fixed",
                    left: "65%",
                    mb: "1%",
                    mt: 0.5,
                    width: "30%",
                    height: 30,
                    borderRadius: "20%",
                  }}
                  action={
                    <React.Fragment>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="warning"
                        onClick={handleCloseSnack}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                >
                  <Alert
                    onClose={handleCloseSnack}
                    severity={message?.error ? "error" : "success"}
                    // icon={<WarningAmberIcon fontSize="warning" />}
                  >
                    {message?.msg}
                  </Alert>
                </Collapse>
              </Box>
            </Container>
          </Card>
        </Box>
      </Modal>
      <Modal
        open={openChild}
        onClose={handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            height: 500,
            padding: "2%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <MapContainer
            center={[0, 0]}
            zoom={16}
            scrollWheelZoom={true}
            style={{ height: "90%", width: "90%", borderRadius: "2%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <GeoSearchField /> */}
            <SetViewToCurrentLocation
              location={location}
              setLocation={setLocation}
            />
            {location.lat && location.lng && (
              <CustomizeMarker location={location} setLocation={setLocation} />
            )}
          </MapContainer>
        </Box>
      </Modal>
    </div>
  );
}

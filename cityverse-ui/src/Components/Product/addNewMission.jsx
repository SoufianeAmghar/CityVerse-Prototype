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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./product.css"

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

export default function ModaladdnewMission({ open, setOpen, goals }) {
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
  const date = new Date();
  const [startDate, setStartDate] = useState(date);
  const [desc, setDesc] = useState("");
  const [missionDuration, setMissionDuration] = useState();
  const [typeMission, setTypeMission] = useState();
  const [NumVolunteers, setNumVolunteers] = useState();
  const [typeVolunteers, setTypeVolunteers] = useState();

  const [Name, setName] = useState("");
  const [Rna, setRna] = useState("");
  const missions = useSelector((state) => state.AssociationReducer?.missions);
  const [adress, setAdress] = useState("");
  const [coor_siege, setcoor_siege] = useState([]);
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

  function orderByDate(array) {
    // Convert object to array of key-value pairs
    array.sort((a, b) => {
      const dateA = new Date(a.created_on);
      const dateB = new Date(b.created_on);
      return dateB - dateA;
    });

    return array;
  }

  const call_api_get_all_missions = (id) => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "mission/")
      .then((value) => {
        dispatch({
          type: "Missions",
          missions: orderByDate(value?.data),
        });
        handleClose();
      })
      .catch((err) => {
        dispatch({
          type: "Missions",
          posts: [],
        });
        handleClose();
      });
  };
  const save = () => {
    const object = {
      start_date: startDate,
      description: desc,
      number_of_participants: parseInt(NumVolunteers),
      mission_type: typeMission,
      volunteer_qualifications: typeVolunteers,
      duration: missionDuration,
      // created_on : new Date(),
    };
    axios
    .post(
      process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
        "mission/",
      object
    )
    .then((value) => {  
      call_api_get_all_missions()  
    })
    .catch((err) => {
    });

    console.log("mission", object);
  };
  const duration = [
    { id: 1, label: "1 day" },
    { id: 2, label: "several days" },
    { id: 3, label: "several weeks " },
    { id: 4, label: "several months" },
  ];
  const typeOfMission = [
    { id: 1, label: "Food aid" },
    { id: 2, label: "Social support" },
    { id: 3, label: "Teaching and tutoring" },
    { id: 4, label: "Environmental protection" },
    { id: 5, label: "Support for the homeless" },
    { id: 6, label: "Medical support" },
    { id: 7, label: "Cultural and social activities" },
    { id: 8, label: "Administrative management and communication" },
    { id: 9, label: "Vocational training,Legal support" },
    { id: 10, label: "Prevention and awareness-raising." },
  ];
  const volunteers = [
    { id: 1, label: "open to all" },
    { id: 2, label: "professional" },
  ];
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
              sx={{ padding: "10px" }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{
                  color: "#08089C",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0%",
                  flexGrow: 1,
                }}
                sx={{ paddingLeft: "8%" }}
              >
                New Mission
              </Typography>
              <Box
                component="form"
                // onSubmit={() => ()}
                sx={{
                  p: 4,
                  paddingLeft: 6,
                  background: "#0000",
                  "& > :not(style)": { m: 2, width: "44.5%" },
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      focused
                      size="small"
                      variant="outlined"
                      color="success"
                      fullWidth
                      label={
                        sessionStorage.getItem("language") === "fr"
                          ? "Date début du mission"
                          : "Mission's Start date"
                      }
                      customInput={<TextField />}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <FormControl variant="outlined" color="success" focused>
                  <Autocomplete
                    size="small"
                    focused
                    variant="outlined"
                    color="success"
                    limitTags={1}
                    options={duration}
                    value={missionDuration}
                    type="text"
                    onChange={(event, newValue) => {
                      setMissionDuration(newValue);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string[], index: number) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          sx={{
                            color: "#FFF",
                            // backgroundColor: `${option?.colorInfo?.hex}`,
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
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Mission duration*"
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        placeholder={
                          sessionStorage.getItem("language") === "fr"
                            ? "Mission duration"
                            : "Mission duration"
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
                    size="small"
                    focused
                    variant="outlined"
                    color="success"
                    limitTags={1}
                    options={typeOfMission}
                    value={typeMission}
                    type="text"
                    onChange={(event, newValue) => {
                      setTypeMission(newValue);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string[], index: number) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          sx={{
                            color: "#FFF",
                            // backgroundColor: `${option?.colorInfo?.hex}`,
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
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Mission duration*"
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        placeholder={
                          sessionStorage.getItem("language") === "fr"
                            ? "Type of mission"
                            : "Type of mission"
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
                    size="small"
                    focused
                    variant="outlined"
                    color="success"
                    limitTags={1}
                    options={volunteers}
                    value={typeVolunteers}
                    type="text"
                    onChange={(event, newValue) => {
                      setTypeVolunteers(newValue);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string[], index: number) => (
                        <Chip
                          variant="outlined"
                          label={option.label}
                          sx={{
                            color: "#FFF",
                            // backgroundColor: `${option?.colorInfo?.hex}`,
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
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          sessionStorage.getItem("language") === "fr"
                            ? "Volunteer qualifications"
                            : "Volunteer qualifications"
                        }
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        placeholder={
                          sessionStorage.getItem("language") === "fr"
                            ? "Volunteer qualifications"
                            : "Volunteer qualifications"
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
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Number of participants"
                      : "Number of participants"
                  }
                  value={NumVolunteers}
                  onChange={(e) => setNumVolunteers(e.target.value)}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  px: 3,
                  "& > :not(style)": { mx: 5 },
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  size="small"
                  focused
                  fullWidth
                  variant="outlined"
                  color="success"
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
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
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

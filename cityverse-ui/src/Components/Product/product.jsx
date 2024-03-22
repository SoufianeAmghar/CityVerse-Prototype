import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Button, ImageList, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import Divider from "@mui/material/Divider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import TurnRightOutlinedIcon from "@mui/icons-material/TurnRightOutlined";
import BikeMarker from "../Map/MarkerBike";
import img from "../../Asset/rose.png";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import SwipeableViews from "react-swipeable-views";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link as LinkDom, useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import DateCalendarServerRequest from "./ProductCalendar";
import ListImage from "./listImage";
import ListVideo from "./listVideo";
import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import format from "date-fns/format";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ImageListItem from "@mui/material/ImageListItem";
import ModaladdnewMission from "./addNewMission";
import Autocomplete from "@mui/material/Autocomplete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModalUpdateMission from "./updateMission";
import { Alert, Collapse } from "@mui/material";

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#0000",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    color: "#000000",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      color: "#08089C",
      opacity: 1,
    },
    "&.Mui-selected": {
      background: "rgba(170, 255, 182, 0.59)",
      borderRadius: "0px 0px 0px 0px",
      borderBottom: "2px solid #08089C",
      color: "#08089C",
      fontWeight: theme.typography.fontWeightBold,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#08089C",
    },
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          width="100%"
          sx={{
            p: 0.25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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

export default function Product() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const address = useSelector((state) => state.ProfileReducer?.address);
  const [inProgress, setInprogress] = useState(true);
  const [value, setValue] = React.useState(0);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedNewImage, setSelectedNewImage] = useState();
  const [selectedPostImage, setSelectedPostImage] = useState();
  const [post, setPost] = useState();
  const [valuesRna, setValuesRna] = useState({
    valideRna: false,
    error: false,
  });
  const association = useSelector(
    (state) => state.AssociationReducer?.associations
  );
  const [adress, setAdress] = useState(address);
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [appliquantAge, SetAppliquantAge] = useState();
  const [permit, setPermit] = useState();
  const [haveCar, sethaveCar] = useState();
  const [interset, setInterest] = useState();
  const [about, setAbout] = useState();


  // Notifications
  const [openPostCreated, setOpenPostCreated ] = useState(false);
  const [openPostUpdated, setOpenPostUpdated ] = useState(false);
  const [openPostDeleted, setOpenPostDeleted ] = useState(false);

  const [openMissionCreated, setOpenMissionCreated ] = useState(false);
  const [openMissionUpdated, setOpenMissionUpdated ] = useState(false);
  const [openMissionDeleted, setOpenMissionDeleted ] = useState(false);


 

  const [valuesSiege, setValuesSiege] = useState({
    valideSiege: false,
    error: false,
  });
  const handleClickVerifierSiege = () => {
    verifierSiege();
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        // setAdress([
        //   (value?.data.lat).toFixed(10),
        //   (value?.data.long).toFixed(10),
        // ]);
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
  const Activity = useSelector((state) => state.AssociationReducer?.activity);
  const id_association = useSelector(
    (state) => state.AssociationReducer?.id_association
  );
  const association_name = useSelector(
    (state) => state.AssociationReducer?.association_name
  );
  const posts = useSelector((state) => state.AssociationReducer?.posts);
  const missions = useSelector((state) => state.AssociationReducer?.missions);
  const applications = useSelector(
    (state) => state.AssociationReducer?.applications
  );
  const sdg = useSelector((state) => state.ProfileReducer?.sdg);

  //Open mission Model
  const [openModel, setOpenModel] = useState();
  const handleOpenModel = (e) => {
    setOpenModel(true);
  };

  const handlenewImage = (e) => {
    const file = e.target.files[0];
    setSelectedNewImage(URL.createObjectURL(file));
  };
  const handlenewPostImage = (e) => {
    const file = e.target.files[0];
    setSelectedPostImage(file);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [opennewImage, setOpennewImage] = useState();
  const handleOpennewImage = () => {
    setOpennewImage(true);
    handleClose();
  };
  const handleClosenewImage = () => {
    setOpennewImage(false);
    handleClose();
  };

  const [openMediapost, setOpenMediapost] = useState();
  const handleopenMediapost = () => {
    setOpenMediapost(true);
    handleClose();
  };
  const handleCloseOPenPost = () => {
    setOpenMediapost(false);
    handleClose();
  };

  const [openApplymission, setOpenApplyMission] = useState();
  const handleopenApplyMission = () => {
    setOpenApplyMission(true);
    // handleClose();
  };
  const handleCloseApplymission = () => {
    setOpenApplyMission(false);
    handleClose();
  };

  const handlenewPost = (e) => {
    const file = e.target.files[0];
    setSelectedNewImage(file);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [fav, setFav] = useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [itemData, setItemData] = useState([
    {
      img: "https://thumbs.dreamstime.com/b/stare-de-france-stadium-official-stadium-french-national-football-team-56956107.jpg",
      title: "Breakfast",
      type: "image",
    },
    {
      img: "https://thumbs.dreamstime.com/b/saint-denis-france-stade-de-march-football-euro-vs-pays-bas-interior-stadium-high-quality-photo-273357769.jpg",
      title: "Burger",
      type: "image",
    },
    {
      img: "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg",
      title: "Camera",
      type: "image",
    },
    {
      img: "https://c4.wallpaperflare.com/wallpaper/212/663/692/france-paris-stadium-stade-de-france-wallpaper-preview.jpg",
      title: "Coffee",
      type: "image",
    },
    {
      img: "https://wallpapercave.com/wp/wp10055231.jpg",
      title: "Hats",
      type: "image",
    },
    {
      img: "https://thumbs.dreamstime.com/b/stare-de-france-stadium-official-stadium-french-national-football-team-56956107.jpg",
      title: "Honey",
      type: "image",
    },
    {
      img: "https://www.youtube.com/embed/MkwdlpzeC1w?si=IdMG-yNqyf6iWXKJ",
      title: "Honey",
      type: "video",
    },
  ]);

  const [data, setData] = useState();

  const call_api_get_all_posts = (id) => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "association/posts/" +
          id
      )
      .then((value) => {
        setInprogress(false);
        console.log("Posts", value.data);
        dispatch({
          type: "Posts",
          posts: orderByDate(value?.data),
        });
      })
      .catch((err) => {
        setInprogress(false);
        dispatch({
          type: "Posts",
          posts: [],
        });
      });
  };
  const call_api_get_all_missions = () => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "association/missions/" +
          id_association
      )
      .then((value) => {
        dispatch({
          type: "Missions",
          missions: orderByDate(value?.data),
        });
      })
      .catch((err) => {
        setInprogress(false);
        dispatch({
          type: "Missions",
          posts: [],
        });
      });
  };
  const call_api_get_all_applications_of_mission = () => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "mission/applications/" +
          idMission
      )
      .then((value) => {
        dispatch({
          type: "Applications",
          applications: value?.data,
        });
      })
      .catch((err) => {});
  };
  const call_api_get_association_by_id = (id) => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "association/" + id
      )
      .then((value) => {
        setData(value?.data);
      })
      .catch((err) => {});
  };
  const call_api_add_post = () => {
    var json = new FormData();
    const object = JSON.stringify({
      creator_id: id_association,
      created_by: sessionStorage.getItem("user_Id"),
      modified_by: sessionStorage.getItem("user_Id"),
      description: post,
    });
    json.append("json", object);
    json.append("img", selectedPostImage);
    // json.append("profile_image", selectedImage);
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "association/post",
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
        call_api_get_all_posts(id_association);
        setOpenPostCreated(true);
        setTimeout(() => {
          setOpenPostCreated(false);
        }, 3000);
      })
      .catch((err) => {});
  };

  const [idMission, setIdMission] = useState();
  useEffect(() => {
    if (id_association !== null && id_association !== undefined) {
      call_api_get_association_by_id(id_association);
      call_api_get_all_posts(id_association);
    }
    call_api_get_all_missions();
  }, []);
  useEffect(() => {
    if (idMission !== null && idMission !== undefined) {
      call_api_get_all_missions();
      call_api_get_all_applications_of_mission();
    }
  }, [idMission]);

  const get_icon_activity = (label) => {
    var icon = null;
    for (let i = 0; i < Activity?.length; i++) {
      if (Activity[i]?.label === label) {
        icon = Activity[i]?.icon;
      }
    }
    return icon;
  };
  function isPDF(file) {
    // Get the file name
    const fileName = file.name;

    // Get the file extension
    const fileExtension = fileName.split(".").pop().toLowerCase();

    // Check if the file extension is 'pdf'
    if (fileExtension === "pdf") {
      return true;
    }

    // If the file extension is not 'pdf', check the MIME type
    const fileType = file.type.toLowerCase();
    if (fileType === "application/pdf") {
      return true;
    }

    // If neither the file extension nor the MIME type indicates a PDF, return false
    return false;
  }
  function orderByDate(array) {
    // Convert object to array of key-value pairs
    array.sort((a, b) => {
      const dateA = new Date(a.created_on);
      const dateB = new Date(b.created_on);
      return dateB - dateA;
    });

    return array;
  }
  const handleApplyMission = () => {
    const object = {
      first_name: firstName,
      surname: lastName,
      has_a_car: haveCar?.label === "Yes" ? true : false,
      permit: permit?.label === "Yes" ? true : false,
      age: parseInt(appliquantAge),
      interests: about,
      address: adress,
      user_id: sessionStorage.getItem("user_Id"),
    };
    console.log(object);
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "mission/apply/" +
          idMission,
        object
      )
      .then((value) => {
        call_api_get_all_applications_of_mission();
        handleCloseApplymission();
      })
      .catch((err) => {});
  };

  return (
    <div style={{}}>
      {/* add new photos */}
      <Dialog
        open={opennewImage}
        onClose={() => {
          handleClosenewImage();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Add nouveau image"
            : "Add nouveau image"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleClosenewImage();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" alignItems="center" spacing={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handlenewImage}
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
                  Upload New Image
                </Button>
              </label>
              <div style={{ position: "relative" }}>
                {selectedNewImage && (
                  <>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100%",
                      }}
                      src={selectedNewImage}
                      alt="Uploaded"
                    />
                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        color: "#556B2F",
                      }}
                      onClick={() => {
                        setSelectedNewImage(null);
                      }}
                    />
                  </>
                )}
              </div>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              itemData.push({
                img: selectedNewImage,
                title: "new one",
                type: "image",
              });
              handleClosenewImage();
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
              handleClosenewImage();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMediapost}
        onClose={() => {
          handleCloseOPenPost();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Add Media"
            : "Add Media"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseOPenPost();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" alignItems="center" spacing={2}>
              <input
                accept="image/*,video/*,.pdf"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handlenewPost}
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
                  Upload New Image
                </Button>
              </label>
              <div style={{ position: "relative" }}>
                {selectedNewImage && (
                  <>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20%",
                      }}
                      src={URL.createObjectURL(selectedNewImage)}
                      alt="Uploaded"
                    />
                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "-5",
                        right: "-5",
                        color: "#556B2F",
                      }}
                      onClick={() => {
                        setSelectedNewImage(null);
                      }}
                    />
                  </>
                )}
              </div>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              itemData.push({
                img: selectedNewImage,
                title: "new one",
                type: "image",
              });
              handleCloseOPenPost();
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
              handleCloseOPenPost();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* apply in mission */}
      <Dialog
        open={openApplymission}
        onClose={() => {
          handleCloseApplymission();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Apply mission"
            : "Apply mission"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseApplymission();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              // onSubmit={() => ()}
              sx={{
                p: 2,
                paddingLeft: 3,
                background: "#0000",
                "& > :not(style)": { m: 2, width: "42.2%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                focused
                variant="outlined"
                color="success"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder={
                  sessionStorage.getItem("language") === "fr"
                    ? "Obligatoire"
                    : "Required"
                }
                label={
                  sessionStorage.getItem("language") === "fr"
                    ? "First Name"
                    : "First Name"
                }
                // value={NumVolunteers}
                // onChange={(e) => setNumVolunteers(e.target.value)}
              />
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                label={
                  sessionStorage.getItem("language") === "fr"
                    ? "SurName"
                    : "SurName"
                }
                // value={NumVolunteers}
                // onChange={(e) => setNumVolunteers(e.target.value)}
              />
              <TextField
                size="small"
                focused
                variant="outlined"
                color="success"
                type="number"
                placeholder={
                  sessionStorage.getItem("language") === "fr"
                    ? "Obligatoire"
                    : "Required"
                }
                value={appliquantAge}
                onChange={(e) => SetAppliquantAge(e.target.value)}
                label={
                  sessionStorage.getItem("language") === "fr" ? "Age" : "Age"
                }
              />
              <FormControl variant="outlined" color="success" focused>
                <InputLabel
                  variant="outlined"
                  color="success"
                  size="small"
                  InputLabelProps={{ style: { color: "black" } }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "address"
                    : "address"}
                </InputLabel>
                <OutlinedInput
                  color="success"
                  size="small"
                  variant="outlined"
                  type="text"
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "address"
                      : "address"
                  }
                  multiline
                  rows={1}
                  value={adress}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "address"
                      : "address"
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
              <FormControl variant="outlined" color="success" focused>
                <Autocomplete
                  size="small"
                  focused
                  fullWidth
                  variant="outlined"
                  color="success"
                  limitTags={1}
                  options={[{ label: "Yes" }, { label: "No" }]}
                  value={haveCar}
                  onChange={(event, newValue) => {
                    sethaveCar(newValue);
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
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
                      label="Have a Car*"
                      size="small"
                      focused
                      variant="outlined"
                      color="success"
                      placeholder={
                        sessionStorage.getItem("language") === "fr"
                          ? "You have a car"
                          : "You have a car"
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
                  fullWidth
                  variant="outlined"
                  color="success"
                  limitTags={1}
                  options={[{ label: "Yes" }, { label: "No" }]}
                  value={permit}
                  onChange={(event, newValue) => {
                    setPermit(newValue);
                  }}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
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
                      label="Have a driving license*"
                      size="small"
                      focused
                      variant="outlined"
                      color="success"
                      placeholder={
                        sessionStorage.getItem("language") === "fr"
                          ? "You a driving license"
                          : "You a driving license"
                      }
                      inputProps={{
                        ...params.inputProps,
                        // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              // onSubmit={() => ()}
              sx={{
                px: 2,
                paddingLeft: 3,
                background: "#0000",
                "& > :not(style)": { mx: 2, width: "90%" },
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
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleApplyMission();
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
              handleCloseApplymission();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      <ModaladdnewMission open={openModel} setOpen={setOpenModel} />
      <div style={{ position: "relative" }}>
        <Card
          sx={{
            height: "220px",
            alignSelf: "stretch",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            // image={coverProfile}
            image={data?.banner_image}
          />
        </Card>
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "94%",
            top: "65%",
            left: "3%",
            paddingX: "1%",
            paddingTop: "0.5%",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "",
          }}
        >
          <img
            src={data?.profile_image}
            // src={imageProfile}
            style={{
              width: "200px",
              borderRadius: "100%",
              height: "130px",
              padding: "10px 40px",
              alignItems: "flex-start",
              gap: "10px",
            }}
          />
          <div style={{ width: "100%", paddingTop: "6%" }}>
            <div
              style={{
                width: "98%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "3%",
                  flexGrow: 1,
                }}
              >
                <>
                  {data?.name} <StarIcon sx={{ color: "#FFD700" }} />
                </>
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Grid container spacing={2} sx={{ marginX: "2.5%", width: "94.5%" }}>
        <Grid item xs={12} sx={{ display: "flex", justifyItems: "center" }}>
          <AntTabs value={value} onChange={handleChange}>
            <AntTab label="Posts" {...a11yProps(0)} />
            <AntTab label="Missions" {...a11yProps(1)} />
            <AntTab label="Photos" {...a11yProps(2)} />
            <AntTab label="Video" {...a11yProps(3)} />
            <AntTab label="Metaverse" {...a11yProps(4)} />
          </AntTabs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} sx={{ marginX: "2.5%", width: "94.5%" }}>
        <Grid item xs={4} sx={{}}>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingX: "2%",
                }}
              >
                <DateCalendarServerRequest />
              </Box>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ backgroundColor: "#FFFF", borderRadius: "10px" }}
            >
              {" "}
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingX: "5%",
                }}
              >
                <Divider textAlign="left" sx={{ color: "#08089C" }}>
                  Home Address.
                </Divider>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <LocationOnIcon sx={{ padding: "1%", color: "#08089C" }} />{" "} */}
                  <Typography gutterBottom variant="body2" component="div">
                    {" "}
                    {data?.siege}
                  </Typography>
                </div>
                <br />
                <Divider textAlign="left" sx={{ color: "#08089C" }}>
                  Overview.
                </Divider>
                <div
                  style={{
                    paddingX: "2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    {data?.description}
                  </Typography>
                </div>
                <br />
                <Divider textAlign="left" sx={{ color: "#08089C" }}>
                  Online networking.
                </Divider>
                <br />
                <div
                  style={{
                    paddingX: "2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <IconButton>
                      <FacebookIcon
                      // onClick={() =>
                      //    console.log(fb_link)
                      //    window.open(fb_link, "_blank")
                      // }
                      />
                    </IconButton>
                    {/* <XIcon/> */}
                    <IconButton>
                      <TwitterIcon
                      // onClick={() => window.open(x_link, "_blank")}
                      />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon
                      // onClick={() => window.open(instagram_link, "_blank")}
                      />
                    </IconButton>
                    <IconButton>
                      <YouTubeIcon
                      // onClick={() => window.open(y_link, "_blank")}
                      />
                    </IconButton>
                  </Stack>
                </div>
                <br />
                <Divider textAlign="left" sx={{ color: "#08089C" }}>
                  SDG's.
                </Divider>
                <div
                  style={{
                    paddingX: "2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {sdg?.map((item, index) => {
                      return (
                        <Tooltip
                          title={`${item?.goal}.${item.short}`}
                          placement="left-start"
                        >
                          <IconButton>
                            <img
                              style={{
                                width: "auto",
                                height: "30px",
                              }}
                              src={item?.icon_url}
                              alt="webscript"
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    })}
                  </Stack>
                </div>
                <br />
                <Divider textAlign="left" sx={{ color: "#08089C" }}>
                  Activities.
                </Divider>
                <div
                  style={{
                    paddingX: "2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {data?.activity?.map((item, index) => {
                      return (
                        <Tooltip
                          title={`${item?.label}`}
                          placement="left-start"
                        >
                          <IconButton>
                            <img
                              style={{
                                width: "auto",
                                height: "30px",
                              }}
                              src={get_icon_activity(item?.label)}
                              alt="webscript"
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    })}
                  </Stack>
                </div>
                <br />
              </Box>
            </Grid>
          </Grid>
          <br />
          {/* <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ backgroundColor: "#FFFF", borderRadius: "10px" }}
            >
              <Box sx={{ borderRadius: "10px" }}>
                <ListImage itemData={itemData} />
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            justify="center"
            spacing={1}
            sx={{ backgroundColor: "#FFFF", borderRadius: "10px" }}
          >
            <Grid item xs={12} sx={{ borderRadius: "10px" }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "rows",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CircularProgress
                          color="success"
                          disableShrink
                          sx={{
                            animationDuration: "550ms",
                          }}
                          size={60}
                          thickness={2}
                        />
                      </div>
                    }
                  >
                    <Grid container spacing={0.5}>
                      {data?.user_id === sessionStorage.getItem("user_Id") ? (
                        <>
                          {" "}
                          <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyItems: "center" }}
                          >
                            <Box
                              sx={{
                                marginLeft: "0%",
                                marginBottom: "5px",
                                display: "flex",
                                width: "99%",
                                flexDirection: "rows",
                                alignItems: "rows",
                                paddingY: "0.5%",
                              }}
                            >
                              <img
                                // src={
                                //   "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg"
                                // }
                                src={data?.profile_image}
                                style={{
                                  width: "130px",
                                  borderRadius: "100%",
                                  height: "70px",
                                  padding: "10px 40px",
                                  alignItems: "flex-start",
                                  gap: "10px",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  width: "90%",
                                  height: "100px",
                                  // justifyContent: "center",
                                  // alignItems: "center",
                                  backgroundColor: "#FFFF",
                                  flexDirection: "row",
                                }}
                              >
                                <FormControl
                                  variant="outlined"
                                  color="success"
                                  fullWidth
                                  focused
                                >
                                  <InputLabel
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                    InputLabelProps={{
                                      style: {
                                        fontStyle: "italic",
                                        fontSize: 15,
                                      },
                                    }}
                                  >
                                    {sessionStorage.getItem("language") === "fr"
                                      ? "Add New Post"
                                      : "Add New Post"}
                                  </InputLabel>
                                  <OutlinedInput
                                    color="success"
                                    id="Password"
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    rows={4}
                                    onChange={(e) => {
                                      setPost(e.target.value);
                                    }}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <input
                                          accept="image/*,video/*,.pdf"
                                          style={{ display: "none" }}
                                          id="image-upload"
                                          type="file"
                                          onChange={handlenewPostImage}
                                        />
                                        <label htmlFor="image-upload">
                                          <Button
                                            variant="contained"
                                            color="success"
                                            sx={{
                                              backgroundColor: "success",
                                              minWidth: "0%",
                                              borderRadius: "20px",
                                              color: "#fff",
                                            }}
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                          >
                                            Media
                                          </Button>
                                        </label>
                                      </InputAdornment>
                                    }
                                    InputLabelProps={{
                                      style: {
                                        fontStyle: "italic",
                                        fontSize: 15,
                                      },
                                    }}
                                    label={
                                      sessionStorage.getItem("language") ===
                                      "fr"
                                        ? "Add New Post"
                                        : "Add New Post"
                                    }
                                  />
                                </FormControl>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#FFFF",
                                  marginLeft: "2%",
                                  marginBottom: "1%",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{
                                    backgroundColor: "success",
                                    minWidth: "25%",
                                    borderRadius: "20px",
                                    color: "#fff",
                                  }}
                                  onClick={call_api_add_post}
                                >
                                  Post
                                </Button>
                              </div>
                            </Box>
                          </Grid>{" "}
                          <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyItems: "center" }}
                          >
                            {" "}
                            <Box
                              sx={{
                                display: "flex",
                                justifyItems: "center",
                                paddingY: "2%",
                                paddingX: "15%",
                              }}
                            >
                              <div style={{ position: "relative" }}>
                                {selectedPostImage &&
                                  (isPDF(selectedPostImage) === true ? (
                                    <>{console.log(selectedPostImage)}</>
                                  ) : (
                                    <>
                                      <img
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          borderRadius: "20%",
                                        }}
                                        src={URL.createObjectURL(
                                          selectedPostImage
                                        )}
                                        alt="Uploaded"
                                      />
                                      <CancelIcon
                                        style={{
                                          position: "absolute",
                                          top: "-5",
                                          right: "-5",
                                          color: "#556B2F",
                                        }}
                                        onClick={() => {
                                          setSelectedPostImage(null);
                                        }}
                                      />
                                    </>
                                  ))}
                              </div>
                            </Box>{" "}
                          </Grid>
                          <br />
                          <Divider
                            variant="middle"
                            sx={{ width: "99%", marginTop: "20px" }}
                          ></Divider>
                        </>
                      ) : (
                        <></>
                      )}

                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyItems: "center" }}
                      ></Grid>
                      {inProgress ? (
                        <>
                          <Card
                            style={{
                              borderRadius: "0px",
                              marginTop: "10px",
                              padding: "20px",
                              display: "flex",
                              width: "99%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress
                              color="success"
                              disableShrink
                              sx={{
                                animationDuration: "550ms",
                              }}
                              size={60}
                              thickness={2}
                            />
                          </Card>
                        </>
                      ) : posts?.length === 0 ? (
                        <>
                          <Card
                            style={{
                              borderRadius: "0px",
                              marginTop: "10px",
                              padding: "20px",
                              display: "flex",
                              width: "99%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            There is no Posts for this association.
                          </Card>
                        </>
                      ) : (
                        posts.map((item, key) => {
                          return (
                            <>
                              <Grid
                                item
                                xs={12}
                                sx={{ display: "flex", justifyItems: "center" }}
                              >
                                <Divider
                                  textAlign="left"
                                  sx={{ color: "#08089C" }}
                                ></Divider>
                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "99%",
                                    flexDirection: "rows",
                                    alignItems: "rows",
                                    paddingTop: "0.5%",
                                  }}
                                >
                                  <img
                                    // src={
                                    //   "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg"
                                    // }
                                    src={data?.profile_image}
                                    style={{
                                      width: "150px",
                                      borderRadius: "100%",
                                      height: "90px",
                                      padding: "10px 40px",
                                      alignItems: "flex-start",
                                      gap: "10px",
                                    }}
                                  />
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "30px",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      variant="subtitle1"
                                      component="div"
                                      style={{
                                        paddingTop: "2%",
                                      }}
                                    >
                                      {data?.name}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      color="text.secondary"
                                      sx={{ paddingLeft: "0%" }}
                                    >
                                      {format(
                                        new Date(item?.created_on),
                                        "dd/MM/yyyy HH:mm"
                                      )}
                                    </Typography>
                                  </div>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{ display: "flex", justifyItems: "center" }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "99%",
                                    height: "auto",
                                    padding: "0px 40px",
                                    backgroundColor: "#FFFF",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    justifyItems: "center",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="body2"
                                    component="div"
                                    style={{
                                      paddingLeft: "10%",
                                    }}
                                  >
                                    {item?.description}
                                  </Typography>
                                  {/* <ListImage itemData={itemData} /> */}
                                  <Grid
                                    item
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      paddingX: "20%",
                                      flexDirection: "column",
                                      gap: "24px",
                                      alignSelf: "stretch",
                                      // background: "#F1FBEC",
                                    }}
                                  >
                                    {item?.links.length !== 0 && (
                                      <ImageList
                                        sx={{ width: "100%", height: "auto" }}
                                        cols={2}
                                        rowHeight={"20%"}
                                      >
                                        {item?.links
                                          ?.reverse()
                                          ?.map((i, index) => (
                                            <ImageListItem key={index}>
                                              <img
                                                srcSet={`${i}`}
                                                src={`${i}`}
                                                width={"5%"}
                                                height={"auto"}
                                                alt="image"
                                                loading="lazy"
                                              />
                                            </ImageListItem>
                                          ))}
                                      </ImageList>
                                    )}
                                  </Grid>
                                </Box>
                              </Grid>
                            </>
                          );
                        })
                      )}
                    </Grid>
                  </Suspense>
                </TabPanel>
                <TabPanel
                  id="missions"
                  value={value}
                  index={1}
                  dir={theme.direction}
                >
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CircularProgress
                          color="success"
                          disableShrink
                          sx={{
                            animationDuration: "550ms",
                          }}
                          size={60}
                          thickness={2}
                        />
                      </div>
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "98%",
                      }}
                    >
                      {data?.user_id === sessionStorage.getItem("user_Id") ? (
                        <Button onClick={() => handleOpenModel()}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#08089C",
                            }}
                          >
                            <AddBusinessIcon sx={{ color: "#08089C" }} />
                            {"  "} &emsp;Ajouter une nouvelle mission
                          </Typography>
                        </Button>
                      ) : (
                        <></>
                      )}
                      <br />
                      <Divider></Divider>
                      {missions?.length === 0 || missions === null ? (
                        <>there is no missions for this associations</>
                      ) : (
                        <>
                          {missions?.map((item, index) => {
                            return (
                              <Card
                                key={index}
                                sx={{
                                  backgroundColor: "#F2F2F2",
                                  margin: "2%",
                                  width: "100%",
                                }}
                              >
                                <CardContent>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      sx={{ flexGrow: 1 }}
                                    >
                                      Mission {index + 1}
                                    </Typography>
                                    {data?.user_id ===
                                    sessionStorage.getItem("user_Id") ? (
                                      <LongMenu
                                        idMission={item?.id}
                                        mission={item}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </Box>
                                  <br />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {item?.description}
                                  </Typography>
                                  <Box
                                    sx={{
                                      marginTop: "1%",
                                      alignItems: "center",
                                      display: "flex",
                                      color: "#08089C",
                                      width: "100%",
                                    }}
                                  >
                                    <CalendarMonthIcon
                                      sx={{ marginRight: "1%" }}
                                    />
                                    <Typography sx={{ marginRight: "2%" }}>
                                      {format(
                                        new Date(item?.start_date),
                                        "dd/MM/yyyy"
                                      )}
                                    </Typography>
                                    <Chip
                                      variant="contained"
                                      color="success"
                                      // disabled={handleAdd()}
                                      sx={{
                                        color: "#08089C",
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF",
                                        margin: "0.5%",
                                      }}
                                      label={`Duration: ${item?.duration?.label}`}
                                    ></Chip>
                                    <Chip
                                      variant="contained"
                                      color="success"
                                      // disabled={handleAdd()}
                                      sx={{
                                        color: "#08089C",
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF",
                                        margin: "0.5%",
                                      }}
                                      label={`Type of mission: ${item?.mission_type?.label}`}
                                    ></Chip>
                                    <Chip
                                      variant="contained"
                                      color="success"
                                      // disabled={handleAdd()}
                                      sx={{
                                        color: "#08089C",
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF",
                                        margin: "0.5%",
                                      }}
                                      label={`Volunteer qualifications: ${item?.volunteer_qualifications?.label}`}
                                    ></Chip>

                                    {/* <LocationOnIcon sx={{ marginLeft: "5%" }} />
                                <Typography>{address}</Typography> */}
                                  </Box>
                                  <Box
                                    sx={{
                                      marginTop: "1%",
                                      alignItems: "center",
                                      display: "flex",
                                      color: "#08089C",
                                    }}
                                  >
                                    <Chip
                                      variant="contained"
                                      color="success"
                                      // disabled={handleAdd()}
                                      sx={{
                                        color: "#08089C",
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF",
                                        margin: "0.5%",
                                      }}
                                      label={`demanded Participants: ${item?.number_of_participants}`}
                                    ></Chip>
                                    <Chip
                                      variant="contained"
                                      color="success"
                                      // disabled={handleAdd()}
                                      sx={{
                                        color: "#08089C",
                                        borderRadius: "20px",
                                        backgroundColor: "#FFF",
                                        margin: "0.5%",
                                      }}
                                      label={`Approved Participants: ${item?.approved_applications}`}
                                    ></Chip>

                                    {/* <LocationOnIcon sx={{ marginLeft: "5%" }} />
                                <Typography>{address}</Typography> */}
                                  </Box>
                                </CardContent>
                                <CardActions
                                  sx={{ flexDirection: "row-reverse" }}
                                >
                                  <Button
                                    variant="contained"
                                    // disabled={handleAdd()}
                                    sx={{
                                      color: "#556B2F",
                                      borderRadius: "20px",
                                      backgroundColor: "#FFF",
                                      margin: "2%",
                                    }}
                                    onClick={() => {
                                      handleopenApplyMission();
                                      setIdMission(item?.id);
                                    }}
                                  >
                                    Apply
                                  </Button>
                                  <Chip
                                    variant="contained"
                                    color="success"
                                    // disabled={handleAdd()}
                                    sx={styleValidate}
                                    label="Open application"
                                  ></Chip>
                                </CardActions>
                              </Card>
                            );
                          })}
                        </>
                      )}
                    </Box>
                  </Suspense>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CircularProgress
                          color="success"
                          disableShrink
                          sx={{
                            animationDuration: "550ms",
                          }}
                          size={60}
                          thickness={2}
                        />
                      </div>
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button onClick={() => handleOpennewImage()}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#08089C",
                          }}
                        >
                          <AddBusinessIcon sx={{ color: "#08089C" }} />
                          {"  "} &emsp;Ajouter Nouveau Photo
                        </Typography>
                      </Button>

                      <ListImage itemData={itemData} />
                    </Box>
                  </Suspense>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CircularProgress
                          color="success"
                          disableShrink
                          sx={{
                            animationDuration: "550ms",
                          }}
                          size={60}
                          thickness={2}
                        />
                      </div>
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button onClick={() => handleOpennewImage()}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#08089C",
                          }}
                        >
                          <AddBusinessIcon sx={{ color: "#08089C" }} />
                          {"  "} &emsp;Ajouter Nouveau video
                        </Typography>
                      </Button>
                      <ListVideo itemData={itemData} />
                    </Box>
                  </Suspense>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CircularProgress
                          color="success"
                          disableShrink
                          sx={{
                            animationDuration: "550ms",
                          }}
                          size={60}
                          thickness={2}
                        />
                      </div>
                    }
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AddBusinessIcon sx={{ color: "#08089C" }} />
                      {"  "} &emsp;Metaverse
                    </Typography>
                  </Suspense>
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="absolute">
              <Collapse in={openPostCreated}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenPostCreated(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "un nouveau post a été crée"
                    : "Post created successfully"}
                </Alert>
              </Collapse>
              <Collapse in={openMissionCreated}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenMissionCreated(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "une mission a été crée"
                    : "mission created successfully"}
                </Alert>
              </Collapse>
            </div>
    </div>
  );
}

const options = ["Update Mission", "Delete Mission", "Applications"];

const ITEM_HEIGHT = 48;

const LongMenu = (idMission) => {
  const dispatch = useDispatch();
  const date = new Date();
  const [startDate, setStartDate] = useState(date);
  const [desc, setDesc] = useState("");
  const [missionDuration, setMissionDuration] = useState();
  const [typeMission, setTypeMission] = useState();
  const [NumVolunteers, setNumVolunteers] = useState();
  const [typeVolunteers, setTypeVolunteers] = useState();
  const applications = useSelector(
    (state) => state.AssociationReducer?.applications
  );
  const [Name, setName] = useState("");
  const [Rna, setRna] = useState("");
  const missions = useSelector((state) => state.AssociationReducer?.missions);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  // update mission
  const [openUpdateMission, setOpenUpdateMission] = useState();
  const handleOpenUpdateMission = () => {
    setOpenUpdateMission(true);
  };
  const handleCloseUpdateMission = () => {
    setOpenUpdateMission(false);
  };
  // delete mission
  const [openDeleteMission, setOpenDeleteMission] = useState();
  const handleOpenDeleteMission = () => {
    setOpenDeleteMission(true);
  };
  const handleCloseDeleteMission = () => {
    setOpenDeleteMission(false);
  };
  function orderByDate(array) {
    // Convert object to array of key-value pairs
    array.sort((a, b) => {
      const dateA = new Date(a.created_on);
      const dateB = new Date(b.created_on);
      return dateB - dateA;
    });

    return array;
  }
  const call_api_get_all_missions = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "mission/")
      .then((value) => {
        console.log("Missions", value.data);
        dispatch({
          type: "Missions",
          missions: orderByDate(value?.data),
        });
      })
      .catch((err) => {
        dispatch({
          type: "Missions",
          posts: [],
        });
      });
  };
  const [applicationsByMission, setApplicationByMission] = useState([]);
  const call_api_get_all_applications = () => {
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "mission/applications/" +
          idMission?.idMission
      )
      .then((value) => {
        dispatch({
          type: "Applications",
          applications: value?.data,
        });
        setApplicationByMission(value?.data);
      })
      .catch((err) => {});
  };
  const handledeleteMission = () => {
    axios
      .delete(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "mission/" +
          idMission?.idMission
      )
      .then((value) => {
        call_api_get_all_missions();
        handleCloseDeleteMission();
      })
      .catch((err) => {});
  };
  const [openApplications, setOpenApplications] = useState();
  const handleOpenApplications = () => {
    setOpenApplications(true);
  };
  const handleCloseApplications = () => {
    setOpenApplications(false);
  };
  const [count, setCount] = useState(0)
  useEffect(() => {
    call_api_get_all_applications();
  }, [count]);


  const handleApprouveApplication = (object) => {
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "mission/application/" +
          object?.id,
        object
      )
      .then((value) => {
        call_api_get_all_applications();
        setCount(count+1)
      })
      .catch((err) => {});
  };

  return (
    <div>
      <ModalUpdateMission
        open={openUpdateMission}
        setOpen={setOpenUpdateMission}
        idMission={idMission}
      />
      {/* delete mission */}
      <Dialog
        open={openDeleteMission}
        onClose={() => {
          handleCloseDeleteMission();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <div className="border"></div>
        <br></br>
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Delete Mission"
            : "Delete Mission"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseDeleteMission();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" alignItems="center" spacing={2}>
              Are you shure you want to delete this mission!
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handledeleteMission();
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
              handleCloseDeleteMission();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* appliications */}
      <Dialog
        open={openApplications}
        onClose={() => {
          handleCloseApplications();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <div className="border"></div>
        <br></br>
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Applications"
            : "Applications"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseApplications();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              spacing={0}
              height="450px" // fixed the height
              style={{
                overflow: "scroll",
                overflowY: "scroll",
              }}
            >
              {applicationsByMission?.length === 0 || applicationsByMission === null ? (
                <>there is no application for this mission</>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Chip
                        label={`Pending applications : ${
                          applicationsByMission?.filter(
                            (item) => item.status === "Pending"
                          )?.length
                        }`}
                        sx={{
                          backgroundColor: "red",
                          color: "#FFF",
                          marginRight: "1%",
                        }}
                      />
                      <Chip
                        label={`Total applications : ${applicationsByMission?.length}`}
                        sx={{ backgroundColor: "#08089C", color: "#FFF" }}
                      />
                    </Box>
                  </Grid>
                  {applicationsByMission?.map((item, index) => {
                    return (
                      <Grid key={index} item xs={12}>
                        <Card
                          key={index}
                          sx={{
                            backgroundColor: "#F2F2F2",
                            margin: "2%",
                            width: "100%",
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1 }}
                              >
                                Application {index + 1} : {item?.first_name}{" "}
                                {item?.surname}
                              </Typography>
                            </Box>
                            <br />
                            <Typography variant="body2" color="text.secondary">
                              {item?.interests}
                            </Typography>
                            <Box
                              sx={{
                                marginTop: "1%",
                                alignItems: "center",
                                display: "flex",
                                color: "#08089C",
                                width: "100%",
                              }}
                            >
                              <LocationOnIcon sx={{ marginLeft: "2%" }} />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item?.address}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                marginTop: "1%",
                                alignItems: "center",
                                display: "flex",
                                color: "#08089C",
                                width: "100%",
                              }}
                            >
                              <Chip
                                variant="contained"
                                color="success"
                                // disabled={handleAdd()}
                                sx={{
                                  color: "#08089C",
                                  borderRadius: "20px",
                                  backgroundColor: "#FFF",
                                  margin: "0.5%",
                                }}
                                label={`Age: ${item?.age}`}
                              ></Chip>
                              <Chip
                                variant="contained"
                                color="success"
                                // disabled={handleAdd()}
                                sx={{
                                  color: "#08089C",
                                  borderRadius: "20px",
                                  backgroundColor: "#FFF",
                                  margin: "0.5%",
                                }}
                                label={`Have a Car !: ${
                                  item?.has_a_car ? "Yes" : "No"
                                }`}
                              ></Chip>
                              <Chip
                                variant="contained"
                                color="success"
                                // disabled={handleAdd()}
                                sx={{
                                  color: "#08089C",
                                  borderRadius: "20px",
                                  backgroundColor: "#FFF",
                                  margin: "0.5%",
                                }}
                                label={`Have a Permit !: ${
                                  item?.permit ? "Yes" : "No"
                                }`}
                              ></Chip>
                              {/* <CalendarMonthIcon sx={{ marginRight: "1%" }} />
                                <Typography sx={{ marginRight: "2%" }}>
                                  {format(
                                    new Date(item?.start_date),
                                    "dd/MM/yyyy"
                                  )}
                                </Typography>
                                <Chip
                                  variant="contained"
                                  color="success"
                                  // disabled={handleAdd()}
                                  sx={{
                                    color: "#08089C",
                                    borderRadius: "20px",
                                    backgroundColor: "#FFF",
                                    margin: "0.5%",
                                  }}
                                  label={`Duration: ${item?.duration}`}
                                ></Chip>
                                <Chip
                                  variant="contained"
                                  color="success"
                                  // disabled={handleAdd()}
                                  sx={{
                                    color: "#08089C",
                                    borderRadius: "20px",
                                    backgroundColor: "#FFF",
                                    margin: "0.5%",
                                  }}
                                  label={`Type of mission: ${item?.mission_type}`}
                                ></Chip>
                                <Chip
                                  variant="contained"
                                  color="success"
                                  // disabled={handleAdd()}
                                  sx={{
                                    color: "#08089C",
                                    borderRadius: "20px",
                                    backgroundColor: "#FFF",
                                    margin: "0.5%",
                                  }}
                                  label={`Volunteer qualifications: ${item?.volunteer_qualifications?.label}`}
                                ></Chip>  */}

                              {/* 
                              </Box>
                              <Box
                                sx={{
                                  marginTop: "1%",
                                  alignItems: "center",
                                  display: "flex",
                                  color: "#08089C",
                                }}
                              >
                                <Chip
                                  variant="contained"
                                  color="success"
                                  // disabled={handleAdd()}
                                  sx={{
                                    color: "#08089C",
                                    borderRadius: "20px",
                                    backgroundColor: "#FFF",
                                    margin: "0.5%",
                                  }}
                                  label={`demanded Participants: ${item?.number_of_participants}`}
                                ></Chip>
                                <Chip
                                  variant="contained"
                                  color="success"
                                  // disabled={handleAdd()}
                                  sx={{
                                    color: "#08089C",
                                    borderRadius: "20px",
                                    backgroundColor: "#FFF",
                                    margin: "0.5%",
                                  }}
                                  label={`Approved Participants: ${item?.approved_applications}`}
                                ></Chip>

                                {/* <LocationOnIcon sx={{ marginLeft: "5%" }} />
                                <Typography>{address}</Typography> */}
                            </Box>
                          </CardContent>
                          <CardActions sx={{ flexDirection: "row-reverse" }}>
                            <Button
                              variant="contained"
                              // disabled={handleAdd()}
                              sx={{
                                color: "#556B2F",
                                borderRadius: "20px",
                                backgroundColor: "#FFF",
                                margin: "2%",
                              }}
                              disabled={item?.status !== "Pending"}
                              onClick={() => {
                                // handleopenApplyMission();
                                // setIdMission(item?.id);
                                handleApprouveApplication(item);
                              }}
                            >
                              Approuve
                            </Button>
                            <Chip
                              variant="contained"
                              color="success"
                              // disabled={handleAdd()}
                              sx={{
                                background:
                                  item?.status !== "Pending"
                                    ? "linear-gradient(180deg, rgba(190, 255, 157, 0.00) 0%, #9FFF6F 10%)"
                                    : "yellow",
                                color: "#556B2F",
                                borderRadius: "20px",
                              }}
                              label={`${item?.status}`}
                            ></Chip>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handledeleteMission();
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
              handleCloseApplications();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl1}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleOpenUpdateMission}>Update Mission</MenuItem>
        <MenuItem onClick={handleOpenDeleteMission}>Delete Mission</MenuItem>
        <MenuItem onClick={handleOpenApplications}>
          <ListItemText>Applications</ListItemText>
          {applicationsByMission?.filter((item) => item.status === "Pending")
            ?.length > 0 ? (
            <div
              style={{
                display: "flex",
                marginLeft: "5px",
                justifyContent: "center",
                borderRadius: "100%",
                color: "white",
                width: "20px",
                backgroundColor: "red",
              }}
            >
              {" "}
              {
                applicationsByMission?.filter(
                  (item) => item.status === "Pending"
                )?.length
              }
            </div>
          ) : (
            <></>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Button, Stack, FormControl, Chip, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import format from "date-fns/format";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import TurnRightOutlinedIcon from "@mui/icons-material/TurnRightOutlined";
import BikeMarker from "../Map/MarkerBike";
import img from "../../Asset/rose.png";
import CardMedia from "@mui/material/CardMedia";
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
import axios from "axios";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FavouriteAssociation from "../Card/CardFavouriteAssociation";
import ListImage from "../Product/listImage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import { InputLabel, OutlinedInput } from "@mui/material";
import Popper from "@mui/material/Popper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import ModaladdnewMission from "./addNewMission";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

export default function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [inProgressFeeds, setInprogressFeeds] = useState(true);
  const [inProgressMissions, setInprogressMissions] = useState(true);
  const [value, setValue] = React.useState(0);
  const [feed, setfeed] = useState([]);
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const coverProfile = useSelector(
    (state) => state.FileUploadReducer?.coverProfile
  );
  const missions = useSelector((state) => state.AssociationReducer?.missions);
  const firstname = useSelector((state) => state.ProfileReducer?.firstname);
  const feeds = useSelector((state) => state.ProfileReducer?.feeds);
  const lastname = useSelector((state) => state.ProfileReducer?.lastname);
  const description = useSelector((state) => state.ProfileReducer?.description);
  const address = useSelector((state) => state.ProfileReducer?.address);
  const sdg = useSelector((state) => state.ProfileReducer?.sdg);
  const goals = useSelector((state) => state.ProfileReducer?.goals);
  const x_link = useSelector((state) => state.ProfileReducer?.x_link);
  const y_link = useSelector((state) => state.ProfileReducer?.y_link);
  const fb_link = useSelector((state) => state.ProfileReducer?.fb_link);
  const instagram_link = useSelector(
    (state) => state.ProfileReducer?.instagram_link
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const Score = useSelector((state) => state.ProfileReducer?.score);
  //associations
  const association = useSelector(
    (state) => state.AssociationReducer?.associations
  );
  const Following = useSelector((state) => state.ProfileReducer?.following);
  const missions_applied_for = useSelector(
    (state) => state.ProfileReducer?.missions_applied_for
  );
  const badges = useSelector((state) => state.ProfileReducer?.badges);
  const handleCoverChange = (e) => {
    const filecover = e.target.files[0];
    setSelectedImage(e.target.files[0]);
    // dispatch({
    //   type: "CoverProfile",
    //   coverProfile: URL.createObjectURL(file)
    // })
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfileImage(e.target.files[0]);
    // dispatch({
    //   type: "CoverProfile",
    //   coverProfile: URL.createObjectURL(file)
    // })
    // handleClose()
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [openChange_profileImage, setOpenChangeProfileImage] = useState();
  const [openChange_profile, setOpenChangeProfile] = useState();
  const [openChange_coverImage, setOpenChangeCoverImage] = useState();

  const handleOpenProfileImage = () => {
    setOpenChangeProfileImage(true);
    handleClose();
  };
  const handleCloseProfileImage = () => {
    setOpenChangeProfileImage(false);
    setSelectedProfileImage(null);
  };

  const handleOpenCoverImage = () => {
    setOpenChangeCoverImage(true);
    handleClose();
  };
  const handleCloseCoverImage = () => {
    setOpenChangeCoverImage(false);
    setSelectedImage(null);
  };
  const handleOpenProfile = () => {
    setOpenChangeProfile(true);
    handleClose();
  };
  const handleCloseProfile = () => {
    setOpenChangeProfile(false);
    handleClose();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    dispatch({
      type: "CoverProfile",
      coverProfile: URL.createObjectURL(file),
    });
    handleClose();
  };

  const update_profile_image = () => {
    var json = new FormData();
    json.append("profile_image", selectedProfileImage);
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/profile/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();
      
      })
      .catch((err) => {});
  };
  const update_banner_image = () => {
    var json = new FormData();
    json.append("banner_image", selectedImage);
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/banner/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();     
      })
      .catch((err) => {});
  };


  const [data, setdata] = useState([]);
  const headers = {
    Authorization: sessionStorage.getItem("acces_token")?.toString(),
  };

  const call_api_get_user_info = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "auth/info", {
        headers,
      })
      .then((value) => {
        setdata(value.data.data);
        dispatch({
          type: "ImageProfile",
          imageProfile: value?.data?.data?.profile_image?.S,
        });
        dispatch({
          type: "CoverProfile",
          coverProfile: value?.data?.data?.banner_image?.S,
        });
        dispatch({
          type: "Description",
          description: value?.data?.data?.description?.S,
        });
        sessionStorage.setItem("user_Id", value.data?.data.id.S);
      })
      .catch((err) => {});
  };

  const [openStepper, setOpenStepper] = useState(false);
  const HandleOpenStepper = () => {
    setOpenStepper(true);
  };
  const HandleCloseOpenStepper = () => {
    setOpenStepper(false);
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

  const call_api_get_feed_by_id = (id, n) => {
    const headers = {
      UserAgent: sessionStorage.getItem("user_Id"),
    };
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "feed/", {
        headers,
      })
      .then((value) => {
        setfeed(orderByDate(value?.data));
        dispatch({
          type: "Feeds",
          feeds: orderByDate(value?.data),
        });
        setInprogressFeeds(false);
      })
      .catch((err) => {
        setInprogressFeeds(false);
      });
  };

  const call_api_get_missions_by_id = (id, n) => {
    const headers = {
      UserAgent: sessionStorage.getItem("user_Id"),
    };
    axios
      .get(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/" +
          sessionStorage.getItem("user_Id") +
          "/missions",
        {
          headers,
        }
      )
      .then((value) => {
        setInprogressMissions(false);
        dispatch({
          type: "Missions_applied_for",
          missions_applied_for: orderByDate(value?.data),
        });
      })
      .catch((err) => {
        setInprogressMissions(false);
      });
  };

  useEffect(() => {
    call_api_get_user_info();
    call_api_get_feed_by_id();
    call_api_get_missions_by_id();
    if (
      !(
        imageProfile !==
          "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp" &&
        coverProfile !== "" &&
        description !== "" &&
        sdg.length !== 0 &&
        fb_link !== null &&
        y_link !== null &&
        instagram_link !== null &&
        x_link !== null
      )
    ) {
      setOpenStepper(true);
    }
  }, []);

  return (
    <div style={{}}>
      <Dialog
        open={openChange_coverImage}
        onClose={() => {
          handleCloseCoverImage();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Change cover image"
            : "Change cover image"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseCoverImage();
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
                onChange={handleCoverChange}
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
                  Upload cover Image
                </Button>
              </label>
              <div style={{ position: "relative" }}>
                {selectedImage && (
                  <>
                    <img
                      style={{
                        width: "300px",
                        height: "100px",
                        borderRadius: "1%",
                      }}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Uploaded"
                    />
                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "-10",
                        right: "-10",
                        color: "#556B2F",
                      }}
                      onClick={() => {
                        setSelectedImage(null);
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
              update_banner_image();
              dispatch({
                type: "CoverProfile",
                coverProfile:  URL.createObjectURL(selectedImage),
              });
              handleCloseCoverImage();
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
              handleClose();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openChange_profileImage}
        onClose={() => {
          handleCloseProfileImage();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Changer la photo de profil"
            : "Changer la photo de profil"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseProfileImage();
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
                onChange={handleProfileImageChange}
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
              <div style={{ position: "relative" }}>
                {selectedProfileImage && (
                  <>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100%",
                      }}
                      src={URL.createObjectURL(selectedProfileImage)}
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
                        setSelectedProfileImage(null);
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
              update_profile_image();
              dispatch({
                type: "ImageProfile",
                imageProfile: URL.createObjectURL(selectedProfileImage),
              });
              handleCloseProfileImage();
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
              handleCloseProfileImage();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* update Profile modal */}
      <Dialog
        open={openChange_profile}
        onClose={() => {
          handleCloseProfile();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Change Profile"
            : "Change Profile"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseProfile();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  fullWidth
                  InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Nom du profile"
                      : "Nom du profile"
                  }
                  value={"Savory Delights Bistro "}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  fullWidth
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Localistation"
                      : "Localistation"
                  }
                  value={"Casablanca, Maroc"}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  fullWidth
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  multiline
                  rows={4}
                  InputLabelProps={{ style: { color: "black" } }}
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
                  value={
                    "Welcome to Savory Delights Bistro, where culinary excellence meets a cozy ambiance. Nestled in the heart of the city, our restaurant is dedicated to crafting unforgettable dining experiences\nAt Savory Delights, we take pride in our commitment to using fresh, locally sourced ingredients to create mouthwatering dishes that cater to diverse tastes. Our chefs are passionate about culinary innovation, blending traditional flavors with a modern twist.\nOur guests love us! Check out what they're saying about Savory Delights on TripAdvisor. Your satisfaction is our top priority, and we appreciate your feedback."
                  }
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  fullWidth
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  // multiline
                  // rows={4}
                  InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr" ? "X" : "X"
                  }
                  value={""}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  focused
                  variant="outlined"
                  color="success"
                  fullWidth
                  // InputProps={{
                  //   className: classes.input,
                  // }}
                  // multiline
                  // rows={4}
                  InputLabelProps={{ style: { color: "black" } }}
                  //error={name.length === 0 ? true : false}
                  placeholder={
                    sessionStorage.getItem("language") === "fr"
                      ? "Obligatoire"
                      : "Required"
                  }
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Instagram"
                      : "Instagram"
                  }
                  value={""}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              
            </Grid>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseProfile();
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
              handleCloseProfile();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Cacher"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* STEPPER  */}
      <Dialog
        open={openStepper}
        onClose={() => {
          HandleCloseOpenStepper();
        }}
        // maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px", // Set your width here
            },
          },
        }}
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Complete your profile"
            : "Complete your profile"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              HandleCloseOpenStepper();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <HorizontalNonLinearStepper />
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button
            onClick={() => {
              HandleCloseOpenStepper();
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
              HandleCloseOpenStepper();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Skip" : "Skip"}
          </Button>
        </DialogActions> */}
      </Dialog>
      <div style={{ position: "relative" }}>
        <Card
          sx={{
            height: "250px",
            alignSelf: "stretch",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia component="img" height="100%" image={coverProfile} />
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
            backgroundColor: "white",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "",
          }}
        >
          <img
            //   src={require("../../Asset/market.png")}
            src={imageProfile}
            style={{
              width: "auto",
              borderRadius: "100%",
              height: "120px",
              padding: "10px 50px",
              alignItems: "flex-start",
              gap: "10px",
            }}
          />
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "98%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{
                  paddingLeft: "0%",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "3%",
                }}
              >
                <>
                  {firstname} {lastname} {Score}{" "}
                  <StarIcon sx={{ color: "#FFD700" }} />
                </>
              </Typography>
              <div>
                {" "}
                <div>
                  <Button
                    id="basic-button"
                    variant="contained"
                    endIcon={<SettingsIcon />}
                    sx={{
                      background: "#fff",
                      minWidth: "20%",
                      borderRadius: "5px",
                      color: "#08089C",
                    }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Modifier le profil
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleOpenProfileImage}>
                      <Typography gutterBottom variant="body2" component="div">
                        Modifier la photo de profil
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleOpenCoverImage}>
                      <Typography gutterBottom variant="body2" component="div">
                        Modifier la photo de coverture
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        // history.push("/settings");
                        handleOpenProfile();
                      }}
                    >
                      {" "}
                      <Typography gutterBottom variant="body2" component="div">
                        Modifier votre Profil
                      </Typography>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>

            <AntTabs value={value} onChange={handleChange}>
              <AntTab label="News Feed" {...a11yProps(0)} />
              <AntTab label="Associations" {...a11yProps(1)} />
              <AntTab label="Missions" {...a11yProps(2)} />
              <AntTab label="Badges" {...a11yProps(3)} />
            </AntTabs>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Grid container spacing={2} sx={{ marginX: "2.5%", width: "94.5%" }}>
        <Grid item xs={4} sx={{ display: "flex", justifyItems: "center" }}>
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
                  Home Adresse.
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
                    {address}
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
                    {description}
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
                        onClick={() =>
                          // console.log(fb_link)
                          window.open(fb_link, "_blank")
                        }
                      />
                    </IconButton>
                    {/* <XIcon/> */}
                    <IconButton>
                      <TwitterIcon
                        onClick={() => window.open(x_link, "_blank")}
                      />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon
                        onClick={() => window.open(instagram_link, "_blank")}
                      />
                    </IconButton>
                    <IconButton>
                      <YouTubeIcon
                        onClick={() => window.open(y_link, "_blank")}
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
                          <IconButton
                          // onClick={() => {
                          //   setgoal(item?.goal);
                          //   console.log(
                          //     "sdg",
                          //     handleSelectedGoals(selectedGoals, item?.short)
                          //   );
                          // }}
                          >
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
              </Box>
            </Grid>
          </Grid>
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
                    {inProgressFeeds ? (
                      <>
                        <Card
                          style={{
                            borderRadius: "0px",
                            marginTop: "10px",
                            padding: "20px",
                            display: "flex",
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
                    ) : feeds.length !== 0 ? (
                      <Grid
                        container
                        spacing={0}
                        height="450px" // fixed the height
                        style={{
                          overflow: "scroll",
                          overflowY: "scroll",
                        }}
                      >
                        {feeds?.map((item, index) => {
                          return (
                            <>
                              {item?.creator_id !== null &&
                                item?.creator_id !== undefined && (
                                  <Feeds item={item} key={index} />
                                )}
                              <br />
                            </>
                          );
                        })}
                        <br />
                      </Grid>
                    ) : (
                      <Card
                        style={{
                          borderRadius: "0px",
                          marginTop: "10px",
                          padding: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Follow association to get news feeds
                      </Card>
                    )}
                  </Suspense>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
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
                    <Grid
                      container
                      spacing={0}
                      height="450px" // fixed the height
                      style={{
                        overflow: "scroll",
                        overflowY: "scroll",
                      }}
                    >
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Chip
                            label={`Total following : ${Following?.length}`}
                            sx={{ backgroundColor: "#08089C", color: "#FFF" }}
                          />
                        </Box>
                      </Grid>{" "}
                      {Following?.map((item, index) => {
                        return (
                          <>
                            <FavouriteAssociation key={index} item={item} />
                          </>
                        );
                      })}
                    </Grid>
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
                    {inProgressMissions ? (
                      <>
                        <Card
                          style={{
                            borderRadius: "0px",
                            marginTop: "10px",
                            padding: "20px",
                            display: "flex",
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
                    ) : (
                      <Grid
                        container
                        spacing={0}
                        height="450px" // fixed the height
                        style={{
                          overflow: "scroll",
                          overflowY: "scroll",
                        }}
                      >
                        <Grid item xs={12}>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Chip
                              label={`Total mission's : ${missions_applied_for?.length}`}
                              sx={{ backgroundColor: "#08089C", color: "#FFF" }}
                            />
                          </Box>
                        </Grid>{" "}
                        {missions_applied_for?.map((item, index) => {
                          return (
                            <>
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
                                    {/* <LongMenu
                                        idMission={item?.id}
                                        mission={item}
                                      /> */}
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
                                      history.push("/product", "missions");
                                      dispatch({
                                        type: "Id_association",
                                        id_association: item?.creator_id,
                                      });
                                      sessionStorage.setItem('id_mission' , item?.id)
                                    }}
                                  >
                                    checkout
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
                            </>
                          );
                        })}
                      </Grid>
                    )}
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
                    <Grid
                      container
                      spacing={0}
                      height="500px" // fixed the height
                      sx={{ display: "flex", justifyContent: "center"}}
                    >
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            color="success"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#08089C",
                              margin: '2%'
                            }}
                          >
                            Earned Bagdes
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                       
                          <ImageList
                            sx={{ display: "flex", justifyContent: "center", width: "90%", height: "90%" }}
                            cols={badges?.length}
                            rowHeight={400}
                          >
                            {badges !== null &&
                              badges?.map((item) => (
                                <ImageListItem key={item}>
                                  <img
                                    srcSet={`${item}`}
                                    src={`${item}`}
                                    width="50px"
                                    height="50px"
                                    // alt={item.title}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              ))}
                          </ImageList>
                        
                      </Grid>
                    </Grid>
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
                      {"  "} &emsp;Ajouter Nouveau Badge
                    </Typography>
                  </Suspense>
                </TabPanel>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const steps = [
  "Profile image",
  "Banner image",
  "Description",
  "social links",
  "SDG's",
];

function HorizontalNonLinearStepper() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [description_, setDescription] = useState();
  const [fblink, setFblink] = useState("");
  const [instagramLink, setinstagramLink] = useState("");
  const [xLink, setXLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedSdg, setSdgSelected] = useState([]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfileImage(e.target.files[0]);
  };
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedBannerImage(e.target.files[0]);
  };
  const headers = {
    Authorization: sessionStorage.getItem("acces_token")?.toString(),
  };
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const coverProfile = useSelector(
    (state) => state.FileUploadReducer?.coverProfile
  );
  const description = useSelector((state) => state.ProfileReducer?.description);
  const address = useSelector((state) => state.ProfileReducer?.address);
  const sdg = useSelector((state) => state.ProfileReducer?.sdg);
  const goals = useSelector((state) => state.ProfileReducer?.goals);
  const x_link = useSelector((state) => state.ProfileReducer?.x_link);
  const y_link = useSelector((state) => state.ProfileReducer?.y_link);
  const fb_link = useSelector((state) => state.ProfileReducer?.fb_link);
  const instagram_link = useSelector(
    (state) => state.ProfileReducer?.instagram_link
  );

  const call_api_get_user_info = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "auth/info", {
        headers,
      })
      .then((value) => {
        dispatch({
          type: "ImageProfile",
          imageProfile: value?.data?.data?.profile_image?.S,
        });
        dispatch({
          type: "CoverProfile",
          coverProfile: value?.data?.data?.banner_image?.S,
        });
        dispatch({
          type: "Description",
          description: value?.data?.data?.description?.S,
        });
        value?.data?.data?.score?.S === undefined
          ? dispatch({
              type: "Score",
              score: value?.data?.data?.score?.N,
            })
          : dispatch({
              type: "Score",
              score: value?.data?.data?.score?.S,
            });
        dispatch({
          type: "Sdg",
          sdg: value?.data?.data?.sdg?.L,
        });
        dispatch({
          type: "Fb_link",
          fb_link: value?.data?.data?.social_links?.M?.facebook?.S,
        });
        dispatch({
          type: "X_link",
          x_link: value?.data?.data?.social_links?.M?.twitter?.S,
        });
        dispatch({
          type: "Instagram_link",
          instagram_link: value?.data?.data?.social_links?.M?.instagram?.S,
        });
        dispatch({
          type: "Y_link",
          y_link: value?.data?.data?.social_links?.M?.tiktok?.S,
        });
        sessionStorage.setItem("user_Id", value.data?.data.id.S);
      })
      .catch((err) => {});
  };
  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const add_profile_image = () => {
    var json = new FormData();
    json.append("profile_image", selectedProfileImage);
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/profile/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();
        handleComplete();
      })
      .catch((err) => {});
  };
  const add_banner_image = () => {
    var json = new FormData();
    json.append("banner_image", selectedBannerImage);
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/banner/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();
        handleComplete();
      })
      .catch((err) => {});
  };
  const add_description = () => {
    const obj = {
      description: description_,
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/description/" +
          sessionStorage.getItem("user_Id"),
        obj
      )
      .then((value) => {
        call_api_get_user_info();
        handleComplete();
      })
      .catch((err) => {});
  };
  const add_social_links = () => {
    const json = {
      social_links: {
        twitter: xLink,
        instagram: instagramLink,
        facebook: fblink,
        tiktok: youtubeLink,
      },
    };

    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/social/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();
        handleComplete();
      })
      .catch((err) => {});
  };
  const add_selected_sdg = () => {
    const json = {
      sdg: selectedSdg,
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/sdg/" +
          sessionStorage.getItem("user_Id"),
        json
      )
      .then((value) => {
        call_api_get_user_info();
        handleComplete();
      })
      .catch((err) => {});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep !== steps.length &&
            (completed[activeStep] ||
              (imageProfile !==
                "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp" &&
                activeStep + 1 === 1) ||
              (coverProfile !== "" && activeStep + 1 === 2) ||
              (description !== "" && activeStep + 1 === 3) ||
              (sdg.length !== 0 && activeStep + 1 === 5)) ? (
              <>
                {/* <Button
                // sx={{ display: "inline-block" }}
                variant="contained"
                color="success"               
                style={styleCancelDelete}
                disabled
              >
                Step {activeStep + 1} already completed
              </Button> */}
              </>
            ) : (
              <>
                {activeStep + 1 === 1 && (
                  <>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Attaching your profile image will contribute{" "}
                      <span style={{ color: "goldenrod" }}>10 points</span> to
                      your overall score.
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        type="file"
                        onChange={handleProfileImageChange}
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
                      <div style={{ position: "relative" }}>
                        {selectedProfileImage && (
                          <>
                            <img
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "100%",
                              }}
                              src={URL.createObjectURL(selectedProfileImage)}
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
                                setSelectedProfileImage(null);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </Stack>
                  </>
                )}
                {activeStep + 1 === 2 && (
                  <>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Attaching your banner image will contribute{" "}
                      <span style={{ color: "goldenrod" }}>10 points</span> to
                      your overall score.
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload1"
                        type="file"
                        onChange={handleBannerImageChange}
                      />
                      <label htmlFor="image-upload1">
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
                      <div style={{ position: "relative" }}>
                        {selectedBannerImage && (
                          <>
                            <img
                              style={{
                                width: "300px",
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
                                right: "0",
                                color: "#556B2F",
                              }}
                              onClick={() => {
                                setSelectedBannerImage(null);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </Stack>
                  </>
                )}
                {activeStep + 1 === 3 && (
                  <>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Attaching your profile description will contribute{" "}
                      <span style={{ color: "goldenrod" }}>10 points</span> to
                      your overall score.
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <TextField
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        fullWidth
                        multiline
                        rows={4}
                        InputLabelProps={{ style: { color: "black" } }}
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
                        value={description_}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Stack>
                  </>
                )}
                {activeStep + 1 === 4 && (
                  <>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Attaching your profile description will contribute{" "}
                      <span style={{ color: "goldenrod" }}>10 points</span> to
                      your overall score.
                    </Typography>

                    <Box
                      component="form"
                      sx={{
                        p: 1,
                        paddingLeft: 2,
                        background: "#0000",
                        "& > :not(style)": { m: 1, width: "44.2%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        size="small"
                        focused
                        variant="outlined"
                        color="success"
                        type="text"
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
                  </>
                )}
                {activeStep + 1 === 5 && (
                  <>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      Attaching your profile description will contribute{" "}
                      <span style={{ color: "goldenrod" }}>10 points</span> to
                      your overall score.
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <FormControl
                        variant="outlined"
                        color="success"
                        fullWidth
                        focused
                      >
                        <Autocomplete
                          multiple
                          size="small"
                          focused
                          variant="outlined"
                          color="success"
                          fullWidth
                          limitTags={3}
                          options={goals}
                          value={selectedSdg}
                          type="text"
                          onChange={(event, newValue) => {
                            setSdgSelected(newValue);
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
                    </Stack>
                  </>
                )}
              </>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep !== steps.length &&
                (completed[activeStep] ||
                (imageProfile !==
                  "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp" &&
                  activeStep + 1 === 1) ||
                (coverProfile !== "" && activeStep + 1 === 2) ||
                (description !== "" && activeStep + 1 === 3) ||
                (sdg.length !== 0 && activeStep + 1 === 5) ? (
                  <Button
                    // sx={{ display: "inline-block" }}
                    variant="contained"
                    color="success"
                    style={styleCancelDelete}
                    disabled
                  >
                    Step {activeStep + 1} already completed
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (activeStep + 1 === 1) {
                        add_profile_image();
                      } else if (activeStep + 1 === 2) {
                        add_banner_image();
                      } else if (activeStep + 1 === 3) {
                        add_description();
                      } else if (activeStep + 1 === 4) {
                        add_social_links();
                      } else if (activeStep + 1 === 5) {
                        add_selected_sdg();
                      }
                    }}
                    disabled={
                      imageProfile !==
                        "https://cityverse-profilepics.s3.us-east-2.amazonaws.com/profile-images/blank-profile-picture.webp" &&
                      activeStep + 1 === 1
                        ? true
                        : coverProfile !== "" && activeStep + 1 === 2
                        ? true
                        : description !== "" && activeStep + 1 === 3
                        ? true
                        : fb_link !== "" &&
                          fb_link !== undefined &&
                          fb_link !== null &&
                          activeStep + 1 === 4 &&
                          instagram_link !== "" &&
                          instagram_link !== undefined &&
                          instagram_link !== null &&
                          y_link !== "" &&
                          y_link !== undefined &&
                          y_link !== null &&
                          x_link !== "" &&
                          x_link !== undefined &&
                          x_link !== null &&
                          activeStep + 1 === 4
                        ? true
                        : sdg.length !== 0 && activeStep + 1 === 5
                        ? true
                        : false
                    }
                    variant="contained"
                    style={styleCancelDelete}
                    color="success"
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}
                variant="contained"
                style={styleValidate}
                color="success"
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

function Feeds(item, key) {
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const [data, setData] = useState();
  const [comment, setComment] = useState();

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
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      item?.item?.creator_id !== null &&
      item?.item?.creator_id !== undefined
    ) {
      call_api_get_association_by_id(item?.item?.creator_id);
    }
  }, []);
  function orderByDate(array) {
    // Convert object to array of key-value pairs
    array.sort((a, b) => {
      const dateA = new Date(a.created_on);
      const dateB = new Date(b.created_on);
      return dateB - dateA;
    });

    return array;
  }
  const call_api_get_feed_by_id = (id, n) => {
    const headers = {
      UserAgent: sessionStorage.getItem("user_Id"),
    };
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "feed/", {
        headers,
      })
      .then((value) => {
        dispatch({
          type: "Feeds",
          feeds: orderByDate(value?.data),
        });
      })
      .catch((err) => {});
  };

  function addComment(id) {
    const object = {
      text: comment,
    };
    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "feed/" + id,
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  }

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClickE1 = (event) => {
    setAnchorEl1(anchorEl1 ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl1);
  const id = open ? "simple-popper" : undefined;

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClickE2 = (event) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const openE2 = Boolean(anchorEl2);
  const idE2 = openE2 ? "simple-popper" : undefined;

  const emojis = {
    like: "👍",
    love: "❤️",
    haha: "😄",
    wow: "😮",
    sad: "😢",
    angry: "😡",
  };

  const reactions = item?.item?.reactions;

  const like = (id) => {
    const object = {
      type: "like",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const love = (id) => {
    const object = {
      type: "love",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const haha = (id) => {
    const object = {
      type: "haha",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const wow = (id) => {
    const object = {
      type: "wow",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const sad = (id) => {
    const object = {
      type: "sad",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const angry = (id) => {
    const object = {
      type: "angry",
      date: new Date().toISOString(),
      reacted_by: sessionStorage.getItem("user_Id"),
    };
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "feed/" +
          id +
          "/reactions",
        object
      )
      .then((value) => {
        call_api_get_feed_by_id();
      })
      .catch((err) => {});
  };
  const already_Reacted = (id, array) => {
    for (let i = 0; i < array?.length; i++) {
      if (array[i] == sessionStorage.getItem("user_Id")) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Card key={key} sx={{ width: "100%" }}>
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
              width: "100%",
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
              <img
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "100%",
                }}
                src={data?.profile_image}
                alt="webscript"
              />
            </div>
            <div
              style={{
                //display: "flex",
                width: "100%",
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
                style={{ paddingLeft: "1%" }}
              >
                {data?.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ paddingLeft: "1%" }}
              >
                {/* {format(new Date(data?.created_on), "dd/MM/yyyy HH:mm")} */}
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
            {item?.item?.description}
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            paddingX: "20%",
            flexDirection: "column",
            gap: "24px",
            alignSelf: "stretch",
            background: "#F1FBEC",
          }}
        >
          {item?.item?.links.length !== 0 && (
            <ImageList
              sx={{ width: "60%", height: "60%", justifyContent: "center" }}
              cols={item?.item?.links?.length}
              rowHeight={"20%"}
            >
              {item?.item?.links?.reverse()?.map((i) => (
                <ImageListItem key={key}>
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
            <div style={{ display: "relative" }}>
              <IconButton aria-describedby={id} onClick={handleClickE1}>
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
                  style={{
                    paddingLeft: "5%",
                    paddingTop: "5%",
                  }}
                >
                  {/* {item?.item?.reactions?.length}{" "} */}
                </Typography>
              </IconButton>
              <div>
                <Popper id={id} open={open} anchorEl={anchorEl1}>
                  <Box
                    sx={{
                      display: "flex",
                      border: 0.25,
                      borderRadius: "2%",
                      borderColor: "#1890FF",
                      bgcolor: "background.paper",
                      flexDirection: "rows",
                    }}
                  >
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "like")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "50px" }
                          : { fontSize: "30px" }
                      }
                      onClick={() => like(item?.item?.id)}
                    >
                      {/* {console.log(
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "like")
                            .map((item) => item.reacted_by)
                        ),
                        item?.item?.reactions
                          .filter((item) => item.type === "like")
                          .map((item) => item.reacted_by),
                        sessionStorage.getItem("user_Id")
                      )} */}
                      {emojis?.like}
                    </IconButton>
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "love")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "35px" }
                          : { fontSize: "25px" }
                      }
                      onClick={() => love(item?.item?.id)}
                    >
                      {emojis?.love}
                    </IconButton>
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "angry")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "35px" }
                          : { fontSize: "25px" }
                      }
                      onClick={() => angry(item?.item?.id)}
                    >
                      {emojis?.angry}
                    </IconButton>
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "haha")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "35px" }
                          : { fontSize: "25px" }
                      }
                      onClick={() => haha(item?.item?.id)}
                    >
                      {emojis?.haha}
                    </IconButton>
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "sad")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "35px" }
                          : { fontSize: "25px" }
                      }
                      onClick={() => sad(item?.item?.id)}
                    >
                      {emojis?.sad}
                    </IconButton>
                    <IconButton
                      style={
                        already_Reacted(
                          sessionStorage.getItem("user_Id"),
                          item?.item?.reactions
                            .filter((item) => item.type === "wow")
                            .map((item) => item.reacted_by)
                        )
                          ? { fontSize: "35px" }
                          : { fontSize: "25px" }
                      }
                      onClick={() => wow(item?.item?.id)}
                    >
                      {emojis?.wow}
                    </IconButton>
                  </Box>
                </Popper>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex" }}>
                <IconButton aria-describedby={idE2} onClick={handleClickE2}>
                  <FavoriteBorderOutlinedIcon /> {item?.item?.reactions?.length}{" "}
                  {/* reactions */}
                </IconButton>

                <div>
                  <Popper id={idE2} open={openE2} anchorEl={anchorEl2}>
                    <Box
                      sx={{
                        display: "flex",
                        border: 0.25,
                        borderRadius: "2%",
                        borderColor: "#1890FF",
                        bgcolor: "background.paper",
                        flexDirection: "rows",
                      }}
                    >
                      <span>
                        {emojis?.like}
                        {item?.item?.reactions
                          .filter((item) => item.type === "like")
                          .map((item) => item.reacted_by) === []
                          ? ""
                          : item?.item?.reactions
                              .filter((item) => item.type === "like")
                              .map((item) => item.reacted_by)?.length}
                      </span>
                      {emojis?.love}
                      {
                        item?.item?.reactions
                          .filter((item) => item.type === "love")
                          .map((item) => item.reacted_by)?.length
                      }

                      {emojis?.angry}
                      {
                        item?.item?.reactions
                          .filter((item) => item.type === "angry")
                          .map((item) => item.reacted_by)?.length
                      }

                      {emojis?.haha}
                      {
                        item?.item?.reactions
                          .filter((item) => item.type === "haha")
                          .map((item) => item.reacted_by)?.length
                      }

                      {emojis?.sad}
                      {
                        item?.item?.reactions
                          .filter((item) => item.type === "sad")
                          .map((item) => item.reacted_by)?.length
                      }

                      {emojis?.wow}
                      {
                        item?.item?.reactions
                          .filter((item) => item.type === "wow")
                          .map((item) => item.reacted_by)?.length
                      }
                    </Box>
                  </Popper>
                </div>
              </div>{" "}
              <div style={{ display: "flex" }}>
                <ModeCommentOutlinedIcon />
                {item?.item?.comments?.length} Commentaires
              </div>
              {/* <div style={{ display: "flex" }}>
                <TurnRightOutlinedIcon /> 1 Partage
              </div> */}
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
              <img
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "100%",
                }}
                src={imageProfile}
                alt="webscript"
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "990%",
                height: "40px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl variant="outlined" color="success" fullWidth focused>
                <InputLabel
                  variant="outlined"
                  color="success"
                  size="small"
                  InputLabelProps={{
                    style: { fontStyle: "italic", fontSize: 15 },
                  }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Add comment"
                    : "Add comment"}
                </InputLabel>
                <OutlinedInput
                  color="success"
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={(e) => addComment(item?.item?.id)}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  InputLabelProps={{
                    style: { fontStyle: "italic", fontSize: 15 },
                  }}
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Add New Post"
                      : "Add New Post"
                  }
                />
              </FormControl>
            </div>
          </Box>

          <Box
            height="120px"
            sx={{
              marginLeft: "20%",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowY: "scroll",
            }}
          >
            {item?.item?.comments.map((i, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "rows",
                    paddingY: "1%",
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
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "100%",
                      }}
                      src={imageProfile}
                      alt="webscript"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {i?.text}
                  </div>
                </Box>
              );
            })}
          </Box>
          <br />
        </Grid>
      </Card>
      <br />
    </>
  );
}

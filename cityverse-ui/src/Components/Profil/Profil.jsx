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
  const [value, setValue] = React.useState(0);
  const imageProfile = useSelector(
    (state) => state.FileUploadReducer?.imageProfile
  );
  const coverProfile = useSelector(
    (state) => state.FileUploadReducer?.coverProfile
  );
  const firstname = useSelector((state) => state.ProfileReducer?.firstname);
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
  const Following = useSelector(
    (state) => state.ProfileReducer?.following
  );
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

  useEffect(() => {
    call_api_get_user_info();
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
                  Upload Profile Image
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
                      src={selectedImage}
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
              dispatch({
                type: "CoverProfile",
                coverProfile: selectedImage,
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
                      src={selectedProfileImage}
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
              dispatch({
                type: "ImageProfile",
                imageProfile: selectedProfileImage,
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
              {/* <Grid item xs={6}>
                <Stack direction="columns" alignItems="center" spacing={2}>
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
                          src={selectedProfileImage}
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
              </Grid>
              <Grid item xs={6}>
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
                    Upload Cover Image
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
                        src={selectedImage}
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
              </Grid> */}
            </Grid>
            {/* <Stack direction="row" alignItems="center" spacing={2}>
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
                  Upload Profile Image
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
                      src={selectedImage}
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
            </Stack> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // dispatch({
              //   type: "CoverProfile",
              //   coverProfile: selectedImage,
              // });
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
              <AntTab label="Challenges" {...a11yProps(4)} />
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
                    <Grid
                      container
                      spacing={0}
                      height="450px" // fixed the height
                      style={{
                        overflow: "scroll",
                        overflowY: "scroll",
                      }}
                    >
                      {association?.map((item, index) => {
                        return (
                          <>
                            <Card key={index}>
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
                                    {/* <p
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
                                    </p> */}
                                    <img
                                      style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "100%",
                                      }}
                                      src={item?.profile_image}
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
                                      {item?.name}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      color="text.secondary"
                                      sx={{ paddingLeft: "1%" }}
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
                                  🌟 Join us in making a difference in Paris! 🌟
                                  <br />
                                  <br />
                                  We're thrilled to announce our latest
                                  initiative to support those in need right here
                                  in Paris. 💖 Our association is dedicated to
                                  giving back to our community, and we need YOUR
                                  help to make it happen! 🤝 Whether it's food,
                                  clothing, or other essentials, every donation
                                  counts and makes a real impact on the lives of
                                  those less fortunate. Together, we can spread
                                  kindness and compassion throughout our city.
                                  <br />
                                  <br />
                                  ✨ Let's come together and make a positive
                                  difference in the lives of others. Share the
                                  love, spread the word, and let's make Paris an
                                  even brighter and more supportive community
                                  for all! <br />
                                  <br /> #DonationDrive #ParisCares
                                  #CommunitySupport
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
                                      style={{
                                        paddingLeft: "4%",
                                        paddingTop: "4%",
                                      }}
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
                                        style: {
                                          fontStyle: "italic",
                                          borderRadius: "50px",
                                        },
                                      }}
                                    />
                                  </div>
                                </Box>
                                <br />
                              </Grid>
                            </Card>
                            <br />
                          </>
                        );
                      })}

                      <br />
                    </Grid>
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
                        <Box sx={{ display: 'flex',  justifyContent: 'center'}}> 
                        
                        <Chip label={`Total following : ${Following?.length}`} sx={{ backgroundColor: "#08089C", color: "#FFF"}}/>
                        </Box>

                       

                      </Grid>
                      {" "}
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

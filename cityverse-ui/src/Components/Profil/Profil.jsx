import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const handleCoverChange = (e) => {
    const filecover = e.target.files[0];
    setSelectedImage(URL.createObjectURL(filecover));
    // dispatch({
    //   type: "CoverProfile",
    //   coverProfile: URL.createObjectURL(file)
    // })
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfileImage(URL.createObjectURL(file));
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
                    sessionStorage.getItem("language") === "fr"
                      ? "X"
                      : "X"
                  }
                  value={""
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
                    sessionStorage.getItem("language") === "fr"
                      ? "Instagram"
                      : "Instagram"
                  }
                  value={
                    ""
                  }
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
                  Savory Delights Bistro {15}{" "}
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
              <AntTab label="Places" {...a11yProps(0)} />
              <AntTab label="Event" {...a11yProps(1)} />
              <AntTab label="Badge" {...a11yProps(2)} />
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
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                style={{
                  paddingLeft: "3%",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Introduction
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingX: "5%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ padding: "1%", color: "#08089C" }} />{" "}
                  Casablanca, Maroc
                </div>
                <br />
                <div>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    // style={{
                    //   paddingLeft: "0%",
                    //   color: "#000",
                    //   display: "flex",
                    //   alignItems: "center",
                    // }}
                  >
                    Welcome to Savory Delights Bistro, where culinary excellence
                    meets a cozy ambiance. Nestled in the heart of the city, our
                    restaurant is dedicated to crafting unforgettable dining
                    experiences.
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    // style={{
                    //   paddingLeft: "0%",
                    //   color: "#000",
                    //   display: "flex",
                    //   alignItems: "center",
                    // }}
                  >
                    At Savory Delights, we take pride in our commitment to using
                    fresh, locally sourced ingredients to create mouthwatering
                    dishes that cater to diverse tastes. Our chefs are
                    passionate about culinary innovation, blending traditional
                    flavors with a modern twist.
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    // style={{
                    //   paddingLeft: "0%",
                    //   color: "#000",
                    //   display: "flex",
                    //   alignItems: "center",
                    // }}
                  >
                    Our guests love us! Check out what they're saying about
                    Savory Delights on TripAdvisor. Your satisfaction is our top
                    priority, and we appreciate your feedback.
                  </Typography>
                </div>
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
                      <AddLocationIcon sx={{ color: "#08089C" }} />
                      {"  "} &emsp;Ajouter Nouveaux Places
                    </Typography>
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
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AddBusinessIcon sx={{ color: "#08089C" }} />
                      {"  "} &emsp;Ajouter Nouveaux Events
                    </Typography>
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
              </SwipeableViews>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

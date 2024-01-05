import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
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
import DateCalendarServerRequest from "./ProductCalendar";
import ListImage from "./listImage";
import ListVideo from "./listVideo";

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
  const [value, setValue] = React.useState(0);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedNewImage, setSelectedNewImage] = useState();

  const handlenewImage = (e) => {
    const file = e.target.files[0];
    setSelectedNewImage(URL.createObjectURL(file));
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

  useEffect(() => {}, [itemData]);

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
              itemData.push({ img: selectedNewImage, title: "new one" , type: "image"});
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
            image={
              "https://c4.wallpaperflare.com/wallpaper/212/663/692/france-paris-stadium-stade-de-france-wallpaper-preview.jpg"
            }
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
            src={
              "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg"
            }
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
                  Stade de France <StarIcon sx={{ color: "#FFD700" }} />
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
            <AntTab label="Photos" {...a11yProps(1)} />
            <AntTab label="Video" {...a11yProps(1)} />
            <AntTab label="Metaverse" {...a11yProps(2)} />
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
              <Box sx={{ borderRadius: "10px" }}>
                <ListImage itemData={itemData} />
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
                    <Grid container spacing={0.5}>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyItems: "center" }}
                      >
                        <Box
                          sx={{
                            marginLeft: "0%",
                            display: "flex",
                            width: "99%",
                            flexDirection: "rows",
                            alignItems: "rows",
                            paddingY: "0.5%",
                          }}
                        >
                          <img
                            src={
                              "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg"
                            }
                            // src={imageProfile}
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
                              height: "40px",
                              // justifyContent: "center",
                              // alignItems: "center",
                              backgroundColor: "#FFFF",
                            }}
                          >
                            <TextField
                              id="outlined-basic"
                              label="Tell us about your self"
                              variant="outlined"
                              fullWidth
                              color="success"
                              InputLabelProps={{
                                style: { fontStyle: "italic", fontSize: 15 },
                              }}
                            />
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
                            >
                              Post
                            </Button>
                          </div>
                        </Box>
                      </Grid>
                      <Divider variant="middle" sx={{ width: "99%" }}></Divider>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyItems: "center" }}
                      >
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
                            src={
                              "https://w0.peakpx.com/wallpaper/725/891/HD-wallpaper-stade-de-france-french-football-stadium-paris-france-sports-arenas-national-stadium-of-france.jpg"
                            }
                            // src={imageProfile}
                            style={{
                              width: "130px",
                              borderRadius: "100%",
                              height: "70px",
                              padding: "10px 40px",
                              alignItems: "flex-start",
                              gap: "10px",
                            }}
                          />
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            style={{
                              paddingTop: "3%",
                              // color: "#000",
                              // display: "flex",
                              // alignItems: "center",
                            }}
                          >
                            Stade de France
                          </Typography>
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
                          }}
                        >
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
                            Le Stade de France, majestueux édifice sportif situé
                            à Saint-Denis, est un symbole de grandeur et
                            d'excitation. Ses gradins racontent l'histoire de
                            performances mémorables, tandis que son architecture
                            moderne célèbre le mariage de la tradition et de
                            l'innovation. Chaque événement qui s'y déroule vibre
                            au rythme de l'enthousiasme collectif, créant des
                            souvenirs inoubliables. Le Stade de France, un lieu
                            où les émotions se conjuguent avec la grandeur,
                            capturant l'esprit vibrant du sport et du spectacle.
                          </Typography>
                          <ListImage itemData={itemData} />
                        </Box>
                      </Grid>
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
                        {"  "} &emsp;Ajouter Nouveau video
                      </Typography>
                    </Button>
                    <ListVideo itemData={itemData} />
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
    </div>
  );
}

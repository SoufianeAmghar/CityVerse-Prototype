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
  const [adress, setAdress] = useState("");
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
        setAdress([
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
  const Activity = useSelector((state) => state.AssociationReducer?.activity);
  const id_association = useSelector(
    (state) => state.AssociationReducer?.id_association
  );
  const association_name = useSelector(
    (state) => state.AssociationReducer?.association_name
  );
  const posts = useSelector((state) => state.AssociationReducer?.posts);
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

  useEffect(() => {}, [itemData]);

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
      // 'creator_id': data['creator_id'],
      // 'reactions': reactions_data,
      // 'comments': comments_data
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
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (id_association !== null && id_association !== undefined) {
      call_api_get_association_by_id(id_association);
      call_api_get_all_posts(id_association);
    }
  }, []);
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
                label={
                  sessionStorage.getItem("language") === "fr"
                    ? "SurName"
                    : "SurName"
                }
                // value={NumVolunteers}
                // onChange={(e) => setNumVolunteers(e.target.value)}
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
                  multiple
                  size="small"
                  focused
                  fullWidth
                  variant="outlined"
                  color="success"
                  limitTags={1}
                  options={[{ label: "Yes", label: "No" }]}
                  // value={selectedActivity}
                  onChange={(event, newValue) => {
                    // setSelectedActivity(newValue);
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
            </Box>
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
              handleCloseApplymission();
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
                      <br />
                      <Divider>
                        <Typography gutterBottom variant="h5" component="div">
                          Missions
                        </Typography>
                      </Divider>

                      <Card sx={{ backgroundColor: "#F2F2F2", margin: "2%" }}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Mission 1
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            "ABC Community Foundation is dedicated to empowering
                            individuals and communities to achieve their full
                            potential. We strive to foster social justice,
                            equity, and inclusivity by providing resources,
                            education, and support to underserved populations.
                            Through collaboration, advocacy, and innovation, we
                            aim to create positive systemic change and build a
                            more just and compassionate society. Our core values
                            of integrity, respect, diversity, and collaboration
                            guide our efforts as we work towards a future where
                            every person has the opportunity to thrive."
                          </Typography>
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
                            onClick={handleopenApplyMission}
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
    </div>
  );
}

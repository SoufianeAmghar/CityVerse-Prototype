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
  import "./product.css";
  
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
  
  export default function ModalupdateDonation({ open, setOpen, idDonation }) {
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
  
    const [donationName, setDonationName] = useState();
    const [donationPorpose, setDonationPorpose] = useState();
    const [taxReduction, setTaxReduction] = useState();
    const [isDonEligibleTax, setIsDonEligibleTax] = useState();
    const [donationLink, setDonationLink] = useState();
    const [media, setMedia] = useState();
    const [selectedNewImage, setSelectedNewImage] = useState();
    const handlenewImage = (e) => {
      const file = e.target.files[0];
      setSelectedNewImage(file);
    };
  
    const id_association = useSelector(
      (state) => state.AssociationReducer?.id_association
    );
  
    const donations = useSelector((state) => state.AssociationReducer?.donations);
  
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
  
    const call_api_get_all_donations = () => {
      axios
        .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "donation/")
        .then((value) => {
          dispatch({
            type: "Donations",
            donations: orderByDate(value?.data),
          });
          handleClose();
        })
        .catch((err) => {
          dispatch({
            type: "Donations",
            donations: [],
          });
        });
    };

    const call_api_get_donation_by_id= () => {
      axios
        .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "donation/" + idDonation)
        .then((value) => {
          setDonationName(value?.data?.name)
          setDonationPorpose(value?.data.purpose)
          setIsDonEligibleTax(value?.data?.is_reduction_eligible)
          setDonationLink(value?.data.link)
          setTaxReduction(value?.data?.tax_reduction)
        
        })
        .catch((err) => {
         
        });
    };

    useEffect (() => {
      call_api_get_donation_by_id()
    },[])
  
    const save = () => {
       
      const object = {
        creator_id: id_association,
        name: donationName,
        purpose: donationPorpose,
        link: donationLink,
        tax_reduction: taxReduction,
        is_reduction_eligible: isDonEligibleTax?.value, 
      }
      axios
        .put(
          process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "donation/" + idDonation,
          object,
        )
        .then((value) => {
          call_api_get_all_donations();
        })
        .catch((err) => {});
    };
  
    const TrueFalseOptions = [
      { id: 1, label: "Yes", value: true },
      { id: 2, label: "No", value: false },
    ];
  
    return (
      <div>
        {console.log('don', donations)}
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
                  Update Donation
                </Typography>
                <br />
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
                        ? "compaign Donation's Name"
                        : "compaign Donation's Name"
                    }
                    value={donationName}
                    onChange={(e) => setDonationName(e.target.value)}
                  />
                </Box>
                <br />
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
                        ? "What will the donation be used for ?"
                        : "What will the donation be used for ?"
                    }
                    multiline
                    rows={3}
                    value={donationPorpose}
                    onChange={(e) => setDonationPorpose(e.target.value)}
                  />
                </Box>
                <Box
                  component="form"
                  // onSubmit={() => ()}
                  sx={{
                    px: 4,
                    paddingLeft: 6,
                    background: "#0000",
                    "& > :not(style)": { m: 2, width: "44.5%" },
                    flexDirection: "column",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    size="small"
                    focused
                    type="number"
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
                        ? "Tax reduction"
                        : "Tax reduction"
                    }
                    value={taxReduction}
                    onChange={(e) => setTaxReduction(e.target.value)}
                  />
                  <FormControl variant="outlined" color="success" focused>
                    <Autocomplete
                      size="small"
                      focused
                      variant="outlined"
                      color="success"
                      limitTags={1}
                      options={TrueFalseOptions}
                      value={isDonEligibleTax}
                      type="text"
                      onChange={(event, newValue) => {
                        setIsDonEligibleTax(newValue);
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
                          label="Is the donation eligible for tax reduction?"
                          size="small"
                          focused
                          variant="outlined"
                          color="success"
                          placeholder={
                            sessionStorage.getItem("language") === "fr" ? "" : ""
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
                        ? "link"
                        : "link"
                    }
                    value={donationLink}
                    onChange={(e) => setDonationLink(e.target.value)}
                  />
                </Box>
                <br />
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
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <input
                      accept="image/*,video/*"
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
                        Upload media
                      </Button>
                    </label>
                    <div style={{ position: "relative" }}>
                      {selectedNewImage && (
                        <>
                          <img
                            style={{
                              width: "200px",
                              height: "100px",
                              borderRadius: "5%",
                            }}
                            src={URL.createObjectURL(selectedNewImage)}
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
      </div>
    );
  }
  
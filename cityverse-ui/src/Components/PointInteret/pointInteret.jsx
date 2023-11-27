import React, { useEffect, useRef, useState } from "react";
// material
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Card, Container, MenuItem, Modal, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../Profile.css";
// material
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import PinDropIcon from '@mui/icons-material/PinDrop';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Snackbar,
  TextField
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import ModalProgram from "../ModalProgram"
import ModalDeplicateProgram from "../deplicateProgram";
import "../info.css";
import ModalRenewProgram from "../renewProgram";

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
  //overflow: "scroll",
  // height: "90%",
  width: "50%",
  bgcolor: "background.paper",
  //border: "2px solid #08089C",
  borderRadius: "1%",
  boxShadow: 4,
  p: 0,
};
const styleValidate = {
  backgroundColor: "success",
  minWidth: "25%",
  left: "50%",
  color: "#fff",
  borderRadius: "14px",
};



const styleValidateDelete = {
  backgroundColor: "success",
  minWidth: "20%",
  borderRadius: "14px",
  color: "#fff",
};

const years = [
  { annee: 2000 },
  { annee: 2001 },
  { annee: 2002 },
  { annee: 2003 },
  { annee: 2004 },
  { annee: 2005 },
  { annee: 2006 },
  { annee: 2007 },
  { annee: 2008 },
  { annee: 2009 },
  { annee: 2010 },
  { annee: 2011 },
  { annee: 2012 },
  { annee: 2013 },
  { annee: 2014 },
  { annee: 2015 },
  { annee: 2016 },
  { annee: 2017 },
  { annee: 2018 },
  { annee: 2019 },
  { annee: 2020 },
  { annee: 2021 },
  { annee: 2022 },
  { annee: 2023 },
  { annee: 2024 },
  { annee: 2025 },
  { annee: 2026 },
  { annee: 2027 },
  { annee: 2028 },
  { annee: 2029 },
  { annee: 2030 },
  { annee: 2031 },
  { annee: 2032 },
  { annee: 2033 },
  { annee: 2034 },
  { annee: 2035 },
  { annee: 2036 },
  { annee: 2037 },
  { annee: 2038 },
  { annee: 2039 },
  { annee: 2040 },
];

export default function PointInteret(props) {
  const classes = useStyles();

  const programs = useSelector((state) => state.ProgrammeReducer.programs);
  const [idProgramUpdated, setIdProgramUpdated] = useState(null);
  const [name, setName] = useState("");
  const [cedante, setCedante] = useState("");
  const [country, setCountry] = useState("");
  const [form, setForm] = useState("");
  const [branch, setBranch] = useState("");
  const [intermediary, setIntermediary] = useState("");
  const [underwritingYear, setUnderwritingYear] = useState(years[22]);

  
  const { history } = props;
  const dispatch = useDispatch();
 
  /** error handling */
  const [ErrTranche, setErrTranche] = useState("");
  const [openErrTranche, setOpenErrTranche] = useState(false);
  const alert = useRef(null);
  const handleScroll = (event) => {
    var y = window.scrollY + 650;
    alert.current.style.transform = "translateY(" + y.toString() + "px)";
  };
  const handleOpenErrTranche = () => {
    setOpenErrTranche(true);
  };
  const handleCloseErrTranche = () => {
    setOpenErrTranche(false);
  };
  const setErrTrancheMsg = (msg) => {
    setErrTranche(msg);
  };
  const styleCancelDelete = {
    right: "0%",
    border: "1px solid #08089C",
    borderRadius: "4px",
    width: "20%",

    backgroundColor: "#F0F5FB",
    color: "#08089C",
  };

  /** id de programme pour la modification */
  function handleUpdatedIdProgramm(id) {
    setIdProgramUpdated(id);
  }

  const access_token = sessionStorage.getItem("acces_token");
  const headers = {
    Authorization: "Bearer " + access_token.toString(),
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/", { headers })
      .then((response) => {
        var data = response.data;
        for (let i = 0; i < response.data.length; i++) {
          data[i].created_on = format(
            new Date(data[i].created_on),
            "dd/MM/yyyy"
          );
          data[i].modified_on = format(
            new Date(data[i].modified_on),
            "dd/MM/yyyy"
          );
          // data[i].startDate = format(new Date(data[i].startDate), 'dd/MM/yyyy')
          // data[i].endDate = format(new Date(data[i].endDate), 'dd/MM/yyyy')
        }
        dispatch({
          type: "programs",
          programs: data,
        });
      });
  }, []);

  /*    Delete Programme    */
  function handleDeleteProg() {
    axios
      .delete(process.env.REACT_APP_PROGRAM_SERVER + "/program/" + idDelete, {
        headers,
      })
      .then((res) => {
        handleCloseDelete();
        axios
          .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/", { headers })
          .then((response) => {
            var data = response.data;
            for (let i = 0; i < response.data.length; i++) {
              data[i].created_on = format(
                new Date(data[i].created_on),
                "dd/MM/yyyy"
              );
              data[i].modified_on = format(
                new Date(data[i].modified_on),
                "dd/MM/yyyy"
              );
            }
            dispatch({
              type: "programs",
              programs: data,
            });
          });
      })
      .catch((res) => {
        window.addEventListener("scroll", handleScroll);
        setErrTranche(res.response.data.error);
        setOpenErrTranche(true);
        setTimeout(() => {
          setOpenErrTranche(false);
          window.removeEventListener("scroll");
        }, 5000);
      });
  }

  /* SnackBar */

  const [openBar, setOpenBar] = useState(false);
  

  const handleToCloseSnack = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenBar(false);
  };

  const [openBar2, setOpenBar2] = useState(false);
  const handleClickSnack2 = () => {
    setOpenBar2(true);
  };

  const handleToCloseSnack2 = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenBar2(false);
  };

  // deplicate
  const [openBar3, setOpenBar3] = useState(false);
  

  const handleToCloseSnack3 = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenBar3(false);
  };

  /*Modal Depl */
  const [deplicate_id, setdeplicatedId] = useState();
  const [openDep, setOpenDep] = useState(false);
  const handleCloseDep = () => {
    setOpenDep(false);
  };

  /*Modal Depl */
  const [renew_id, setRenewId] = useState();
  const [openRen, setOpenRen] = useState(false);
  const handleCloseRen = () => {
    setOpenRen(false);
  };

  // deplicate
  const [openBar4, setOpenBar4] = useState(false);
  
  const handleToCloseSnack4 = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenBar4(false);
  };

  /*Modal open */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  /**Modal Update */
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  /*-------------Delete Dialog----------------- */
  const [idDelete, setIdDelete] = useState();

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
    setIdDelete(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [expDate, setExpDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  function handleUpdatedData(id) {
    axios
      .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/" + id, { headers })
      .then((res) => {
        setName(res.data.name);
        setCedante(res.data.insured);
        setCountry(res.data.country);
        setForm(res.data.form);
        setBranch(res.data.branch);
        setIntermediary(res.data.intermediary);
        setUnderwritingYear(res.data.underwriting_year);
        setExpDate(res.data.endDate);
        setStartDate(res.data.startDate);
      });
  }
  function handleAdd() {
    if (
      name !== "" &&
      cedante !== "" &&
      country !== "" &&
      branch !== "" &&
      expDate !== "" &&
      intermediary !== ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  function handleUpdateProgram() {
    const object = {
      _id: idProgramUpdated,
      name: name,
      insured: cedante,
      country: country,
      branch: branch,
      form: form,
      intermediary: intermediary,
      underwriting_year: underwritingYear,
      endDate: expDate,
      startDate: startDate,
    };
    axios
      .put(
        process.env.REACT_APP_PROGRAM_SERVER + "/program/" + idProgramUpdated,
        object,
        { headers }
      )
      .then((response) => {
        axios
          .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/", { headers })
          .then((response) => {
            var data = response.data;

            for (let i = 0; i < response.data.length; i++) {
              data[i].created_on = format(
                new Date(data[i].created_on),
                "dd/MM/yyyy"
              );
              data[i].modified_on = format(
                new Date(data[i].modified_on),
                "dd/MM/yyyy"
              );
            }
            dispatch({
              type: "programs",
              programs: data,
            });
          });
      })
      .catch((res) => {
        window.addEventListener("scroll", handleScroll);
        setErrTranche(res.response.data.error);
        setOpenErrTranche(true);
        setTimeout(() => {
          setOpenErrTranche(false);
          window.removeEventListener("scroll");
        }, 5000);
      });
  }

  
  const [menuBranch, setMenuBranch] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/api/params/", {
        headers,
      })
      .then((response) => {
        dispatch({ type: "dataParamsRC", dataParamsRC: response.data });
        let list = [];
        let iterable = response.data?.filter((value) => {
          return value.name === "Branche";
        })[0];
        for (let k = 0; k < iterable?.indices?.length; k++) {
          let val = iterable.indices[k]?.val + " - ";
          let val2 =
            iterable.reff[k]?.ref === undefined || null
              ? ""
              : iterable?.reff[k]?.ref;
          list.push(val + val2);
        }
        // console.log(list);
        setMenuBranch(list);
        let i = 0;
        let j = response.data.length;
        let tempData = [];
        for (i == 0; i < j; i++) {
          tempData.push({
            nom: response.data[i].nom,
          });
        }
        dispatch({ type: "ParamsNomsRC", ParamsNomsRC: tempData });
      });
  }, []);

  const dataParamsRC = useSelector((state) => state.ParamReducer.dataParamsRC);

  

  function handleChangeIdProgram(id) {
    dispatch({
      type: "idProgramme",
      idProgramme: id,
    });
    sessionStorage.setItem("idProgramme", id);
  }
  

  const handleGetRowId = (e) => {
    return e._id;
  };

  const dayInMonthComparator = (v1, v2) => {
    let date1_list = v1.split("/");
    let date2_list = v2.split("/");
    let date1 = new Date(date1_list[2], date1_list[1], date1_list[0]);
    let date2 = new Date(date2_list[2], date2_list[1], date2_list[0]);
    return date1.getTime() - date2.getTime();
  };

  const columns: GridColDef[] = [
    { field: "country", headerName: "¨Pays", flex: 1 },
    { field: "insured", headerName: "Cédante", flex: 1 },
    {
      field: "underwriting_year",
      headerName: "Année de souscription",
      flex: 1,
    },
    { field: "name", headerName: "Nom", flex: 1 },
    {
      field: "form",
      headerName: "Forme",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.form === "xs" ? "XS" : ""}
            {params.row.form === "sl" ? "SL" : ""}
            {params.row.form === "qs" ? "QS" : ""}
          </>
        );
      },
    },
    { field: "branch", headerName: "Branche", flex: 1 },
    { field: "intermediary", headerName: "Intermédiaire", flex: 1 },
    { field: "startDate", headerName: "Date d'effet", flex: 1 },
    // { field: "endDate", headerName: "Date d'expiration", flex: 1 },
    {
      field: "modified_on",
      headerName: "Dernière mise a jour",
      flex: 1,
      type: "date",
      sortComparator: dayInMonthComparator,
    },
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "draft" ? "En cours" : ""}
            {params.row.status === "modelled" ? "Quoté" : ""}
            {params.row.status === "final" ? "Finalisé" : ""}
          </>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,

      renderCell: (params) => {
        return (
          <div>
            <PreviewIcon
              onClick={() => {
                history.push("/program");
                handleChangeIdProgram(params.row._id);
              }}
              style={{ color: "gray", cursor: "pointer" }}
            />

            <ContentCopyIcon
              onClick={() => {
                //handleDeplicateProgram(params.data._id)
                setdeplicatedId(params.row._id);
                setOpenDep(true);
              }}
              style={{ color: "#0044FF", cursor: "pointer" }}
            />

            <AutorenewIcon
              onClick={() => {
                setRenewId(params.row._id);
                setOpenRen(true);
                //handleRenewProgram(params.data._id)}
              }}
              style={{ color: "#e6b400", cursor: "pointer" }}
            />

            <ModeEditOutlineOutlinedIcon
              onClick={() => {
                handleUpdatedData(params.row._id);
                handleOpenUpdate();
                handleUpdatedIdProgramm(params.row._id);
                setExpDate(params.row.endDate);
              }}
              style={{ color: "#9cb885", cursor: "pointer" }}
            />

            <DeleteForeverIcon
              onClick={() => handleClickOpenDelete(params.row._id)}
              style={{ color: " #d95c5c", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
  const columnsENG: GridColDef[] = [
    { field: "country", headerName: "point of interest", flex: 1 },
    { field: "insured", headerName: "Name", flex: 1 },
    { field: "underwriting_year", headerName: "Checking date", flex: 1 },
    { field: "name", headerName: "Event date", flex: 1 },
    // {
    //   field: "form",
    //   headerName: "Form",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {params.row.form === "xs" ? "XS" : ""}
    //         {params.row.form === "sl" ? "SL" : ""}
    //         {params.row.form === "qs" ? "QS" : ""}
    //       </>
    //     );
    //   },
    // },
    { field: "branch", headerName: "Localisation", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <PreviewIcon
              onClick={() => {
                history.push("/program");
                handleChangeIdProgram(params.row._id);
              }}
              style={{ color: "gray", cursor: "pointer" }}
            />
            <ModeEditOutlineOutlinedIcon
              onClick={() => {
                handleUpdatedData(params.row._id);
                handleOpenUpdate();
                handleUpdatedIdProgramm(params.row._id);
                setExpDate(params.row.endDate);
              }}
              style={{ color: "#9cb885", cursor: "pointer" }}
            />

            <DeleteForeverIcon
              onClick={() => handleClickOpenDelete(params.row._id)}
              style={{ color: " #d95c5c", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];

  

  return (
    <>
      <Box disableGutters component="main" width="98%" sx={{}}>
        <Card sx={{ borderRadius: "0px" }}>
          <div className="border"></div>
          <br></br>
          <Container
            disableGutters
            maxWidth=""
            component="main"
            sx={{ padding: "20px" }}
          >
            <div className="rowDirection">
              <div
                style={{
                  marginLeft: "20px",
                }}
                className="backGroundIconCedant"
              >
                <PinDropIcon className="paramsIconColorCedant" />
              </div>
              <Typography
                color="text.primary"
                style={{
                  fontWeight: "600",
                  marginLeft: "1%",
                }}
                component="h1"
                variant="h4"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? " Tableau Des Points d'interets  "
                  : "Point d'interset Table"}
              </Typography>
            </div>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                color="success"
                variant="text"
                startIcon={<AddIcon />}
                onClick={() => {
                  handleOpen();
                }}
              >
                {}
                {sessionStorage.getItem("language") === "fr"
                  ? "Ajouter point d'interets"
                  : "Add Point of interset"}
              </Button>
            </Stack>

            <Box sx={{ height: "100%", width: "100%", marginBottom: "3%" }}>
              <DataGrid
                initialState={{
                  pagination: {
                    pagination: 10,
                  },
                  sorting: {
                    sortModel: [{ field: "modified_on", sort: "desc" }],
                  },
                  columns: {
                    columnVisibilityModel: {
                      // Hide columns status and traderName, the other columns will remain visible
                      status: false,
                      traderName: false,
                    },
                  },
                }}
                sx={{ height: "70vh" }}
                rows={programs}
                columns={
                  sessionStorage.getItem("language") === "fr"
                    ? columns
                    : columnsENG
                }
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                getRowId={handleGetRowId}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Container>
        </Card>
      </Box>

      <Dialog
        open={openErrTranche}
        onClose={() => {
          handleCloseErrTranche();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Erreure est survenue"
            : "Error has occurred"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              handleCloseErrTranche();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ErrTranche}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseErrTranche();
            }}
            variant="contained"
            style={styleCancelDelete}
          >
            {sessionStorage.getItem("language") === "fr" ? "Cacher" : "Hide"}
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "90%", top: "5%" }}
      >
        <ModalProgram
          handleClose={handleClose}
          // handleClickSnack2={handleClickSnack2}
          handleOpenErrTranche={handleOpenErrTranche}
          handleCloseErrTracnhe={handleCloseErrTranche}
          setErrTrancheMsg={setErrTrancheMsg}
        />
      </Modal>
      <Modal
        open={openDep}
        onClose={handleCloseDep}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "90%", top: "5%" }}
      >
        <ModalDeplicateProgram
          handleClose={handleCloseDep}
          id={deplicate_id}
          handleClickSnack2={handleClickSnack2}
          handleOpenErrTranche={handleOpenErrTranche}
          handleCloseErrTracnhe={handleCloseErrTranche}
          setErrTrancheMsg={setErrTrancheMsg}
        />
      </Modal>

      <Modal
        open={openRen}
        onClose={handleCloseRen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "90%", top: "5%" }}
      >
        <ModalRenewProgram
          handleClose={handleCloseRen}
          id={renew_id}
          handleClickSnack2={handleClickSnack2}
          handleOpenErrTranche={handleOpenErrTranche}
          handleCloseErrTracnhe={handleCloseErrTranche}
          setErrTrancheMsg={setErrTrancheMsg}
        />
      </Modal>

      {/* Update Modal */}
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "90%", top: "5%" }}
      >
        <div>
          <Box sx={style}>
            <Typography
              style={{
                position: "absolute",
                // color: "black",
                marginLeft: "6%",
                marginTop: "3%",
                // color: "#08089C",
                fontSize: 20,
                p: 2,
              }}
              color="text.primary"
            >
              <ModeEditOutlineOutlinedIcon
                style={{ color: "#08089C", marginTop: 2.5 }}
              />
              {sessionStorage.getItem("language") === "fr"
                ? "  Mettre à jour le programme"
                : "  Update program"}
            </Typography>

            <CloseIcon
              onClick={handleCloseUpdate}
              style={{
                position: "absolute",
                right: 16,
                top: 4,
                cursor: "pointer",
                marginTop: 20,
                color: "#08089C",
              }}
            />
            <br />
            <br />
            <br />
            <Divider variant="middle" style={{ color: "#08089C" }} />
            <Box
              component="form"
              sx={{
                p: 4,
                background: "#f2f2f2",
                "& > :not(style)": { m: 2, width: "44.2%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{ style: { color: "black" } }}
                //error={name.length === 0 ? true : false}
                placeholder={
                  sessionStorage.getItem("language") === "fr"
                    ? "Obligatoire"
                    : "Required"
                }
                label={
                  sessionStorage.getItem("language") === "fr" ? "Nom" : "Name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  {sessionStorage.getItem("language") === "fr"
                    ? "Cédante"
                    : "Cedant"}
                </InputLabel>
                <Select
                  size="small"
                  value={cedante}
                  sx={{
                    backgroundColor: "#F0F5FB",
                    color: "#08089C",
                  }}
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Cédante"
                      : "Cedant"
                  }
                  onChange={(e) => setCedante(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  {dataParamsRC
                    ?.filter((value) => {
                      return value.name === "Cédant";
                    })[0]
                    ?.indices?.map((year) => (
                      <MenuItem key={year} value={year?.val} style={{}}>
                        {year?.val}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  {sessionStorage.getItem("language") === "fr"
                    ? "Pays"
                    : "Country"}
                </InputLabel>
                <Select
                  size="small"
                  value={country}
                  sx={{
                    backgroundColor: "#F0F5FB",
                    color: "#08089C",
                  }}
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Pays"
                      : "Country"
                  }
                  onChange={(e) => setCountry(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  {dataParamsRC
                    ?.filter((value) => {
                      return value.name === "Pays";
                    })[0]
                    ?.indices?.map((year) => (
                      <MenuItem key={year} value={year?.val} style={{}}>
                        {year?.val}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                size="small"
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{ style: { color: "black" } }}
                //error={form.length === 0 ? true : false}
                label={
                  sessionStorage.getItem("language") === "fr" ? "Forme" : "Form"
                }
                disabled={true}
                value={form}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                onChange={(e) => setForm(e.target.value)}
              />
              <FormControl
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  {sessionStorage.getItem("language") === "fr"
                    ? "Branche"
                    : "Branch"}
                </InputLabel>
                <Select
                  size="small"
                  value={branch}
                  sx={{
                    backgroundColor: "#F0F5FB",
                    color: "#08089C",
                  }}
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Branche"
                      : "Branch"
                  }
                  onChange={(e) => setBranch(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  {menuBranch?.map((year) => (
                    <MenuItem key={year} value={year} style={{}}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "black" }}
                >
                  {sessionStorage.getItem("language") === "fr"
                    ? "Intermédiaire"
                    : "Intermediary"}
                </InputLabel>
                <Select
                  size="small"
                  value={intermediary}
                  label="Underwrithing Year"
                  sx={{
                    backgroundColor: "#F0F5FB",
                    color: "#08089C",
                  }}
                  onChange={(e) => setIntermediary(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  {dataParamsRC
                    ?.filter((value) => {
                      return value.name === "intermediaire";
                    })[0]
                    ?.indices?.map((year) => (
                      <MenuItem key={year} value={year?.val} style={{}}>
                        {year?.val}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                focused
                variant="filled"
                color="success"
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  {sessionStorage.getItem("language") === "fr"
                    ? "Année de souscription"
                    : "Underwrithing Year"}
                </InputLabel>
                <Select
                  size="small"
                  value={underwritingYear}
                  sx={{
                    backgroundColor: "#F0F5FB",
                    color: "#08089C",
                  }}
                  label={
                    sessionStorage.getItem("language") === "fr"
                      ? "Année de souscription "
                      : "UW year"
                  }
                  onChange={(e) => setUnderwritingYear(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year.annee} style={{}}>
                      {year.annee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                p: 2,
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Button
                variant="contained"
                color="success"
                disabled={handleAdd()}
                sx={styleValidate}
                onClick={(event) => {
                  handleUpdateProgram();
                  handleCloseUpdate();
                }}
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Modifier "
                  : "Update"}
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FFFF",
                  minWidth: "125px",
                  color: "#08089C",
                  borderRadius: "20px",
                }}
                onClick={handleCloseUpdate}
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Annuler"
                  : "Cancel"}
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>

      {/* SnackBar */}
      <div>
        <Snackbar
          open={openBar}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={handleToCloseSnack}
          autoHideDuration={4000}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToCloseSnack}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            onClose={handleToCloseSnack}
            severity="success"
            icon={<CheckCircleTwoToneIcon fontSize="inherit" />}
          >
            {sessionStorage.getItem("language") === "fr"
              ? "Programme supprimé "
              : "Program deleted"}
          </Alert>
        </Snackbar>
      </div>

      {/* SnackBar deplicated */}
      <div>
        <Snackbar
          open={openBar3}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={handleToCloseSnack3}
          autoHideDuration={4000}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToCloseSnack3}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            onClose={handleToCloseSnack3}
            severity="success"
            icon={<CheckCircleTwoToneIcon fontSize="inherit" />}
          >
            {sessionStorage.getItem("language") === "fr"
              ? "Programme dupliqué "
              : "Program duplicated"}
          </Alert>
        </Snackbar>
      </div>

      {/* SnackBar Renew */}
      <div>
        <Snackbar
          open={openBar4}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={handleToCloseSnack4}
          autoHideDuration={4000}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToCloseSnack4}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            onClose={handleToCloseSnack4}
            severity="success"
            icon={<CheckCircleTwoToneIcon fontSize="inherit" />}
          >
            {sessionStorage.getItem("language") === "fr"
              ? "Programme renouvlé "
              : "Program renewed"}
          </Alert>
        </Snackbar>
      </div>

      {/* SnackBar 2 */}
      <div>
        <Snackbar
          open={openBar2}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={handleToCloseSnack2}
          autoHideDuration={4000}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToCloseSnack2}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            onClose={handleToCloseSnack2}
            severity="success"
            icon={<CheckCircleTwoToneIcon fontSize="inherit" />}
          >
            {sessionStorage.getItem("language") === "fr"
              ? "Programme ajouté "
              : "Program added"}
          </Alert>
        </Snackbar>

        {/** Dialoog * */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          maxWidth="sm"
          fullWidth
          style={{ boxShadow: "none", p: 2 }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ color: "#08089C" }}>
            <HelpOutlineIcon sx={{ paddingTop: "0.75%", color: "#FFC107" }} />{" "}
            {sessionStorage.getItem("language") === "fr"
              ? " Confirmer l'action"
              : " Confirm action"}
          </DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={handleCloseDelete}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {sessionStorage.getItem("language") === "fr"
                ? "Êtes-vous sûr de vouloir supprimer ce programme?"
                : "Are you sure you want to delete this program?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDelete}
              variant="contained"
              style={{
                backgroundColor: "#FFFF",
                minWidth: "125px",
                color: "#08089C",
              }}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Annuler"
                : "Cancel"}
            </Button>
            <Button
              onClick={() => {
                handleDeleteProg();
              }}
              variant="contained"
              color="success"
              autoFocus
              style={styleValidateDelete}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Confirmer"
                : "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}




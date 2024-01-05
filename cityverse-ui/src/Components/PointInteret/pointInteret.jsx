import React, { useEffect, useRef, useState } from "react";
// material
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import TerminalIcon from "@mui/icons-material/Terminal";
import {
  Card,
  Container,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import PinDropIcon from "@mui/icons-material/PinDrop";
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
  TextField,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import "./pointInteret.css";
import "../info.css";
import ModalPreview from "./PreviewPoint";
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

export default function PointInteret(props) {
  const classes = useStyles();
  const [idProgramUpdated, setIdProgramUpdated] = useState(null);
  const [name, setName] = useState("");
  const [cedante, setCedante] = useState("");
  const [country, setCountry] = useState("");
  const [form, setForm] = useState("");
  const [branch, setBranch] = useState("");
  const [intermediary, setIntermediary] = useState("");
  const [underwritingYear, setUnderwritingYear] = useState();

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

  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/", { headers })
  //     .then((response) => {
  //       var data = response.data;
  //       for (let i = 0; i < response.data.length; i++) {
  //         data[i].created_on = format(
  //           new Date(data[i].created_on),
  //           "dd/MM/yyyy"
  //         );
  //         data[i].modified_on = format(
  //           new Date(data[i].modified_on),
  //           "dd/MM/yyyy"
  //         );
  //         // data[i].startDate = format(new Date(data[i].startDate), 'dd/MM/yyyy')
  //         // data[i].endDate = format(new Date(data[i].endDate), 'dd/MM/yyyy')
  //       }
  //       dispatch({
  //         type: "programs",
  //         programs: data,
  //       });
  //     });
  // }, []);

  /*    Delete Programme    */
  // function handleDeleteProg() {
  //   axios
  //     .delete(process.env.REACT_APP_PROGRAM_SERVER + "/program/" + idDelete, {
  //       headers,
  //     })
  //     .then((res) => {
  //       handleCloseDelete();
  //       axios
  //         .get(process.env.REACT_APP_PROGRAM_SERVER + "/program/", { headers })
  //         .then((response) => {
  //           var data = response.data;
  //           for (let i = 0; i < response.data.length; i++) {
  //             data[i].created_on = format(
  //               new Date(data[i].created_on),
  //               "dd/MM/yyyy"
  //             );
  //             data[i].modified_on = format(
  //               new Date(data[i].modified_on),
  //               "dd/MM/yyyy"
  //             );
  //           }
  //           dispatch({
  //             type: "programs",
  //             programs: data,
  //           });
  //         });
  //     })
  //     .catch((res) => {
  //       window.addEventListener("scroll", handleScroll);
  //       setErrTranche(res.response.data.error);
  //       setOpenErrTranche(true);
  //       setTimeout(() => {
  //         setOpenErrTranche(false);
  //         window.removeEventListener("scroll");
  //       }, 5000);
  //     });
  // }

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
  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/api/params/", {
  //       headers,
  //     })
  //     .then((response) => {
  //       dispatch({ type: "dataParamsRC", dataParamsRC: response.data });
  //       let list = [];
  //       let iterable = response.data?.filter((value) => {
  //         return value.name === "Branche";
  //       })[0];
  //       for (let k = 0; k < iterable?.indices?.length; k++) {
  //         let val = iterable.indices[k]?.val + " - ";
  //         let val2 =
  //           iterable.reff[k]?.ref === undefined || null
  //             ? ""
  //             : iterable?.reff[k]?.ref;
  //         list.push(val + val2);
  //       }
  //       // console.log(list);
  //       setMenuBranch(list);
  //       let i = 0;
  //       let j = response.data.length;
  //       let tempData = [];
  //       for (i == 0; i < j; i++) {
  //         tempData.push({
  //           nom: response.data[i].nom,
  //         });
  //       }
  //       dispatch({ type: "ParamsNomsRC", ParamsNomsRC: tempData });
  //     });
  // }, []);

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
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      headerClassName: "header",
    },
    {
      field: "region",
      headerName: "région",
      flex: 1,
      headerClassName: "header",
    },
    {
      field: "country",
      headerName: "¨Pays",
      flex: 1,
      headerClassName: "header",
    },
    {
      field: "city",
      headerName: "city",
      flex: 1,
      headerClassName: "header",
    },
    { field: "street", headerName: "Rue", flex: 2, headerClassName: "header" },
    {
      field: "point_created_by",
      headerName: "Crée par",
      flex: 1,
      headerClassName: "header",
    },
    {
      field: "point_created_on",
      headerName: "Date de création",
      flex: 1,
      type: "date",
      sortComparator: dayInMonthComparator,
      headerClassName: "header",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <div>
            <VisibilityIcon
              onClick={() => {
                history.push("/Product");
                // handleChangeIdProgram(params.row._id);
                setOpen(true);
              }}
              style={{ color: "#556B2F", cursor: "pointer" }}
            />
            {/* <ModeEditOutlineOutlinedIcon
              onClick={() => {
                handleUpdatedData(params.row._id);
                handleOpenUpdate();
                handleUpdatedIdProgramm(params.row._id);
                setExpDate(params.row.endDate);
              }}
              style={{ color: "#9cb885", cursor: "pointer" }}
            /> */}
            <DeleteIcon
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
          <br></br>
          <br />
          <br />
          <Container
            disableGutters
            maxWidth=""
            component="main"
            sx={{ padding: "20px" }}
          >
            {/* <div className="rowDirection">
              <div
                style={{
                  marginLeft: "20px",
                }}
                className="backGroundIconCedant"
              >
                <PinDropIcon sx={{ color: "#556B2F"}} />
              </div>
              <Typography
                color="text.primary"
                style={{
                  fontWeight: "600",
                  marginLeft: "1%",
                  color: "#556B2F",
                }}
                component="h1"
                variant="h4"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? " Tableau Des Points d'interets  "
                  : " Tableau Des Points d'interets  "}
              </Typography>
            </div> */}
            {/* <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
            </Stack> */}

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
                rows={[
                  {
                    id: 55555,
                    name: "Stade de France",
                    country: "France",
                    city: "Paris",
                    region: "Europe",
                    street: "8 PORTE SAINT EUSTACHE",
                    point_created_on: new Date(),
                    point_created_by: "Albert ",
                  },
                ]}
                columns={columns}
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                // getRowId={handleGetRowId}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Container>
        </Card>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "90%", top: "5%" }}
      >
        <ModalPreview
          handleClose={handleClose}
          handleOpenErrTranche={handleOpenErrTranche}
          handleCloseErrTracnhe={handleCloseErrTranche}
          setErrTrancheMsg={setErrTrancheMsg}
        />
      </Modal>
    </>
  );
}

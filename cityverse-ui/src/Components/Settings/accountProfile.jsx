import React, { useCallback, useEffect, useRef, useState } from "react";
// material
import { Card } from "@mui/material";
import { Container, Modal, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import { IconButton, Box } from "@mui/material";
import { Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function AccountProfile(props) {

  const [idProgramUpdated, setIdProgramUpdated] = useState(null);
  const [firstnameprogram, setfirstnameprogram] = useState("");
  const [lastnameprogram, setlastnameprogram] = useState("");
  const [emailprogram, setemailprogram] = useState("");
  const [roleprogram, setroleprograme] = useState("");
  const [authorityprogram, setauthorityprogram] = useState("");
  const [Error, setError] = useState(false);
  const gridRef = useRef();
  function handleUpdatedIdProgramm(id) {
    setIdProgramUpdated(id);
  }
  const handleUpdateError = () => {
    setError(true);
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
    setclick(click + 1);
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

  const onBtShowLoading = useCallback(() => {
    gridRef?.current?.api?.showLoadingOverlay();
  }, []);

  const access_token = sessionStorage.getItem("acces_token");
  const headers = {
    Authorization: "Bearer " + access_token.toString(),
  };
  function handleDeleteUser(id) {
    axios
      .delete(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/user/" + id,
        { headers }
      )
      .then((data) => {
        setclick(click + 1);
      })
      .catch((err) => {});
  }
  const handle_click = (event) => {
    setclick(click + 1);
  };

  const columnseng: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "firstName", headerName: "Nom", flex: 0.5 },
    { field: "lastName", headerName: "Prenom", flex: 0.5 },
    { field: "tel", headerName: "Tél" },
    {
      field: "profile",
      headerName: "Profile",
      flex: 0.5,
      renderCell: (params) => {
        if (params.row.profile === null) {
          return "";
        } else {
          return params.row.profile.name;
        }
      },
    },
    { field: "password", headerName: "Pass Word", flex: 0.5, },
    {
      field: "createdDate",
      headerName: "Date de création",
      flex: 0.5,
      renderCell: (params) => {
        return <div>{params.row.createdDate.substring(0, 10)}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div>
            <ModeEditOutlineOutlinedIcon
              onClick={() => {
                handleOpenUpdate();
                handleUpdatedIdProgramm(params.row.id);
                setemailprogram(params.row.email);
                setlastnameprogram(params.row.lastName);
                setfirstnameprogram(params.row.firstName);
                setroleprograme(params.row.roles[0].name);
                setauthorityprogram(params.row.profile.name);
              }}
              style={{ color: "blue", cursor: "pointer" }}
            />

            <DeleteIcon
              onClick={() => handleClickOpenDelete(params.row.id)}
              style={{ color: " #d95c5c", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "firstName", headerName: "Nom", flex: 0.75 },
    { field: "lastName", headerName: "Prenom", flex: 0.75 },
    { field: "tel", headerName: "Tél", flex: 0.75 },
   
    {
      field: "profile",
      headerName: "Profile",
      flex: 0.75,
      renderCell: (params) => {
        if (params.row.profile === null) {
          return "";
        } else {
          return params.row.profile.name;
        }
      },
    },
    { field: "password", headerName: "PassWord", flex: 0.75 },
    {
      field: "createdDate",
      headerName: "Date de création",
      flex: 0.75,
      renderCell: (params) => {
        return <div>{params.row.createdDate.substring(0, 10)}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div>
            <ModeEditOutlineOutlinedIcon
              onClick={() => {
                handleOpenUpdate();
                handleUpdatedIdProgramm(params.row.id);
                setemailprogram(params.row.email);
                setlastnameprogram(params.row.lastName);
                setfirstnameprogram(params.row.firstName);
                setroleprograme(params.row.roles[0].name);
                setauthorityprogram(params.row.profile.name);
              }}
              style={{ color: "blue", cursor: "pointer" }}
            />

            <DeleteIcon
              onClick={() => handleClickOpenDelete(params.row.id)}
              style={{ color: " #d95c5c", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
  const [allusers, setallusers] = useState([]);
  const addclick = () => {
    setclick(click + 1);
  };
  const [click, setclick] = useState(0);
  const call_api_getusers = () => {
    const access_token = sessionStorage.getItem("acces_token");
    const headers = {
      Authorization: "Bearer " + access_token.toString(),
    };
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/users", {
        headers,
      })
      .then((data) => {
        setallusers(data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setallusers([]);
    call_api_getusers();
  }, [click]);
  const [value, setvalue] = useState(0);
  const handle_change_value = () => {
    setvalue(value + 1);
  };
  useEffect(() => {
    setallusers([]);
    call_api_getusers();
  }, [value]);

  const programvalues = {
    email: emailprogram,
    lastname: lastnameprogram,
    firstname: firstnameprogram,
    role: roleprogram,
    autho: authorityprogram,
  };

  return (
    <>
      <Box disableGutters component="main" width="99%" sx={{}}>
        <Card sx={{ borderRadius: "0px" }}>
          <div className="border"></div>
          <br></br>
          <Container
            disableGutters
            maxWidth="80%"
            component="main"
            sx={{ padding: "10px" }}
          >
            <div className="rowDirection">
              <div
                style={{
                  marginLeft: "20px",
                }}
                className="backGroundIconCedant"
              >
                <GroupIcon className="paramsIconColorCedant" />
              </div>
              <Typography
                color="text.primary"
                style={{
                  fontWeight: "600",
                  marginLeft: "1%",
                  paddingBottom: "5%"
                }}
                component="h1"
                variant="h4"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Accounts and Profiles"
                  : "Accounts and Profiles"}
              </Typography>
            </div>
            {/* <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                color="success"
                variant="text"
                startIcon={<AddIcon />}
                onClick={() => {
                  handleOpen();
                  addclick();
                }}
              >
                {}
                {sessionStorage.getItem("language") === "fr"
                  ? " Ajouter Utilisateur"
                  : "Add user"}
              </Button>
            </Stack> */}

            <Box sx={{ height: "100%", width: "99%", marginBottom: "3%" }}>
              <DataGrid
                initialState={{
                  pagination: {
                    pagination: 10,
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
                rows={allusers}
                columns={
                  sessionStorage.getItem("language") === "fr"
                    ? columns
                    : columnseng
                }
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Container>
        </Card>
      </Box>
      <div>
        <div>
          {/** Dialoog * */}
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            maxWidth="sm"
            fullWidth
            style={{ boxShadow: "none" }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
              id="alert-dialog-title"
            >
              <HelpOutlineIcon sx={{ color: "#FF7900" }} />
              {sessionStorage.getItem("language") === "fr"
                ? "Supprimer l'utilisateur"
                : "Delete the user"}
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleCloseDelete}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {sessionStorage.getItem("language") === "fr"
                  ? "Êtes-vous sûr de vouloir supprimer cet utilisateur?"
                  : "Are you sure you want to delete this user?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDelete}
                variant="contained"
                color="success"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Annuler"
                  : "Cancel"}
              </Button>
              <Button
                onClick={() => {
                  handleDeleteUser(idDelete);
                  handleCloseDelete();
                  onBtShowLoading();
                }}
                variant="text"
                color="success"
                autoFocus
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Confirmer"
                  : "Confirm"}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={Error}
            onClose={() => {
              setError(false);
            }}
            maxWidth="sm"
            fullWidth
            style={{ boxShadow: "none" }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
              id="alert-dialog-title"
            >
              <HelpOutlineIcon sx={{ color: "#FF7900" }} />
              {sessionStorage.getItem("language") === "fr"
                ? "Erreur est survenue"
                : "Error occured"}
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {sessionStorage.getItem("language") === "fr"
                  ? "Le nouveau email que vous avez choisit est deja en utilisation"
                  : "The new email you have chosen is already in use"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setError(false);
                }}
                variant="text"
                color="success"
              >
                {sessionStorage.getItem("language") === "fr"
                  ? "Cacher"
                  : "Hide"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import format from "date-fns/format";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";

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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPlace(item) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [fav, setFav] = useState(false);
  const [open, setopen] = useState(false);
  const following = useSelector((state) => state.ProfileReducer?.following);
  const handleClose = () => {
    setopen(false);
  };
  const handleOpen = () => {
    setopen(true);
  };
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 

  useEffect(() => {
    for (let i = 0; i <= following?.length; i++) {
      if (item?.item?.id === following[i]) {
        setFav(true);
      }
    }
  }, []);

  const headers = {
    Authorization: sessionStorage.getItem("acces_token")?.toString(),
  };
  const call_api_get_user_info = () => {
    axios
      .get(process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "auth/info", {
        headers,
      })
      .then((value) => {
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
          type: "Following",
          following: value?.data?.data?.followings?.L,
        });

        sessionStorage.setItem("user_Id", value.data?.data.id.S);
      })
      .catch((err) => {});
  };

  const handlefollow = () => {
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/" +
          sessionStorage.getItem("user_Id") +
          "/follow/" +
          item?.item?.id,
        { name: item?.item?.name }
      )
      .then((value) => {
        call_api_get_user_info();
        setFav(!fav);
        handleClose();
      })
      .catch((err) => {});
  };
  const handleUnfollow = () => {
    axios
      .put(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER +
          "user/" +
          sessionStorage.getItem("user_Id") +
          "/unfollow/" +
          item?.item?.id,
        { name: item?.item?.name }
      )
      .then((value) => {
        call_api_get_user_info();
        setFav(!fav);
        handleClose();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        maxWidth="sm"
        fullWidth
        style={{ boxShadow: "none" }}
      >
        <DialogTitle id="alert-dialog-title">
          {sessionStorage.getItem("language") === "fr"
            ? "Confirmation"
            : "Confirmation"}
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton
            onClick={() => {
              setFav(!fav);
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!fav
              ? "Es-tu certain(e) de vouloir ajouter ce point d'intérêt à ta liste de favoris ?"
              : "Es-tu certain(e) de vouloir retirer ce point d'intérêt de ta liste de favoris ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              !fav ? handlefollow() : handleUnfollow();
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
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <img
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "100%",
              }}
              src={item?.item?.profile_image}
              alt="webscript"
            />
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={item?.item?.name}
          subheader={format(
            new Date(item?.item?.created_on),
            "dd/MM/yyyy HH:mm"
          )}
        />
        <br />
        <CardMedia
          component="img"
          height="160"
          image={item?.item?.banner_image}
        
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item?.item?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            sx={{ flexShrink: 1 }}
            onClick={() => {
              // setFav(!fav);
              inputRef.current.focus();
              handleOpen();
            }}
          >
            {fav ? (
              <StarIcon ref={inputRef} sx={{ color: "gold" }} />
            ) : (
              <StarOutlineIcon ref={inputRef} />
            )}
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>

          <Button
            size="small"
            variant="contained"
            sx={styleValidate}
            onClick={() => {
              setFav(!fav);
              history.push("/product");
              dispatch({
                type: "Id_association",
                id_association: item?.item?.id,
              });
              dispatch({
                type: "Association_name",
                association_name: item?.item?.name,
              });
            }}
            // href="https://odre.opendatasoft.com/explore/dataset/bornes-irve/map/?disjunctive.region&disjunctive.departement&refine.departement=Paris&location=15,48.88233,2.33646&basemap=jawg.light"
          >
            Join
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider>
              <Chip
                label="SDG's"
                size="small"
                sx={{
                  backgroundColor: "#08089C",
                  color: "#ffff",
                }}
              />
            </Divider>
            <Stack direction="row" spacing={1} sx={{ paddingY: "3%" }}>
              {item?.item?.sdg.map((item, index) => {
                return (
                  <>
                    <Chip
                      label={item?.short}
                      size="small"
                      sx={{
                        backgroundColor: item?.colorInfo?.hex,
                        color: "#ffff",
                      }}
                    />
                  </>
                );
              })}
            </Stack>
            <Divider>
              <Chip
                label="Activities"
                size="small"
                sx={{
                  backgroundColor: "#08089C",
                  color: "#ffff",
                }}
              />
            </Divider>
            <Stack direction="row" spacing={1} sx={{ paddingY: "3%" }}>
              {item?.item?.activity.map((item, index) => {
                return (
                  <>
                    <Chip
                      label={item?.label}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </>
                );
              })}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

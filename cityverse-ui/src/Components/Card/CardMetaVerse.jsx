import { Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Container, MenuItem, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import img from "../../Asset/Tour.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const FiCard = withStyles({
  root: {
    position: "relative",
  },
})(Card);
const FiCardActionArea = withStyles({
  root: {
    position: "relative",
  },
})(CardActionArea);
const FiCardActions = withStyles({
  root: {
    position: "relative",
  },
})(CardActions);

const FiCardContent = withStyles({
  root: {
    position: "relative",
    backgroundColor: "transparent",
  },
})(CardContent);

const FiCardMedia = withStyles({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
})(CardMedia);

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345,
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    height: 140,
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: "#ffffff",
    flexDirection: "row-reverse",
  },
  fiCardContentbottom: {
    color: "#ffffff",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%)",
    // display: "flex",
    // justifyItems: "right",
    flexDirection: "row",
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

export default function CardMetaVerse() {
  const theme = useTheme();
  const classes = useStyles();
  const [fav, setFav] = useState(true);
  const [open, setopen] = useState(false);
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
              setFav(!fav);
              handleClose();
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
      <FiCard className={classes.card}>
        <FiCardMedia
          media="picture"
          alt="Contemplative Reptile"
          image={img}
          title="Contemplative Reptile"
        />
        <FiCardContent className={classes.fiCardContent}>
          <br />
          <br />

          {/* <Typography
              variant="body2"
              className={classes.fiCardContentTextSecondary}
              component="p"
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
        </FiCardContent>
        <FiCardActions className={classes.fiCardContentbottom}>
          <Typography gutterBottom variant="subtitle2" component="h2">
            The Eiffel Tower Metaverse Experience
          </Typography>
          <>
            <>
              <IconButton
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
            </>
            <Button
              size="small"
              variant="contained"
              sx={styleValidate}
              onClick={() => {
                setFav(!fav);
              }}
              // href="https://odre.opendatasoft.com/explore/dataset/bornes-irve/map/?disjunctive.region&disjunctive.departement&refine.departement=Paris&location=15,48.88233,2.33646&basemap=jawg.light"
            >
              Join
            </Button>
          </>
        </FiCardActions>
      </FiCard>
    </>
  );
}

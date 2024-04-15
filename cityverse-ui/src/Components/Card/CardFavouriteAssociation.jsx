import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";

export default function FavouriteAssociation(item) {
  const theme = useTheme();
 
  const association = useSelector(
    (state) => state.AssociationReducer?.associations
  );
  const Following = useSelector(
    (state) => state.ProfileReducer?.following
  );

  const get_association_byIdName = () => {
    let object = null;
    for (let i = 0; i < association?.length ; i++){   
        if (association[i]?.id === item?.item) {
          return association[i];      
    }
  }
}

  useEffect(() => {
    get_association_byIdName();
  }, [])
  return (
     get_association_byIdName() !== undefined ? <Card
      sx={{
        display: "flex",
        width: "100%",
        margin: "0.5%",
        padding: "1%",
        background: "#EAEDED",
        boxShadow: 3
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ color: "#08089C"}}>
            {get_association_byIdName()?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {format(new Date(get_association_byIdName()?.created_on), "dd/MM/yyyy HH:mm")}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 1 }}>
          {get_association_byIdName()?.description}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 120, height: "auto" }}
        image={get_association_byIdName()?.profile_image}
        alt="Logo of association"
      />
    </Card> : <></>
  );
}

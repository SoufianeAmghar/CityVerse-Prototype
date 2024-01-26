import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import Stack from '@mui/material/Stack';



export default function CardVelo(item) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2">
          {item?.item?.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            sx={{ mr: "2px" }}
            label={
              item?.item?.is_installed === "OUI" ? "Installed" : "Not Installed"
            }
            color={item?.item?.is_installed === "OUI" ? "primary" : "secondary"}
          />
          <Chip
            size="small"
            label={
              item?.item?.is_renting === "OUI" ? "Is renting" : "Is not renting"
            }
            color={item?.item?.is_renting === "OUI" ? "primary" : "secondary"}
          />
          <Chip
            size="small"
            label={
              item?.item?.is_returning === "OUI"
                ? "Is returning"
                : "Is not returning"
            }
            color={item?.item?.is_returning === "OUI" ? "primary" : "secondary"}
          />
        </Stack>

        <Typography variant="body2" component="p">
          Num bikes available: <span style={{ color : "#08089C"}}>{item?.item?.numbikesavailable}</span><br/>
          Num docks available: <span style={{ color : "#08089C"}}> {item?.item?.numdocksavailable}</span><br/>
          Nom Arrondissement Communes: <span style={{ color : "#08089C"}}>{item?.item?.nom_arrondissement_communes}</span><br/>
          Capacity: <span style={{ color : "#08089C"}}>{item?.item?.capacity}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}


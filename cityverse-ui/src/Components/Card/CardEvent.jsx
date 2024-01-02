// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import {
  //   Alert,
  //   Container,

  Button,
  Avatar,
  //   Divider,
  //   FormControl,
  //   IconButton,
  //   InputLabel,
  //   Select,
  //   Snackbar,
  //   TextField,
  //   CardActionArea,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// export default function CardEvent() {
//   return (
//     <Card sx={{ maxWidth: 300, maxHeight: 350 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image={require("../../Asset/téléchargement.jpg")}
//           alt="green iguana"
//         ></CardMedia>
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             The color Purple movie
//           </Typography>
//           <Typography
//             variant="body3"
//             color="text.secondary"
//             sx={{ display: "flex", justifyItems: "center" }}
//           >
//             <EventIcon sx={{ paddingBottom: "1%" }} />
//             <span>Lundi, déc 25,23 </span>
//             <AccessTimeIcon sx={{ paddingBottom: "3%" }} />
//             <span>16:00</span>
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             We are going to have a good time, Join us on Christmas, admission is
//           </Typography>
//           <Button
//             sx={{
//               background:
//                 "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
//               color: "#708238",
//             }}
//             startIcon={<EventIcon />}
//           >
//             ça vous interesse?
//           </Button>
//         </CardContent>
// //       </CardActionArea>
// //     </Card>
// //   );
// // }

import * as React from "react";
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

export default function CardEvent() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: 300,
        maxHeight: 300,
        flexDirection: "rows",
       
      }}
    >
      {/* <Box sx={{ alignItems: "center", justifyItems: "center" }}>
        <Avatar
          sx={{
            position: "absolute",
            top: 10 / 2,
            left: -1,
            width: 40,
            height: 40,
            background:
              "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
          }}
        >
          DA
        </Avatar>
      </Box> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            The color Purple movie
          </Typography>
          <Typography
            variant="body3"
            color="text.secondary"
            sx={{ display: "flex", justifyItems: "center" }}
          >
            <EventIcon sx={{ paddingBottom: "3%" }} />
            <span>Lundi, déc 25,23 </span>
            <AccessTimeIcon sx={{ paddingBottom: "3%" }} />
            <span>16:00</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We are going to have a good time, Join us on Christmas, admission is
            ...
          </Typography>
          <Button
            sx={{
              background:
                "linear-gradient(180deg, rgba(190, 255, 157, 0.93) 0%, #9FFF6F 21.35%)",
              color: "#708238",
            }}
            startIcon={<EventIcon />}
          >
            ça vous interesse?
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

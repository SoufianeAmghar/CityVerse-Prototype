import { useState } from "react";
import { Card } from "@mui/material";
import { Container } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

const styleValidate = {
  backgroundColor: "success",
  minWidth: "25%",
  left: "35%",
  borderRadius: "20px",
  color: "#fff",
};

const styleCancelDelete = {
  color: "#008000",
  right: "0%",
  border: "1px solid #008000",
  borderRadius: "4px",
  backgroundColor: "#fff",
  width: "20%",
};

export default function PersonalDetails() {
  const [firstName, setFirstName] = useState("abdel");
  const [SecondeName, setSecondeName] = useState("Daoudi");
  const [email, setEmail] = useState("abdel.daoudi@gmaul.com");
  const [phone, setPhone] = useState("+21260000000");
  const [adress1, setadress1] = useState("35 Rue de Torcy");
  const [adress2, setadress2] = useState("Paris");
  const [passWord, setPassWord] = useState("testtest2024");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const objectForm = {
    firstName: firstName,
    SecondeName: SecondeName,
    email: email,
    phone: phone,
    adress1: adress1,
    adress2: adress2,
    passWord: passWord,
    selectedImage: selectedImage,
  };

  return (
    <Box disableGutters component="main" width="99%" sx={{}}>
      <Card sx={{ borderRadius: "0px" }}>
        <div className="border"></div>
        <br></br>
        <Container
          disableGutters
          maxWidth="80%"
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
              <AccountCircleIcon className="paramsIconColorCedant" />
            </div>
            <Typography
              color="text.primary"
              style={{
                fontWeight: "600",
                marginLeft: "1%",
                paddingBottom: "5%",
              }}
              component="h1"
              variant="h4"
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Personal details"
                : "Personal details"}
            </Typography>
          </div>
          <Box
            component="form"
            // onSubmit={() => ()}
            sx={{
              p: 4,
              paddingLeft: 6,
              background: "#0000",
              "& > :not(style)": { m: 2, width: "44.2%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr"
                  ? "Nom"
                  : "First Name"
              }
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr"
                  ? "Nom"
                  : "Last Name"
              }
              value={SecondeName}
              onChange={(e) => setSecondeName(e.target.value)}
            />
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr" ? "email" : "Email"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr" ? "Tél" : "Phone"
              }
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr"
                  ? "Adress Line 1"
                  : "Adress Line 1"
              }
              value={adress1}
              onChange={(e) => setadress1(e.target.value)}
            />
            <TextField
              size="small"
              focused
              variant="outlined"
              color="success"
              // InputProps={{
              //   className: classes.input,
              // }}
              InputLabelProps={{ style: { color: "black" } }}
              //error={name.length === 0 ? true : false}
              placeholder={
                sessionStorage.getItem("language") === "fr"
                  ? "Obligatoire"
                  : "Required"
              }
              label={
                sessionStorage.getItem("language") === "fr"
                  ? "Adress Line 2"
                  : "Adress Line 2"
              }
              value={adress2}
              onChange={(e) => setadress2(e.target.value)}
            />
            <FormControl variant="outlined" color="success" focused>
              <InputLabel htmlFor="Password" variant="outlined" color="success" InputLabelProps={{ style: { color: "black" } }}>
                {sessionStorage.getItem("language") === "fr"
                  ? "Mot de passe"
                  : "Password"}
              </InputLabel>
              <OutlinedInput
                color="success"
                id="Password"
                variant="outlined"
                type={values.showPassword ? "text" : "password"}
                value={passWord}
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={
                  sessionStorage.getItem("language") === "fr"
                    ? "Mot de passe"
                    : "Password"
                }
              />
            </FormControl>
            <Stack direction="row" alignItems="center" spacing={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
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
                  Upload Profile Image
                </Button>
              </label>
              <div style={{ position: "relative" }}>
                {selectedImage && (
                  <>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100%",
                      }}
                      src={selectedImage}
                      alt="Uploaded"
                    />
                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        color: "#08089C",
                      }}
                      onClick={() => {
                        setSelectedImage(null);
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
            }}
            noValidate
            autoComplete="off"
          >
            <Button
              variant="contained"
              color="success"
              // disabled={handleAdd()}
              sx={styleValidate}
              onClick={(event) => {
                console.log("object", objectForm);
              }}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Sauvegarder"
                : "Save"}
            </Button>
            {/* <Button
              variant="contained"
              style={{
                backgroundColor: "#FFFF",
                minWidth: "20%",
                color: "#08089C",
                borderRadius: "20px",
              }}
              onClick={() => {}}
            >
              {sessionStorage.getItem("language") === "fr"
                ? "Réinitialiser"
                : "Reset"}
            </Button> */}
          </Box>
        </Container>
      </Card>
    </Box>
  );
}

import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import store from "./State/store";
import Theme from "./Theme";
import { UserProvider } from "./context/UserContext";


ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <UserProvider>
       <Provider store={store}>
            <AppWrapper />
        </Provider>
    </UserProvider>    
  </ThemeProvider>,
  document.getElementById("root")
);

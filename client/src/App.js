import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import CustomerProfile from "./profiles/pages/CustomerProfile";
import NavBar from "./shared/navigation/NavBar";

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar />
                <Route path="/" component={CustomerProfile} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;

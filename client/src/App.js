import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import RecipeContextProvider from "./context/RecipeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";
import "./App.css";
import { ContextProvider } from "./context/UserContext";
import TestComponent from "./pages/TestComponent";
import SuccessPage from "./pages/SuccessPage";
import TestChefProfile from "./pages/TestChefProfile";
import BrowseChefs from "./pages/BrowseChefs";

// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./pages/Payment";

/** This will be moved once we have a parent component for payment */
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <RecipeContextProvider>
            <Elements stripe={promise}>
              <Switch>
                <Route path="/profile" component={CustomerProfile}>
                  <NavBar />
                </Route>
                <Route path="/test" component={TestComponent} />
                <Route path="/success" component={SuccessPage} />
                {/** This will be moved once we have a parent component for payment */}
                <Route
                  path="/payment"
                  render={(props) => <Payment {...props} />}
                />
                <Route path="/chef" component={TestChefProfile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/browsechefs" component={BrowseChefs} />
                <Route path="/" component={Login} exact>
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </Elements>
          </RecipeContextProvider>
        </ContextProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;

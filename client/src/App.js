import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import RecipeContextProvider from "./context/RecipeContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import "./App.css";
import { ContextProvider } from "./context/UserContext";
import TestComponent from "./pages/TestComponent";
import SuccessPage from "./pages/SuccessPage";

import ChatTest from "./pages/ChatTest";

// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./pages/Payment";
import ChefProfile from "./pages/ChefProfile";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NavBar from "./components/NavBar";

/** This will be moved once we have a parent component for payment */
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Private = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/success" component={SuccessPage} />
        <Route path="/payment" render={(props) => <Payment {...props} />} />
        <Route path="/test" component={TestComponent} />
        <Route path="/profile" component={CustomerProfile} />
        <Route path="/chefprofile" component={ChefProfile} />
      </Switch>
    </>
  );
};

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
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/testchat" component={ChatTest} />

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

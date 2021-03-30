import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import "./App.css";
import { ContextProvider } from "./context/UserContext";
import TestComponent from "./pages/TestComponent";
import SuccessPage from "./pages/SuccessPage";
// stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./pages/Payment";
import Messages from "./pages/Messages";
import ChefProfile from "./pages/ChefProfile";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NavBar from "./components/NavBar";
import OrderList from "./pages/OrderList";
import BrowseChefs from "./pages/BrowseChefs";

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
        <Route
          path="/chefprofile/:userId?/:recipeId?"
          component={ChefProfile}
        />
        <Route path="/orders/:orderId?" component={OrderList} />
        <Route path="/browsechefs" component={BrowseChefs} />
        <Route path="/messages" component={Messages} />
      </Switch>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <Elements stripe={promise}>
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={Signup} exact />
              <ProtectedRoutes path="/" component={Private} />
            </Switch>
          </Elements>
        </ContextProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;

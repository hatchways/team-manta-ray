import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
// import { UserContext } from "./Context/UserContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";
import "./App.css";
import { ContextProvider } from "./Context/UserContext";
import TestComponent from "./pages/TestComponent";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState(null);

  // let routes;

  // if (isLoggedIn) {
  //   routes = (
  //     <Switch>
  //       <Route path="/profile" component={CustomerProfile} />
  //       <Redirect to="/profile" />
  //     </Switch>
  //   );
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/login" component={Login} />

  //       <Route path="/signup" component={Signup} />

  //       <Redirect to="/login" />
  //     </Switch>
  //   );
  // }

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <Switch>
            <Route path="/profile" component={CustomerProfile}>
              <NavBar />
            </Route>
            <Route path="/test" component={TestComponent} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/" component={Login} exact>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </ContextProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );

  // return (
  //   <UserContext.Provider
  //     value={{
  //       isLoggedIn: isLoggedIn,
  //       setIsLoggedIn: setIsLoggedIn,
  //       userData: userData,
  //       setUserData: setUserData,
  //     }}
  //   >
  //     <MuiThemeProvider theme={theme}>
  //       <BrowserRouter>
  //         {isLoggedIn && <NavBar />}
  //         <main>{routes}</main>
  //       </BrowserRouter>
  //     </MuiThemeProvider>
  //   </UserContext.Provider>
  // );
}

export default App;

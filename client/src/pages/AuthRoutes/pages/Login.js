import React, { useState, useContext } from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Banner from "../components/Banner";
import FormikControl from "../../shared/Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";

import { login } from "../../../mockAPI";

import { AuthContext } from "../../shared/context/auth-context";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(3, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  margin: {
    margin: theme.spacing(4, 4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  btn: {
    borderRadius: "0",
    width: "50%",
    height: theme.spacing(7),
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { setIsLoggedIn, setUserData } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password too short"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    setOpen(true);
    const userData = await login(); //Get data from mock API
    setUserData(userData);
    setIsLoggedIn(true);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <img src="/images/logo.svg" alt="logo" className={classes.margin} />
        <div className={classes.paper}>
          <Typography variant="h3">Login</Typography>
          <div className={classes.form}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <FormikControl
                    control="input"
                    type="email"
                    label="EMAIL"
                    name="email"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="PASSWORD"
                    name="password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.btn}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <Snackbar
          open={open}
          onClose={handleClose}
          message="Invalid Email or Password"
          autoHideDuration={4000}
          className={classes.alert}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        />
      </Grid>
      <Banner />
    </Grid>
  );
};

export default Login;

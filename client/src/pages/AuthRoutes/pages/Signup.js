import React, { useState } from "react";
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
import { useStyles } from "./Login";
import Banner from "../components/Banner";
import FormikControl from "../../shared/Formik/FormikControl";

const Signup = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password too short"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    setOpen(true);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <img src="/images/logo.jpg" alt="logo" className={classes.margin} />
        <div className={classes.paper}>
          <Typography component="h3" variant="h3">
            Create an account
          </Typography>
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
                    type="name"
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label="EMAIL"
                    name="email"
                    placeholder="Enter your e-mail address"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="PASSWORD"
                    name="password"
                    placeholder="Enter password"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="CONFIRM PASSWORD"
                    name="confirmPassword"
                    placeholder="Confirm password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.btn}
                  >
                    Sign Up
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
      <Banner signUp={true} />
    </Grid>
  );
};

export default Signup;

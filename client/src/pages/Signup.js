import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, Snackbar } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useStyles } from "./Login";
import Banner from "../components/Banner";
import FormikControl from "../components/Formik/FormikControl";

import Logo from "../components/Logo";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";

const Signup = ({ history }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  // dispatch from reducer
  const dispatch = useContext(UserDispatchContext);

  // Context values
  const { loading, error, userInfo } = useContext(UserContext);

  // check if user logged in
  useEffect(() => {
    if (userInfo && userInfo.isChef) {
      history.push("/chefprofile");
    } else if (userInfo) {
      history.push("/profile");
    }
  }, [userInfo, history]);

  const handleClose = () => {
    setOpen(false);
  };

  // const isChefOptions = [
  //   { key: "isChef", value: "true" },
  //   { key: "isChef", value: "false" },
  // ];

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChef: false,
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

  const onSubmit = async (values) => {
    let payload = {};

    payload.name = values.name;
    payload.email = values.email;
    payload.password = values.password;
    payload.isChef = values.isChef;

    try {
      const user = await register(dispatch, payload); //Get data from backend API

      if (user) {
        history.push("/profile");
      } else setOpen(true);
    } catch (err) {
      console.log(err);
    }

    setOpen(true);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Logo className={classes.margin} />
        <div className={classes.paper}>
          <Typography component="h3" variant="h3">
            Create an account
          </Typography>

          {loading && <Loader />}
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
                  <FormikControl
                    control="checkbox"
                    type="checkbox"
                    label="I AM A CHEF"
                    name="isChef"
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
          message={error}
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

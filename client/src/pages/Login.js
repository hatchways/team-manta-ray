import React, { useState, useContext, useEffect } from "react";
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
import FormikControl from "../components/Formik/FormikControl";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../actions/userActions";
import logo from "../assets/logo.svg";
import Loader from "../components/Loader";

import { UserContext, UserDispatchContext } from "../context/UserContext";

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

const Login = ({ history }) => {
  const classes = useStyles();

  // dispatch function from reducer
  const dispatch = useContext(UserDispatchContext);

  // data from context
  const { loading, error, userInfo } = useContext(UserContext);

  // check if userInfo is present (user logged in)
  useEffect(() => {
    if (userInfo) {
      history.push("/test"); // push to test component
    }
  }, [userInfo, history]);

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
    let payload = {};

    // payload values for request
    payload.email = values.email;
    payload.password = values.password;

    try {
      const user = await login(dispatch, payload); // Get data from backend API using User Actions

      if (user) {
        history.push("/test");
      } else setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <img src={logo} alt="logo" className={classes.margin} />
        <div className={classes.paper}>
          <Typography variant="h3">Login</Typography>

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
          message={error}
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

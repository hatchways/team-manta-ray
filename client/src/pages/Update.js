import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { updatePassword } from "../actions/userActions";
import Loader from "../components/Loader";

const Update = ({ history }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    title: {
      margin: theme.spacing(3),
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      marginTop: theme.spacing(15),
      padding: theme.spacing(2),
      maxWidth: "50%",
      alignItems: "center",
    },
    formData: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(3),
    },
    textField: {
      width: "100%",
    },
    btn: {
      width: "50%",
      margin: theme.spacing(3),
      padding: theme.spacing(2),
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
  const { userInfo, loading, error } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.replace("/login");
    }
  }, [userInfo, history]);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      oldPassword.trim() !== "" ||
      password.trim() !== "" ||
      oldPassword.trim() !== ""
    ) {
      if (oldPassword.length <= 6 || password.length <= 6) {
        setErrMsg("Password too short");
        setErrorOpen(true);
      } else if (password !== confirmPassword) {
        setErrMsg("Password do not match");
        setErrorOpen(true);
      } else if (oldPassword === password) {
        setErrMsg("Please enter a new password!");
        setErrorOpen(true);
      } else {
        let payload = {};
        payload.userId = userInfo._id;
        payload.oldPassword = oldPassword;
        payload.password = password;
        payload.confirmPassword = confirmPassword;

        try {
          const res = await updatePassword(dispatch, payload);
          if (res && res.success) {
            setSuccessMsg(res.message);
            setSuccessOpen(true);
          } else if (error) {
            if (error) setErrMsg(error);
            setErrorOpen(true);
          }
        } catch (err) {
          console.log(err);
          if (error) setErrMsg(error);
          setErrorOpen(true);
        }
      }
    } else {
      setErrMsg("Cannot submit empty values");
      setErrorOpen(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <div className={classes.title}>
          <Typography variant="h3">Update your password</Typography>
        </div>
        <FormControl className={clsx(classes.formData, classes.textField)}>
          <InputLabel htmlFor="input-old-password">
            Enter Old Password
          </InputLabel>
          <Input
            id="input-old-password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            helperText="Incorrect entry."
            onChange={(e) => setOldPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={clsx(classes.formData, classes.textField)}>
          <InputLabel htmlFor="input-password">Enter New Password</InputLabel>
          <Input
            id="input-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={clsx(classes.formData, classes.textField)}>
          <InputLabel htmlFor="input-confirm-password">
            Confirm Password
          </InputLabel>
          <Input
            id="input-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {loading && <Loader />}
        <Button
          className={clsx(classes.btn)}
          disabled={loading}
          color="secondary"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Snackbar
          open={successOpen}
          autoHideDuration={5000}
          onClose={() => setSuccessOpen(false)}
        >
          <Alert severity="success">{successMsg}</Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
          autoHideDuration={5000}
          message={error}
          onClose={() => setErrorOpen(false)}
        >
          <Alert severity="error">{error ? error : errMsg}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Update;

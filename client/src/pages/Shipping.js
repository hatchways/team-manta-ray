import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FormControl, Snackbar, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { saveShippingAddress } from "../actions/cartActions";

import { UserContext, UserDispatchContext } from "../context/UserContext";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    scrollY: "hidden",
    marginTop: theme.spacing(6),
    padding: theme.spacing(5),
  },
  backButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  instructions: {
    fontSize: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    alignItems: "left",
  },
  formContainer: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
    alignItems: "left",
    minWidth: "300px",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(22),
    flexGrow: "1",
  },
  formData: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },

  review: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  shippingDetails: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 1, 1, 0),
    borderBottom: "1px solid lightgrey",
  },
  orderDate: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 1, 1, 0),
    borderBottom: "1px solid lightgrey",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    margin: theme.spacing(1, 0),
    fontWeight: "normal",
  },
}));

const Shipping = ({ history }) => {
  const classes = useStyles();
  // dispatch function from reducer
  const dispatch = useContext(UserDispatchContext);
  const { shippingAddress } = useContext(UserContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [instructions, setInstructions] = useState("");

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      history.push("/payment");
    }

    if (activeStep === 0) {
      if (
        address === undefined ||
        address.trim() === "" ||
        city === undefined ||
        city.trim() === "" ||
        postalCode === undefined ||
        postalCode.trim() === ""
      ) {
        setError("Cannot submit empty values!");
        setOpen(true);
      } else {
        saveShippingAddress(dispatch, { address, city, postalCode });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Date change handler
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Shipping";
      case 1:
        return "Pick Date and Time";
      case 2:
        return "Review";
      default:
        return "Unknown stepIndex";
    }
  }

  function getSteps() {
    return ["Shipping", "Pick Date and Time", "Review"];
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div className={classes.formContainer}>
          {activeStep === 0 && (
            <>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>

              <FormControl className={classes.formData}>
                <TextField
                  label="Address"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  required
                  variant="filled"
                  helperText={error}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formData}>
                <TextField
                  type="text"
                  label="City"
                  placeholder="Enter City"
                  value={city}
                  required
                  helperText={error}
                  variant="filled"
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formData}>
                <TextField
                  type="text"
                  label="Postal Code"
                  placeholder="Enter Postal Code"
                  value={postalCode}
                  required
                  helperText={error}
                  variant="filled"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormControl>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>

              <FormControl className={classes.formData}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    disablePast
                    required
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    label="Pick a date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    required
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>

              <FormControl className={classes.formData}>
                <TextField
                  type="text"
                  label="Additional Notes"
                  placeholder="Special instructions, Buzzer #, Specific requests"
                  value={instructions}
                  marfin="normal"
                  variant="filled"
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </FormControl>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>

              {
                <div className={classes.review}>
                  <div className={classes.shippingDetails}>
                    <h2 className={classes.title}>SHIPPING</h2>
                    <p>
                      <strong>Address: </strong>
                      {shippingAddress.address}, {shippingAddress.city},{" "}
                      {shippingAddress.postalCode}
                    </p>
                  </div>
                  <div className={classes.orderDate}>
                    <h2 className={classes.title}>ORDER DATE</h2>
                    <p>
                      <strong>Date:</strong>
                      {" " + selectedDate}{" "}
                    </p>
                  </div>

                  {instructions && (
                    <>
                      <h2 className={classes.title}>Instructions</h2>
                      {instructions}
                    </>
                  )}
                </div>
              }
            </>
          )}
          <div className={classes.buttons}>
            <Button
              type="submit"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
              variant="contained"
              color="primary"
            >
              Back
            </Button>
            <Button
              type="submit"
              className={classes.backButton}
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            <Snackbar
              open={open}
              onClose={handleClose}
              message={error}
              autoHideDuration={10000}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
// stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import Loader from "../components/Loader";
import sushi from "../assets/sushi.png";

//Shipping checkout
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { FormControl, Snackbar, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { saveShippingAddress, saveBooking } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
//MUI date time picker
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    flexGrow: "1",
  },

  backButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  instructions: {
    fontSize: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    alignItems: "left",
  },
  formContainer: {
    display: "flex",
    width: "80%",
    flexDirection: "column",
    alignItems: "left",
    minWidth: "300px",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    background: "white",
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
    padding: theme.spacing(0, 0, 1),
    borderBottom: "1px solid lightgrey",
  },
  orderDate: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0, 0, 1),
    borderBottom: "1px solid lightgrey",
  },
  requests: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 0, 1),
    marginTop: theme.spacing(1),
    borderBottom: "1px solid lightgrey",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  heading: {
    margin: theme.spacing(2, 0),
    fontWeight: "normal",
  },
  reviewContainer: {
    background: "white",
  },
  innerForm: {
    background: "white",
  },

  paper: {
    margin: theme.spacing(3, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  margin: {
    margin: theme.spacing(5),
  },

  form: {
    width: "50vw",
    alignSelf: "center",
    borderRadius: "7px",
    padding: theme.spacing(2, 0, 2, 0),
  },

  input: {
    borderRadius: "6px",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    border: "1px solid rgba(50, 50, 93, 0.1)",
    maxHeight: "44px",
    fontSize: "16px",
    width: "100%",
    background: "white",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    flexGrow: "1",
    height: "100vh",
  },

  left__container: {
    display: "flex",
    flexDirection: "column",
    flex: "0.6",
    height: "100vh",
    background: "white",
    marginTop: theme.spacing(10),
  },
  right__container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    flex: "0.4",
    marginTop: theme.spacing(10),
  },
  logo: {
    margin: theme.spacing(2, 1, 0, 1),
    padding: theme.spacing(2, 2, 1, 2),
  },

  order: {
    margin: theme.spacing(5, 5, 0, 5),
    background: "white",
    padding: theme.spacing(2),

    "& h4": {
      textAlign: "center",
    },
  },

  orderDetails: {
    display: "flex",
    "& p": {
      marginTop: theme.spacing(3),
      textAlign: "left",
    },
  },

  cardDetails: {
    fontSize: theme.spacing(2),
  },

  btn: {
    borderRadius: "0",
    height: theme.spacing(7),
    margin: theme.spacing(0, 5, 0, 5),
    padding: theme.spacing(0, 2, 0, 2),
    textTransform: "capitalize",
    fontWeight: "500",
  },
  cardError: {
    margin: theme.spacing(2),
    color: "rgb(105, 115, 134)",
    fontSize: "16px",
    lineHeight: "20px",
    marginTop: theme.spacing(8),
    textAlign: "center",
  },

  img: {
    height: theme.spacing(9),
    width: theme.spacing(9),
    margin: theme.spacing(3),
  },

  orderTotal: {
    color: "#FF743D",
    fontWeight: "bold",
  },

  paymentDetails: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  title: {
    paddingLeft: theme.spacing(6),
  },

  resultMessage: {
    lineHeight: "22px",
    fontSize: "16px",
  },

  hidden: {
    display: "none",
  },
}));

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Payment = ({ history }) => {
  const classes = useStyles();
  // dispatch function from reducer
  const dispatch = useContext(UserDispatchContext);
  const { shippingAddress, bookingDate } = useContext(UserContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    bookingDate.selectedDate || new Date(Date.now())
  );
  const [instructions, setInstructions] = useState(
    bookingDate.instructions || ""
  );

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        address === undefined ||
        address.trim() === "" ||
        city === undefined ||
        city.trim() === "" ||
        postalCode === undefined ||
        postalCode.trim() === ""
      ) {
        setErrorMsg("Cannot submit empty values!");
        setOpen(true);
      } else {
        saveShippingAddress(dispatch, { address, city, postalCode });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      saveBooking(dispatch, { selectedDate, instructions });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
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
      case 3:
        return "Pay";
      default:
        return "Unknown stepIndex";
    }
  }

  function getSteps() {
    return ["Shipping", "Pick Date and Time", "Review", "Pay"];
  }

  // stripe
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // data from context
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) {
      history.replace("/login");
    }

    // Create PaymentIntent as soon as the page loads
    fetch("/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt" }],
        userInfo,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [history, userInfo]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      // for future use
      setup_future_usage: "off_session",
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      history.replace("/success");
      placeOrder();
    }
  };

  const placeOrder = () => {
    createOrder(dispatch, {
      orderItems: {
        id: "605a05d716942757f1ea8b2b",
        name: "xyz",
        quantity: 1,
        image: "image url",
        price: 23.98,
      },
      shippingAddress: shippingAddress,
      bookingDate: bookingDate.selectedDate,
      totalPrice: 65.12,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.left__container}>
          <Stepper color="secondary" activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.checkoutForm}>
            <div className={classes.formContainer}>
              {activeStep === 0 && (
                <div className={classes.innerForm}>
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
                      variant="filled"
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </FormControl>
                </div>
              )}

              {activeStep === 1 && (
                <div className={classes.innerForm}>
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
                </div>
              )}

              {activeStep === 2 && (
                <div className={classes.reviewContainer}>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>

                  {
                    <div className={classes.review}>
                      <div className={classes.shippingDetails}>
                        <Typography className={classes.heading} variant="h5">
                          SHIPPING
                        </Typography>

                        <Typography>
                          Address: {shippingAddress.address},{" "}
                          {shippingAddress.city}, {shippingAddress.postalCode}
                        </Typography>
                      </div>
                      <div className={classes.orderDate}>
                        <Typography className={classes.heading} variant="h5">
                          ORDER DATE
                        </Typography>
                        <Typography>Date: {" " + selectedDate} </Typography>
                      </div>

                      {instructions && (
                        <div className={classes.requests}>
                          <Typography className={classes.heading} variant="h5">
                            INSTRUCTIONS
                          </Typography>

                          <Typography>{instructions}</Typography>
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}

              {activeStep === 3 && (
                <>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <form className={classes.form} id="payment-form">
                    <div className={classes.paymentDetails}>
                      <Typography className={classes.cardDetails}>
                        Enter your payment details:
                      </Typography>
                    </div>
                    <CardElement
                      className={classes.input}
                      id="card-element"
                      options={cardStyle}
                      onChange={handleChange}
                    />
                  </form>
                </>
              )}
              <div className={classes.buttons}>
                {activeStep === 3 ? (
                  <Button
                    type="submit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                    variant="contained"
                    color="secondary"
                  >
                    Back
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                      variant="contained"
                      color="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className={classes.backButton}
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </>
                )}

                <Snackbar
                  open={open}
                  onClose={handleClose}
                  message={errorMsg}
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
        <div className={classes.right__container}>
          <div className={classes.order}>
            <Typography variant="h4">Your order:</Typography>
            {/**This section will be isolated in the individual order component */}
            <div className={classes.orderDetails}>
              <img className={classes.img} src={sushi} alt="test" />
              <Typography>
                2 Yakisoba dishes, 6 sushi rolls and 10pc sashimi
              </Typography>
            </div>
            <div className={classes.orderTotal}>
              <Typography variant="h5">
                Total: <span className={classes.orderTotal}>$30.00</span>
              </Typography>
            </div>
          </div>
          <Button
            disabled={processing || disabled || succeeded}
            id="submit"
            className={classes.btn}
            color="secondary"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            <span id="button-text">{processing ? <Loader /> : "Checkout"}</span>
          </Button>

          {error && <div className={classes.cardError}>{error}</div>}

          <p
            className={
              succeeded ? `${classes.resultMessage}` : `${classes.hidden}`
            }
          >
            Payment succeeded, see the result in your Stripe dashboard. Refresh
            the page to pay again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;

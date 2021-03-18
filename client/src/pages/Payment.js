import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
// stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import sushi from "../assets/sushi.png";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    scrollY: "hidden",
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
    width: "30vw",
    alignSelf: "center",

    borderRadius: "7px",
    padding: "40px",
  },

  input: {
    borderRadius: "6px",
    marginBottom: "6px",
    padding: "12px",
    border: "1px solid rgba(50, 50, 93, 0.1)",
    maxHeight: "44px",
    fontSize: "16px",
    width: "100%",
    background: "white",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
  },

  left__container: {
    display: "flex",
    flexDirection: "column",
    flex: "0.6",
    height: "90vh",
    background: "white",
    overflowY: "hidden",
  },
  right__container: {
    display: "flex",
    flexDirection: "column",
    flex: "0.4",
  },
  logo: {
    margin: "20px",
    padding: "20px",
    borderBottom: "1px solid lightgrey",
  },

  order: {
    marginTop: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    background: "white",
    padding: "20px",

    "& h4": {
      textAlign: "center",
    },
  },

  orderDetails: {
    display: "flex",
    "& p": {
      marginTop: "30px",
      textAlign: "left",
    },
  },

  btn: {
    borderRadius: "0",
    height: theme.spacing(7),
    margin: "0 50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  cardError: {
    margin: "20px",
    color: "rgb(105, 115, 134)",
    fontSize: "16px",
    lineHeight: "20px",
    marginTop: "12px",
    textAlign: "center",
  },

  img: {
    height: "100px",
    width: "100px",
    margin: "20px 20px",
  },

  orderTotal: {
    color: "#FF743D",
    fontWeight: "bold",
  },

  paymentDetails: {
    marginLeft: "12px ",
    marginBottom: "20px ",
  },

  title: {
    paddingLeft: "60px",
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

    window
      .fetch("/payment", {
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
    }
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <div className={classes.left__container}>
          <div className={classes.logo}>
            <Typography variant="h3" className={classes.title}>
              Checkout
            </Typography>
          </div>

          <form
            className={classes.form}
            id="payment-form"
            // onSubmit={handleSubmit}
          >
            <div className={classes.paymentDetails}>
              <Typography variant="h6">Enter your payment details:</Typography>
            </div>
            <CardElement
              className={classes.input}
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className={classes.right__container}>
          <div className={classes.order}>
            <Typography variant="h4">Your order:</Typography>
            {/**This section will be isolated in the individual order component */}
            <div className={classes.orderDetails}>
              <img className={classes.img} src={sushi} alt="test" />
              <p>2 Yakisoba dishes, 6 sushi rolls and 10pc sashimi</p>
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
          {/* Show any error that happens when processing the payment */}

          {error && <div className={classes.cardError}>{error}</div>}

          {/* Show a success message upon completion */}
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

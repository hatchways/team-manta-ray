import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, makeStyles, AppBar, Tabs, Tab, Grid } from "@material-ui/core";
import OrderTable from "../components/OrderTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    // display: "flex",
    // justifyContent: "space-around",
    // flexWrap: "wrap",
  },
  sideBar: {
    height: "100%",
    marginRight: theme.spacing(5),
  },
  orders: {
    // height: "85vh",
    // width: "85vw",
  },
  paper: {
    // height: "97%",
    // width: "100%",
    // fontFamily: "Montserrat, sans-serif",
  },
  tabs: {
    backgroundColor: "#fff",
    color: "#000",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  margin: {
    margin: "10px",
    marginRight: "2px",
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const OrderList = ({ match }) => {
  const classes = useStyles();

  const { orderId } = match.params;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [upcomingOrders, setUpcomingOrders] = useState(null);
  const [previousOrders, setPreviousOrders] = useState(null);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const getAllOrders = async () => {
      const res = await axios.get("/api/orders");
      if (res.data) {
        setAllOrders(res.data.orders);
      }
    };
    if (!allOrders) {
      getAllOrders();
    } else {
      const upcomingOrders = allOrders.filter(
        (order) => new Date(order.bookingDate) >= Date.now()
      );
      const previousOrders = allOrders.filter(
        (order) => new Date(order.bookingDate) < Date.now()
      );
      setUpcomingOrders(upcomingOrders);
      setPreviousOrders(previousOrders);
    }

    if (orderId) {
      const selectedOrder = allOrders.find(
        (order) => order._id.toString() === orderId
      );
      setSelectedOrder(selectedOrder);
      window.history.pushState({}, document.title, "/orders");
    }
    return () => {
      setSelectedOrder(null);
    };
  }, [orderId, allOrders]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.root}>
    <Grid container className={classes.root} direction="column">
      {/* <div className={classes.sidebar}> */}
      <Grid item xs={12} className={classes.margin} container wrap="wrap">
        <AppBar position="static">
          <Tabs
            onChange={handleChange}
            value={value}
            orientation="horizontal"
            className={classes.tabs}
          >
            <Tab label="Upcoming orders" {...a11yProps(0)} />
            <Tab label="Previous orders" {...a11yProps(1)} />
            <Tab label="All orders" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </Grid>
      {/* <Grid item md={1} xs={0}></Grid> */}
      <Grid item xs={12} className={classes.margin}>
        {/* <div className={classes.orders}> */}
        <Paper className={classes.paper} elevation={5}>
          <TabPanel value={value} index={0}>
            <OrderTable
              orders={upcomingOrders}
              title="Upcoming orders"
              selectedOrder={selectedOrder}
              setSelectedOrder={(v) => setSelectedOrder(v)}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderTable orders={previousOrders} title="Previous orders" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OrderTable orders={allOrders} title="All orders" />
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderList;

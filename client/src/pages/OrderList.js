import React from "react";
import {
  Paper,
  makeStyles,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
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
    display: "flex",
    justifyContent: "space-around",
  },
  sideBar: {
    height: "100%",
    marginRight: theme.spacing(5),
  },
  orders: {
    height: "85vh",
    width: "60vw",
  },
  paper: {
    height: "97%",
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  },
  tabs: {
    backgroundColor: "#fff",
    color: "#000",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const OrderList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  //-------------Dummy Data------------------//
  const allOrders = [
    {
      _id: "123456",
      user: "mina",
      price: 200,
      time: new Date(2020, 6, 6),
      address: "152 king street",
      items: [{ recipeId: 1, name: "sushi", pictureUrl: "p.png", qty: 4 }],
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <AppBar position="static">
          <Tabs
            onChange={handleChange}
            value={value}
            orientation="vertical"
            className={classes.tabs}
          >
            <Tab label="Upcoming orders" {...a11yProps(0)} />
            <Tab label="Previous orders" {...a11yProps(1)} />
            <Tab label="All orders" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.orders}>
        <Paper className={classes.paper} elevation={5} square>
          <TabPanel value={value} index={0}>
            <OrderTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OrderTable orders={allOrders} />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default OrderList;

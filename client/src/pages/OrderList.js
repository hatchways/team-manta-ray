import React from "react";
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

const OrderList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  //-------------Dummy Data------------------//
  const allOrders = [
    {
      _id: "123456",
      user: {
        _id: 2,
        name: "Sara Green",
        pictureUrl:
          "https://bucket-chef-image.s3.amazonaws.com/2c4612ed-42e6-4b97-8c0a-7c644c4fc664.png",
      },
      totalPrice: 89,
      time: new Date("2021-02-25T14:20:00Z"),
      address: "152 king street",
      items: [
        {
          _id: 1,
          name: "sushi",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 4,
          price: 15,
          ingredients: ["salmon", "pepper"],
        },
        {
          _id: 2,
          name: "Parmesan Chiken",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 3,
          price: 10,
          ingredients: ["salt", "pepper"],
        },
        {
          _id: 4,
          name: "beef wellington",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 2,
          price: 10,
          ingredients: ["parmesan", "beef"],
        },
        {
          _id: 3,
          name: "Tortilla soup",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 5,
          price: 14,
          ingredients: ["salt", "pepper"],
        },
      ],
    },
    {
      _id: "123457",
      user: {
        _id: 2,
        name: "Jack Smith",
        pictureUrl:
          "https://bucket-chef-image.s3.amazonaws.com/2c4612ed-42e6-4b97-8c0a-7c644c4fc664.png",
      },
      totalPrice: 240,
      time: new Date("2021-03-25T10:30:00Z"),
      address: "200 queen street",
      items: [
        {
          _id: 1,
          name: "Parmesan Chiken",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 1,
          price: 10,
          ingredients: ["shrimp", "salmon"],
        },
        {
          _id: 2,
          name: "beef wellington",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 2,
          price: 10,
          ingredients: ["salt", "peper"],
        },
        {
          _id: 3,
          name: "Tortilla soup",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 5,
          price: 14,
          ingredients: ["parmesan", "maranara"],
        },
      ],
    },
    {
      _id: "123458",
      user: {
        _id: 2,
        name: "John Doe",
        pictureUrl:
          "https://bucket-chef-image.s3.amazonaws.com/2c4612ed-42e6-4b97-8c0a-7c644c4fc664.png",
      },
      totalPrice: 100,
      time: new Date("2021-04-05T16:30:00Z"),
      address: "200 queen street",
      instructions: "Buzz number 501",
      items: [
        {
          _id: 1,
          name: "Parmesan Chiken",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 4,
          price: 15,
          ingredients: ["salt", "peper"],
        },
        {
          _id: 2,
          name: "beef wellington",
          recipePictureUrl:
            "https://bucket-chef-image.s3.ca-central-1.amazonaws.com/35bec520-4d8f-4bd6-817a-4d3fb2f778aa.png",
          qty: 1,
          price: 10,

          ingredients: ["salmon", "shrimp", "peper", "salt"],
        },
      ],
    },
  ];

  const upcomingOrders = allOrders.filter((order) => order.time >= Date.now());
  const previousOrders = allOrders.filter((order) => order.time < Date.now());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.root}>
    <Grid container className={classes.root}>
      {/* <div className={classes.sidebar}> */}
      <Grid item md={2} xs={6} className={classes.margin}>
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
      </Grid>
      {/* <Grid item md={1} xs={0}></Grid> */}
      <Grid item md={9} xs={12} className={classes.margin}>
        {/* <div className={classes.orders}> */}
        <Paper className={classes.paper} elevation={5}>
          <TabPanel value={value} index={0}>
            <OrderTable orders={upcomingOrders} title="Upcoming orders" />
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

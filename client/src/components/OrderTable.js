import {
  Button,
  Hidden,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Moment from "react-moment";
import DialogControl from "./Dialogs/DialogControl";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const useStyles = makeStyles((theme) => ({
  table: {
    "& td": {
      fontSize: theme.spacing(1.5),
      textTransform: "normal",
    },
  },
  btn: {
    borderRadius: "0",
    // height: theme.spacing(4),
    textTransform: "capitalize",
    fontSize: theme.spacing(1.3),
    textDecoration: "none",
    margin: theme.spacing(0.2),
  },
}));
const OrderTable = ({
  orders,
  title,
  selectedOrder,
  setSelectedOrder,
  match,
}) => {
  const classes = useStyles();
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [open, setOpen] = useState(false);
  // const [focusOrder, setFocusOrder] = useState(false);
  console.log(selectedOrder);

  const { userInfo } = useContext(UserContext);
  const isChef = userInfo.isChef;

  useEffect(() => {
    if (selectedOrder) {
      // setFocusOrder(selectedOrder);
      setOrderId(selectedOrder._id);
      setItems(selectedOrder.items);
      setUser(selectedOrder.user);
      document.getElementById(selectedOrder._id).selected = true;
      setOpen(true);
    }
    return () => {
      if (selectedOrder) {
        // document.getElementById(selectedOrder._id).selected = true;
        setSelectedOrder(null);
      }
      // setOrderId(null);
      // setItems(null);
      // setUser(null);
      // setOpen(false);
    };
  }, [selectedOrder, setSelectedOrder]);

  const handleClickOpen = (id, items, user) => {
    setOrderId(id);
    setItems(items);
    setUser(user);
    if (selectedOrder) {
      document.getElementById(selectedOrder._id).selected = true;
      // setSelectedOrder(null);
    }
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    // if (selectedOrder) {
    //   document.getElementById(selectedOrder._id).selected = true;
    //   // setSelectedOrder(null);
    // }
  };
  return (
    <div>
      <List>
        <ListItem divider>
          <Typography variant="h3">{title}</Typography>
        </ListItem>
        <ListItem>
          <Table stickyHeader className={classes.table} padding="none">
            <TableHead>
              <TableRow>
                <Hidden smDown>
                  <TableCell>orderId</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell>{isChef ? "Customer" : "Chef"}</TableCell>
                </Hidden>
                <TableCell>Time</TableCell>
                <Hidden smDown>
                  <TableCell>Time Left</TableCell>
                </Hidden>
                <TableCell>Address</TableCell>
                <TableCell>Zip Code</TableCell>
                <Hidden smDown>
                  <TableCell>Instructions</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell>Total Price</TableCell>
                </Hidden>
                <TableCell padding="none"></TableCell>
                <TableCell padding="none"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    className={classes.table}
                    id={order._id}
                    selected={
                      selectedOrder ? order._id === selectedOrder._id : false
                    }
                    hover={true}
                  >
                    <Hidden smDown>
                      <TableCell>{order._id}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell>
                        {isChef ? order.user.name : order.chefId.name}
                      </TableCell>
                    </Hidden>

                    <TableCell>
                      <Moment format="YY-MM-DD HH:mm">
                        {order.bookingDate}
                      </Moment>
                    </TableCell>
                    <Hidden smDown>
                      <TableCell>
                        <Moment fromNow>{order.bookingDate}</Moment>
                      </TableCell>
                    </Hidden>
                    <TableCell>{`${order.shippingAddress.address}-${order.shippingAddress.city}`}</TableCell>
                    <TableCell>{order.shippingAddress.postalCode}</TableCell>

                    <Hidden smDown>
                      <TableCell>{order.instructions}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell>{order.totalPrice}</TableCell>
                    </Hidden>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btn}
                        onClick={() => {
                          const userToRender = isChef
                            ? order.user
                            : order.chefId;
                          handleClickOpen(
                            order._id,
                            order.orderItems,
                            userToRender
                          );
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                    <Hidden smDown>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.btn}
                          component={Link}
                          to={`/message/${order.user}`}
                        >
                          Contact
                        </Button>
                      </TableCell>
                    </Hidden>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ListItem>
      </List>
      <DialogControl
        open={open}
        onClose={handleClose}
        control="OrderDetails"
        items={items}
        user={user}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderTable;

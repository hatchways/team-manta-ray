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
import React, { useState } from "react";
import Moment from "react-moment";
import DialogControl from "./Dialogs/DialogControl";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "0",
    height: theme.spacing(4),
    textTransform: "capitalize",
    fontSize: theme.spacing(1.3),
    textDecoration: "none",
  },
}));
const OrderTable = ({ orders, title }) => {
  const classes = useStyles();
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (id, items, user) => {
    setOrderId(id);
    setItems(items);
    setUser(user);
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <List>
        <ListItem divider>
          <Typography variant="h3">{title}</Typography>
        </ListItem>
        <ListItem dense>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <Hidden smDown>
                  <TableCell>orderId</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell>Customer</TableCell>
                </Hidden>
                <TableCell>Time</TableCell>
                <Hidden smDown>
                  <TableCell>Time Left</TableCell>
                </Hidden>
                <TableCell>Address</TableCell>
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
                  <TableRow key={order._id} className={classes.table}>
                    <Hidden smDown>
                      <TableCell>{order._id}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell>{order.user.name}</TableCell>
                    </Hidden>

                    <TableCell>
                      <Moment format="YY-MM-DD HH:mm">{order.time}</Moment>
                    </TableCell>
                    <Hidden smDown>
                      <TableCell>
                        <Moment fromNow>{order.time}</Moment>
                      </TableCell>
                    </Hidden>
                    <TableCell>{order.address}</TableCell>
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
                        onClick={() =>
                          handleClickOpen(order._id, order.items, order.user)
                        }
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
                          to="/message"
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

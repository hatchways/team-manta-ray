import {
  Button,
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

export const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "0",
    height: theme.spacing(2.5),
    // marginTop: theme.spacing(3),
    textTransform: "capitalize",
    fontSize: "10px",
    textDecoration: "none",
    width: "50%",
  },
  table: {
    "&  td": {
      fontWeight: "normal",
    },
  },
}));
const OrderTable = ({ orders }) => {
  const classes = useStyles();
  const [items, setItems] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (items) => {
    setItems(items);
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <List>
        <ListItem divider>
          <Typography variant="h3">Orders</Typography>
        </ListItem>
        <ListItem dense>
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>orderId</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Price</TableCell>
                <TableCell padding="none"></TableCell>
                <TableCell padding="none"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id} className={classes.table}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>
                      <Moment format="YY/MM/DD">{order.time}</Moment>
                    </TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btn}
                        onClick={() => handleClickOpen(order.items)}
                      >
                        Details
                      </Button>
                    </TableCell>
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
      />
    </div>
  );
};

export default OrderTable;

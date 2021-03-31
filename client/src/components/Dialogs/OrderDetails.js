import {
  Avatar,
  Button,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Table,
  Hidden,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
    padding: "0",
    "& th": {
      padding: "0",
    },
  },
  img: {
    height: theme.spacing(25),
    width: theme.spacing(25),
    margin: "auto",
    borderRadius: "50%",
  },
  emptyText: {
    padding: theme.spacing(20, 10),
  },
  btn: {
    borderRadius: "0",
    margin: "auto",
    width: "40%",
    height: theme.spacing(6),
    textDecoration: "none",
    "& button": {
      height: "100%",
      width: "100%",
      borderRadius: "0",
      textTransform: "capitalize",
    },
  },
  clearBtn: {
    borderRadius: "0",
    textTransform: "capitalize",
  },

  btnGroup: {
    "& button": {
      borderRadius: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

const OrderDetails = ({ items, user, orderId }) => {
  const classes = useStyles();

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  return (
    <>
      <DialogTitle id="simple-dialog-title">{`Order ${orderId}`}</DialogTitle>
      <List dense>
        <ListItem alignItems="center">
          <ListItemText>
            <Typography variant="h5" align="center">
              {user.name}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <img
            src={user.profilePictureUrl}
            alt="customer"
            className={classes.img}
          />
        </ListItem>
        <ListItem dense>
          <TableContainer>
            <Table className={classes.table} size="small" padding="none">
              <TableHead>
                <TableRow padding="checkbox">
                  <TableCell></TableCell>
                  <TableCell align="center">Menu</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <Hidden smDown>
                    <TableCell align="center">Price</TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="item">
                      <Avatar alt="recipe" src={item.image} />
                    </TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <Hidden smDown>
                      <TableCell align="left" nowrap="nowrap">{`${
                        item.price
                      } x ${item.quantity} = ${addDecimals(
                        item.quantity * item.price
                      )}`}</TableCell>
                    </Hidden>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography gutterBottom variant="h6">
              Total Price
            </Typography>
          </ListItemText>
          <ListItemText>
            <Typography gutterBottom variant="h6">
              {" "}
              $
              {addDecimals(
                items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
                2
              )}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.btnSection}>
          <Link to="/messages" className={classes.btn}>
            <Button variant="contained" color="secondary">
              Contact Customer
            </Button>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default OrderDetails;

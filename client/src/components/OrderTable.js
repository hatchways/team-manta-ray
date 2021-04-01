import {
  Button,
  Hidden,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import React, { useState, useEffect, useContext } from "react";
import Moment from "react-moment";
import DialogControl from "./Dialogs/DialogControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export const useStyles = makeStyles((theme) => ({
  table: {
    "& td": {
      fontSize: theme.spacing(1.5),
      textTransform: "normal",
    },
  },
  btn: {
    borderRadius: "0",
    textTransform: "capitalize",
    fontSize: theme.spacing(1.3),
    textDecoration: "none",
    margin: theme.spacing(0.2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
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
  //--------pagination---------//
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [orderPerPage, setOrderPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setOrderPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [emptyOrders, setEmptyOrders] = useState(0);
  useEffect(() => {
    if (orders) {
      const emptyOrders =
        orderPerPage -
        Math.min(orderPerPage, orders.length - page * orderPerPage);
      setEmptyOrders(emptyOrders);
      setCount(orders.length);
    }
  }, [orders, page, orderPerPage]);

  //-------End of pagination logic------------//

  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [open, setOpen] = useState(false);

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
        setSelectedOrder(null);
      }
    };
  }, [selectedOrder, setSelectedOrder]);

  const handleClickOpen = (id, items, user) => {
    setOrderId(id);
    setItems(items);
    setUser(user);
    if (selectedOrder) {
      document.getElementById(selectedOrder._id).selected = true;
    }
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  //--------sort Logic----------//
  function descendingComparator(a, b, orderBy) {
    if (orderBy === "bookingDate") {
      if (new Date(b[orderBy]) < new Date(a[orderBy])) return -1;
      if (new Date(b[orderBy]) > new Date(a[orderBy])) return 1;
      return 0;
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("bookingDate");
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  //----------end of sort logic-------------//
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
                <TableCell
                  sortDirection={orderBy === "bookingDate" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "bookingDate"}
                    direction={orderBy === "bookingDate" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "bookingDate")}
                  >
                    Booking Date
                    {orderBy === "bookingDate" ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <Hidden smDown>
                  <TableCell>Time Left</TableCell>
                </Hidden>
                <TableCell>Address</TableCell>
                <TableCell>Zip Code</TableCell>
                <Hidden smDown>
                  <TableCell>Instructions</TableCell>
                </Hidden>
                <Hidden smDown>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "totalPrice"}
                      direction={orderBy === "totalPrice" ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, "totalPrice")}
                    >
                      Total Price
                      {orderBy === "totalPrice" ? (
                        <span className={classes.visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                </Hidden>
                <TableCell padding="none"></TableCell>
                <TableCell padding="none"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                (orderPerPage > 0
                  ? stableSort(orders, getComparator(order, orderBy)).slice(
                      page * orderPerPage,
                      page * orderPerPage + orderPerPage
                    )
                  : stableSort(orders, getComparator(order, orderBy))
                ).map((order) => (
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
              {emptyOrders > 0 && (
                <TableRow style={{ height: 53 * emptyOrders }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={count}
                  rowsPerPage={orderPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
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
        isChef={isChef}
      />
    </div>
  );
};

export default OrderTable;

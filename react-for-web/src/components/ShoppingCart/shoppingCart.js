import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Grid,
  Card,
  IconButton,
  Divider,
  CircularProgress,
  Box,
} from "@material-ui/core";
import history from "./../../history";
import { createTicketAsync, ACTION_TYPES } from "../../Actions/actions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import EmptyCart from "@material-ui/icons/RemoveShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import ShopRoundedIcon from "@material-ui/icons/ShopRounded";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { store } from "../../Actions/store";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    height: 70,
    backgroundColor: "#396480",
  },
  card: {
    width: "90%",
    position: "relative",
    height: 370,
  },
  list: {
    height: 320,
    maxHeight: 320,
    overflow: "auto",
    position: "relative",
  },
  cart: {
    position: "absolute",
    right: "0%",
    transform: "translate(-50%, -50%)",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    height: "100vh",
  },
  ticketButton: {
    borderColor: "white",
    color: "white",
  },
  emptyCart: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  blueColor: {
    color: "#305f7a",
  },
}));

function Cart({ barcode64, createTicket }) {
  const classes = useStyles();
  const [productArray, setList] = useState([]);
  const [price, setPrice] = useState(0);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isButtonActive, setButtonAbility] = useState(true);
  const [isTicketNew, setTicketAbility] = useState(false);

  useEffect(() => {
    if (Object.keys(productArray).length !== 0) {
      setButtonAbility(false);
      calculateInitialPrice();
    } else {
      setButtonAbility(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productArray]);

  useEffect(() => {
    setList(store.getState().productsInCart);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTicketAbility(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcode64]);

  const calculateInitialPrice = () => {
    let previousPrice = 0;

    productArray.forEach(
      (product) => (previousPrice = product.price + previousPrice)
    );

    setPrice(roundDoubleNumbers(previousPrice));
  };

  const removeItem = (prod, ind) => {
    let priceBefore = price;

    setPrice(roundDoubleNumbers(priceBefore - prod.price));

    productArray.splice(ind, 1);

    setList([...productArray]);
  };

  const removeAll = () => {
    setPrice(0);
    setList([]);
  };

  const roundDoubleNumbers = (number) => {
    let num = Number(number);
    let roundedString = num.toFixed(2);
    return Number(roundedString);
  };

  const buyProducts = () => {
    setTicketAbility(false);
    createTicket(productArray);
    removeAll();
    openTicket();

    insertProductsToLocalStorage();
  };

  const insertProductsToLocalStorage = () => {
    const arrayToString = JSON.stringify(productArray);
    let storageName = "";

    if (window.localStorage.length === 0) {
      storageName = "0";
    } else {
      storageName = window.localStorage.length.toString();
    }

    window.localStorage.setItem(storageName, arrayToString);
  };

  const goToItemSelection = () => {
    store.dispatch({
      type: ACTION_TYPES.CART_DATA,
      payload: productArray,
    });

    history.push("/mainPage");
  };

  const openTicket = () => {
    setIsTicketOpen(true);
  };
  const closeTicket = () => {
    setIsTicketOpen(false);
  };

  return (
    <Grid className={classes.fullScreen}>
      <Box mt={2} mb={2}>
        <Grid container direction="row">
          <Button onClick={() => goToItemSelection()}>
            <ArrowBackIcon style={{ color: "white" }} />
          </Button>
          <h3 style={{ color: "white" }} className={classes.cart}>
            CART
          </h3>
        </Grid>
      </Box>

      <Grid container className={classes.center}>
        <Card
          style={{
            backgroundColor: "#fafaff",
          }}
          className={classes.card}
        >
          {productArray.length === 0 ? (
            <div className={classes.emptyCart}>
              <div>
                <EmptyCart className={classes.blueColor} />
              </div>
            </div>
          ) : (
            <div>
              <Grid>
                <List className={classes.list}>
                  {productArray.map((product, index) => {
                    return (
                      <div key={index}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Grid>
                                <Grid
                                  container
                                  direction="row"
                                  justify="space-between"
                                >
                                  <div
                                    className={classes.blueColor}
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {product.productName}
                                  </div>
                                  <div className={classes.blueColor}>
                                    {product.price} €
                                  </div>
                                </Grid>

                                <div className={classes.blueColor}>
                                  {product.description}
                                </div>
                              </Grid>
                            }
                          />

                          <IconButton
                            className={classes.blueColor}
                            onClick={() => removeItem(product, index)}
                          >
                            <ClearRoundedIcon />
                          </IconButton>
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </Grid>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeAll()}
                startIcon={<DeleteIcon />}
              >
                Remove All
              </Button>
            </div>
          )}
        </Card>

        {barcode64 === "" ? (
          <Box mt={2}>
            <div style={{ color: "white" }}>Ticket is not generated yet.</div>
          </Box>
        ) : (
          <Box mt={1.5}>
            <Button
              startIcon={<ConfirmationNumberIcon />}
              variant="outlined"
              onClick={openTicket}
              className={classes.ticketButton}
              style={{ width: "30vh" }}
            >
              Ticket
            </Button>

            <Dialog onClose={closeTicket} open={isTicketOpen}>
              <DialogContent>
                {!isTicketNew ? (
                  <CircularProgress className={classes.blueColor} />
                ) : (
                  <Grid container direction="column" className={classes.center}>
                    <div>Scan this ticket</div>
                    <ArrowDownwardIcon />

                    <img
                      src={`data:image/jpeg;base64,${barcode64}`}
                      alt="barcode"
                    />
                  </Grid>
                )}
              </DialogContent>
            </Dialog>
          </Box>
        )}
      </Grid>

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <h2>total: {price} €</h2>
            <Button
              className={classes.ticketButton}
              disabled={isButtonActive}
              onClick={() => buyProducts()}
              variant="outlined"
              startIcon={<ShopRoundedIcon />}
            >
              BUY
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    barcode64: state.base64,
  };
};

const mapDispatchToProps = {
  createTicket: createTicketAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

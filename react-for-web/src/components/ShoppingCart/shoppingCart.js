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
} from "@material-ui/core";
import history from "./../../history";
import * as actions from "../../Actions/actions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CartData from "../../Data/cartData";
import EmptyCart from "@material-ui/icons/RemoveShoppingCart";
import BackgroundImg from "../../icons/background.png";
import DeleteIcon from "@material-ui/icons/Delete";
import ShopRoundedIcon from "@material-ui/icons/ShopRounded";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

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
  marginRight: {
    marginRight: 190,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerAndTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
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
    setList(CartData.getData());

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
    const type = "LIST";
    CartData.setData(productArray, type);
    history.push("/mainPage");
  };

  const openTicket = () => {
    setIsTicketOpen(true);
  };
  const closeTicket = () => {
    setIsTicketOpen(false);
  };

  return (
    <Grid
      style={{ backgroundImage: `url(${BackgroundImg})` }}
      className={classes.fullScreen}
    >
      <Grid container direction="row">
        <Button
          onClick={() => goToItemSelection()}
          className={classes.marginRight}
        >
          <ArrowBackIcon style={{ color: "white" }} />
        </Button>
        <h3 style={{ color: "white" }}>CART</h3>
      </Grid>

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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.centerAndTop}
          >
            <div style={{ color: "white" }}>Ticket is not generated yet.</div>
          </Grid>
        ) : (
          <div className={classes.center}>
            <Grid className={classes.centerAndTop}>
              <Button
                startIcon={<ConfirmationNumberIcon />}
                variant="outlined"
                onClick={openTicket}
                className={classes.ticketButton}
              >
                Ticket
              </Button>
            </Grid>

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
          </div>
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
  createTicket: actions.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

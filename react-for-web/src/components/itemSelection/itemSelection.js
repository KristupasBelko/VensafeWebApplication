import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/actions";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Collapse,
  Divider,
  Card,
  IconButton,
  Typography,
  Box,
  InputBase,
  Dialog,
  DialogContent,
  Badge,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import history from "../../history";
import { store } from "../../Actions/store";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  card: {
    width: 300,
    position: "relative",
    maxHeight: 480,
    backgroundColor: "#f7f5f5",
  },
  fullScreen: {
    height: "90vh",
  },
  textField: {
    color: "white",
  },
  blueColor: {
    color: "#305f7a",
  },
}));

function ItemSelection({ ownProps, fetchAsync }) {
  const classes = useStyles();
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    loadProducts();
    console.log("state of store is - ", store.getState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredGroups(
      groups.filter((group) =>
        group.brands.find((brand) =>
          brand.brandName.toLowerCase().includes(search.toLowerCase())
        )
      )
    );

    filteredGroups.forEach((group) => {
      const groupIndex = filteredGroups.indexOf(group);
      if (!isGroupOpen[groupIndex]) {
        handleGroupCollapse(groupIndex);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, groups]);

  const initializeLocalStorage = () => {
    //window.localStorage.clear();
    const lengthOfStorage = window.localStorage.length;

    if (lengthOfStorage > 0) {
      setFavoriteProducts(getProductsFromLocalStorage(lengthOfStorage));
    }
  };

  const getProductsFromLocalStorage = (lengthOfStorage) => {
    //window.localStorage.clear();
    let productsFromStorage = [];
    let mostlyBoughtproducts = [];

    for (var i = 0; i < lengthOfStorage; i++) {
      const productsByIndex = JSON.parse(
        window.localStorage.getItem(i.toString())
      );

      productsFromStorage = [...productsFromStorage, ...productsByIndex];
    }

    productsFromStorage.forEach((productInStorage) => {
      if (
        countOccurrences(productsFromStorage, productInStorage) > 3 &&
        !mostlyBoughtproducts.some(
          (product) => product.productCode === productInStorage.productCode
        )
      ) {
        mostlyBoughtproducts.push(productInStorage);
      }
    });

    return mostlyBoughtproducts;
  };

  const countOccurrences = (array, value) => {
    return array.reduce((acc, elem) => {
      return value.productCode === elem.productCode ? acc + 1 : acc;
    }, 0);
  };

  function loadProducts() {
    if (store.getState().products.length === 0) {
      fetchAsync()
        .then((response) => {
          setGroups(response.data);
          setLoading(false);
          initializeLocalStorage();
          console.log("products fetched:", response.data);

          store.dispatch({
            type: "FETCH_ALL",
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    } else {
      setGroups(store.getState().products);
      setLoading(false);
      initializeLocalStorage();
    }
  }

  const handleGroupCollapse = (index) => {
    setIsGroupOpen({ [index]: !isGroupOpen[index] });
  };

  const handleBrandCollapse = (index) => {
    setIsBrandOpen({ [index]: !isBrandOpen[index] });
  };

  const closeFavoriteProducts = () => {
    setOpenFavorite(false);
  };

  const openFavoriteProducts = () => {
    setOpenFavorite(true);
  };

  const addProductToCart = (product) => {
    store.dispatch({
      type: "CART_DATA",
      payload: [...store.getState().productsInCart, product],
    });

    ownProps.onIncrement();
  };

  return (
    <Grid
      className={classes.fullScreen}
      container
      justify="center"
      alignContent="center"
    >
      {loading || groups === undefined ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress style={{ color: "white" }} />
        </div>
      ) : (
        <Grid>
          <Box mb={2}>
            <Card
              style={{
                backgroundColor: "#fafaff",
              }}
            >
              <Grid container direction="row">
                <IconButton disabled>
                  <SearchIcon className={classes.blueColor} />
                </IconButton>
                <InputBase
                  className={classes.blueColor}
                  style={{
                    width: 200,
                  }}
                  placeholder="Search For Brand"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton onClick={() => openFavoriteProducts()}>
                  <Badge
                    badgeContent={Object.keys(favoriteProducts).length}
                    color="primary"
                  >
                    <StarIcon
                      style={{
                        color: "#c2bf76",
                      }}
                    />
                  </Badge>
                </IconButton>

                <Dialog onClose={closeFavoriteProducts} open={openFavorite}>
                  <DialogContent>
                    {Object.keys(favoriteProducts).length === 0 ? (
                      <div> No favourite products yet. </div>
                    ) : (
                      <Grid>
                        <div className={classes.blueColor}>
                          Favorite products:
                        </div>
                        <List>
                          {favoriteProducts.map((favProd, index) => {
                            return (
                              <ListItem key={index}>
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
                                          {favProd.productName}
                                        </div>
                                      </Grid>

                                      <div className={classes.blueColor}>
                                        {favProd.description}
                                      </div>
                                    </Grid>
                                  }
                                />

                                <IconButton
                                  onClick={() => addProductToCart(favProd)}
                                  variant="contained"
                                  color="primary"
                                >
                                  <AddIcon className={classes.blueColor} />
                                </IconButton>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                    )}
                  </DialogContent>
                </Dialog>
              </Grid>
            </Card>
          </Box>

          <Card
            style={{
              backgroundColor: "#fafaff",
            }}
            className={classes.card}
          >
            <Grid>
              {
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  style={{ overflow: "auto", height: 380 }}
                >
                  {filteredGroups.map((group, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem
                          button
                          component="a"
                          onClick={() => handleGroupCollapse(index)}
                          variant="contained"
                          color="primary"
                        >
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.blueColor}
                                style={{
                                  fontWeight: "bold",
                                }}
                                variant="button"
                                display="block"
                                gutterBottom
                              >
                                {group.groupName}
                              </Typography>
                            }
                          />
                          {isGroupOpen[index] ? (
                            <ExpandLess className={classes.blueColor} />
                          ) : (
                            <ExpandMore className={classes.blueColor} />
                          )}
                        </ListItem>

                        <Collapse
                          in={isGroupOpen[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List>
                            {group.brands.map((brand, index) => {
                              return (
                                <Grid key={index}>
                                  {brand.brandName
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) && (
                                    <Grid>
                                      <ListItem
                                        key={index}
                                        button
                                        className={classes.nested}
                                        onClick={() =>
                                          handleBrandCollapse(index)
                                        }
                                      >
                                        <ListItemText
                                          primary={
                                            <Typography
                                              className={classes.blueColor}
                                              style={{
                                                fontSize: 14,
                                              }}
                                              variant="overline"
                                              gutterBottom
                                            >
                                              {brand.brandName}
                                            </Typography>
                                          }
                                        />
                                        {isBrandOpen[index] ? (
                                          <ExpandLess
                                            className={classes.blueColor}
                                          />
                                        ) : (
                                          <ExpandMore
                                            className={classes.blueColor}
                                          />
                                        )}
                                      </ListItem>
                                      <Collapse
                                        in={isBrandOpen[index]}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        {
                                          <List>
                                            {brand.products.map(
                                              (product, index) => {
                                                return (
                                                  <Grid key={index}>
                                                    <ListItem
                                                      className={classes.nested}
                                                    >
                                                      <ListItemText
                                                        primary={
                                                          <Grid>
                                                            <Grid
                                                              container
                                                              direction="row"
                                                              justify="space-between"
                                                            >
                                                              <div
                                                                className={
                                                                  classes.blueColor
                                                                }
                                                                style={{
                                                                  fontWeight:
                                                                    "bold",
                                                                }}
                                                              >
                                                                {
                                                                  product.productName
                                                                }
                                                              </div>
                                                              <div
                                                                className={
                                                                  classes.blueColor
                                                                }
                                                              >
                                                                {product.price}{" "}
                                                                €
                                                              </div>
                                                            </Grid>

                                                            <div
                                                              className={
                                                                classes.blueColor
                                                              }
                                                            >
                                                              {
                                                                product.description
                                                              }
                                                            </div>
                                                          </Grid>
                                                        }
                                                      />

                                                      <IconButton
                                                        onClick={() =>
                                                          addProductToCart(
                                                            product
                                                          )
                                                        }
                                                        variant="contained"
                                                        color="primary"
                                                      >
                                                        <AddIcon
                                                          className={
                                                            classes.blueColor
                                                          }
                                                        />
                                                      </IconButton>
                                                    </ListItem>

                                                    <Divider />
                                                  </Grid>
                                                );
                                              }
                                            )}
                                          </List>
                                        }
                                      </Collapse>
                                    </Grid>
                                  )}
                                </Grid>
                              );
                            })}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    );
                  })}
                </List>
              }
            </Grid>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    productsFromApi: state.products,
    ownProps: ownProps,
  };
};

const mapDispatchToProps = {
  fetchAsync: () => actions.fetchAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);

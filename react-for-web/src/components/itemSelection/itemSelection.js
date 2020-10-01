import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ACTION_TYPES, fetchAsync } from "../../Actions/actions";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
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
  nested: {
    paddingLeft: theme.spacing(3),
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    position: "relative",
    backgroundColor: "#f7f5f5",
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    loadProducts();
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
    const storageName = "ProductsInStorage";
    const productsFromStorage = JSON.parse(
      window.localStorage.getItem(storageName)
    );

    console.log("storage inside", productsFromStorage);

    if (productsFromStorage !== null) {
      setFavoriteProducts(getProductsFromLocalStorage(productsFromStorage));
    }
  };

  const getProductsFromLocalStorage = (productsFromStorage) => {
    let mostlyBoughtproducts = [];

    productsFromStorage.forEach((productInStorage) => {
      if (
        countOccurrences(productsFromStorage, productInStorage) > 3 &&
        !mostlyBoughtproducts.some(
          (product) => product.productCode === productInStorage.productCode
        ) &&
        store
          .getState()
          .products.some((group) =>
            group.brands.find((brand) =>
              brand.products.find(
                (product) =>
                  product.productCode === productInStorage.productCode
              )
            )
          )
      ) {
        mostlyBoughtproducts.push(productInStorage);
      }
    });

    console.log("mostlybought products", mostlyBoughtproducts);

    return mostlyBoughtproducts;
  };

  const countOccurrences = (array, value) => {
    return array.reduce((acc, elem) => {
      return value.productCode === elem.productCode ? acc + 1 : acc;
    }, 0);
  };

  const loadProducts = () => {
    if (store.getState().products.length === 0) {
      fetchAsync()
        .then((response) => {
          setGroups(response.data);
          setLoading(false);

          console.log("products fetched:", response.data);

          store.dispatch({
            type: ACTION_TYPES.FETCH_PRODUCTS,
            payload: response.data,
          });

          initializeLocalStorage();
        })
        .catch((err) => {
          console.log(err);
          history.replace("/");
        });
    } else {
      setGroups(store.getState().products);
      setLoading(false);
      initializeLocalStorage();
    }
  };

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

  const addProductToCart = (product, index) => {
    if (
      product.stock > countOccurrences(store.getState().productsInCart, product)
    ) {
      store.dispatch({
        type: ACTION_TYPES.CART_DATA,
        payload: [...store.getState().productsInCart, product],
      });

      console.log("products in cart:", store.getState().productsInCart);

      ownProps.onIncrement();
    } else {
      setIsButtonDisabled({ [index]: true });
    }
  };

  return (
    <Grid>
      {loading || groups === undefined ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <Grid>
          <Box m={2}>
            <Card
              style={{
                backgroundColor: "#fafaff",
              }}
            >
              <Grid container direction="row" justify="space-between">
                <Grid>
                  <IconButton disabled>
                    <SearchIcon className={classes.blueColor} />
                  </IconButton>
                  <InputBase
                    className={classes.blueColor}
                    placeholder="Search For Brand"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>

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
                                  disabled={isButtonDisabled[index]}
                                  onClick={() =>
                                    addProductToCart(favProd, index)
                                  }
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

          <Box m={2}>
            <Card
              style={{
                backgroundColor: "#fafaff",
              }}
            >
              <Grid style={{ height: "100%" }}>
                {
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    style={{
                      overflow: "auto",
                      maxHeight: "70vh",
                      minHeight: "30vh",
                    }}
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
                                                        className={
                                                          classes.nested
                                                        }
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
                                                                  {
                                                                    product.price
                                                                  }{" "}
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
                                                          disabled={
                                                            isButtonDisabled[
                                                              index
                                                            ]
                                                          }
                                                          onClick={() =>
                                                            addProductToCart(
                                                              product,
                                                              index
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
          </Box>
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
  fetchAsync: () => fetchAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);

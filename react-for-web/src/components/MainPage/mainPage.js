import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import ItemsSelection from "../itemSelection/itemSelection";
import { Grid } from "@material-ui/core";
import { store } from "../../Actions/store";

function MainPage() {
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const productsCountInCart = Object.keys(store.getState().productsInCart)
      .length;

    setQuantityInCart(productsCountInCart);
  }, []);

  const clickAlert = () => {
    setQuantityInCart(quantityInCart + 1);
  };

  return (
    <Grid
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <NavBar quantityInCart={quantityInCart} />
      <ItemsSelection onIncrement={clickAlert} />
    </Grid>
  );
}

export default MainPage;

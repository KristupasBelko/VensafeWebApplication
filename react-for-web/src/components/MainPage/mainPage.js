import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import ItemsSelection from "../itemSelection/itemSelection";
import BackgroundImg from "../../icons/background.png";
import { Grid } from "@material-ui/core";
import CartData from "../../Data/cartData";

function MainPage() {
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const cartData = CartData.getData();
    const productsCountInCart = Object.keys(cartData).length;

    setQuantityInCart(productsCountInCart);
  }, []);

  const clickAlert = () => {
    setQuantityInCart(quantityInCart + 1);
  };

  return (
    <Grid style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <NavBar quantityInCart={quantityInCart} />

      <div>
        <ItemsSelection onIncrement={clickAlert} />
      </div>
    </Grid>
  );
}

export default MainPage;

import React from "react";
import history from "../../history";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Grid, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#396480",
  },
}));

function NavBar({ quantityInCart }) {
  const classes = useStyles();
  return (
    <Grid>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid className={classes.menuButton}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => history.replace("/shoppingCart")}
            >
              <Badge badgeContent={quantityInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default NavBar;

import React from "react";
import history from "../../history";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Grid, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StrongpointLogo from "../../icons/strong.logo.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#396480",
  },
  logo: {
    height: "40%",
    position: "absolute",
    right: "5%",
    background: "transparent no-repeat center",
    backgroundSize: "cover",
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
              onClick={() => history.push("/shoppingCart")}
            >
              <Badge badgeContent={quantityInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Grid>

          <img src={StrongpointLogo} alt="Logo" className={classes.logo} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default NavBar;

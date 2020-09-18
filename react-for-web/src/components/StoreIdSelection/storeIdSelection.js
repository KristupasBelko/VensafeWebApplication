import React, { Component, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions/actions";
import BackgroundImg from "../../icons/background.png";
import {
  Grid,
  IconButton,
  InputBase,
  Card,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import StoreId from "../../Data/storeId";
import history from "../../history";

const useStyles = makeStyles(() => ({
  fullScreen: {
    height: "100vh",
  },
  center: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    borderColor: "white",
    color: "white",
  },
  blueColor: {
    color: "#305f7a",
  },
}));

function StoreIdSelection({ findStoreFromApi }) {
  const classes = useStyles();
  const [txtField, setTxtField] = useState("");

  const findStore = () => {
    console.log(txtField);

    StoreId.setData(txtField);
    history.push("/mainPage");
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.fullScreen}
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.center}
      >
        <Card
          style={{
            backgroundColor: "#fafaff",
          }}
        >
          <Grid>
            <IconButton disabled>
              <InsertCommentIcon className={classes.blueColor} />
            </IconButton>
            <InputBase
              className={classes.blueColor}
              onChange={(e) => setTxtField(e.target.value)}
              placeholder="Insert Store Id"
            />
          </Grid>
        </Card>

        <Box mt={2}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => findStore()}
          >
            Accept
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    barcode64: state.base64,
  };
};

const mapDispatchToProps = {
  findStoreFromApi: actions.findStoreAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreIdSelection);

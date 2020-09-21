import React, { useState } from "react";
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
import history from "../../history";
import { store } from "../../Actions/store";

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

function StoreIdSelection() {
  const classes = useStyles();
  const [txtField, setTxtField] = useState("");

  const findStore = () => {
    console.log(txtField);

    store.dispatch({
      type: "STORE_ID",
      payload: txtField,
    });

    //StoreId.setData(txtField);
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

export default StoreIdSelection;

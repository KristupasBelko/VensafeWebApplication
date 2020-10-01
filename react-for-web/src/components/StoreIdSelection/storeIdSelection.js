import React, { useState } from "react";
import {
  Grid,
  IconButton,
  InputBase,
  Card,
  Button,
  Box,
  Typography,
  ButtonGroup,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import ListIcon from "@material-ui/icons/List";
import CropFreeIcon from "@material-ui/icons/CropFree";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import CloseIcon from "@material-ui/icons/Close";
import history from "../../history";
import { store } from "../../Actions/store";
import { ACTION_TYPES } from "../../Actions/actions";
import StrongpointLogo from "../../icons/strong.logo.png";
import InfoPicture from "../../icons/info.png";

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
    height: "70px",
  },
  blueColor: {
    color: "#305f7a",
  },
  logo: {
    height: "5%",
    position: "absolute",
    top: "auto",
    bottom: 0,
    right: 0,
    margin: 5,
  },
  info: {
    width: "100%",
  },
  infoButton: {
    position: "absolute",
    top: 0,
    bottom: "auto",
    right: 0,
    margin: 5,
  },
}));

function StoreIdSelection() {
  const classes = useStyles();
  const [txtField, setTxtField] = useState("");
  const [isTypeStoreIdOpen, setIsTypeStoreIdOpen] = useState(false);
  const [isStoreListOpen, setIsStoreListOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const openQrScanner = () => {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if (result.text !== null) {
          store.dispatch({
            type: ACTION_TYPES.STORE_ID,
            payload: result.text,
          });

          history.replace("/mainPage");
        }
      },
      function (error) {
        alert("Scanning failed: " + error);
      },
      {
        prompt: "SCAN QR CODE",
        resultDisplayDuration: 0,
      }
    );
  };
  const closeQrScanner = () => {
    setIsQrScannerOpen(false);
  };

  const openTypeStoreId = () => {
    setIsTypeStoreIdOpen(true);
  };
  const closeTypeStoreId = () => {
    setIsTypeStoreIdOpen(false);
  };

  const openStoreList = () => {
    setIsStoreListOpen(true);
  };
  const closeStoreList = () => {
    setIsStoreListOpen(false);
  };

  const openInfoDialog = () => {
    setIsInfoDialogOpen(true);
  };
  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
  };

  const findStore = () => {
    console.log(txtField);

    store.dispatch({
      type: ACTION_TYPES.STORE_ID,
      payload: txtField,
    });

    //StoreId.setData(txtField);
    history.replace("/mainPage");
  };

  const handleScan = (data) => {
    if (data !== null) {
      store.dispatch({
        type: ACTION_TYPES.STORE_ID,
        payload: data,
      });

      history.replace("/mainPage");
    }

    console.log("duomenys", data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Grid container direction="column" className={classes.fullScreen}>
      <IconButton
        onClick={() => openInfoDialog()}
        className={classes.infoButton}
      >
        <LiveHelpIcon style={{ color: "white" }} />
      </IconButton>

      <Dialog open={isInfoDialogOpen}>
        <DialogContent>
          <Grid container justify="center" alignItems="center">
            <img src={InfoPicture} alt="Info" className={classes.info} />
            <Box mt={2}>
              <Button
                style={{ width: "200px" }}
                onClick={() => closeInfoDialog()}
                variant="outlined"
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.center}
      >
        <Typography
          variant="overline"
          style={{ fontSize: "15px", color: "white", top: 0 }}
        >
          CHOOSE STORE:
        </Typography>

        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => openQrScanner()}
            className={classes.button}
            variant="outlined"
            startIcon={<CropFreeIcon />}
          >
            scan qr
          </Button>
          <Button
            onClick={() => openStoreList()}
            className={classes.button}
            variant="outlined"
            startIcon={<ListIcon />}
          >
            Stores Nearby
          </Button>
          <Button
            onClick={() => openTypeStoreId()}
            className={classes.button}
            variant="outlined"
            startIcon={<InsertCommentIcon />}
          >
            TYPE STORE ID
          </Button>
        </ButtonGroup>

        <Dialog onClose={closeStoreList} open={isStoreListOpen}>
          <DialogContent
            style={{
              backgroundColor: "#396480",
            }}
          >
            <Grid container justify="center" alignItems="center">
              <Typography variant="overline" style={{ color: "white" }}>
                Stores Nearby
              </Typography>
              <Card
                style={{
                  width: "200px",
                  backgroundColor: "#fafaff",
                }}
              >
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemText
                      className={classes.blueColor}
                      primary="RIMI"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      className={classes.blueColor}
                      primary="MAXIMA"
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog onClose={closeTypeStoreId} open={isTypeStoreIdOpen}>
          <DialogContent style={{ backgroundColor: "#396480" }}>
            <Grid container justify="center" alignItems="center">
              <Card
                style={{
                  width: "80%",
                  backgroundColor: "#fafaff",
                }}
              >
                <Grid>
                  <IconButton disabled>
                    <InsertCommentIcon className={classes.blueColor} />
                  </IconButton>
                  <InputBase
                    style={{ width: "65%" }}
                    className={classes.blueColor}
                    onChange={(e) => setTxtField(e.target.value)}
                    placeholder="Store Id"
                  />
                </Grid>
              </Card>

              <Box mt={2}>
                <Button
                  style={{ color: "white", borderColor: "white" }}
                  variant="outlined"
                  onClick={() => findStore()}
                >
                  Accept
                </Button>
              </Box>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>

      <img src={StrongpointLogo} alt="Logo" className={classes.logo} />
    </Grid>
  );
}

export default StoreIdSelection;

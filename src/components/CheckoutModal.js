import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./CheckoutModal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#e4dacf",
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: "2rem",
  },
}));

function CheckoutModal({ netPrice, handleClose, openModal, reset }) {
  const classes = useStyles();

  const [cash, setCash] = useState(0);
  const [isSucceeded, setIsSucceeded] = useState(false);
  let change = cash - netPrice;

  function handleInput(e) {
    setCash(e.target.value);
  }

  function handleConfirm() {
    setIsSucceeded(true);
    setTimeout(() => {
      handleClose();
      setIsSucceeded(false);
      setCash(0);
      reset();
    }, 3000);
  }

  let modalContent = (
    <div className={classes.paper}>
      <h1>Net Price: {netPrice.toLocaleString()}</h1>
      <h3>Accept Cash:</h3>
      <input type="number" value={cash} onChange={handleInput} />
      {change >= 0 ? (
        <>
          <h2>Change: {(cash - netPrice).toLocaleString()}</h2>
          <div className="CheckoutModal-button">
            <button onClick={handleConfirm}>
              Confirm order
            </button>
          </div>
        </>
      ) : (
        <h2 style={{ color: "red" }}>Not enough cash</h2>
      )}
    </div>
  );

  if (netPrice === 0) {
    modalContent = (
      <div className={classes.paper}>
        <h2>Please select items before checkout</h2>
      </div>
    );
  }

  if (isSucceeded) {
    modalContent = (
      <div className={classes.paper}>
        <h2>Success! Thank you for shopping with us.</h2>
      </div>
    );
  }

  return (
    <div className="CheckoutModal">
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>{modalContent}</Fade>
      </Modal>
    </div>
  );
}

export default CheckoutModal;

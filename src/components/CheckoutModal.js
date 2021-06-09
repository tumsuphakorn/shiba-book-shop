import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
    }, 3000)
  }

  let modalContent = (
    <div className={classes.paper}>
      <h2>Net Price: {netPrice}</h2>
      <p>Accept Cash</p>
      <input type="number" value={cash} onChange={handleInput} />
      {change >= 0 ? (
        <>
          <h3>Change: {cash - netPrice}</h3>
          <button type="button" onClick={handleConfirm}>Confirm order</button>
        </>
      ):(
        <h3>Not enough cash</h3>
      )}
    </div>
  );

  if (netPrice === 0) {
    modalContent = (
      <div className={classes.paper}>
        <h2 id="transition-modal-title">Please select items before checkout</h2>
      </div>
    );
  }

  if (isSucceeded) {
    modalContent = (
      <div className={classes.paper}>
        <h2 id="transition-modal-title">Success! Thank you for shopping with us.</h2>
      </div>
    );
  }

  return (
    <div>
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
        <Fade in={openModal}>
          {modalContent}
        </Fade>
      </Modal>
    </div>
  );
}

export default CheckoutModal;

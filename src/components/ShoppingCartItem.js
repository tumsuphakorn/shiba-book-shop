import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "./ShoppingCartItem.css";

function ShoppingCartItem({
  book,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
}) {
  function handleIncrease() {
    increaseQuantity(book.id);
  }

  function handleDecrease() {
    decreaseQuantity(book.id);
  }

  function handleDelete() {
    deleteItem(book.id);
  }

  return (
    <div className="ShoppingCartItem">
    <div>
    <p className="ShoppingCartItem-name">{book.title}</p>
      <div className="ShoppingCartItem-status">
        <IconButton color="inherit" onClick={handleIncrease}>
          <AddCircleOutlineIcon />
        </IconButton>
        <p>{book.count}</p>
        <IconButton color="inherit" onClick={handleDecrease}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <p>Price: {(book.price * book.count).toLocaleString()}</p>
      </div>
    </div>
      

      <IconButton color="inherit" onClick={handleDelete}>
        <DeleteForeverIcon fontSize="large"/>
      </IconButton>
    </div>
  );
}

export default ShoppingCartItem;

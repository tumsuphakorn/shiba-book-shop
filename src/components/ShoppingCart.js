import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

import "./ShoppingCart.css";
import ShoppingCartItem from "./ShoppingCartItem";

function ShoppingCart({
  pickedBook,
  discountBookId,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  reset,
}) {
  const discountRate = {
    2: 10,
    3: 11,
    4: 12,
    5: 13,
    6: 14,
    7: 15,
  };

  const matchDiscountBook = pickedBook.filter((book) => {
    return discountBookId.includes(book.id);
  });

  const sumPrice = pickedBook.reduce((sum, book) => {
    return sum + Number(book.price) * book.count;
  }, 0);

  let discount = 0;
  if (matchDiscountBook.length > 1) {
    discount = Math.round(
      matchDiscountBook.reduce((sum, book) => {
        return (
          sum +
          (Number(book.price) * discountRate[matchDiscountBook.length]) / 100
        );
      }, 0)
    );
  }

  const netPrice = sumPrice - discount;

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="ShoppingCart">
      <div>
        <h2 className="ShoppingCart-header">Shopping Cart</h2>
        {pickedBook.map((book) => {
          return (
            <ShoppingCartItem
              key={book.id}
              book={book}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
      <div>
        <div className="ShoppingCart-summary">
          <div className="ShoppingCart-price">
            <p>Sub total:</p>
            <p>{sumPrice.toLocaleString()} Baht</p>
          </div>
          <div className="ShoppingCart-price">
            <p>Discount:</p>
            <p>{discount.toLocaleString()} Baht</p>
          </div>
          <div className="ShoppingCart-price">
            <h2>Net price:</h2>
            <h2>{netPrice.toLocaleString()} Baht</h2>
          </div>
        </div>
        <div className="ShoppingCart-button">
          <button onClick={handleOpen}>Checkout</button>
        </div>

        <CheckoutModal
          netPrice={netPrice}
          handleClose={handleClose}
          openModal={openModal}
          reset={reset}
        />
      </div>
    </div>
  );
}

export default ShoppingCart;

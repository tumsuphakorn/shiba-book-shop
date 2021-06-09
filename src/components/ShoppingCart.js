import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

import "./ShoppingCart.css";
import ShoppingCartItem from "./ShoppingCartItem"

function ShoppingCart({ pickedBook, discountBookId, increaseQuantity, decreaseQuantity, deleteItem, reset }) {
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
    discount = Math.round(matchDiscountBook.reduce((sum, book) => {
      return sum + (Number(book.price) * discountRate[matchDiscountBook.length]) / 100;
    }, 0));
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
      <h2>This is ShoppingCart</h2>
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
      <h3>Net price: {netPrice}</h3>
      <button type="button" onClick={handleOpen}>Checkout</button>
      <CheckoutModal netPrice={netPrice} handleClose={handleClose} openModal={openModal} reset={reset} />
    </div>
  );
}

export default ShoppingCart;

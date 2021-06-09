function ShoppingCartItem({ book, increaseQuantity, decreaseQuantity, deleteItem }) {
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
    <div>
      <p>
        {book.title} x{book.count} Price: {book.price * book.count}
      </p>
      <span onClick={handleIncrease}>+</span> <span onClick={handleDecrease}>-</span> <span onClick={handleDelete}>X</span>
    </div>
  );
}

export default ShoppingCartItem;

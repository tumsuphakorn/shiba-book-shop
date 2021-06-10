import "./Book.css";

function Book({ title, id, cover, price, pickBook }) {
  function handleClick() {
    pickBook(id);
  }
  return (
    <div className="Book" onClick={handleClick}>
      <img className="Book-img" src={cover} alt={title}/>
      <p className="Book-title">{title}</p>
      <p className="Book-price">{price} Baht</p>
    </div>
  );
}

export default Book;

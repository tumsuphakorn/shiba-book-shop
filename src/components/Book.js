import "./Book.css";

function Book({ title, id, cover, price, pickBook }) {
  function handleClick() {
    pickBook(id);
  }
  return (
    <div className="Book" onClick={handleClick}>
      <p>{title}</p>
      <p>{id}</p>
      <p>{price}</p>
      <img src={cover} alt={title}/>
    </div>
  );
}

export default Book;

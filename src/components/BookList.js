import "./BookList.css";
import Book from "./Book";

function BookList({ bookList, pickBook }) {
  return (
    <div className="BookList">
      <h2 className="BookList-header">Book Catalogue</h2>
      <div className="BookList-shelf">
        {bookList.map((book) => {
          return <Book key={book.id} pickBook={pickBook} {...book} />;
        })}
      </div>
    </div>
  );
}

export default BookList;

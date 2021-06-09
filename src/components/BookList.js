import "./BookList.css";
import Book from "./Book";

function BookList({ bookList, pickBook }) {
  return (
    <div className="BookList">
      <h1>This is Book List</h1>
      {bookList.map(book => {
        return (
          <Book key={book.id} pickBook={pickBook} { ...book }/>
        )
      })}
    </div>
  );
}

export default BookList;

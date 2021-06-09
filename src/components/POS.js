import { useState, useEffect } from "react";
import axios from "axios";

import "./POS.css";

import BookList from "./BookList";
import ShoppingCart from "./ShoppingCart";

function POS() {
  const API_URL = "https://akita-examination.s3-ap-southeast-1.amazonaws.com/shiba-book-shop.json";
  const CORS_URL = "https://cors-anywhere.herokuapp.com/";

  const [bookList, setBookList] = useState([]);
  const [pickedBook, setPickedBook] = useState([]);
  const discountBookId = [
    "9781408855652", 
    "9781408855669", 
    "9781408855676", 
    "9781408855683", 
    "9781408855690", 
    "9781408855706", 
    "9781408855713",
  ];

  useEffect(() => {
    async function fetchBookList() {
      const { data } = await axios.get(`${CORS_URL}${API_URL}`);
      setBookList(data.books);
    }

    fetchBookList();
  }, [bookList]);

  function pickBook(bookId) {
    let updatePickedBook = [];
    const isPicked = pickedBook.some((book) => book.id === bookId);

    if (isPicked) {
      updatePickedBook = pickedBook.map((book) => {
        if (book.id === bookId) {
          book.count++;
        }
        return book
      });
    } else {
      const newBook = bookList.find((book) => book.id === bookId);
      updatePickedBook = [...pickedBook, { ...newBook, count: 1 }];
    }

    setPickedBook(updatePickedBook);
  }

  function increaseQuantity(bookId) {
    const updatePickedBook = pickedBook.map((book) => {
      if (book.id === bookId) {
        book.count++;
      }
      return book
    });

    setPickedBook(updatePickedBook);
  }

  function decreaseQuantity(bookId) {
    let needDeletion = false;
    let updatePickedBook = pickedBook.map((book) => {
      if (book.id === bookId) {
        book.count--;
        if (book.count === 0) {
          needDeletion = true;
        }
      }

      return book
    });

    if (needDeletion) {
      updatePickedBook = updatePickedBook.filter(book => book.id !== bookId);
    }

    setPickedBook(updatePickedBook);
  }

  function deleteItem(bookId) {
    const updatePickedBook = pickedBook.filter(book => book.id !== bookId);
    setPickedBook(updatePickedBook);
  }

  function reset() {
    setPickedBook([]);
  }

  return (
    <div className="POS">
      <BookList bookList={bookList} pickBook={pickBook} />
      <ShoppingCart
        pickedBook={pickedBook}
        discountBookId={discountBookId}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteItem={deleteItem}
        reset={reset}
      />
    </div>
  );
}

export default POS;

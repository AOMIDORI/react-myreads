import React from 'react';
import Book from './book';

export default function Bookshelf({ name, books, updateBookShelf}){
  return(
      <div className="bookshelf">
        <h2 className="bookshelf-title"> { name } </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.sort((a,b) => {
                return a.title > b.title;
              }).map((book)=>(
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    imageLinks={book.imageLinks}
                    updateBookShelf={updateBookShelf}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
  );
};

import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import MyReads from './components/myReads';
import Search from './components/search';

class BooksApp extends React.Component {
  constructor(){
    super();
    this.state = BooksAPI.getAll().then((books) => {
      this.setState({books:books});
    });
  }

  updateBookShelf = (book, whichShelf)=>{
    const {books} = this.state;
    const bookId = books.findIndex((key)=>{
      return key.id === book.id;
    });

    let stateBooks = Object.assign([], books);

    if (bookId === -1){
      const newBook = Object.assign({}, book);
      newBook.shelf = whichShelf;
      stateBooks.push(newBook);
    }
    else{
      stateBooks[bookId] = Object.assign({}, stateBooks[bookId]);
      stateBooks[bookId].shelf = whichShelf;
    }

    BooksAPI.update(book, whichShelf).then(
      this.setState({books: stateBooks})
    );
  };

  render() {
    const {books} = this.state;
    if(!books){
      return null;
    }
    return (
      <div className="app">
        <Route path="/search" render={()=>(
            <Search
              libraryBooks={ books }
              updateBookShelf={ this.updateBookShelf}
            />
        )}/>
        <Route exact path="/" render={()=>(
            <MyReads
              books={books}
              updateBookShelf={this.updateBookShelf}
            />
        )}/>
      </div>
    );
  }
}

export default BooksApp

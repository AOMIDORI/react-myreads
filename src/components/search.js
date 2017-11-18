import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './book';

class Search extends Component{
  constructor(){
    super();
    this.state = {
      query: '',
      books: []
    };
  }


  updateQuery = (query) => {
    const {libraryBooks} = this.props;
    this.setState({ query: query});
    if (query.error){
      console.log("query error!");
      return;
    }
    BooksAPI.search(query,10).then((response) => {
      console.log(response);
      if(response){
        const books = response.map((book) => {
          const libBook = libraryBooks.find((libBook)=> libBook.id===book.id);
          const shelf = libBook ? libBook.shelf : 'none';

          return {
            id: book.id,
            title: book.title,
            authors: book.authors,
            shelf: shelf,
            imageLinks:{
              thumbnail: book.imageLinks.thumbnail
            }
          };
        });
        this.setState({books});
      }
    });
  };

  render(){
    const { books } = this.state;
    const { updateBookShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={ (event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book)=>(
                <li key={ book.id} >
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
  }

}

export default Search;

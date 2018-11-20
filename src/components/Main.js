// JavaScript Document

import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksInfo from '../BooksInfo';


import Shelf from './Shelf';

class Main extends React.Component{
  
  state={
      books:[]
    };
  

  //The constructor pulls in the properties to build the BooksInfo
  constructor(props){
    super(props);
  
   BooksInfo.getAll().then(response =>{
      this.setState({books:response});
      
    });
  }
  
    
  //This is the modifyBook function that is used in several files. By changing the state and filtering
//through the BooksInfo file, it is filtering based on the entry and adding those matching titles to
//output
  modifyBook = (book, shelf) => {
    BooksInfo.update(book, shelf)
      .then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
          }));
        });
  };
  get modifyBook() {
    return this._modifyBook;
  }
  set modifyBook(value) {
    this._modifyBook = value;
  }
  
  
	//This is where the page allows the option and modifies each selection. This allows for th
  render(props) {
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads-The Main Shelves of my Library Selections</h1>
        </div>
        <div className="list-books-content">
          <div>
            <shelf />
            <Shelf set modifyBook={this.modifyBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />

            <Shelf set modifyBook={this.modifyBook} name="I Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />

            <Shelf set modifyBook={this.modifyBook} name="I have Read" books={this.state.books.filter(b => b.shelf === "read")} />
            
           
          </div>
        </div>

        <div className="open-search">
          <Link to="/search"><p>Add a book</p></Link>
        </div>
      </div>
    );
  }
	
}






export default Main;
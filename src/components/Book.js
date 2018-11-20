// JavaScript Document

import React from 'react';

import * as BooksInfo from '../BooksInfo';

class Book extends React.Component{
//renders the book information on the main page
//renders the objects on the DOM
  //Allows for modification to put each piece of data (the book) on the assigned shelf
  state={
    books:[]
  };
  constructor(props){
    super(props);
  
   BooksInfo.getAll().then(response =>{
      this.setState({books:response});
      
    });
  }
  
 

	render(props){
    const newBook = this.props;
    return(
		  <li>
      
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.book.imageLinks  && this.props.book.imageLinks.thumbnail}")`
                            }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.props.book.shelf || "none"} onChange={(event) =>{ const newShelf = newBook.modifyBook(newBook.book, event.target.value);}}>
                                newShelf;
                                <option value="move" disabled>Move book to...</option>
                                <option value="currentlyReading">Currently Reading shelf</option>
                                <option value="wantToRead">I Want to Read shelf</option>
                                <option value="read">I have Read shelf</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.book.title||"No Title..."}</div>
                          <div className="book-authors">{this.props.book.authors || "No Author"}</div>
                        </div>
                      </li>
                
		);
		
	}
}
	


export default Book;
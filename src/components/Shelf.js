// JavaScript Document

import React from 'react';
import Book from './Book';
class Shelf extends React.Component{
//This is where the shelf title changes and the book is "moved" this modifies the Book key alowing for a 
//change in the shelf


	render(props){
    
const newShelf = this.props;
		return(
	

      <div className="shelf">
                  <h2 className="shelf-title">{newShelf.name}</h2>
                  <div className="shelf-books">
                    <ol className="grid">
                      {
                        newShelf.books.map((book, key) => 
                        <Book set modifyBook={newShelf.modifyBook}  book={book} key={key} /> )
                      
                      }
                    </ol>
                  </div>
                </div>
		);
		
	}
	
}

export default Shelf;






























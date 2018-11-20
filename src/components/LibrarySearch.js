import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksInfo from '../BooksInfo';
import Book from './Book';
import Shelf from './Shelf';




class LibrarySearch extends React.Component{
//sets the state to the page from the search block to accept arrays
  constructor(props){ 
    super(props);
  this.state = {
    books: [],
    results: [],
    query: '',
    response:''
  };
  BooksInfo.getAll().then(() => {
    this.setState({ books: [] });
  });

}
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
  

  
  
  
 
//Set the entry as query and submit to to the submit search function    
updateQuery  (query) {
  
  this.setState({query}, this.submitSearch);
  
 
}




//test the query with the values in the Books API data
submitSearch(){
 //if not a legit entry returns blank results
   const query = this.state.query
//utilized ryan waite walkthrough for the filtering logic and the render function below  
  if(query === '' || query === undefined){
    return this.setState ({ books: []});
   
  }else{
    
        BooksInfo.search(query.trim()).then(response => {
           
          if(response.error) {
            alert('No match try again');
            
            return this.setState({ results: [] });
            
            
          }else{

          const Bfilter = this.state.books  
            
          response.forEach(b => {
              
              let f = Bfilter.filter(B => B.id === b.id);
              
              if(f[0]) {
                
                b.shelf = f[0].shelf;
               
      
              }
              else{
                
                return this.setState({ results: response });
              }
            });

            
            
          }
        });
      }
}

 modifyBook = (book,shelf) => {

    BooksInfo.update(book, shelf)
      .then(response => {
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
  newMethod() {
    function mapStateToProps(state) {
      return {
        book: state.book, 
        shelf: state.shelf
      };
    }
  }



	
	render(){
    const {query, results} = this.state

    
		return(
		<div className = "search" >
          <div className = "search-bar" >
          <Link className = "close-search" to ="/"> Close < /Link> <div className = "search-input-wrapper" >
    
      
      <input type = "text" placeholder = "Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/ >

          </div > </div> <div className = "search-results" >
          <div className="list-books">
            <div className="list-books-title">
              <h1>Library Search Shelves</h1>
              <p>Keep in mind the selections made here will appear on your main shelves</p>
            </div>
            <div className="list-books-content">
              <div>
               
                <Shelf set modifyBook={this.modifyBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />

                <Shelf set modifyBook={this.modifyBook}  name="I Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
                 
                <Shelf set modifyBook={this.modifyBook} name="I have Read" books={this.state.books.filter(b => b.shelf === "read")} />   

                
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">></Link>
            </div>
          </div>
            <ol className = "grid" > 
            {
              results.map((book, key) => 
              <Book set modifyBook={this.modifyBook} book={book} key={key} />)
           
               
        
            }
            
            
        </ol> </div > </div>
		);
		
	}
	
}

export default LibrarySearch;
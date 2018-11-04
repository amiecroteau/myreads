import React from 'react'

import './App.css'

import {
  Route
} from 'react-router-dom'


import Main from './components/pages/Main';

import LibrarySearch from './components/pages/LibrarySearch';
//imports all the pages to interact together on the application
//so they all can render at the same time
class BooksApp extends React.Component {

  render() {
    return ( < div >
      <
      Route exact path = "/"
      component = {
        Main
      }
      /> <
      Route exact path = "/search"
      component = {
        LibrarySearch
      }
      /> 	

      <
      /div >
    );







  }
}

export default BooksApp

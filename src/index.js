import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import {
	BrowserRouter
} from 'react-router-dom'
//renders EVERYTHING to the DOM
ReactDOM.render( < BrowserRouter >
	<App / >
	</BrowserRouter > ,
				document.getElementById('root'))

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import './style.scss';
import './style2.scss';
import App from './App';

import { Provider } from  'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

let infoDefault = window.localStorage.getItem("userInfo")||[];
function infoReducer(state = infoDefault, action) {
    if(action.type === 'init') {
		var today = new Date(); //new Date().toJSON().slice(0,10).replace(/-/g,'/');
		if(localStorage.getItem('userInfo') === null) {
			localStorage.setItem('userInfo', JSON.stringify([{date: today, data: action.payload}]));   
		}
		else {
			let temp = JSON.parse(localStorage.getItem('userInfo'));
			temp.push({date: today, data: action.payload})
			localStorage.setItem('userInfo', JSON.stringify(temp));   
		}
		return JSON.parse(localStorage.getItem('userInfo'));
    }
	else if(action.type === 'load') {
		let temp = localStorage.getItem('userInfo');
		if(temp !== null) return JSON.parse(temp);
		return null;
    }
	else if(action.type === 'clear') {
		localStorage.removeItem('userInfo');  
		localStorage.removeItem('aimWei');  
		return null;
    }
	else if(action.type === 'delete') {
		let temp = JSON.parse(localStorage.getItem('userInfo'));

		action.payload.reverse().map(e=>temp.splice(e, 1));
		localStorage.setItem('userInfo', JSON.stringify(temp));
		return JSON.parse(JSON.stringify(temp));
    }
	
    return state;
}


function langReducer(state = 'en', action) {
	if(action.type === 'setLang') return action.payload;
  return state;
}

function pageReducer(state = 'profile', action) {
    if(action.type === 'changePage') {
      return action.payload;
    } 
    return state;
}

function themeReducer(state = 'light', action) {
    if(action.type === 'darkTheme') {
			localStorage.setItem('userTheme', 'dark');
			return 'dark';
    } 
		if(action.type === 'lightTheme') {
			localStorage.setItem('userTheme', 'light');
      return 'light';
    } 
    return state;
}

function animReducer(state = 'on', action) {
    if(action.type === 'animOff') {
			localStorage.setItem('anim', 'off');
			return 'off';
    } 
		if(action.type === 'animOn') {
			localStorage.setItem('anim', 'on');
			return 'on';
    } 
		return state;
}

let store = createStore(combineReducers({infoReducer, langReducer, pageReducer, themeReducer, animReducer}));

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
		 <Provider store={store}>
	  <App />
			  </Provider>
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



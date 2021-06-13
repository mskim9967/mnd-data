import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';

import Nav from './Nav.js';
import Content from './Content.js';
import Popup from './Popup.js';

function App(props) {
	useEffect(()=>{
	if(props.theme==='light') {
		document.documentElement.style.setProperty("--text", '#444444');
		document.documentElement.style.setProperty("--text2", '#888888');
		document.documentElement.style.setProperty("--pageBg", '#fbfbfb');
		document.documentElement.style.setProperty("--tabBg", '#ffffff');
		document.documentElement.style.setProperty("--lightShadow", '#ffffff');
		document.documentElement.style.setProperty("--shadow", '#8f8f8f');
		document.documentElement.style.setProperty("--darkShadow", '#000000');	
		
		document.documentElement.style.setProperty("--im", '#fffcfc');	
		document.documentElement.style.setProperty("--cg", '#f5f8ff');	
		document.documentElement.style.setProperty("--ml", '#fffff9');	
		document.documentElement.style.setProperty("--sm", '#f7fffa');
		document.documentElement.style.setProperty("--sc", '#f7ffff');	
	}
	else {
		document.documentElement.style.setProperty("--text", '#dddddd');
		document.documentElement.style.setProperty("--text2", '#bbbbbb');
		document.documentElement.style.setProperty("--pageBg", '#242424');
		document.documentElement.style.setProperty("--tabBg", '#1a1a1a');
		document.documentElement.style.setProperty("--lightShadow", '#0a0a0a');
		document.documentElement.style.setProperty("--shadow", '#000000');
		document.documentElement.style.setProperty("--darkShadow", '#777777');	
		
		document.documentElement.style.setProperty("--im", '#362e2e');	
		document.documentElement.style.setProperty("--cg", '#2e3036');	
		document.documentElement.style.setProperty("--ml", '#36342e');	
		document.documentElement.style.setProperty("--sm", '#2e3636');
		document.documentElement.style.setProperty("--sc", '#2e3636');	
	}
},[props.theme])

	useEffect(()=>{
		if(localStorage.getItem('userTheme')==='dark') props.dispatch({type:'darkTheme'});
		else if(localStorage.getItem('userTheme')==='light') props.dispatch({type:'lightTheme'});
		else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme:Dark)').matches)
			props.dispatch({type:'darkTheme'});

		if(localStorage.getItem('anim')==='off') props.dispatch({type:'animOff'});
		else props.dispatch({type:'animOn'});
	},[])
	
	return (
		<div className={`App ${props.anim}`}> 
			<Switch>
				<Route path="/:lang/:page">
					<Popup></Popup>
					<Content></Content>
					<Nav></Nav>
				</Route>
				<Route exact path="/:lang" render={props => (<Redirect to={`/${props.match.params.lang}/songs`} />)}/>
				<Route exact path="/" render={props => (<Redirect to={'/kr/welcome'}/>)}/>
			</Switch>
		</div>
		);
}

function stateToProps(state) {
    return {
				info: state.infoReducer,
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer,
				theme: state.themeReducer,
				anim: state.animReducer
    }
}

export default connect(stateToProps)(App);

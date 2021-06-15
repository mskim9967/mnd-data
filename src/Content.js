import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import SongCardList from './SongCardList.js';
import PlaylistTab from './PlaylistTab.js';
import Main from './Main.js';
import Input from './Input.js';
import Profile from './Profile.js';
import Statistic from './Statistic.js';
import Setting from './Setting.js';

import { BrowserRouter as Switch, useParams, Route, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function Content(props){
	const { lang, page } = useParams();
	const location = useLocation();
	const { search } = useLocation();
	const { song_id } = queryString.parse(search);	

	useEffect(()=>{ 
		if(page) props.dispatch({type:'changePage', payload:page});
		
		
	}, [location]);

	
	return(
		<div className={"content "}>
			<div className={"page " + (props.nowPage === 'welcome' ? "active" : "")} >
				<Main></Main>
			</div>
			<div className={"page " + (props.nowPage === 'init' ? "active" : "")} >
				<Input></Input>
			</div>
			
			<div className={"page " + (props.nowPage === 'profile' ? "active" : "")} >
				<Profile></Profile>
			</div>
			
			<div className={"page " + (props.nowPage === 'statistic' ? "active" : "")} >
				<Statistic></Statistic>
			</div>
			
			<div className={"page " + (props.nowPage === 'program' ? "active" : "")} >
				<div className={"search"} >
				</div>
			</div>
			
			<div className={"page " + (props.nowPage === 'setting' ? "active" : "")} >
				<Setting></Setting>
			</div>
			
		<Switch>
			<Route path={'/app/:lang/:page'}>
				
			</Route>
		</Switch>
		</div>
	)
}

function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer,
				playlists: state.playlistsReducer,
    }
}

export default connect(stateToProps)(Content);
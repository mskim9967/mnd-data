import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Link, useHistory, useParams, Route, Redirect, useLocation } from 'react-router-dom'; 

function SongSearch(props){
	const location = useLocation();
	const { lang, page } = useParams();

	useEffect(()=>{ 


	}, []);

	return(
		<div className="songSearchArea">
			<div className='songSearchBar'>
			<input className="songSearchInput" type="search" name="" placeholder="제목, 앨범, 아이돌, 성우..." />
			</div>
        
		</div>
	)
} 

function stateToProps(state) {
	return {
  	playerReducer : state.playerReducer,
		lang: state.langReducer,
		nowPage: state.pageReducer
 	}
} 

export default connect(stateToProps)(SongSearch);
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';

 
function Main(props) {
	const { lang, page } = useParams();
	const history = useHistory();
	const location = useLocation();
	 
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	
	var timerID;
	
	useEffect(()=>{ 
		if(localStorage.getItem('userInfo')!==null) {
			props.dispatch({type:'load'});
			if(page === 'welcome') history.replace(`/${lang}/profile`);
		}
	}, [localStorage.getItem('userInfo')]);
	

	return (
	<div className={`main alignCenter`}>
		<div className={`info `}>
			<p>안녕하세요!</p>
			<p>등록된 신체 정보가 없어요 :(</p>
			 <Button variant="outlined" size="large" color="primary"	onClick={()=>history.push(`/${lang}/init`)}>
          신체 정보 등록하러 가기
        </Button>
		</div>
	</div>
	)
}


function stateToProps(state) {
	return {
			isPlayerActive: state.playerActiveReducer,
			playerReducer : state.playerReducer,
			lang: state.langReducer,
			nowPage: state.pageReducer,
			theme: state.themeReducer,
  			playlists: state.playlistsReducer,
		}
}

export default connect(stateToProps)(Main);
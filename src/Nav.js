import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Player from './Player.js';

function Nav(props) {
	const { lang, page  } = useParams();
	const history = useHistory();
	const location = useLocation();
	const iconColor='#909090',iconActiveColor='#f0757c';
	const handlers = useSwipeable({
			onSwipedUp: (eventData) => history.push(`${location.pathname}?song_id=${props.playerReducer.song_id}`)
	});
	
	
	return (
		<div className="nav" {...handlers}>
			<div className={'menu '+ ((page === 'welcome' || page === 'init') ? "inactive": "")}>
				<div className={"tab profile " + (props.nowPage === 'profile' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'profile') history.replace(`/${lang}/profile`);
					}}>
					<MusicNoteIcon style={{fontSize: 35, color:props.nowPage==='profile'?iconActiveColor:iconColor}}></MusicNoteIcon>
					<p className="label">{{ kr: '프로필', en: 'Profile' }[lang]}</p>
				</div>

				<div className={"tab statistic " + (props.nowPage === 'statistic' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'statistic') history.replace(`/${lang}/statistic`);
					}}>
					<QueueMusicIcon style={{fontSize: 35, color:props.nowPage==='statistic'?iconActiveColor:iconColor}}></QueueMusicIcon>
					<p className="label">{{ kr: '통계', en: 'Statistic' }[lang]}</p>
				</div>

				<div className={"tab program " + (props.nowPage === 'program' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'program') history.replace(`/${lang}/program`);
					}}>
					<SearchIcon style={{fontSize: 35, color:props.nowPage==='program'?iconActiveColor:iconColor}}></SearchIcon>
					<p className="label">{{ kr: '프로그램', en: 'Program', jp: '検索'}[lang]}</p>
				</div>

				<div className={"tab setting " + (props.nowPage === 'setting' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'setting') history.replace(`/${lang}/setting`);
					}}>
					<SettingsIcon style={{fontSize: 35, color:props.nowPage==='setting'?iconActiveColor:iconColor}}></SettingsIcon>
					<p className="label">{{kr: '설정', en: 'Setting', jp: '設定'}[lang]}</p>
				</div>
				
			</div>
			<Player></Player>
		</div>
	)
}

function stateToProps(state) {
    return {
		info: state.infoReducer,
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

export default connect(stateToProps)(Nav);
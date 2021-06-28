import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import PersonIcon from '@material-ui/icons/Person';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SettingsIcon from '@material-ui/icons/Settings';


function Nav(props) {
	const { lang, page  } = useParams();
	const history = useHistory();
	const location = useLocation();
	const iconColor='#909090',iconActiveColor='#f0757c';

	
	
	return (
		<div className="nav" >
			<div className={'menu '+ ((page === 'welcome' || page === 'init') ? "inactive": "")}>
				<div className={"tab profile " + (props.nowPage === 'profile' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'profile') history.replace(`/${lang}/profile`);
					}}>
					<PersonIcon style={{fontSize: 35, color:props.nowPage==='profile'?iconActiveColor:iconColor}}></PersonIcon>
					<p className="label">{{ kr: '프로필', en: 'Profile' }[lang]}</p>
				</div>

				<div className={"tab statistic " + (props.nowPage === 'statistic' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'statistic') history.replace(`/${lang}/statistic`);
					}}>
					<EqualizerIcon style={{fontSize: 35, color:props.nowPage==='statistic'?iconActiveColor:iconColor}}></EqualizerIcon>
					<p className="label">{{ kr: '통계', en: 'Statistic' }[lang]}</p>
				</div>

				<div className={"tab program " + (props.nowPage === 'program' ? "active" : "")}
					onClick={()=>{
						if(props.nowPage !== 'program') history.replace(`/${lang}/program`);
					}}>
					<YouTubeIcon style={{fontSize: 35, color:props.nowPage==='program'?iconActiveColor:iconColor}}></YouTubeIcon>
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
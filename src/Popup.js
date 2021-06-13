import React, { useState } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

import { Switch } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

function Popup(props) {
	const { lang, page } = useParams();
	const history = useHistory();
	
	const [isPopupActiveded, setPopupActiveded] = useState(false);
	
	const iconColor = '#777777';
	
	// useEffect(()=>{
	// 	setPopupActiveded(false);
	// }, [location]);
	
	return (
		<div className={`popup ${props.isPlayerActive&&'inactive'}`}>
			<div className='userImgArea' onClick={()=>{setPopupActiveded(!isPopupActiveded)}}>
				{false?
					<div className='userImg'><img></img></div>
					:
					<div className='alignCenter iconArea'><PersonIcon style={{fontSize: 35, color:iconColor}}></PersonIcon></div>
				}
			</div>	
			
			<div className={`detailsArea ${!isPopupActiveded&&'inactive'}`}>
				<div className={`alignCenter loginArea`}>login을 해주십시오.</div>
				<div className='alignCenter langLabel'><LanguageIcon></LanguageIcon></div>
				<div className='alignCenter langSetting'>
					<ToggleButtonGroup size='small' exclusive={true} value={lang} onChange={(event, value)=>{
						if(value) {
							history.replace(`/${value}/${page}`);
							//props.dispatch({type:'langChanged'});
						}
					}}>
						<ToggleButton value='kr'>한국어</ToggleButton>
						<ToggleButton value='en'>&nbsp;ENG&nbsp;</ToggleButton>
						<ToggleButton value='jp'>日本語</ToggleButton>
					</ToggleButtonGroup>
				</div>
				
				<div className='alignCenter themeLabel'>{props.theme==='light'?<WbSunnyIcon></WbSunnyIcon>:<NightsStayIcon></NightsStayIcon>}</div>
				<div className='alignCenter themeSetting'>
					<Switch color='primary' checked={props.theme==='light'} onChange={(event)=>{
						event.target.checked?props.dispatch({type:'lightTheme'}):props.dispatch({type:'darkTheme'});		
					}}></Switch>
				</div>
				
				<div className='alignCenter animLabel'>{props.anim==='off'?<SyncDisabledIcon></SyncDisabledIcon>:<SyncIcon></SyncIcon>}</div>
				<div className='alignCenter animSetting'>
					<Switch color='primary' checked={props.anim==='on'} onChange={(event)=>{
						event.target.checked?props.dispatch({type:'animOn'}):props.dispatch({type:'animOff'});		
					}}></Switch>
				</div>
				
			</div>	
			
			<div className={`bg ${!isPopupActiveded&&'inactive'}`} onClick={()=>{setPopupActiveded(false)}}></div>	
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
				anim: state.animReducer
    }
}

export default connect(stateToProps)(Popup);
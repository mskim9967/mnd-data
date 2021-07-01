import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});
const darkTheme = createMuiTheme({
  palette: {
	 primary: {
      main: "#ffaea8",
     },
    type: "dark"
  }
});


function Profile(props) {
	const { lang, page } = useParams();
	const history = useHistory();
	const location = useLocation();
	
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	
	const [latestIdx, setLatestIdx] = useState(null);
	const [today, setToday] = useState(null);
	
	const [spanSec, setSpanSec] = useState(0);
	const [rand, setRand] = useState(Math.floor(Math.random()*3));
	
	const [modal, setModal] = useState(false);
	const [aimWei, setAimWei] = useState(null);
	const aimWeiRef = useRef(null);
	

	var timerID;
	
	function bmi2str(bmi) {
		if(bmi < 18.5) return { kr: '저체중', en: 'Low weight' }[lang];
		else if(bmi < 23) return { kr: '정상', en: 'Normal weight' }[lang];
		else if(bmi < 25) return { kr: '과체중', en: 'Overweight' }[lang];
		else if(bmi < 30) return { kr: '비만', en: 'Obesity' }[lang];
		else return { kr: '고도비만', en: 'High obesity' }[lang];
	}
	
	function TimeBefore() {
		return (<>
			{Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60?(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))+{ kr: '초', en: ' seconds' }[lang]):(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60*60?(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60)+{ kr: '분', en: ' minutes' }[lang]):(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60*60*24?(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60/60)+{ kr: '시간', en: '  hours' }[lang]):(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60/60/24)+{ kr: '일', en: ' days' }[lang])))}
		</>)
	}
	
	useEffect(()=>{ 	
		if(props.info !== null) {
			setLatestIdx(props.info.length - 1);
		}
		else {
			setLatestIdx(null);
		}
	}, [props.info]);
	
	useEffect(()=>{ 	
		setToday(new Date());
		if(latestIdx && props.info[latestIdx])
			setSpanSec(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000))));
		
		if(page==='profile') {
			let temp = rand, next = Math.floor(Math.random()*3);
			while(next===temp) next = Math.floor(Math.random()*3);
			setRand(next);
		}
	}, [location]);
	
	useEffect(()=>{ 	
		setAimWei(JSON.parse(localStorage.getItem('aimWei')));
	}, [localStorage.getItem('aimWei')]);
	
	
	return (<>{(props.info !== null && props.info[latestIdx]?.data!==undefined) &&(
	
	
			   
	<div className={`profile`}>
		<div className={`modal ${!modal&&'inactive'}`}>
			<ThemeProvider theme={props.theme==='dark'?{...darkTheme}:{...lightTheme}}>
			<div className='aimWei'><TextField id="standard-basic" label={{ kr: '목표 체중(kg)', en: 'Target Weight(kg)' }[lang]} inputRef={aimWeiRef}/> </div>	
			<Button variant="outlined" size="large" color="primary"	onClick={()=>{
				if(/^-?\d+\.?\d*$/.test(aimWeiRef.current.value)) {
					localStorage.setItem('aimWei', JSON.stringify(aimWeiRef.current.value));
					setModal(false);	
				}
				else {
					alert({ kr: '숫자만 입력해 주세요!', en: 'Please enter only numbers!' }[lang]);
				}
				
			}}>
				{{ kr: '등록', en: 'submit' }[lang]}
			</Button>
			</ThemeProvider>

		</div>
		<div className={`bg ${!modal&&'inactive'}`} onClick={()=>setModal(false)}></div>	   
				   
		
		<p> {{ kr: `안녕하세요 ${props.info[latestIdx].data.name}님 :)`, en: `Hello ${props.info[latestIdx].data.name} :)` }[lang]}</p>
	    {{	0:{ kr: <p> <TimeBefore/> 전의 bmi 지수는 {bmi2str(props.info[latestIdx].data.weight/(props.info[latestIdx].data.height*props.info[latestIdx].data.height/10000))}이네요!</p>, en: <p> The bmi index <TimeBefore/> ago is {bmi2str(props.info[latestIdx].data.weight/(props.info[latestIdx].data.height*props.info[latestIdx].data.height/10000))}!</p> }[lang],
			1:<p>{aimWei===null?{ kr: `목표 체중을 입력해주세요!`, en: `Please enter your target weight!` }[lang]:props.info[latestIdx].data.weight-aimWei?{ kr: `목표 체중까지 ${parseFloat((Math.abs(props.info[latestIdx].data.weight-aimWei)).toFixed(2))}kg 남았어요! 화이팅!!`, en: `We have ${parseFloat((Math.abs(props.info[latestIdx].data.weight-aimWei)).toFixed(2))}kg left until our target weight! Go for it!!` }[lang]:{ kr: `목표 체중을 달성했네요!`, en: `You've reached your target weight!` }[lang]}</p>,
			2:<p>{(latestIdx>=1&&props.info[latestIdx].data.weight !== props.info[latestIdx-1].data.weight) ? {kr: `최근 체중이 ${Math.abs(props.info[latestIdx].data.weight - props.info[latestIdx-1].data.weight).toFixed(2)}kg  ${props.info[latestIdx].data.weight > props.info[latestIdx-1].data.weight?'증가':'감소'}했어요!`, en: `You've ${props.info[latestIdx].data.weight > props.info[latestIdx-1].data.weight?'gained':'lost'} ${Math.abs(props.info[latestIdx].data.weight - props.info[latestIdx-1].data.weight).toFixed(2)}kg recently!` }[lang]:{ kr:`최근 체중은 ${Math.abs(props.info[latestIdx].data.weight).toFixed(2)}kg 입니다!`, en:`The latest weight is ${Math.abs(props.info[latestIdx].data.weight).toFixed(2)}kg!` }[lang]}</p>}[rand]
		}
		
				   
		{/*
		<p>키 {props.info[latestIdx].data.height}</p>
		<p>몸무게 {props.info[latestIdx].data.weight}</p>
		<p>허리 {props.info[latestIdx].data.waist}</p>
		<p>머리 {props.info[latestIdx].data.head}</p>
		<p>발 {props.info[latestIdx].data.feet}</p>
		*/}

		<div className={`addUserInfoButton`}>
			<Button variant="outlined" size="large" color="primary"	onClick={()=>{history.push(`/${lang}/init`)}}>
				{{ kr: '신체 측정 업데이트', en: 'Update Body Measurements' }[lang]}
			</Button>
		</div>
	    <div className={`aimWeiButton`}>
			<Button variant="outlined" size="large" color="primary"	onClick={()=>{setModal(true)}}>
				{{ kr: '목표 체중 입력', en: 'Enter Target Weight' }[lang]}
			</Button>
		</div>	
	</div>
	)}</>)
}
function stateToProps(state) {
	return {
		info: state.infoReducer,
		isPlayerActive: state.playerActiveReducer,
		playerReducer : state.playerReducer,
		lang: state.langReducer,
		nowPage: state.pageReducer,
		theme: state.themeReducer,
		playlists: state.playlistsReducer,
	}
}

export default connect(stateToProps)(Profile);
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
	
	var timerID;
	
	function bmi2str(bmi) {
		if(bmi < 18.5) return '저체중';
		else if(bmi < 23) return '정상';
		else if(bmi < 25) return '과체중';
		else if(bmi < 30) return '비만';
		else return '고도비만';
	}
	
	function TimeBefore() {
		return (<>
			{Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60?(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))+'초'):(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60*60?(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60)+'분'):(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))<60*60*24?(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60/60)+'시간'):(parseInt(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000)))/60/60/24)+'일')))}
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
	
	return (<>{(props.info !== null && props.info[latestIdx]?.data!==undefined) &&(
	
	<div className={`profile`}>
		<p> 안녕하세요 {props.info[latestIdx].data.name}님 :)</p>
	    {{	0:<p> <TimeBefore/> 전의 bmi 지수는 {bmi2str(props.info[latestIdx].data.weight/(props.info[latestIdx].data.height*props.info[latestIdx].data.height/10000))}이네요!</p>,
			1:<p>목표 체중까지 kg 남았어요! 화이팅!!</p>,
			2:<p>{latestIdx>=1 ? `최근 체중이 ${Math.abs(props.info[latestIdx].data.weight - props.info[latestIdx-1].data.weight)}kg  ${props.info[latestIdx].data.weight > props.info[latestIdx-1].data.weight?'증가':'감소'}했어요!`:`현재 체중은 ${props.info[latestIdx].data.weight}kg 입니다!`}</p>}[rand]
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
				신체 측정 업데이트
			</Button>
		</div>
	    <div className={`deleteUserInfoButton`}>
			<Button variant="outlined" size="large" color="primary"	onClick={()=>{ props.dispatch({type:'clear'});history.replace(`/${lang}/welcome`)}}>
				이전 신체 데이터 초기화
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
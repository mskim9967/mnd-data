import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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

import { CircularInput, CircularTrack, CircularProgress, CircularThumb } from "react-circular-input";

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

function Input(props) {
	const { lang } = useParams();
	const history = useHistory();
	
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	const nameRef = useRef(null);
	const heightRef = useRef(null);
	const weightRef = useRef(null);
	const waistRef = useRef(null);
	const headRef = useRef(null);
	const feetRef = useRef(null);
	const crotchRef = useRef(null);
	
	const [heightDial, setHeightDial] = useState(0.5);
	const [weightDial, setWeightDial] = useState(0.5);
	
	const [latestIdx, setLatestIdx] = useState(null);
	const [latestData, setLatestData] = useState(null);
	
	const location = useLocation();
	
	const userInfo = {};
	
	var timerID;
	
	useEffect(()=>{ 	
		return ()=>clearTimeout(timerID);
	}, []);
	
	useEffect(()=>{ 	
		if(props.info !== null) {
			setLatestIdx(props.info.length - 1);
			if(props.info[props.info.length - 1]?.data?.name !== undefined) {
				nameRef.current.value = props.info[props.info.length - 1]?.data?.name;
				
				headRef.current.value = props.info[props.info.length - 1]?.data?.head;
			}
		}
		else {
			setLatestIdx(null);
			nameRef.current.value = '';
			headRef.current.value = '';
		}
	}, [props.info, location]);
	
	return (
	<div className={`input`}>
		<div className={`info`}>
			<div className={`container`}>
				 <ThemeProvider theme={props.theme==='dark'?{...darkTheme}:{...lightTheme}}>
				<div className='name'><TextField id="standard-basic" label={{ kr: "이름", en: 'Name' }[lang]} inputRef={nameRef}/> </div>	
				
				<div className='dial alignCenter'><CircularInput value={heightDial} onChange={setHeightDial} radius={70}>
					<CircularTrack strokeWidth={12} stroke={props.theme==='dark'?'#333':'#eee'}/>
					<CircularProgress strokeWidth={14} stroke={`hsl(${210-heightDial * 210}, 100%, 66%)`}/>
					<CircularThumb r={12} fill={`hsl(${210-heightDial * 210}, 100%, 66%)`}/>
					<text x={70} y={70} textAnchor="middle" dy="0.3em" fontSize="25px" fontWeight="bold" fill={props.theme==='dark'?'#ccc':'#444'}>{(heightDial*70+140).toFixed(1)}cm</text>
				</CircularInput></div>
				<div className='dial alignCenter'><CircularInput value={weightDial} onChange={setWeightDial} radius={70}>
					<CircularTrack strokeWidth={12} stroke={props.theme==='dark'?'#333':'#eee'}/>
					<CircularProgress strokeWidth={14} stroke={`hsl(${Math.max(0 ,210-weightDial * 270)}, 100%, 66%)`}/>
					<CircularThumb r={12} fill={`hsl(${Math.max(0 ,210-weightDial * 270)}, 100%, 66%)`}/>
					<text x={70} y={70} textAnchor="middle" dy="0.3em" fontSize="25px" fontWeight="bold" fill={props.theme==='dark'?'#ccc':'#444'}>{(weightDial*90+40).toFixed(1)}kg</text>
				</CircularInput></div>

				<div className='head'><TextField id="standard-basic" label={{ kr: "머리 둘레", en: 'Head circumference' }[lang]} inputRef={headRef}/> </div>	
				<div className='crotch'><TextField id="standard-basic" label={{ kr: "다리 길이", en: 'Crotch length' }[lang]} inputRef={crotchRef}/> </div>		

				<Button variant="outlined" size="large" color="primary"	onClick={()=>{
					if(nameRef.current.value.trim()==='') {
					   alert({ kr: '이름을 입력해주세요!', en: 'Please enter your name!' }[lang]);
					}
					else {
						props.dispatch({type:'init', payload:{name: nameRef.current.value, height: (heightDial*70+140).toFixed(1), weight: (weightDial*90+40).toFixed(1), head: headRef.current.value, crotch: crotchRef.current.value, bmi: (weightDial*90+40)/((heightDial*70+140)*(heightDial*70+140)/10000)}});
						history.push(`/${lang}/profile`); 
					 }
				}}>
					{{ kr: '제출', en: 'Submit' }[lang]}
				</Button>
				</ThemeProvider>
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
		nowPage: state.pageReducer,
		theme: state.themeReducer,
		playlists: state.playlistsReducer,
	}
}

export default connect(stateToProps)(Input);
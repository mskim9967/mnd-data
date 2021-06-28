import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactPlayer from 'react-player'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const lightTheme = createMuiTheme({
  palette: {
	 primary: {
      main: "#ff8585",
     },
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
 

function Program(props) {
	const { children, value, index, ...other } = props;
	const { lang, page } = useParams();
	const history = useHistory();
	const location = useLocation();
	
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	
	const [latestIdx, setLatestIdx] = useState(null);
	const [today, setToday] = useState(null);
	
	const [tableModal, setTableModal] = useState(false);
	const [spanSec, setSpanSec] = useState(0);
	const [rand, setRand] = useState(Math.floor(Math.random()*3));
	const [rows, setRows] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	
	
	
// 	useEffect(()=>{ 	
// 		if(props.info !== null) {
// 			setLatestIdx(props.info.length - 1);
// 		}
// 		else {
// 			setLatestIdx(null);
// 		}
// 	}, [props.info]); 
	
// 	useEffect(()=>{ 	
// 		if(latestIdx && props.info && props.info[latestIdx])
// 			setSpanSec(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000))));
		
// 		if(page==='setting') {
// 			let temp = [];
// 			if(props.info?.length)
// 				props.info?.map((e, i)=>{
// 					temp.push({id: i, date: e.date.slice(2,10).replace(/-/g,'/'), height: e.data.height, weight:e.data.weight})
// 				});
// 			setRows(temp);
// 		}
// 	}, [location, props.info]);
	
	return (<>
	
	<div className={`program`}> 
	<ThemeProvider theme={props.theme==='dark'?{...darkTheme}:{...lightTheme}}>	   
	
		<div
		  role="Program"
		  hidden={value !== index}
		  id={`vertical-Program-${index}`}
		  aria-labelledby={`vertical-tab-${index}`}
		  {...other}
		>
		  {value === index && (
			<Box p={3}>
			  <Typography>{children}</Typography>
			</Box>
		  )}
		</div>
		
    </ThemeProvider>
	</div>
	</>)
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
		anim: state.animReducer,
	}
}

Program.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-Program-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    width: '100%',
	color: '#444444'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,

  },
}));

export default  connect(stateToProps)(function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	const [flankUrls, setFlankUrls] = useState([]);
	const [flankArr, setFlankArr] = useState([]);
	const [sqartUrls, setSqartUrls] = useState([]);
	const [sqartArr, setSqartArr] = useState([]);
	const [lungeUrls, setLungeUrls] = useState([]);
	const [lungeArr, setLungeArr] = useState([]);
	const [pushupUrls, setPushupUrls] = useState([]);
	const [pushupArr, setPushupArr] = useState([]);
	const [dipsUrls, setDipsUrls] = useState([]);
	const [dipsArr, setDipsArr] = useState([]);
	const [pullupUrls, setPullupUrls] = useState([]);
	const [pullupArr, setPullupArr] = useState([]);
	const [runningUrls, setRunningUrls] = useState([]);
	const [runningArr, setRunningArr] = useState([]);
	const [buppyUrls, setBuppyUrls] = useState([]);
	const [buppyArr, setBuppyArr] = useState([]);
	const [ropeUrls, setRopeUrls] = useState([]);
	const [ropeArr, setRopeArr] = useState([]);
	
	
	const [params, setParams] = useState({
		
	});
	const [params1, setParams1] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `플랭크`,
		maxResults: 1000,
		type: 'video',
	});
	const [params2, setParams2] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `스쿼트`,
		maxResults: 1000,
		type: 'video',
	});
	const [params3, setParams3] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `런지`,
		maxResults: 1000,
		type: 'video',
	});
	const [params4, setParams4] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `푸쉬업`,
		maxResults: 1000,
		type: 'video',
	});
	const [params5, setParams5] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `딥스`,
		maxResults: 1000,
		type: 'video',
	});
	const [params6, setParams6] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `풀업`,
		maxResults: 1000,
		type: 'video',
	});
	const [params7, setParams7] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `달리기`,
		maxResults: 1000,
		type: 'video',
	});
	const [params8, setParams8] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `버피`,
		maxResults: 1000,
		type: 'video',
	});
	const [params9, setParams9] = useState({
		key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
		part: 'snippet',
		q: `줄넘기 운동`,
		maxResults: 1000,
		type: 'video',
	});
	
	useEffect(()=>{ 	
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params1 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setFlankUrls([...tmp]);
			setFlankArr([...tmp.slice(0,10)]);

		})
		.catch((e)=>{console.log(e.response)});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params2 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setSqartUrls([...tmp]);
			setSqartArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params3 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setLungeUrls([...tmp]);
			setLungeArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params4 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setPushupUrls([...tmp]);
			setPushupArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params5 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setDipsUrls([...tmp]);
			setDipsArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params6 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setPullupUrls([...tmp]);
			setPullupArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params7 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setRunningUrls([...tmp]);
			setRunningArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params8 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setBuppyUrls([...tmp]);
			setBuppyArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		axios.get('https://www.googleapis.com/youtube/v3/search', { params:params9 })
		.then((res)=>{
			let tmp = [];
			res.data.items.map(e=>{
				tmp.push(e.id.videoId);
			});
			setRopeUrls([...tmp]);
			setRopeArr([...tmp.slice(0,10)]);
		})
		.catch(()=>{});
		
	}, []); 
		const { lang, page } = useParams();
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label={{ kr: "플랭크", en: 'Plank' }[lang]} {...a11yProps(0)} />
        <Tab label={{ kr: "스쿼트", en: 'Squat' }[lang]} {...a11yProps(1)} />
        <Tab label={{ kr: "런지", en: 'Lunge' }[lang]} {...a11yProps(2)} />
        <Tab label={{ kr: "푸쉬업", en: 'Push Up' }[lang]} {...a11yProps(3)} />
        <Tab label={{ kr: "딥스", en: 'Dip' }[lang]} {...a11yProps(4)} />
        <Tab label={{ kr: "풀업", en: 'Pull Up' }[lang]} {...a11yProps(5)} />
        <Tab label={{ kr: "달리기", en: 'Running' }[lang]} {...a11yProps(6)} />
		<Tab label={{ kr: "버피", en: 'Burpee' }[lang]} {...a11yProps(7)} />
		<Tab label={{ kr: "줄넘기", en: 'Jump Rope' }[lang]} {...a11yProps(8)} />
      </Tabs>
      <Program value={value} index={0}>
		<div className='container'>
			{flankArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setFlankArr([...flankUrls.slice(0, flankArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={1}>
		<div className='container'>
			{sqartArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setSqartArr([...sqartUrls.slice(0, sqartArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={2}>
        <div className='container'>
			{lungeArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setLungeArr([...lungeUrls.slice(0, lungeArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={3}>
        <div className='container'>
			{pushupArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setPushupArr([...pushupUrls.slice(0, pushupArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={4}>
        <div className='container'>
			{dipsArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setDipsArr([...dipsUrls.slice(0, dipsArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={5}>
        <div className='container'>
			{pullupArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setPullupArr([...pullupUrls.slice(0, pullupArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
      <Program value={value} index={6}>
        <div className='container'>
			{runningArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setRunningArr([...runningUrls.slice(0, runningArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
		  <Program value={value} index={7}>
        <div className='container'>
			{buppyArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setBuppyArr([...buppyUrls.slice(0, buppyArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
		  <Program value={value} index={8}>
        <div className='container'>
			{ropeArr.map(e=>{
				return(
					<ReactPlayer url={`https://www.youtube.com/watch?v=${e}`} width='100%' height='170px'/>
					
				)
			})}
			<ExpandMoreIcon fontSize='large' onClick={()=>{setRopeArr([...ropeUrls.slice(0, ropeArr.length+10)])}}></ExpandMoreIcon>
		</div>
      </Program>
    </div>
  );
});

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import {parseString} from 'xml2js'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ReactLoading from 'react-loading';

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

const StyledToggleButton = withStyles({
  root: {
    color: 'rgba(170, 170, 170, 1.0)',
    textTransform: 'none',
   	border: 'solid #444444 0.2px',
    '&$selected': {
      backgroundColor: '#111111',
	  color: 'rgba(170, 170, 170, 1.0)',
      '&:hover': {
        backgroundColor: '#222222',
	    color: 'rgba(170, 170, 170, 1.0)',
      },
    },
  },
  selected: {},
})(ToggleButton);

var heightData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	heightAccu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	heightPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	heightBgColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	weightData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	weightAccu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	weightPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	weightBgColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var bmiData = [0, 0, 0, 0, 0],
	bmiAccu = [0, 0, 0, 0, 0],
	bmiPercentage = [0, 0, 0, 0, 0, 0],
	bmiBgColor = [0, 0, 0, 0, 0];

const heightGraphData = ()=> ({
  labels: ['~159cm', '160cm~', '162cm~', '164cm~', '166cm~', '168cm~', '170cm~', '172cm~', '174cm~', '176cm~', '178cm~', '180cm~' , '182cm~' , '184cm~', '186cm~' , '188cm~' ],
  datasets: [
    {
      label: '10만명 당 (명)',
      data: [...heightData],
      backgroundColor: heightBgColor,
      borderColor: ['rgba(0,0,0,0)'],

      borderWidth: 1,
    },
  ],
});

const weightGraphData = ()=> ({
  labels: ['~49kg', '50kg~', '54kg~', '58kg~', '62kg~', '66kg~', '70kg~', '74kg~', '78kg~', '82kg~', '86kg~', '90kg~', '94kg~', '98kg~', '102kg~', '106kg~', '110kg~'],
  datasets: [
    {
      label: '10만명 당 (명)',
      data: [...weightData],
      backgroundColor: weightBgColor,
      borderColor: ['rgba(0,0,0,0)'],

      borderWidth: 1,
    },
  ],
});

const bmiGraphData = ()=> ({
  labels: ['저체중', '정상', '과체중', '비만', '고도비만'],
  datasets: [
    {
      label: '10만명 당 (명)',
      data: [...bmiData],
      backgroundColor: bmiBgColor,
      borderColor: ['rgba(0,0,0,0)'],

      borderWidth: 1,
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
		 gridLines:{color:"#e0e0e0"},
        ticks: {
			fontColor: "#444444",
          //beginAtZero: true,
			callback: function(value, index, values) {
                return value>=1000? (Intl.NumberFormat().format((value/1000)) + 'K'): value;
            }
        },
      },
    ],
	   xAxes: [
      {
	    gridLines:{color:"#e0e0e0"},
        ticks: {
			fontColor: "#444444",
        },
      },
    ],
  },
	tooltips: {
		callbacks: {
          	label: function(tooltipItem, data) {
              return parseFloat(tooltipItem.yLabel.toFixed(2));
          	}
		}
	}
};

const darkOptions = {
  scales: {
    yAxes: [
      {
		gridLines:{color:"#333333"},
        ticks: {
			fontColor: "#bbbbbb",
          //beginAtZero: true,
			callback: function(value, index, values) {
                return Intl.NumberFormat().format((value/1000)) + 'K';
            }
        },
      },
    ],
    xAxes: [
      {
	    gridLines:{color:"#333333"},
        ticks: {
			fontColor: "#bbbbbb",
            
        },
      },
    ],
  },
	tooltips: {
		callbacks: {
          	label: function(tooltipItem, data) {
              return tooltipItem.yLabel;
          	}
		}
	}
};


const refreshGraphData = ()=> ({
  labels: [],
  datasets: [
    {
      data: [],
      borderWidth: 1,
    },
  ],
});


var userHistoryData = [],
	userHistoryLabel = [];

function historyGraphData(type){
	return {
  labels: userHistoryData.map(e=>e.date?.slice(2,10).replace(/-/g,'/')),
  datasets: [
    {
      label: {weight: '몸무게(kg)', height: '키(cm)', bmi: 'bmi지수'}[type],
      data: userHistoryData.map(e=>eval('e.data.'+type)),
	  fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}};



function Statistic(props) {
	const { lang, page } = useParams();
	const history = useHistory();
	const location = useLocation();
	
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	
	const [latestIdx, setLatestIdx] = useState(null);
	const [today, setToday] = useState(null);
	
	const [data, setData] = useState(null);
	const [graph, setGraph] = useState(null);
	const [nowGraph, setNowGraph] = useState(null);
	const [historyGraph, setHistoryGraph] = useState(null);
	const [nowHistoryGraph, setNowHistoryGraph] = useState(null);
	
	const [heightIdx, setHeightIdx] = useState(null);
	const [weightIdx, setWeightIdx] = useState(null);
	
	useEffect(()=>{ 	
		if(props.info !== null) {
			setLatestIdx(props.info.length - 1);
		}
		else {
			setLatestIdx(null);
		}
	}, [props.info]);

	useEffect(()=>{ 	
		setToday(JSON.parse(JSON.stringify(new Date())));
		axios.get('/api')
		.then((res)=>{
			parseString(res.data, function (err, result) {
				setData(result.DS_RECRT_BDMSMNT_MSR_INF.row); 
			});
		})
		.catch(()=>{});
		setNowHistoryGraph('weight');
	}, []);
	
	function height2idx(height) {
		if(height < 160.0) return 0;
		else if(height >= 188.0) return 15;
		else return parseInt((height-160)/2) + 1;
	}
	function weight2idx(weight) {
		if(weight < 50.0) return 0;
		else if(weight >= 110.0) return 16;
		else return parseInt((weight-50)/4) + 1;
	}
	function bmi2idx(bmi) {
		if(bmi < 18.5) return 0;
		else if(bmi < 23) return 1;
		else if(bmi < 25) return 2;
		else if(bmi < 30) return 3;
		else return 4;
	}
	
	useEffect(()=>{
		if(data) {
			let convert = 0.0;
			data.map((e)=>{
				let wei = parseFloat(e.weight_kg), hei = parseFloat(e.statur_cm);
				if(e.statur_cm) heightData[height2idx(hei)]++;
				if(e.weight_kg) weightData[weight2idx(wei)]++;
				bmiData[bmi2idx(wei/(hei*hei/10000))]++;
			});
			heightData.map((e, i)=>{
				heightAccu[i] = (i===0?0:heightAccu[i-1])+e;
			});
			weightData.map((e, i)=>{
				weightAccu[i] = (i===0?0:weightAccu[i-1])+e;
			});
			bmiData.map((e, i)=>{
				bmiAccu[i] = (i===0?0:bmiAccu[i-1])+e;
			});
			
			heightPercentage.map((e, i)=>{
				heightPercentage[i] = parseFloat((100 -heightAccu[i]/1000).toFixed(2));
			});
			weightPercentage.map((e, i)=>{
				weightPercentage[i] = parseFloat((100 -weightAccu[i]/1000).toFixed(2));
			});
			
			heightBgColor = heightBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			weightBgColor = weightBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			bmiBgColor = [0, 0, 0, 0, 0];
			bmiBgColor = bmiBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			
			if(nowGraph===null)	setNowGraph('height');
		}
	}, [data]);
	
	useEffect(()=>{
		if(latestIdx && data){
			setGraph('refreshGraphData');	
			heightBgColor.fill('rgba(140, 140, 140, 0.4)');
			weightBgColor.fill('rgba(140, 140, 140, 0.4)');
			bmiBgColor.fill('rgba(140, 140, 140, 0.4)');
			
			console.log(bmiBgColor);
			heightBgColor[height2idx(props.info[latestIdx].data.height)] = 'rgba(255, 99, 132, 0.5)';
			weightBgColor[weight2idx(props.info[latestIdx].data.weight)] = 'rgba(255, 99, 132, 0.5)';
			bmiBgColor[bmi2idx(props.info[latestIdx].data.weight/(props.info[latestIdx].data.height*props.info[latestIdx].data.height/10000))] = 'rgba(255, 99, 132, 0.5)';
		}
		if(latestIdx!==null) {
			if(latestIdx > 100) {
				userHistoryData = [];
			}
			else if(latestIdx < 12) {
				userHistoryData = [...props.info];
			}else{
				userHistoryData = props.info.slice(latestIdx - 11);
			}	
		}
		
		
	}, [latestIdx]);
	
	useEffect(()=>{
		if(nowGraph!==null) {
			setGraph(eval(nowGraph+'GraphData'));	
		}
		
		if(latestIdx!==null) {
			heightBgColor[height2idx(props.info[latestIdx]?.data?.height)] = 'rgba(255, 99, 132, 0.5)';
			weightBgColor[weight2idx(props.info[latestIdx]?.data?.weight)] = 'rgba(255, 99, 132, 0.5)';
			bmiBgColor[bmi2idx(props.info[latestIdx]?.data?.weight/(props.info[latestIdx]?.data?.height*props.info[latestIdx]?.data?.height/10000))] = 'rgba(255, 99, 132, 0.5)';

			setHeightIdx(height2idx(props.info[latestIdx]?.data?.height));
			setWeightIdx(weight2idx(props.info[latestIdx]?.data?.weight));
		}
	}, [nowGraph, page]);

	useEffect(()=>{
		if(nowHistoryGraph!==null) {
			setHistoryGraph(historyGraphData(nowHistoryGraph));	
		}
	}, [nowHistoryGraph, page]);
	
	return (
	<div className={`playlistTab`}>
		<div className={`setlistArea ${activeArea}`}>
			<div className='labelArea' onClick={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '나의 위치', en: 'Live Setlist', jp: 'ライブ セット·リスト'}[lang]}
				{activeArea==='setlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			<div className='contentArea' onClick={()=>setActiveArea('setlist')}> 
				{(props.info !== null && props.info[latestIdx]?.data!==undefined && data) ?(
	<>
	   <div className='alignCenter toggleArea'>
			
			{props.theme==='dark' ? 
			<ToggleButtonGroup size='small' exclusive={true} value={nowGraph} onChange={(e, value)=>{if(value) setNowGraph(value);}}>
				<StyledToggleButton value='height'>신장</StyledToggleButton>
				<StyledToggleButton value='weight'>체중</StyledToggleButton>
				<StyledToggleButton value='bmi'>BMI</StyledToggleButton>
				<StyledToggleButton value='jp'>가슴둘레</StyledToggleButton>
				<StyledToggleButton value='jp'>머리둘레</StyledToggleButton>
			</ToggleButtonGroup>:
			<ToggleButtonGroup size='small' exclusive={true} value={nowGraph} onChange={(e, value)=>{if(value) setNowGraph(value);}}>
				<ToggleButton value='height'>신장</ToggleButton>
				<ToggleButton value='weight'>체중</ToggleButton>
				<ToggleButton value='bmi'>BMI</ToggleButton>
				<ToggleButton value='jp'>가슴둘레</ToggleButton>
				<ToggleButton value='jp'>머리둘레</ToggleButton>
			</ToggleButtonGroup>
			}
				
			
		</div>
		<div className={'wrap'}><div className={'graphArea'}>
			{nowGraph && <Bar data={graph} options={props.theme==='dark'?darkOptions:options} height={350} />}
			<div className='text'> {{
				height: `당신의 키 ${props.info[latestIdx].data.height}cm는 상위 ${!heightIdx?100:heightPercentage[heightIdx - 1]}% ~ ${heightPercentage[heightIdx]}%`, 
				weight: `당신의 몸무게 ${props.info[latestIdx].data.weight}kg은 상위 ${!weightIdx?100:weightPercentage[weightIdx - 1]}% ~ ${weightPercentage[weightIdx]}%`,
			}[nowGraph]} </div>
		</div></div>
	</>
	)
	  :
		<div className='alignCenter'>
	   <ReactLoading type={'bubbles'} color={'#aaaaaa'} height={'20%'} width={'20%'} />
		</div>
  	}
			</div>
		</div>
	
		<div className={`playlistArea ${activeArea}`}>
			<div className='labelArea' onClick={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '나의 기록', en: 'My Playlist', jp: '僕の プレイリスト'}[lang]}
				{activeArea!=='playlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			
			<div className='contentArea' onClick={()=>setActiveArea('playlist')}> 
			<div className='alignCenter toggleArea'>
			{props.theme==='dark' ? 
				<ToggleButtonGroup size='small' exclusive={true} value={nowHistoryGraph} onChange={(e, value)=>{if(value) setNowHistoryGraph(value);}}>
					<StyledToggleButton value='height'>신장</StyledToggleButton>
					<StyledToggleButton value='weight'>체중</StyledToggleButton>
					<StyledToggleButton value='bmi'>BMI</StyledToggleButton>
					<StyledToggleButton value='jp'>가슴둘레</StyledToggleButton>
					<StyledToggleButton value='jp'>머리둘레</StyledToggleButton>
				</ToggleButtonGroup>:
				<ToggleButtonGroup size='small' exclusive={true} value={nowHistoryGraph} onChange={(e, value)=>{if(value) setNowHistoryGraph(value);}}>
					<ToggleButton value='height'>신장</ToggleButton>
					<ToggleButton value='weight'>체중</ToggleButton>
					<ToggleButton value='bmi'>BMI</ToggleButton>
					<ToggleButton value='jp'>가슴둘레</ToggleButton>
					<ToggleButton value='jp'>머리둘레</ToggleButton>
				</ToggleButtonGroup>
			}
			</div>
				
				<div className={'wrap'}><div className={'graphArea'}>
					{nowHistoryGraph && <Line data={historyGraph} options={props.theme==='dark'?darkOptions:options} height={350} />}
				</div></div>
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

export default connect(stateToProps)(Statistic);
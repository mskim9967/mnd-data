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
	weightBgColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	
	headData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	headAccu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	headPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	headBgColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	
	crotchData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	crotchAccu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	crotchPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	crotchBgColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

const headGraphData = ()=> ({
  labels: ['~53cm', '53cm~', '54cm~', '55cm~', '56cm~', '57cm~', '58cm~', '59cm~', '60cm~' , '61cm~' , '62cm~', '63cm~'],
  datasets: [
    {
      label: '10만명 당 (명)',
      data: [...headData],
      backgroundColor: headBgColor,
      borderColor: ['rgba(0,0,0,0)'],

      borderWidth: 1,
    },
  ],
});

const crotchGraphData = ()=> ({
  labels: ['~72cm', '72cm~', '73cm~', '74cm~', '75cm~', '76cm~', '77cm~', '78cm~', '79cm~', '80cm~' , '81cm~' , '82cm~', '83cm~' , '84cm~', '85cm~', '86cm~', '87cm~' ],
  datasets: [
    {
      label: '10만명 당 (명)',
      data: [...crotchData],
      backgroundColor: crotchBgColor,
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
                return value>=1000? (Intl.NumberFormat().format((value/1000)) + 'K'): value;
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
      label: {weight: '몸무게(kg)', height: '키(cm)', bmi: 'bmi지수', head:'머리 둘레(cm)', crotch: '다리 길이(cm)'}[type],
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
	const [headIdx, setHeadIdx] = useState(null);
	const [crotchIdx, setCrotchIdx] = useState(null);
	
	useEffect(()=>{ 	
		if(props.info !== null) {
			setLatestIdx(props.info.length - 1);
		}
		else {
			setLatestIdx(null);
		}
	}, [props.info]);

	// useEffect(()=>{ 	
	// 	setToday(JSON.parse(JSON.stringify(new Date())));
	// 	axios.get('/api')
	// 	.then((res)=>{
	// 		parseString(res.data, function (err, result) {
	// 			setData(result.DS_RECRT_BDMSMNT_MSR_INF.row); 
	// 		});
	// 	})
	// 	.catch(()=>{});
	// 	setNowHistoryGraph('weight');
	// }, []);
	
	useEffect(()=>{ 	
		setToday(JSON.parse(JSON.stringify(new Date())));
		axios.get('/api')
		.then((res)=>{
			setData(res.data.DS_RECRT_BDMSMNT_MSR_INF.row); 
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
	function head2idx(weight) {
		if(weight < 53.0) return 0;
		else if(weight >= 63.0) return 11;
		else return parseInt((weight-53)) + 1;
	}
	function crotch2idx(weight) {
		if(weight < 72.0) return 0;
		else if(weight >= 87.0) return 16;
		else return parseInt((weight-72)) + 1;
	}
	function bmi2idx(bmi) {
		if(bmi < 18.5) return 0;
		else if(bmi < 23) return 1;
		else if(bmi < 25) return 2;
		else if(bmi < 30) return 3;
		else return 4;
	}
	/*
	<seq>167972</seq>
	<msmnt_date>20170131</msmnt_date>
	가슴둘레<bust_circ_cm>114.1 cm</bust_circ_cm>
	소매길이<sleeve_len_cm>85.3 cm</sleeve_len_cm>
	키<statur_cm>171.6 cm</statur_cm>
	허리 둘레<wst_circ_cm>115.1 cm (45.3 in)</wst_circ_cm>
	다리길이 샅높이 <crotch_hght_cm>80.2 cm</crotch_hght_cm>
	머리둘레<hd_circ_cm>62.1 cm</hd_circ_cm>
	발길이<foot_len_cm>28.0 cm</foot_len_cm>
	<weight_kg>104.4 kg</weight_kg>
	*/
	useEffect(()=>{
		if(data) {
			let convert = 0.0;
			data.map((e)=>{
				let wei = parseFloat(e.weight_kg), hei = parseFloat(e.statur_cm), head = parseFloat(e.hd_circ_cm), crotch = parseFloat(e.crotch_hght_cm);
				if(e.statur_cm) heightData[height2idx(hei)]++;
				if(e.weight_kg) weightData[weight2idx(wei)]++;
				if(e.hd_circ_cm) headData[head2idx(head)]++;
				if(e.crotch_hght_cm) crotchData[crotch2idx(crotch)]++;
				bmiData[bmi2idx(wei/(hei*hei/10000))]++;
			});
			heightData.map((e, i)=>{
				heightAccu[i] = (i===0?0:heightAccu[i-1])+e;
			});
			weightData.map((e, i)=>{
				weightAccu[i] = (i===0?0:weightAccu[i-1])+e;
			});
			headData.map((e, i)=>{
				headAccu[i] = (i===0?0:headAccu[i-1])+e;
			});
			crotchData.map((e, i)=>{
				crotchAccu[i] = (i===0?0:crotchAccu[i-1])+e;
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
			headPercentage.map((e, i)=>{
				headPercentage[i] = parseFloat((100 -headAccu[i]/1000).toFixed(2));
			});
			crotchPercentage.map((e, i)=>{
				crotchPercentage[i] = parseFloat((100 -crotchAccu[i]/1000).toFixed(2));
			});
			
			heightBgColor = heightBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			weightBgColor = weightBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			headBgColor = headBgColor.map(e=>'rgba(140, 140, 140, 0.4)');
			crotchBgColor = crotchBgColor.map(e=>'rgba(140, 140, 140, 0.4)');

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
			headBgColor.fill('rgba(140, 140, 140, 0.4)');
			crotchBgColor.fill('rgba(140, 140, 140, 0.4)');
			bmiBgColor.fill('rgba(140, 140, 140, 0.4)');
			
			heightBgColor[height2idx(props.info[latestIdx].data.height)] = 'rgba(255, 99, 132, 0.5)';
			weightBgColor[weight2idx(props.info[latestIdx].data.weight)] = 'rgba(255, 99, 132, 0.5)';
			headBgColor[head2idx(props.info[latestIdx].data.head)] = 'rgba(255, 99, 132, 0.5)';
			crotchBgColor[crotch2idx(props.info[latestIdx].data.crotch)] = 'rgba(255, 99, 132, 0.5)';
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
			heightBgColor.fill('rgba(140, 140, 140, 0.4)');
			weightBgColor.fill('rgba(140, 140, 140, 0.4)');
			headBgColor.fill('rgba(140, 140, 140, 0.4)');
			crotchBgColor.fill('rgba(140, 140, 140, 0.4)');
			bmiBgColor.fill('rgba(140, 140, 140, 0.4)');
			
			heightBgColor[height2idx(props.info[latestIdx]?.data?.height)] = 'rgba(255, 99, 132, 0.5)';
			weightBgColor[weight2idx(props.info[latestIdx]?.data?.weight)] = 'rgba(255, 99, 132, 0.5)';
			headBgColor[head2idx(props.info[latestIdx]?.data?.head)] = 'rgba(255, 99, 132, 0.5)';
			crotchBgColor[crotch2idx(props.info[latestIdx]?.data?.crotch)] = 'rgba(255, 99, 132, 0.5)';
			bmiBgColor[bmi2idx(props.info[latestIdx]?.data?.weight/(props.info[latestIdx]?.data?.height*props.info[latestIdx]?.data?.height/10000))] = 'rgba(255, 99, 132, 0.5)';

			setHeightIdx(height2idx(props.info[latestIdx]?.data?.height));
			setWeightIdx(weight2idx(props.info[latestIdx]?.data?.weight));
			 setHeadIdx(head2idx(props.info[latestIdx]?.data?.head));
			 setCrotchIdx(crotch2idx(props.info[latestIdx]?.data?.crotch));
		}
	}, [nowGraph, page]);

	useEffect(()=>{
		if(nowHistoryGraph!==null) {
			setHistoryGraph(historyGraphData(nowHistoryGraph));	
		}
	}, [nowHistoryGraph, page]);
	
	return (
	<div className={`statisticTab`}>
		<div className={`positionArea ${activeArea}`}>
			<div className='labelArea' onClick={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '나의 위치', en: 'My Position'}[lang]}
				{activeArea==='setlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			<div className='contentArea' onTouchStart={()=>setActiveArea('setlist')}> 
				{(props.info !== null && props.info[latestIdx]?.data!==undefined && data) ?(
	<>
	   <div className='alignCenter toggleArea'>
			
			{props.theme==='dark' ? 
			<ToggleButtonGroup size='small' exclusive={true} value={nowGraph} onChange={(e, value)=>{if(value) setNowGraph(value);}}>
				<StyledToggleButton value='height'>{{kr: '신장', en: 'Height'}[lang]}</StyledToggleButton>
				<StyledToggleButton value='weight'>{{kr: '체중', en: 'Weight'}[lang]}</StyledToggleButton>
				<StyledToggleButton value='bmi'>BMI</StyledToggleButton>
				<StyledToggleButton value='head'>{{kr: '머리둘레', en: 'Head circumference'}[lang]}</StyledToggleButton>
				<StyledToggleButton value='crotch'>{{kr: '다리길이', en: 'Crotch length'}[lang]}</StyledToggleButton>
			</ToggleButtonGroup>:
			<ToggleButtonGroup size='small' exclusive={true} value={nowGraph} onChange={(e, value)=>{if(value) setNowGraph(value);}}>
				<ToggleButton value='height'>{{kr: '신장', en: 'Height'}[lang]}</ToggleButton>
				<ToggleButton value='weight'>{{kr: '체중', en: 'Weight'}[lang]}</ToggleButton>
				<ToggleButton value='bmi'>BMI</ToggleButton>
				<ToggleButton value='head'>{{kr: '머리둘레', en: 'Head circumference'}[lang]}</ToggleButton>
				<ToggleButton value='crotch'>{{kr: '다리길이', en: 'Crotch length'}[lang]}</ToggleButton>
			</ToggleButtonGroup>
			}
				
			
		</div>
		<div className={'wrap'}><div className={'graphArea'}>
			{nowGraph && <Bar data={graph} options={props.theme==='dark'?darkOptions:options} height={350} />}
			<div className='text percentage'> {{
				height: `${{kr: '당신의 키', en: 'Your height of'}[lang]} ${props.info[latestIdx].data.height}cm ${{kr: '는 상위', en: 'is top'}[lang]} ${!heightIdx?100:heightPercentage[heightIdx - 1]}% ~ ${heightPercentage[heightIdx]}%`, 
				weight: `${{kr: '당신의 몸무게', en: 'Your weight of'}[lang]} ${props.info[latestIdx].data.weight}kg ${{kr: '은 상위', en: 'is top'}[lang]} ${!weightIdx?100:weightPercentage[weightIdx - 1]}% ~ ${weightPercentage[weightIdx]}%`,
				head: props.info[latestIdx].data.head&&`${{kr: '당신의 머리 둘레', en: 'Your head circumference of'}[lang]} ${props.info[latestIdx].data.head}cm ${{kr: '는 상위', en: 'is top'}[lang]} ${!headIdx?100:headPercentage[headIdx - 1]}% ~ ${headPercentage[headIdx]}%`, 
				crotch: props.info[latestIdx].data.crotch&&`${{kr: '당신의 다리 길이', en: 'Your crotch length of'}[lang]} ${props.info[latestIdx].data.crotch}cm ${{kr: '는 상위', en: 'is top'}[lang]} ${!crotchIdx?100:crotchPercentage[crotchIdx - 1]}% ~ ${crotchPercentage[crotchIdx]}%`,
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
	
		<div className={`recordArea ${activeArea}`}>
			<div className='labelArea' onClick={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '나의 기록', en: 'My Record'}[lang]}
				{activeArea!=='playlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			
			<div className='contentArea' onTouchStart={()=>setActiveArea('playlist')}> 
			<div className='alignCenter toggleArea'>
			{props.theme==='dark' ? 
				<ToggleButtonGroup size='small' exclusive={true} value={nowHistoryGraph} onChange={(e, value)=>{if(value) setNowHistoryGraph(value);}}>
					<StyledToggleButton value='height'>{{kr: '신장', en: 'Height'}[lang]}</StyledToggleButton>
					<StyledToggleButton value='weight'>{{kr: '체중', en: 'Weight'}[lang]}</StyledToggleButton>
					<StyledToggleButton value='bmi'>BMI</StyledToggleButton>
					<StyledToggleButton value='head'>{{kr: '머리둘레', en: 'Head circumference'}[lang]}</StyledToggleButton>
					<StyledToggleButton value='crotch'>{{kr: '다리길이', en: 'Crotch length'}[lang]}</StyledToggleButton>
				</ToggleButtonGroup>:
				<ToggleButtonGroup size='small' exclusive={true} value={nowHistoryGraph} onChange={(e, value)=>{if(value) setNowHistoryGraph(value);}}>
				<ToggleButton value='height'>{{kr: '신장', en: 'Height'}[lang]}</ToggleButton>
				<ToggleButton value='weight'>{{kr: '체중', en: 'Weight'}[lang]}</ToggleButton>
				<ToggleButton value='bmi'>BMI</ToggleButton>
				<ToggleButton value='head'>{{kr: '머리둘레', en: 'Head circumference'}[lang]}</ToggleButton>
				<ToggleButton value='crotch'>{{kr: '다리길이', en: 'Crotch length'}[lang]}</ToggleButton>
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
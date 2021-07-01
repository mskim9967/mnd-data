import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider'
import { Switch } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';



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
 
const columns = [
  { field: 'date', headerName: '날짜', width: 120 },
  { field: 'height', headerName: '신장', width: 90 },
  { field: 'weight', headerName: '체중', width: 90 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

const rowssss = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function Setting(props) {
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
	
	var timerID;
	
	
	useEffect(()=>{ 	
		if(props.info !== null) {
			setLatestIdx(props.info.length - 1);
		}
		else {
			setLatestIdx(null);
		}
	}, [props.info]); 
	
	useEffect(()=>{ 	
		if(latestIdx && props.info && props.info[latestIdx])
			setSpanSec(Math.round(Math.abs((today - new Date(props.info[latestIdx].date)) / (1000))));
		
		if(page==='setting') {
			let temp = [];
			if(props.info?.length)
				props.info?.map((e, i)=>{
					temp.push({id: i, date: e.date.slice(2,10).replace(/-/g,'/'), height: e.data.height, weight:e.data.weight})
				});
			setRows(temp);
		}
	}, [location, props.info]);
	
	return (<>{(props.info !== null && props.info[latestIdx]?.data!==undefined) &&(
	
	<div className={`setting`}> 
			<ThemeProvider theme={props.theme==='dark'?{...darkTheme}:{...lightTheme}}>	   
	
		<div className={`tableModal ${!tableModal&&'inactive'}`} style={{ zIndex: tableModal?100:-100}}>
			<div className='table' style={{height: '70vh', width: '100%' }}>
				<DataGrid rows={rows} columns={columns} onSelectionChange={(e) => setSelectedRows([...e.rowIds])} hideFooter={true} localeText={{
				   footerRowSelected: (count) => `${count}ddd`
					  }} checkboxSelection />
			</div>
			<div className={`deleteButton`}>
				<Button variant="outlined" size="large" color="primary"	onClick={()=>{ if(selectedRows.length === latestIdx + 1) {props.dispatch({type:'clear'}); history.replace(`/${lang}/welcome`);} else props.dispatch({type:'delete', payload:selectedRows});}}>
					 {{ kr: '삭제', en: 'Delete' }[lang]}
				</Button>
			</div>
		</div>
		<div className={`bg ${!tableModal&&'inactive'}`} onClick={()=>setTableModal(false)}></div>
				
		<div className={`layout`}> 
			<List component="nav" aria-label="main mailbox folders">
				<ListItem button>
				  <ListItemText primary="Language" />
					<ListItemSecondaryAction>
   						<ToggleButtonGroup size='small' exclusive={true} value={lang} onChange={(event, value)=>{
							if(value) {
								history.replace(`/${value}/${page}`);
								//props.dispatch({type:'langChanged'});
	
							}
						}}>
							<ToggleButton value='kr'>한국어</ToggleButton>
							<ToggleButton value='en'>&nbsp;ENG&nbsp;</ToggleButton>
						</ToggleButtonGroup>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem button>
				  <ListItemText primary={{ kr: '다크 모드', en: 'Dark Mode' }[lang]} />
					<ListItemSecondaryAction>
						<Switch color='primary' checked={props.theme!=='light'} onChange={(event)=>{
							event.target.checked?props.dispatch({type:'darkTheme'}):props.dispatch({type:'lightTheme'});		
						}}></Switch>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem button>
				  <ListItemText primary={{ kr: "애니메이션 활성화", en: "Animation Activation" }[lang]} />
					<ListItemSecondaryAction>
						<Switch color='primary' checked={props.anim==='on'} onChange={(event)=>{
							event.target.checked?props.dispatch({type:'animOn'}):props.dispatch({type:'animOff'});		
						}}></Switch>
					</ListItemSecondaryAction>
				</ListItem>
			  </List>
			  <Divider />
			  <List component="nav" aria-label="secondary mailbox folders">
			  	<ListItem button>
				  <ListItemText primary={{ kr: "이전 데이터 삭제", en: "Delete data" }[lang]} onClick={()=>setTableModal(true)}/>
				</ListItem>
				<ListItem button>
				  <ListItemText primary={{ kr: "모든 데이터 초기화", en: "Clear all data" }[lang]} onClick={()=>{ props.dispatch({type:'clear'});history.replace(`/${lang}/welcome`)}}/>
				</ListItem>
			  </List>
			<Divider />
			  <List component="nav" aria-label="secondary mailbox folders">
			  	<ListItem button>
				  <ListItemText primary={{ kr: "본 데이터는 Open API로 공개된 데이터로서 대한민국 육군 소속 신병 신체측정 치수 정보를 가져오고 있습니다.", en: "This data is released through Open API and we are importing the dimension information of physical measurement of recruits belonging to the Republic of Korea Army." }[lang]}/>
				</ListItem>
			  </List>
		</div>
	
		
    </ThemeProvider>
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
		anim: state.animReducer,
	}
}

export default connect(stateToProps)(Setting);
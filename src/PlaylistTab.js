import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function PlaylistTab(props) {
	const { lang } = useParams();
	
	const [activeArea, setActiveArea] = useState('init');
	const [activatedCardModal, setActivatedCardModal] = useState(null);
	
	var timerID;
	
	useEffect(()=>{ 	
		return ()=>clearTimeout(timerID);
	}, []);
	

	return (<div className={`statistic`}>
	<div className={`playlistTab`}>
		<div className={`setlistArea ${activeArea}`}>
			<div className='labelArea' onTouchStart={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '라이브 세트리스트', en: 'Live Setlist', jp: 'ライブ セット·リスト'}[lang]}
				{activeArea==='setlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			<div className='contentArea' onTouchStart={()=>setActiveArea('setlist')}> 
				<div className='alert'>{{kr: '준비 중 입니다 :)', en: 'Getting ready :)', jp: '準備中です :)'}[lang]}</div>
			</div>
		</div>
	
		<div className={`playlistArea ${activeArea}`} >
			<div className='labelArea' onTouchStart={()=>setActiveArea(activeArea==='playlist'?'setlist':'playlist')}><div className='label'>
				{{kr: '나의 플레이리스트', en: 'My Playlist', jp: '僕の プレイリスト'}[lang]}
				{activeArea!=='playlist'?<ArrowDropUpIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropUpIcon>:<ArrowDropDownIcon style={{fontSize: 30, color:props.theme==='dark'?'#ffffff':'#444444'}}></ArrowDropDownIcon>}
			</div></div>
			<div className='ttt'>
				<div className='alert'>{props.playlists?.length===0&& {kr: '비어있어요...', en: "It's empty...", jp: '空いています...'}[lang]}</div>
			<div className='contentArea' onTouchStart={()=>setActiveArea('playlist')}> {
				props.playlists?.map((playlist, i)=>{
					return (<div className={`playlistCard`} onClick={()=>{
						activatedCardModal!==i ? setActivatedCardModal(i):setActivatedCardModal(null);
					}} style={{backgroundImage:`url(/api/img/album/${playlist.data[0].song_id})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover',backgroundPosition:'center center'}}>
						<div className={`cardModal alignCenter ${i!==activatedCardModal&&'inactive'}`}> 
							<div className={`edit`}><EditIcon style={{fontSize: 25, color:'#ffffff'}}></EditIcon></div>
							<div className={`play`} onClick={()=>props.dispatch({type:'playlistReload',payload:{playlistNum: i}})}><PlayArrowIcon style={{fontSize: 45, color:'#ffffff'}}></PlayArrowIcon></div>
							<div className={`delete`} onClick={()=>{window.confirm({kr: '정말 삭제하시겠습니까?', en: 'Delete?', jp: '本当に削除しますか?'}[lang])&&props.dispatch({type:'deletePlaylist', payload:playlist.name})}}><DeleteIcon style={{fontSize: 25, color:'#ffffff'}}></DeleteIcon></div>
						</div>
						<div className={`textArea alignCenter`}>
							<div className={`text`}>
								<div className={`title alignCenter`}><span>{playlist.name}</span></div>
								<div className={`songCnt alignCenter`}>{playlist.data.length+{kr: '곡', en: ' songs', jp: '曲'}[lang]}</div>
							</div>
						</div>
					</div>)
				})
			}</div>
			</div>
		</div>
	</div>
	</div>)
}


function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer,
				theme: state.themeReducer,
  			playlists: state.playlistsReducer,
		}
}

export default connect(stateToProps)(PlaylistTab);
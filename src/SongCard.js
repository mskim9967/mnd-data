import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { IconButton } from '@material-ui/core'

import Tag from './Tag.js'

function SongCard(props) {
	const [tagData, setTagData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const { lang } = useParams();
	const location = useLocation();
	const history = useHistory();
	const ref = useRef(null);
	let timerID;
	const componentRef = useRef();
	const [isSwiped, setSwiped] = useState(false);
	const handlers = useSwipeable({
			onSwipedRight: (eventData) => setSwiped(false),
  		onSwipedLeft: (eventData) => setSwiped(true)
	});
	function handleClick(e: any) { 
		if(componentRef && componentRef.current){ 
			const ref: any = componentRef.current;
			if(!ref.contains(e.target)){ setSwiped(false); }
		} 
	}	

	useEffect(()=>{ 
		setLoading(true);
		setSwiped(false);
		if(props.song)
			axios.get('/api/song_data_view?song_id=' + props.song.song_id)
			.then((res)=>{setTagData(res.data.rows); setLoading(false);}) 
			.catch(()=>{})
		document.addEventListener("touchend", handleClick, false);	
		return ()=>{
			setLoading(false);
			clearTimeout(timerID);
			document.removeEventListener("touchend", handleClick);
		}
	}, [props.song]);

	if(!props.song) return (null);

	return (
		<div className={'wrap'} {...handlers}>
			<div className={`${isLoading?'loading':'loaded'} behind alignCenter` }>
				<div className='iconArea'><IconButton variant='outlined' size='small' ><PlaylistAddIcon></PlaylistAddIcon></IconButton></div>
			</div>
		<div className={`songCard pid${props.song.production_id} ${isSwiped?'swiped':''} ${isLoading?'loading':'loaded'}`}  ref={componentRef} onClick={()=>{
				setSwiped(false);
				history.push(`${location.pathname}?song_id=${props.song.song_id}`);
			}}>
			<div className="coverImgArea">
				<div className="coverImg">
					<img src={"/api/img/album/"+props.song.album_id}></img>
				</div>
			</div>
			<div className="title"><span>{eval('props.song.song_title_'+lang)||props.song.song_title_en}</span></div>

			<div className='tagsArea' ref={ref}>
				{
					(props.song.song_type!==1) ?
						tagData.map((idolCV, idx)=>{
							return (
								<>
									<Tag key={idx*2} classify='idol' id={idolCV.idol_id} name={eval('idolCV.idol_name_'+lang)} color1={idolCV.idol_color} color2={adjust(idolCV.idol_color, 90)}></Tag>
									<Tag key={idx*2+1} classify='cv' id={idolCV.cv_id} name={eval('idolCV.cv_name_'+lang)} color1={idolCV.idol_color} color2={adjust(idolCV.idol_color, 90)}></Tag>
								</>
							)
						})
					:
						tagData.map((unit, idx)=>{
							return (
									<Tag key={idx*2} classify='unit' id={unit.unit_id} name={eval('unit.unit_name_'+lang)||unit.unit_name_en} color1={unit.unit_color} color2={adjust(unit.unit_color, 90)}></Tag>
							)
						})
				}
			</div>
		</div>
		</div>
	)
}


function adjust(color, amount) {
	if(!color) return null;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function hex_setSat(H, sat) { // Convert hex to RGB first 
	let r = 0, g = 0, b = 0; if (H.length === 4) { r = "0x" + H[1] + H[1]; g = "0x" + H[2] + H[2]; b = "0x" + H[3] + H[3]; } else if (H.length === 7) { r = "0x" + H[1] + H[2]; g = "0x" + H[3] + H[4]; b = "0x" + H[5] + H[6]; } // Then to HSL 
	let v=Math.max(r,g,b), c=v-Math.min(r,g,b); let h= c && ((v===r) ? (g-b)/c : ((v===g) ? 2+(b-r)/c : 4+(r-g)/c)); h=60*(h<0?h+6:h); let s=sat;
	let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0); return `rgb(${f(5)},${f(3)},${f(1)})`; 
}

function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

export default connect(stateToProps)(SongCard);
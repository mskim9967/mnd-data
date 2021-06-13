import React from 'react';
import { connect } from 'react-redux'

function Tag(props) {
	return (
		<div className="tag" style={{backgroundImage: `linear-gradient(110deg, `+props.color1+`, 30%,`+props.color2+`)`}}>
			<div className='image alignCenter'>
				<img src={"/api/img/"+props.classify+"/"+props.id}></img>
			</div>
			<div className='name'>
				{props.name}
			</div>
		</div>
	)
}

function stateToProps(state) {
    return {
				isPlayerActive: state.playerActiveReducer,
        playerReducer : state.playerReducer,
				lang: state.langReducer,
				nowPage: state.pageReducer
    }
}

export default connect(stateToProps)(Tag);
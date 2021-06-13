var fs = require('fs');

exports.parse = (filePath)=>{
	var data = [];
	try {
		var arr = fs.readFileSync(filePath)?.toString().split('\n');
	} catch(err){
		return data;	
	}
	var lineSpanBeatsCheck = false;
	
	var lineObj={ lineStartBeat:0, lineSpanBeats:0, part:[]};
	let partBefore = [0];
	arr.map((line, i)=>{
		if(line[0]!=='$'){
			if(i % 5 == 0) {
				let text = line.split(/[\-]/).filter(Boolean), beat = line.split(/[^\-]/).filter(Boolean);
				lineObj.lyricLex=[];
				text.map((e, idx)=>{
					let start = e.indexOf('$');
					if(start!==-1) {
						partBefore=[];
						for(let i=start+1;i<e.length;i++) partBefore.push(parseInt(e[i]));
						e=e.slice(0, start);
					}
					lineObj.lyricLex.push({text: e, beats: beat[idx].length, start: lineObj.lineStartBeat + lineObj.lineSpanBeats, part: [...partBefore]});
					lineObj.lineSpanBeats += beat[idx].length;
				});
				lineSpanBeatsCheck = true;
			} else if(i % 5 == 1) {
				lineObj.lyricMean = line;
			} else if(i % 5 == 2) {
				let text = line.split(/[\-]/).filter(Boolean), beat = line.split(/[^\-]/).filter(Boolean);
				let startBeat = lineObj.lineStartBeat;
				lineObj.callLex=[];
				text.map((e, idx)=> {
					lineObj.callLex.push({text: e, beats: beat[idx].length, start: startBeat});
					startBeat += beat[idx].length;
				});
				if(lineObj.lineSpanBeats < startBeat - lineObj.lineStartBeat) lineObj.lineSpanBeats = startBeat - lineObj.lineStartBeat;
			} else if(i % 5 == 3) {
				let text = line.split(/[\-]/).filter(Boolean), beat = line.split(/[^\-]/).filter(Boolean);
				let startBeat = lineObj.lineStartBeat;
				lineObj.behavior=[];
				text.map((e, idx)=>{
					lineObj.behavior.push({text: e, beats: beat[idx].length, start: lineObj.lineStartBeat + lineObj.lineSpanBeats});
					startBeat += beat[idx].length;
				});
			}
		}
		if(i % 5 == 3) {			
			data.push({...lineObj}); 
			lineObj={ lineStartBeat:lineObj.lineStartBeat + lineObj.lineSpanBeats, lineSpanBeats: 0, part:[]};
		}
	});
	
	return data;	
};
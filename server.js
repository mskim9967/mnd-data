var express = require('express');
var app = express();
const path = require('path');
const cors = require('cors');
var request = require('request')
var parseString = require('xml2js').parseString;

const port = 3001;

var connect = require('connect');

const schedule = require('node-schedule');
// const job = schedule.scheduleJob('* 0 * * *', function(){ request('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000', function(error, response, body){
// 		if(error){
// 		  console.log(error)
// 		}
// 	    db = parser.parse(body);
// 	})
// });
var parser = require('fast-xml-parser');
var he = require('he');

app.use(cors()); 

app.use(express.static(path.join(__dirname, '/build'))); 

var db;

// app.get('/api', function (req, res) {
// 	request('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000', function(error, response, body){
// 		if(error){
// 		  console.log(error)
// 		}
// 		res.send(body); 
// 	})
//  //res.redirect('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000');
// });

app.get('/api', function (req, res) {
	//console.log(db);
	if(db)
		res.send(db); 
	else {
request('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000', function(error, response, body){
		if(error){
		  console.log(error)
		}
		if(false) {
			parseString(body, function (err, result) {
				db = result;
				res.send(result);
			});
		}
		else {
			db = parser.parse(body);
			res.send(parser.parse(body));
		}
		
	})
	}

});


/*
플랭크 스쿼트 런지 푸시업 딥스 풀업 달리기 버피 줄넘기
*/
function match(str) {
	if(str==='플랭크') return 0;
	if(str==='스쿼트') return 1;
	if(str==='런지') return 2;
	if(str==='푸쉬업') return 3;
	if(str==='딥스') return 4;
	if(str==='풀업') return 5;
	if(str==='달리기') return 6;
	if(str==='버피') return 7;
	if(str==='줄넘기') return 8;
}

var youtubeDB = new Array(9);

app.get('/youtube/:q', function (req, res) {
	if(youtubeDB[match(req.params.q)]){
		res.send(youtubeDB[match(req.params.q)]);
	} 
	
	else {
		var options = {
			url:'https://www.googleapis.com/youtube/v3/search',
			method:'GET',
			qs:{
				//key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
				key:'AIzaSyDJbDov0fqkOPsqgUbBzZJ3l2iAXo4_NwM',
				part: 'snippet',
				q: req.params.q,
				maxResults: 1000,
				type: 'video',
			}

		}
		request(options, function(error, response, body){
			if(error){
			  console.log(error)
			}
			youtubeDB[match(req.params.q)] = body;
			res.send(body);
		})	
	}
	
});

app.get('*', function (req, res) {
 res.sendFile(path.join(__dirname, '/build/index.html'));
});


app.listen(port, ()=>console.log(`port on ${port}`));


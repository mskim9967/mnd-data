var express = require('express');
var app = express();
const path = require('path');
const cors = require('cors');
var request = require('request')

const port = 3001;

var connect = require('connect');

const schedule = require('node-schedule');
const job = schedule.scheduleJob('* 0 * * *', function(){ request('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000', function(error, response, body){
		if(error){
		  console.log(error)
		}
	
	    db = parser.parse(body);
	})
});
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
	    db = parser.parse(body);
		res.send(parser.parse(body));
	})
	}

});


const params1={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `플랭크`,
	maxResults: 1000,
	type: 'video',
};
const params2={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `스쿼트`,
	maxResults: 1000,
	type: 'video',
};
const params3={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `런지`,
	maxResults: 1000,
	type: 'video',
};
const params4={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `푸쉬업`,
	maxResults: 1000,
	type: 'video',
};
const params5={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `딥스`,
	maxResults: 1000,
	type: 'video',
};
const params6={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `풀업`,
	maxResults: 1000,
	type: 'video',
};
const params7={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `달리기`,
	maxResults: 1000,
	type: 'video',
};
const params8={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `버피`,
	maxResults: 1000,
	type: 'video',
};
const params9={
	key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
	part: 'snippet',
	q: `줄넘기`,
	maxResults: 1000,
	type: 'video',
};

app.get('/youtube/:q', function (req, res) {
	var options = {
		url:'https://www.googleapis.com/youtube/v3/search',
	 	method:'GET',
		qs:{
			key: 'AIzaSyAudJTTJS-bZ19ohNkOmHOfRT6fQcIed7k',
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
		res.send(body);
	})
});

app.get('*', function (req, res) {
 res.sendFile(path.join(__dirname, '/build/index.html'));
});


app.listen(port, ()=>console.log(`port on ${port}`));


var express = require('express');
var app = express();
const path = require('path');
const cors = require('cors');
var request = require('request')

const port = 3001;


var connect = require('connect');

app.use(cors()); 

app.use(express.static(path.join(__dirname, '/build'))); 

app.get('/api', function (req, res) {
request('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000', function(error, response, body){
    if(error){
      console.log(error)
    }
	res.send(body); 
  })
 //res.redirect('https://openapi.mnd.go.kr/3938313636333430383831313732313239/xml/DS_RECRT_BDMSMNT_MSR_INF/1/100000');
});

app.get('*', function (req, res) {
 res.sendFile(path.join(__dirname, '/build/index.html'));
});


app.listen(port, ()=>console.log(`port on ${port}`));


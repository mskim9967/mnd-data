var express = require('express');
var router = express.Router();

var parser = require('../lyricCallParser')

const convert = require('xml-js');


router.get('/json', (req, res) => {
	//console.log(req);
	console.log('eeeeeeeeee');
	//var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
	//res.json(xmlToJson);  
});



module.exports = router;
var express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index');

//const cors = require('cors');
//app.use(cors());
app.use('/api', api);
// app.use(express.static(path.join(__dirname, '/../build')));
// app.get('*', (res, req)=>res.sendFile(path.join(__dirname, '/../build/index.html')));

const port = 3002;
app.listen(port, ()=>console.log(`port on ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const HID = require('node-hid');
const cors = require('cors');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, { dbName: 'main'});

const port = 4000;
const database = mongoose.connection
const app = express();
app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}))
app.use(express.json());

app.all('/', function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  })
  next();
 });

app.use('/api', routes);

app.get('/', (req, res) =>{
  res.send({message : "Hello World"});
})

/**
 * app.get('/checkDevice', (req, res) => {
  try {
    const device = new HID.HID(16701, 8455);
    console.log("device connect")
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
 */

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 


database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})
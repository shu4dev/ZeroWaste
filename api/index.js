const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, { dbName: 'main'});


const app = express();

app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}))

app.use(express.json());


app.get('/', (req, res) =>{
  res.send("Hello World");
})

/**
 * const routes = require('./routes/routes');
const HID = require('node-hid');
 * const devices = HID.devices();
 * const port = process.env.PORT;
const database = mongoose.connection
 * app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.use('/api', routes)

app.get('/checkDevice', (req, res) => {
  try {
    res.json({ success: true, device: devices });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

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
 */
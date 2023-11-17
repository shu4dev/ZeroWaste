const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const HID = require('node-hid');
const routes = require('./routes/routes');
const devices = HID.devices();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, { dbName: 'main'});
const database = mongoose.connection

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}))

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

 app.get('/', (req, res) =>{

  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
/**
 * 





 * 


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





 */
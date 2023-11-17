const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
app.get('/', (req, res) =>{

  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})
/**
 * const mongoose = require('mongoose');
const cors = require('cors');



const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, { dbName: 'main'});

 * app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}))
app.use(express.json());
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


 */
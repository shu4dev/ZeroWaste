const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const HID = require('node-hid');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString, { dbName: 'main'});

const port = 4000;
const database = mongoose.connection
const app = express();

app.use('/api', routes)
app.use(express.json());

app.get('/', (req, res) =>{
  res.send("Hello World")
})

app.get('/checkDevice', (req, res) => {
  try {
    const device = new HID.HID(16701, 8455);
    res.json({ success: true });
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
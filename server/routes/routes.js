const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const {Order, UserInfo} = require('../models/model');
const jsonParser = bodyParser.json();

router.post('/postOrder', jsonParser, async(req, res) => {
    const data = new Order(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/postuser', jsonParser, async (req, res) => {
    const data = new UserInfo(req.body);
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/getInfo', jsonParser, async (req, res) => {
    try{
        const data = await UserInfo.findOne({Username: req.body.Username, Password: req.body.Password});
        res.json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Order.find()
        res.json(data)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Order.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update', jsonParser, async (req, res) => {
    try {
        const updateUser = req.body.Email;
        const updateData = req.body.Order;
        const result = await UserInfo.findOneAndUpdate(
            {Email: updateUser}, {$addToSet : {Order: updateData}}
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
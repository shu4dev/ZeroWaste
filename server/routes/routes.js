const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const {Order, UserInfo} = require('../models/model');
const jsonParser = bodyParser.json();

router.post('/postOrder', jsonParser, async(req, res) => {
    console.log(req.body);
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
router.patch('/update/:id', jsonParser, async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};
        const result = await Model.findByIdAndUpdate(
            id, updateData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
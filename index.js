const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const toDoMod = require('./models/todo.model')
require('dotenv').config()

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 4000
const URI = process.env.ATLAS_URI
const app = express()

app.use(cors())
app.use(express.json())

// connection
mongoose.connect(URI, {
    useNewUrlParser: true,
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('DB connected successfully')
})

// routes

// get all toDo(s)
app.get('/todos', async (req, res) => {
    try {
        const toDoList = await toDoMod.find()
        res.json(toDoList)
        
    } catch (err) {
        console.error(err)
        res.json({status: false})
    }
})

// add toDo(s)
app.post('/add', async (req, res) => {
    try {
        await toDoMod.create({ todo: req.body.todo })
        res.json({status: true})
        
    } catch (err) {
        console.error(err)
        res.json({status: false})
    }
})

// delete toDo(s)
app.delete('/delete/:id', async (req, res) => {
    try {
        await toDoMod.findByIdAndDelete(req.params.id)
        res.json({status: true})
        
    } catch (err) {
        console.error(err)
        res.json({status: false})
    }
})

// update toDo(s)
app.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        await toDoMod.updateOne({_id: {$eq: id}}, {todo: req.body.todo})
        res.json({status: true})
        
    } catch (err) {
        console.error(err)
        res.json({status: false})
    }
})

app.listen(PORT, () => {
    console.log(`listening: http://${HOST}:${PORT}`)
})

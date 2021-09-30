const express = require('express')
const cors = require('cors')
const path = require('path')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('/')
})

app.listen(PORT, () => {
    console.log(`listening: http://${HOST}:${PORT}`)
})

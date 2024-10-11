const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const route = require('./routes/financeRoute')

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/finance', route)

app.listen(PORT, () =>{
    console.log('Server connected');
})
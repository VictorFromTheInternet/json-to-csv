const express = require('express')
const mongoose = require('mongoose')
const user_router = require('./routes/User_Router')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI


async function startServer(){
    try{

        // middleware
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        // connect to mongodb
        await mongoose.connect(process.env.MONGO_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true })


        // routes
        app.get('/', (req,res)=>{
            res.send('Hello World')
        })        
        app.use('/api/users', user_router)
        
        
        // listen
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    }catch(err){
        console.error('Error starting server: ', err)
    }
}


startServer()
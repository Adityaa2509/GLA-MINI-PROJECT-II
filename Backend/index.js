const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/authRoutes')
app.use(express.json())

//all routes 
app.use('/api/auth',authRoutes)

app.use((err,req,resp,next)=>{
    const errcode = err.statusCode || 500;
    const msg = err.msg || 'Internal Server Error'
    resp.status(errcode).json({
        success:false,
        errcode,
        msg
    })
})


app.get('/',(req,resp)=>resp.status(200).json({msg:"Badhiya hai bhai sab"}))

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT} PORT Number`)
})
require('./config/database')();


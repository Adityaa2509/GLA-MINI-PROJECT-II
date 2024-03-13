const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const PORT =  3000

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const BlogRoutes  = require('./routes/BlogRoutes')
const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from http://localhost:5173
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json())
app.use(cookieParser())


//all routes 
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/blog',BlogRoutes)




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


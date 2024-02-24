const mongoose = require('mongoose')

const connectDb = async()=>{
    try{
        mongoose.connect(process.env.DB_URL).then(
            console.log('DATABASE CONNECTED SUCCESSFULLY')
        )
    }
    catch(err)
    {
        console.log('database do not connect')
        console.log(err)
    }
}
module.exports = connectDb;
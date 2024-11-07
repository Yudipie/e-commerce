const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'username reqd']
    },
    email:{
        type:String,
        required:[true,'email reqd'],
        unique:[true,'email address already taken']
    },
    password:{
        type:String,
        required:[true,'password reqd']
    }
},{
    timestamps:true
}

)

module.exports = mongoose.model('User',userSchema)
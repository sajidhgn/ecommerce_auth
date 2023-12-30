
const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({

    // user_id:{
    //     type:String,

    // }
    username:{
        type:String,
        required:[true,'Please provide a username.'],
    },
    email:{
        type:String,
        required:[true,'Please provide a email.'],
        unique:[true,'Account is already exist.'],
    },
    password:{
        type:String,
        required:[true,'Please provide a password.'],
        // select:false,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model('User', userSchema);
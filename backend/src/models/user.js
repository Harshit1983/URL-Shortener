const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true,'Please provide a name'],
    },
    email:{
        type: String,
        require: [true, 'Please provide an email'],
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],

    },
    password:{
        type:String,
        require: [true, 'Please provide a password'],
        minlength: 6,
        select : false,


    }
},{
    timestamps: true,
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
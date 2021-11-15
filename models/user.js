const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: String, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created : {
        type: Date,
        default: Date.now
    },
    //role: { type: String, enum: ['Admin', 'Student'] },
    validated: {
        type: Boolean,
        default: false
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

//validate
UserSchema.methods.validateUser = function validateUser(){
    this.validated = true;
}

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
    console.log(password, this.password)
    const result = await bcrypt.compare(password, this.password);
    return result;
}

//save
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    console.log()
    next();
});

//UserSchema.post('save', async function() {
//    console.log(this);
//});
//
////update
//UserSchema.pre('update', async function(next) {
//    this.updated = Date.now
//    next();
//});
//
//UserSchema.post('update', async function() {
//    console.log(this);
//});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


var UserSchema= new Schema({
    name:{type:String},
    userName:{type:String},
    email:{type:String},
    password:{type:String},
    mobileNo:{type:Number},
  
})

const User=module.exports=mongoose.model('UserModule',UserSchema);

module.exports.create=(newUser,callback)=>{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash;
            return newUser.save(callback);

        })

    })
  
  
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


module.exports.getOneWithCredentials=function(condition,callback){
   return  User.findOne(condition,callback)
}
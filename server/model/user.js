var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema({
  name:  {type:String,require:true},
  dob: {type:String,require:true},
  email:   {type:String,require:true},
  phone:{type:String,require:true},
  password:{type:String,require:true},
  creation_date:{type:Date,require:true}
});

schema.statics.hashPassword = (password)=>{
 return bcrypt.hashSync(password,10);

}
schema.methods.validPassword = (hashedPassword)=>{
 return bcrypt.compareSync(hashedPassword,this.password)

}
module.exports=mongoose.model("User_Register_Data",schema);
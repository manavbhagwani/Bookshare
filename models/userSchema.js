const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   regno: String,
   mobno: String
});
var user = mongoose.model("user",userSchema);

module.exports=user

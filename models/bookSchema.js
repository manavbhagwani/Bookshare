const mongoose=require('mongoose');


const bookSchema = new mongoose.Schema({
   img: String,
   title: String,
   author: String,
   course: String,
   semester: String,
   branch: String,
   email:String
});

module.exports=mongoose.model("book",bookSchema)

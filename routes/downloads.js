const router=require('express').Router();
const book=require('../models/bookSchema');


router.get("/",(req,res)=>{
	book.find({},function(err,data){
        if(err)
            res.send("incorrect");
        else
        {
            res.send(data);
        }
    });
});

module.exports=router;

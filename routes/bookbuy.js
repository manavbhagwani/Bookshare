const router=require('express').Router();
const jwt=require('jsonwebtoken');

router.get("/",(req,res)=>{
    let token=req.cookies.token;
    let decode=jwt.verify(token,"msdhoni");
    res.render("bookbuy",{username:decode.username});
});

module.exports=router;

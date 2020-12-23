const router=require('express').Router();
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const user=require('../models/userSchema');
const bcrypt = require('bcrypt');

router.get("/",(req,res)=>{
    res.render("signup");
});
router.post("/",(req,res)=>{
    const token = jwt.sign({ email: req.body.email, username:req.body.name }, 'msdhoni',{expiresIn:'30d'});
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.create({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            regno:req.body.regno,
            mobno:req.body.mobno
        });
    });
    const farFuture = new Date(new Date().getTime() + (1000*60*60*24*30));
    res.cookie("token",token,{ expires: farFuture, httpOnly: true });
    res.send("successful");
});

module.exports=router;


// user.find({title:"mb"},function(err,data){
//     if(err)
//         console.log(err);
//     else
//         console.log(data);
// });

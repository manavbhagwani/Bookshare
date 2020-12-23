const router=require('express').Router();
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');

router.use(cookieParser());

router.get("/",(req,res)=>{
    if(req.cookies==undefined)
        res.render("home",{username:"undefined"})
    else
    {
        token=req.cookies.token;
        if(token=="null" || token=="undefined")
            res.render("home",{username:"undefined"});
        else
        {
            try{
                var decode=jwt.verify(token,"msdhoni");
            }catch(Error){
                res.render("home",{username:"undefined"});
                return;
            }
            res.render("home",{username:decode.username});
        }
    }
});

module.exports=router

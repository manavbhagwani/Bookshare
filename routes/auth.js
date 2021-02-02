const jwt=require('jsonwebtoken');

module.exports=(function(req,res,next){
    let token=req.cookies.token;
    if(token==undefined)
        res.render("login");
    else
    {
        if(token=="null")
        {
            res.send("login");
            return;
        }
        else
        {
            try{
                var decode=jwt.verify(token,"msdhoni");
            }catch(Error){
                res.render("login");
                return;
            }
        }
        if(decode.username.replace(/ /g,'')!=req.params.user)
            res.sendStatus(404);
        else
            next();
    }
})

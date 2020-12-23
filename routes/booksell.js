const router=require('express').Router();
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const user=require('../models/bookSchema');
const fs = require('fs');

router.get("/",(req,res)=>{
    let token=req.cookies.token;
    let decode=jwt.verify(token,"msdhoni");
    res.render("booksell",{img:undefined,username:decode.username});
});

const storage=multer.diskStorage({
    destination: "./uploads/",
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/', (req, res) => {
  upload(req, res, (err) => {
      if(err){
          res.send("Image Only!");
      }
      else{
          if(req.file == undefined){
              res.send("Add an image");
          } else {
            // console.log(req.file)
            // console.log(req.body)
            if(req.body.title=="")
            {
                fs.unlinkSync(req.file.path);
                res.send("1");
            }
            else if(req.body.course=="")
            {
                fs.unlinkSync(req.file.path);
                res.send("2");
            }
            else if(req.body.author=="")
            {
                fs.unlinkSync(req.file.path);
                res.send("3");
            }
            else if(req.body.branch=="Branch")
            {
                fs.unlinkSync(req.file.path);
                res.send("4");
            }
            else if(req.body.semester=="Semester")
            {
                fs.unlinkSync(req.file.path);
                res.send("5");
            }
            else
            {
                let token=req.cookies.token;
                let decode=jwt.verify(token,"msdhoni");
                user.create({
                    img:req.file.path,
                    title: req.body.title,
                    course: req.body.course,
                    author: req.body.author,
                    branch: req.body.branch,
                    semester: req.body.semester,
                    email:decode.email
                });
                // res.send("successful "+req.file.path);
                res.send("successful");
            }
          }
      }
  });
});


module.exports=router;

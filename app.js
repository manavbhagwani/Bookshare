const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const homerouter=require('./routes/home');
const signuprouter=require('./routes/signup');
const termsandcondnsrouter=require('./routes/termsandcondns');
const bookbuyrouter=require('./routes/bookbuy');
const booksellrouter=require('./routes/booksell');
const authrouter=require('./routes/auth');
const logoutrouter=require('./routes/logout');
const loginrouter=require('./routes/login');
const formvalidationrouter=require("./routes/formvalidation");
const path = require('path');
const downloadsrouter=require('./routes/downloads');
const profilerouter=require('./routes/profile');
const mybooksrouter=require('./routes/mybooks');
require('dotenv').config();


const app=express();
app.set("view engine","ejs");



mongoose.connect(process.env.key, {
	useNewUrlParser: true,
	useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});





app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/signup",formvalidationrouter);
app.use("/signup",signuprouter);
app.use("/termsandcondns",termsandcondnsrouter);
app.use("/",homerouter);
app.use("/logout",logoutrouter);
app.use("/login",loginrouter);

app.use("/:user/*",authrouter);
app.use("/:user/bookbuy",bookbuyrouter);
app.use("/:user/booksell",booksellrouter);
app.use("/:user/downloads",downloadsrouter);
app.use("/:user/profile",profilerouter);
app.use("/:user/mybooks",mybooksrouter);

app.get("/:user/uploads/:img",(req,res)=>{
	res.sendFile(path.join(__dirname, "./uploads/"+req.params.img));
})

app.listen(3000,"0.0.0.0",()=>{
    console.log("RUNNING");
});

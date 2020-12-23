const router=require('express').Router();
const { body, validationResult } = require('express-validator');
const user=require('../models/userSchema');

router.post('/', [body('name').trim().isLength({ min:1 }).withMessage("The field value is invalid"),body('regno').trim().optional({ checkFalsy: false })
.isNumeric().withMessage("The field value is invalid").isLength({ min:9 ,max:9 }).withMessage('The field value is invalid'),body('mobno').trim().optional({ checkFalsy: false })
.isNumeric().withMessage("The field value is invalid").isLength({ min:10 ,max:10 }).withMessage('The field value is invalid'),body('email').trim().isEmail().withMessage("The field value is invalid").custom(async (email) => {
            data=await (user.find({email:email},"email"));
            if (data.length!=0) {
                throw new Error('Email already in use')
            }
        }),body('password').isLength({ min: 6 }).withMessage("Minimum length should be 6")],async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors)
    }
    next();
});

module.exports=router

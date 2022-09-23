
const { body, validationResult }=require('express-validator')
exports.useSignUpValidatorArr=[
            body('name')
                .notEmpty().
                withMessage('please pprovide  a name'),
            body('email')
                .isEmail()
                .withMessage('enter a valid email')
                .normalizeEmail()
                .isLength({min:6,max:32})
                .withMessage('6-32 length of email'),
            body('password')
                .isLength({min:6,max:32})
        ]
exports.useSignUpValidator=(req,res,next)=>{
   
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
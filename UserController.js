const express=require('express');
const router=express.Router()
const UserService=require('./UserModule');


router.post('/Signup', function(req, res) {
   
    var NewUser = UserService({

        name: req.body.name,
        userName:req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

UserService.getOneWithCredentials({email:req.body.email},(err,exist)=>{
    if(err){
        return res.json({
            success:false,
            message:err.message
        })

    }if(exist){
        return res.json({
            success:true,
            message:"User with this EmailID alreday exist"
        })

    }else{
        UserService.create(NewUser, (err, result) => {
            if (result) {
                 return res.json({
                    success: true,
                    messsage: "Success",
                    result
                })
    
            } else {
             return   res.json({
                    success: false,
                    messsage: "failed to register"
                })
    
            }
        })

    }
})
   
  });


router.post('/login', function(req,res){
    var condition = {
        email: req.body.email
    }
    UserService.getOneWithCredentials(condition, (err, user) => {
        if (err) {
          return  res.json({
                success: false,
                messsage: "failed to register"
            })

        } else if (user) {
            UserService.comparePassword(
                req.body.password,
                user.password,
                (err, isMatch) => {
                  if (err) {
                 return   res.json(
                      ErrLogger(
                        "authenticateUser - comparePassword()",
                        "User",
                        err.toString(),
                        null
                      )
                    );
                  }
                  if (isMatch) {
                   
                  return  res.json({
                      success: true,
                      data: user
                    });
                  } else {
                    return res.json({
                      success: false,
                      msg: "Invalid Password"
                    });
                  }
                }
              );
            
            

        } else {
            res.json({
                success: false,
                messsage: "Invalid Email or Possword "
            })

        }
    })
})

router.post('/forgotPassword',function(req,res){
    
    

})
module.exports=router;
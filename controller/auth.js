const userModel = require('../user'); // ✅ correct path

module.exports.register=async(req,res)=>{
    const {...data}=req.body;
    try{
let user=await userModel.create(data)

return res.status(200).json({
    message:"User registered sucessfully",
    user
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Error occured while trying to register user"
        })
    }
}


    
  module.exports.resetPassword=async(req,res)=>{
    const {...data}=req.body;
    try{
let userFound=await userModel.findOne({email:data.email})
if(!userFound){
return res.status(400).json({
    error:"User not found"
})
}

await userModel.findByIdAndUpdate(userFound._id,{
$set:data
})

return res.status(200).json({
    message:"Password reseted sucessfully"
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Error occured while trying to register user"
        })
    }
  }
    
    
    
  const jwt = require('jsonwebtoken');

  module.exports.login = async (req, res) => {
      const { ...data } = req.body;
      
      try {
          let userFound = await userModel.findOne({ email: data.email });
          
          if (!userFound) {
              return res.status(400).json({
                  error: "User not found"
              });
          }
          
          if (userFound.password !== data.password) {
              return res.status(400).json({
                  error: "Incorrect password"
              });
          }
  
          const token = jwt.sign(
              { _id: userFound._id, email: userFound.email },
              process.env.JWT_SECRET,
            
          );
          
          return res.status(200).json({
              message: "User logged in successfully",
              token,
              user: userFound
          });
          
      } catch (e) {
          console.log(e.message);
          return res.status(400).json({
              error: "Error occurred while trying to login"
          });
      }
  }
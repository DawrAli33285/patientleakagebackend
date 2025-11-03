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
    
    
    
  module.exports.login = async (req, res) => {
    const { ...data } = req.body;
    
    try {
        // Find user by email
        let userFound = await userModel.findOne({ email: data.email });
        
        if (!userFound) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        
        // Check if password matches
        if (userFound.password !== data.password) {
            return res.status(400).json({
                error: "Incorrect password"
            });
        }
        
        return res.status(200).json({
            message: "User logged in successfully",
            user: userFound
        });
        
    } catch (e) {
        console.log(e.message);
        return res.status(400).json({
            error: "Error occurred while trying to login"
        });
    }
}
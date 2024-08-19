const jwt = require('jsonwebtoken')
async function authToken(req,res,next) {
    try{
        const token = req.cookies?.token

        console.log("token", token);
        if(!token){
            return res.json({
                message: "User not login",
                error: true,
                succes: false
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log(err) 
            console.log("decoded", decoded) 

                if(err){
                    console.log("error auth", err);
                }

                req.user.id = decoded?._id
                next()
          });

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            succes: false
        })
    }
}


module.exports = authToken

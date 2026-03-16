const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    console.log("Inside jwtMiddleWare");
    console.log(`Token ${req.headers.authorization}`);

    const token=req.headers['authorization'].split(" ")[1]

    if(token){
        try{
            const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            next()
            
        }
        catch(err){
            res.status(401).json("Authorization Failed ... Please Login Again !!")
            
        }
    }
    else{

        res.status(401).json("Token is missing")
    }
    
    
}

module.exports=jwtMiddleWare
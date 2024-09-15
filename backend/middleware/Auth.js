const router =require('express').Router();
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.heads['authorization'];
    if(!auth)
    {
        return res.status(403)
        .json({message:'unauthorized, JWT token required'})
    }try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error)
    {
        return res.status(403)
        .json({message:'unauthorized, JWT token required or is possibly expired'})
    }
}
module.exports = router;
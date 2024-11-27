module.exports =(req,res,next) => {
console.log(req.headers);
res.send("ok")
next();
}; 
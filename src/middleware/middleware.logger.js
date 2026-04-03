export function looger(req,res,next){
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next()
}
async function userDetailsController(req,res) {
    try{

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false
        })
    }
}

module.exports = userDetailsController
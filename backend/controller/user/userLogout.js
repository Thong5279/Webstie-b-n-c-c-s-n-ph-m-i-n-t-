async function userLogout(req,res){
try {
    const tokenOption = {
        httpOnly: true,
        // secure: true,
        // sameSite: "None"
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        domain: process.env.COOKIE_DOMAIN || undefined,
        path: '/'
    }
    res.clearCookie("token",tokenOption)

    res.json({
        message : "đăng xuất thành công",
        error : false,
        success : true,
        data : []
    })
} catch (err) {
    res.json({
        message: err.message || err,
        error: true,
        success: false,
    })
}
}

module.exports = userLogout
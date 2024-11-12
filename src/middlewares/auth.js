const adminAuth = (req, res, next)=> {
    const token = "xyz"
    const isAdminAuthorized = token === "xyzz";
    if(!isAdminAuthorized) {
        res.status(401).send("GET lost")
    } else {
        next();
    }

};

module.exports = {
    adminAuth,
}
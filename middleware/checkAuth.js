const jwt = require("jsonwebtoken")
const { SESSION_SECRET } = require("../config")


const checkAuth = (req, res, next) => {
    console.log("Checking Auth")
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        if(!token) {
            console.log("no token found, Authentication failed")
            return res.send("Access Denied")
        }

        const decodedToken = jwt.verify(token, SESSION_SECRET)

        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return next(error)     
    }
}
//TODO CHECK DENIS REPOSITORY ON JWT AUTH

module.exports = { checkAuth }



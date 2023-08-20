
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
const login = async (req, res) => {
    const { username, password } = req.body
    // mongo
    // Joi
    // check in the controller
    if(!username || !password){
        throw new CustomAPIError('Please provide username and password',400)
    }
    // just for demo, normally provided by DB 
    const id = new Date().getDate()

    // better practice to keep payload small 
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg: `User created`, token})
}

const dashboard = async (req, res) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)
    }
    const token = authHeader.split(" ")[1]
    console.log(token);
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, John Doe`,secret:`Here is your authorize data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}
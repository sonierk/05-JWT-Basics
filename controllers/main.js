const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");
const login = async (req, res) => {
  const { username, password } = req.body;
  // mongo
  // Joi
  // check in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  // just for demo, normally provided by DB
  const id = new Date().getDate();

  // better practice to keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: `User created`, token });
};

const dashboard = async (req, res) => {
    console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res
    .status(200)
    .json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorize data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};

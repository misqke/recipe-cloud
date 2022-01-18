const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    const {id} = req.query;
    const user = await User.findById(id);
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser
}
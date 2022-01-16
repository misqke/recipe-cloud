const {validationResult} = require('express-validator');

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).json({ error: errors.array()[0].msg})
  }
  console.log("validation successfull")
  next();
}

module.exports = {
  runValidation
}
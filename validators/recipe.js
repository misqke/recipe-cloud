const {check} = require('express-validator');

const addRecipeValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Give your recipe a name'),
  check('time')
    .not()
    .isEmpty()
    .withMessage('Please enter recipe make time.'),
  check('ingredients')
    .not()
    .isEmpty()
    .withMessage('Must have at least 1 ingredient.'),
  check('directions')
    .not()
    .isEmpty()
    .withMessage('How do you make it? Add directions.')
];

module.exports = {addRecipeValidator}
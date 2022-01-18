const express = require('express');
const router = express.Router();


// controllers
const {getRecipes, addRecipe, getSingleRecipe, updateRecipe, deleteRecipe, getLikedRecipes} = require('../controllers/recipes')
const {addComment, deleteComment} = require('../controllers/comments');
const {toggleLike} = require("../controllers/likes");

// validators
const {runValidation} = require('../validators');
const {addRecipeValidator} = require("../validators/recipe")

// authenticators
const authenticateToken = require('../middleware/auth');

//routes
router.route("/").get(getRecipes).post(authenticateToken, addRecipeValidator, runValidation, addRecipe);
router.route("/likes").get(getLikedRecipes);
router.route("/:id").get(getSingleRecipe).patch(authenticateToken, addRecipeValidator, runValidation, updateRecipe).delete(authenticateToken, deleteRecipe)
router.route("/:id/like").get(authenticateToken, toggleLike);
router.route("/:id/comment").patch(authenticateToken, addComment);
router.route("/:id/comment/delete").patch(authenticateToken, deleteComment)

module.exports = router;
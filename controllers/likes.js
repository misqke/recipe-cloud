const User = require('../models/user');

const toggleLike = async (req, res) => {
  try {
    const {id: recipeId} = req.params;
    const requestingUser = req.user;
    const user = await User.findById(requestingUser._id);
    if (!user.liked_recipes) {
      const data = await User.findByIdAndUpdate(user._id, {liked_recipes: [recipeId]}, {new: true})
      return res.status(201).json({user: data});
    }
    const index = user.liked_recipes.indexOf(recipeId);
    if (index === -1) {
      const data = await User.findByIdAndUpdate(user._id, {liked_recipes: [...user.liked_recipes, recipeId]}, {new: true});
      return res.status(201).json({user: data});
    }
    const new_likes = [...user.liked_recipes.slice(0,index), ...user.liked_recipes.slice(index+1)];
    const data = await User.findByIdAndUpdate(user._id, {liked_recipes: new_likes}, {new: true});
    res.status(201).json({user: data});
  } catch (error) {
    console.log("toggleLikes: ", error)
  }
};

module.exports = {toggleLike};
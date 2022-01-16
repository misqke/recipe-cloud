const Recipe = require('../models/recipe');

const addComment = async (req, res) => {
  try {
    const {id} = req.params;
    const {comment} = req.body;
    const commenter = req.user.username;
    const recipe = await Recipe.findById(id);
    const currentComments = recipe.comments;
    const newRecipe = await Recipe.findByIdAndUpdate(id, {comments: [...currentComments, {comment, commenter}]}, {new: true});
    res.status(201).json({msg: "success", recipe: newRecipe})
  } catch (error) {
    console.log(error);
  }
}

const deleteComment = async (req, res) => {
  try {
    const {id} = req.params;
    const recipe = await Recipe.findById(id);
    const {index} = req.body;
    if (recipe.comments[index].commenter !== req.user.username) {
      return res.status(401).json({msg: "Only the commenter can delete it."})
    }
    const commentList = recipe.comments;
    const newCommentList = [...commentList.slice(0,index), ...commentList.slice(index+1)];
    const newRecipe = await Recipe.findByIdAndUpdate(id, {comments: newCommentList}, {new: true});
    res.status(201).json({msg: "success", recipe: newRecipe})
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addComment,
  deleteComment
}
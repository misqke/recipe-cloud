const Recipe = require('../models/recipe');
const User = require('../models/user');
const {cloudinary} = require('../utils/cloudinary');

const getRecipes = async (req, res) => {
  try {
    const {username, viewer} = req.query;
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit || 12;
    const skip = (page -1) * limit;
    let recipes;
    let totalRecipes;
    if (username) {
      if (username === viewer) {
        recipes = await Recipe.find({createdBy: username});
        totalRecipes = recipes.length;
        recipes = await Recipe.find({createdBy: username}).sort("-updatedAt");
      } else {
        recipes = await Recipe.find({createdBy: username, share: true});
        totalRecipes = recipes.length;
        recipes = await Recipe.find({createdBy: username, share: true}).sort("-updatedAt");
      }
    } else {
      recipes = await Recipe.find({share: true});
      totalRecipes = recipes.length;
      recipes = await Recipe.find({share: true}).sort("-updatedAt").skip(skip).limit(limit);
    }

    if (!recipes.length) {
      return res.json({msg: "this user does not exist"})
    }
    const pages = Math.ceil(totalRecipes / limit);
    res.status(200).json({pages, recipes})
  } catch (error) {
    console.log(error)
  }
}

const getLikedRecipes = async (req, res) => {
  try {
    const {id} = req.query;
    const recipes = [];
    const user = await User.findById(id);
    for (let recipeId of user.liked_recipes) {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        const index = user.liked_recipes.indexOf(recipeId);
        const newLikes = [...user.liked_recipes.slice(0, index), ...user.liked_recipes.slice(index+1)];
        await User.findByIdAndUpdate(id, {liked_recipes: newLikes});
      } else {
        recipes.push(recipe);
      }
    }
    res.status(200).json({recipes});
  } catch (error) {
    console.log(error);
  }
  
  
  
}

const getSingleRecipe = async (req, res) => {
  try {
    const {id} = req.params
    const recipe = await Recipe.findById(id);
    res.status(200).json({recipe})
  } catch (error) {
    console.log(error);
  }
}

const addRecipe = async (req, res) => {
  try {
    const {name, time, ingredients, directions, image, share} = req.body;
    const creator = req.user.username;
    const newRecipe = {name, time, ingredients, directions, image, share, createdBy: creator};
    if (image.url !== "/food-placeholder.png") {
      const uploadResponse = await cloudinary.uploader.upload(image.url, {
        upload_preset: "recipe_uploads"
      })
      newRecipe.image.url = uploadResponse.secure_url
      newRecipe.image.id = uploadResponse.public_id;
    }
    const recipe = await Recipe.create(newRecipe);
    res.json({ msg: 'Recipe added successfully', recipe})
  } catch (error) {
    console.log(error);
    res.json({error})
  }
}


const updateRecipe = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, time, ingredients, directions, image, share} = req.body;
    const check = await Recipe.findById(id);
    if (check.createdBy !== req.user.username) {
      return res.status(401).json({msg: "Only the recipe's creator can update it."})
    }
    const newRecipe = {name, time, ingredients, directions, image, share};
    if (image.url !== check.image.url && image.url !== "/food-placeholder.png") {
      if (check.image.url !== "/food-placeholder.png") {
        await cloudinary.uploader.destroy(check.image.id, {resource_type: 'image', type: 'upload'},(res, error) => console.log(res, error));
      }
      const uploadResponse = await cloudinary.uploader.upload(image.url, {
        upload_preset: "recipe_uploads"
      })
      newRecipe.image.url = uploadResponse.secure_url;
      newRecipe.image.id = uploadResponse.public_id;
    }
    const recipe = await Recipe.findByIdAndUpdate(id, newRecipe, {new: true});
    res.status(201).json({ msg: "Update successful.", recipe})
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const {id} = req.params;
    const check = await Recipe.findById(id);
    if (check.createdBy !== req.user.username) {
      return res.status(401).json({msg: "Only the recipe's creator can delete it."})
    }
    if (check.image.url !== "/food-placeholder.png") {
      await cloudinary.uploader.destroy(check.image.id, {type: "upload", resource_type: 'image'}, (result, error) => console.log(error, result));
    }
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({msg: "Delete successful"})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRecipes,
  addRecipe,
  updateRecipe,
  getSingleRecipe,
  deleteRecipe,
  getLikedRecipes
}
const Recipe = require('../models/recipe');
const {cloudinary} = require('../utils/cloudinary');

const getRecipes = async (req, res) => {
  try {
    const username = req.query.username;
    let recipes;
    if (username) {
      recipes = await Recipe.find({createdBy: username});
    } else {
      recipes = await Recipe.find();
    }
    if (!recipes.length) {
      return res.json({msg: "this user does not exist"})
    }
    res.status(200).json({recipes})
  } catch (error) {
    console.log(error)
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
    const {name, time, ingredients, directions, image} = req.body;
    const creator = req.user.username;
    const newRecipe = {name, time, ingredients, directions, image, createdBy: creator};
    if (image.url !== "/no-img-icon.png") {
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
    const {name, time, ingredients, directions, image} = req.body;
    const check = await Recipe.findById(id);
    if (check.createdBy !== req.user.username) {
      return res.status(401).json({msg: "Only the recipe's creator can update it."})
    }
    const newRecipe = {name, time, ingredients, directions, image};
    if (image.url !== check.image.url && image.url !== "/no-img-icon.png") {
      if (check.image.url !== "/no-img-icon.png") {
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
    if (check.image.url !== "/no-img-icon.png") {
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
  deleteRecipe
}
const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Please provide recipe make time"],
    },
    ingredients: {
      type: [
        {
          text: {
            type: String,
            trim: true,
          },
          amount: {
            type: String,
            trim: true,
          },
        },
      ],
      required: true,
    },
    directions: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      id: String,
    },
    comments: [
      {
        comment: {
          type: String,
          trim: true,
          required: true,
        },
        commenter: {
          type: String,
          required: true,
        },
      },
    ],
    share: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

RecipeSchema.statics.findBySearch = function (search) {
  return this.find({ name: new RegExp(search, "i"), share: true });
};

module.exports = mongoose.model("Recipe", RecipeSchema);

const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  //! Add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }

    // Convert the name to lowercase
    const normalizedName = name.toLowerCase();

    // Check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type " + type);
    }

    // Check if category already exists for the user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user._id,
    });

    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }

    // Create the category
    const category = await Category.create({
      name: normalizedName,
      user: req.user._id,
      type,
    });

    res.status(201).json(category);
  }),

  //! List categories
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json(categories);
  }),

  //! Update
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { type, name } = req.body;

    // Convert name to lowercase
    const normalizedName = name ? name.toLowerCase() : undefined;

    // Find category
    const category = await Category.findById(categoryId);

    if (!category || category.user.toString() !== req.user.id) {
      res.status(404);
      throw new Error("Category not found or user not authorized");
    }

    const oldName = category.name;

    // Update category properties
    category.name = normalizedName || category.name;
    category.type = type || category.type;

    const updatedCategory = await category.save();

    // Update affected transactions
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        { user: req.user._id, category: oldName },
        { $set: { category: updatedCategory.name } }
      );
    }

    res.json(updatedCategory);
  }),

  //! Delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    if (category.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User not authorized");
    }

    // Update transactions that have this category
    const defaultCategory = "Uncategorized";
    await Transaction.updateMany(
      { user: req.user._id, category: category.name },
      { $set: { category: defaultCategory } }
    );

    // Remove category
    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: "Category removed and transactions updated" });
  }),
};

module.exports = categoryController;

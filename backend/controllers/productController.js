import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Register new product
// @route POST /api/products
// @access private
const createProduct = asyncHandler(async (req, res) => {
  const { name, unit, unitPrice, category } = req.body;
  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("Ce produit existe déjà");
  }

  const product = await Product.create({
    name,
    unit,
    unitPrice,
    category,
    author: req.user._id, // L'ID de l'utilisateur connecté récupéré via le middleware protect
  });
  res.status(201).json({
    message: "Produit créé avec succès", // Message de réussite
    product: product, // Le produit créé
  });
});
// @desc Get All products
// @route POST /api/products
// @access private
const getProducts = asyncHandler(async (req, res) => {
  try {
    // Récupérer tous les produits de la base de données
    const products = await Product.find().populate("author", "firstname");

    // Répondre avec les produits trouvés
    res.status(200).json(products);
  } catch (error) {
    throw new Error(`Une erreur est survenue : ${error}`);
  }
});
// @desc Update single product
// @route PUT /api/products/:id
// @access private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, variety, unit, unitPrice, category } = req.body; // Récupérer les données à mettre à jour

  // Rechercher et mettre à jour le produit par son ID
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      variety,
      unit,
      unitPrice,
      category,
    },
    { new: true, runValidators: true } // Options pour retourner le produit mis à jour
  );

  // Vérifier si le produit existe
  if (product) {
    res.status(200).json({
      message: "Produit mis à jour avec succès",
      product,
    });
  } else {
    res.status(404);
    throw new Error("Produit introuvable");
  }
});
// @desc Delete single product
// @route DELETE /api/products/:id
// @access private
const deleteProduct = asyncHandler(async (req, res) => {
  // Rechercher et supprimer le produit par son ID
  const product = await Product.findByIdAndDelete(req.params.id);

  // Vérifier si le produit existe
  if (product) {
    res.status(200).json({
      message: "Produit supprimé avec succès",
    });
  } else {
    res.status(404);
    throw new Error("Produit introuvable");
  }
});
// @desc Get Single product by Id
// @route gET /api/products/:id
// @access private
const getSingleProductById = asyncHandler(async (req, res) => {
  // Récupérer l'ID du produit à partir des paramètres de la requête
  const product = await Product.findById(req.params.id);

  // Vérifier si le produit existe
  if (product) {
    // Si le produit est trouvé, le retourner en réponse
    res.status(200).json(product);
  } else {
    // Si le produit n'est pas trouvé, renvoyer une erreur 404
    res.status(404);
    throw new Error("Ce produit est introuvable");
  }
});

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProductById,
};

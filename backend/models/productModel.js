import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variety: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      enum: ["Kilo", "Litre", "Pièce", "Carton", "Boîte", "Bouteille"],
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Fruits et légumes",
        "BOF",
        "Viandes",
        "Poissons",
        "Cave",
        "Epicerie",
        "Economat",
        "Produits de Pâtisserie",
        "Consommables",
      ],
    },
    stock: {
      type: [Number],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Stocke l'ID de l'utilisateur
      ref: "User", // Référence au modèle User
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

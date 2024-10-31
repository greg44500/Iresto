import React from "react";
import { useFetchProductsQuery } from "../slices/productApiSlice";

const Landing = () => {
  // Récupération automatique des produits au chargement du composant
  const { data: products, isLoading, isError, error } = useFetchProductsQuery();

  if (isLoading) {
    return <p>Chargement des produits...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement des produits : {error.message}</p>;
  }

  const sortedProducts = products
    ? [...products].sort((a, b) => a.name.localeCompare(b.name))
    : [];
  console.log(sortedProducts);
  console.log("Produits récupérés :", products);
  console.log("Erreur API :", error);
  return (
    <div className="bg-slate-200/50 w-auto p-10">
      <h2 className="text-center font-[Poppins] text-2xl font-semibold text-slate-200">
        Liste des Produits
      </h2>
      {sortedProducts && sortedProducts.length > 0 ? (
        <ul className="flex gap-3">
          {sortedProducts.map((product) => (
            <li
              className="font-semibold border rounded-md p-3 bg-brique3/50 text-myGrey shadow-lg"
              key={product._id}
            >
              <h3 className="font-[Roboto] font-semibold">{product.name}</h3>
              <p>
                Prix: {product.unitPrice} € / {product.unit}
              </p>
              <p>Catégorie : {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Stock disponible: {product.stock}</p>
              <p>Produit créé le : {product.createdAt}</p>
              <p>Par : {product.author.firstname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </div>
  );
};

export default Landing;

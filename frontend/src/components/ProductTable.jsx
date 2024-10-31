import React from "react";
import { useFetchProductsQuery } from "../slices/productApiSlice";
import FormContainer from "../components/FormContainer";

const ProductTable = () => {
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
    <FormContainer>
      <h2 className="text-center font-[Poppins] text-2xl font-semibold text-slate-200">
        Liste des Produits
      </h2>
      {sortedProducts && sortedProducts.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 mt-4 text-left shadow-lg">
          <thead>
            <tr className="bg-brique3/70 text-myGrey font-semibold">
              <th className="p-3 border-b border-gray-300">Nom du produit</th>
              <th className="p-3 border-b border-gray-300">Prix</th>
              <th className="p-3 border-b border-gray-300">Catégorie</th>
              <th className="p-3 border-b border-gray-300">Description</th>
              <th className="p-3 border-b border-gray-300">Stock disponible</th>
              <th className="p-3 border-b border-gray-300">Date de création</th>
              <th className="p-3 border-b border-gray-300">Auteur</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product._id} className="bg-brique3/50 text-myGrey">
                <td className="p-3 border-b border-gray-300 font-semibold">
                  {product.name}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.unitPrice} € / {product.unit}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.category}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.description}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.stock}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.createdAt}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.author.firstname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </FormContainer>
  );
};

export default ProductTable;

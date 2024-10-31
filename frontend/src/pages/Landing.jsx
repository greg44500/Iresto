import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchProductsQuery } from "../slices/productApiSlice";
import FormContainer from "../components/FormContainer";
import ProductTable from "../components/ProductTable";

const Landing = () => {
  const navigate = useNavigate();
  // Récupération automatique des produits au chargement du composant
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
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
  return <ProductTable />;
};

export default Landing;

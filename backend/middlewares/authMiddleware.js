import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      // Décodage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Recherche de l'utilisateur dans la base de données
      req.user = await User.findById(decoded.userId).select("-password");

      // Vérification si l'utilisateur existe dans la base
      if (!req.user) {
        res.status(401);
        throw new Error("Utilisateur non trouvé");
      }

      // Ajout du contrôle de rôle ici
      const requiredRole = req.user.role; // req.user contient un champ 'role'

      // Passe à l'étape suivante du middleware si l'utilisateur est authentifié
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Votre token est invalide");
    }
  } else {
    res.status(401);
    throw new Error("Pas de Token valide");
  }
});

const admin = (req, res, next) => {
  // On vérifie que l'utilisateur a été authentifié et que son rôle est 'admin'
  if (req.user && req.user.role === "admin") {
    next(); // L'utilisateur est un admin, on continue
  } else {
    res.status(403);
    throw new Error(
      "Accès refusé : Vous n'avez pas les droits suffisants pour cette action. Contacter l'administrateur"
    );
  }
};
export { protect, admin };

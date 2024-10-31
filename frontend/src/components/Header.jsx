import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className=" max-w-2xl mx-auto custom-bg-container mt-10 ">
      <h1 className="font-[Poppins] font-semibold text-2xl mt-5 ">
        AUTHENTIFICATION
      </h1>
      <p className="font-[Roboto] text-xl mx-5 text-center">
        Pour accéder à la mercuriale, merci de vous identifier.
      </p>
      <div className="flex items-center justify-center flex-row gap-8">
        <button className="custom-header-button">
          <Link to="/login">se connecter</Link>
        </button>
        <button className="custom-header-button">
          <Link to="/register">s'inscrire</Link>
        </button>
      </div>
    </div>
  );
}

export default Header;

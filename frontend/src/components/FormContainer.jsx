import React from "react";

function FormContainer({ children }) {
  return (
    <div className="w-96 border rounded-sm border-brique2 flex items-center justify-center mt-5 mb-5 m-auto p-10 shadow-lg bg-slate-50/80 ">
      {children}
    </div>
  );
}

export default FormContainer;

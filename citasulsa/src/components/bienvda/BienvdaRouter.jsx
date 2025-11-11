import { useEffect, useState } from "react";
import BienvdaAdmin from "./BienvdaAdmin";
import BienvdaEscuela from "./BienvdaEscuela";
import BienvdaVigilancia from "./BienvdaVigilancia";

export default function BienvdaRouter() {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado);
  }, []);

  // Mientras carga el rol, mostrar un loading
  if (!rol) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  // Renderizar el componente según el rol
  switch (rol) {
    case "admin_sistema":
      return <BienvdaAdmin />;
    
    case "admin_escuela":
    case "admin_universitario":
      return <BienvdaEscuela />;
    
    case "vigilancia":
    case "guardia":
      return <BienvdaVigilancia />;
    
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-600">Rol no reconocido: {rol}</p>
        </div>
      );
  }
}

import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WelcomeCard from "../shared/WelcomeCard";

export default function BienvdaVigilancia() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("Usuario");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Usar nombre_completo si existe, o construirlo de las partes
        const nombreCompleto = payload.nombre_completo || 
                              `${payload.nombre || ''} ${payload.apellido_paterno || ''} ${payload.apellido_materno || ''}`.trim() ||
                              "Usuario";
        setNombreUsuario(nombreCompleto);
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      setNombreUsuario("Usuario");
    }
  }, []);

  return (
    <main className="flex-1 p-12 bg-[#f9fafb] rounded-tl-2xl shadow-inner min-h-screen flex flex-col items-center justify-center font-[Mitr]">
      {/* Tarjeta de bienvenida */}
      <WelcomeCard nombreUsuario={nombreUsuario} tipoUsuario="vigilancia" />

      {/* Cuadros de acción - Solo consultar */}
      <div className="mt-20 grid grid-cols-1 gap-8 w-full max-w-2xl items-center">
        {/* Consultar Registros */}
        <div
          onClick={() => navigate("/consultar")}
          className="bg-[#e0e7ff] hover:bg-[#c7d2fe] shadow-md rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <BookOpenIcon className="w-12 h-12 mx-auto text-[#1e3a8a]" />
          <p className="mt-3 text-xl text-[#1e3a8a]">Consultar Registros</p>
          <p className="mt-2 text-sm text-gray-600">Ver todas las citas registradas</p>
        </div>
      </div>
    </main>
  );
}

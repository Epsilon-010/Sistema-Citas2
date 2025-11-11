import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function WelcomeCard({ nombreUsuario, tipoUsuario }) {
  const fecha = new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Mapeo de roles a nombres amigables
  const rolesMap = {
    admin_sistema: "Administrador del Sistema",
    admin_escuela: "Administrador de Escuela",
    vigilancia: "Personal de Vigilancia",
    guardia: "Personal de Vigilancia",
  };

  const tipoUsuarioFormateado = rolesMap[tipoUsuario] || tipoUsuario;

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-2xl rounded-3xl p-12 w-full max-w-4xl transition-transform hover:scale-[1.01] duration-200">
      {/* Icono del usuario */}
      <UserCircleIcon className="w-36 h-36 text-[#1e3a8a]" />

      {/* Texto de bienvenida */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl mb-2 font-[Mitr]">
          ¡Bienvenido de nuevo <span className="text-[#1e3a8a]">{nombreUsuario}</span>!
        </h2>
        <p className="text-base text-gray-600 mb-1">{fecha}</p>
        <p className="text-lg font-medium">
          Tipo de usuario:{" "}
          <span className="text-[#1e3a8a]">{tipoUsuarioFormateado}</span>
        </p>
      </div>
    </div>
  );
}

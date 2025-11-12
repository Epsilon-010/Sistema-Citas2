import { useState, useEffect } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [cambiada, setCambiada] = useState(false);

  // Obtener el email desde la URL: /reset-password?email=usuario@correo.com
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const correo = params.get("email");
    if (correo) setEmail(correo);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamamos al endpoint de FastAPI
      const response = await fetch(
        `http://localhost:8000/usuarios/reset/${encodeURIComponent(email)}?password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña");
      }

      setCambiada(true);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Hubo un problema al cambiar la contraseña.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Establecer nueva contraseña
        </h2>

        {!cambiada ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Guardar nueva contraseña
            </button>
          </form>
        ) : (
          <p className="text-green-600 text-center">
            ✅ Tu contraseña ha sido cambiada correctamente.  
            <br />
            <a
              href="/"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Volver al inicio de sesión
            </a>
          </p>
        )}
      </div>
    </div>
  );
}


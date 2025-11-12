import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:8000/usuarios/email?email=${encodeURIComponent(email)}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Error al enviar el correo");
    setEnviado(true);
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema al enviar el correo.");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Restablecer contraseña
        </h2>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar enlace
            </button>
          </form>
        ) : (
          <p className="text-green-600 text-center">
            📩 Si el correo está registrado, recibirás un enlace para
            restablecer tu contraseña.
          </p>
        )}
      </div>
    </div>
  );
}

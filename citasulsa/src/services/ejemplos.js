// EJEMPLOS DE USO DE LOS SERVICIOS API
// Este archivo contiene ejemplos de cómo usar los servicios en tus componentes

import { authAPI, usuariosAPI, visitantesAPI, citasAPI, carrosAPI } from './services/api';

// ============================================================
// 📌 EJEMPLO 1: LOGIN COMPLETO
// ============================================================

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // El login guarda automáticamente los tokens en localStorage
      const response = await authAPI.login(email, password);
      
      console.log('Usuario autenticado:', response);
      // response contiene: { access_token, refresh_token, rol, email }
      
      navigate('/bienvda');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Login'}
      </button>
    </form>
  );
};

// ============================================================
// 📌 EJEMPLO 2: LOGOUT
// ============================================================

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia todos los tokens de localStorage
    authAPI.logout();
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

// ============================================================
// 📌 EJEMPLO 3: LISTAR VISITANTES
// ============================================================

const ListarVisitantes = () => {
  const [visitantes, setVisitantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarVisitantes = async () => {
      try {
        const data = await visitantesAPI.getAll();
        setVisitantes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarVisitantes();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Visitantes</h2>
      <ul>
        {visitantes.map(visitante => (
          <li key={visitante.Id}>
            {visitante.Nombre} {visitante.Apellido_Paterno}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================
// 📌 EJEMPLO 4: CREAR VISITANTE
// ============================================================

const CrearVisitante = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido_Paterno: '',
    Apellido_Materno: '',
    Genero: 'M',
    Fecha_Nacimiento: '',
    Ine: '',
    Correo: '',
    Numero: '',
    Ingreso: 'A pie'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const nuevoVisitante = await visitantesAPI.create(formData);
      console.log('Visitante creado:', nuevoVisitante);
      alert('Visitante registrado exitosamente');
      
      // Limpiar formulario
      setFormData({
        Nombre: '',
        Apellido_Paterno: '',
        Apellido_Materno: '',
        Genero: 'M',
        Fecha_Nacimiento: '',
        Ine: '',
        Correo: '',
        Numero: '',
        Ingreso: 'A pie'
      });
    } catch (err) {
      setError(err.message);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Nombre" value={formData.Nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="Apellido_Paterno" value={formData.Apellido_Paterno} onChange={handleChange} placeholder="Apellido Paterno" required />
      <input name="Apellido_Materno" value={formData.Apellido_Materno} onChange={handleChange} placeholder="Apellido Materno" required />
      
      <select name="Genero" value={formData.Genero} onChange={handleChange}>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>

      <input type="date" name="Fecha_Nacimiento" value={formData.Fecha_Nacimiento} onChange={handleChange} required />
      <input name="Ine" value={formData.Ine} onChange={handleChange} placeholder="INE" required />
      <input type="email" name="Correo" value={formData.Correo} onChange={handleChange} placeholder="Correo" required />
      <input name="Numero" value={formData.Numero} onChange={handleChange} placeholder="Número" required />
      
      <select name="Ingreso" value={formData.Ingreso} onChange={handleChange}>
        <option value="A pie">A pie</option>
        <option value="Vehiculo">En vehículo</option>
      </select>

      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar Visitante'}
      </button>
    </form>
  );
};

// ============================================================
// 📌 EJEMPLO 5: ACTUALIZAR VISITANTE
// ============================================================

const ActualizarVisitante = ({ visitanteId }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Correo: '',
    Numero: ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Solo enviar los campos que se quieren actualizar
      const visitanteActualizado = await visitantesAPI.update(visitanteId, formData);
      console.log('Visitante actualizado:', visitanteActualizado);
      alert('Visitante actualizado exitosamente');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input 
        name="Nombre" 
        value={formData.Nombre} 
        onChange={(e) => setFormData({...formData, Nombre: e.target.value})} 
        placeholder="Nuevo nombre (opcional)" 
      />
      <input 
        type="email" 
        name="Correo" 
        value={formData.Correo} 
        onChange={(e) => setFormData({...formData, Correo: e.target.value})} 
        placeholder="Nuevo correo (opcional)" 
      />
      <input 
        name="Numero" 
        value={formData.Numero} 
        onChange={(e) => setFormData({...formData, Numero: e.target.value})} 
        placeholder="Nuevo número (opcional)" 
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

// ============================================================
// 📌 EJEMPLO 6: ELIMINAR VISITANTE
// ============================================================

const EliminarVisitante = ({ visitanteId, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este visitante?')) {
      return;
    }

    setLoading(true);
    try {
      await visitantesAPI.delete(visitanteId);
      alert('Visitante eliminado exitosamente');
      onDeleted(); // Callback para refrescar la lista
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
};

// ============================================================
// 📌 EJEMPLO 7: CREAR CITA CON CARRO
// ============================================================

const CrearCitaConCarro = () => {
  const [formData, setFormData] = useState({
    visitanteId: '',
    usuarioVisitadoId: '',
    fecha: '',
    hora: '',
    conCarro: false,
    // Datos del carro
    marca: '',
    modelo: '',
    color: '',
    placas: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let carroId = null;

      // Si viene en carro, primero crear el registro del carro
      if (formData.conCarro) {
        const carro = await carrosAPI.create({
          Marca: formData.marca,
          Modelo: formData.modelo,
          Color: formData.color,
          Placas: formData.placas
        });
        carroId = carro.Id;
      }

      // Luego crear la cita
      const cita = await citasAPI.create({
        Visitante_Id: formData.visitanteId,
        Usuario_Visitado: formData.usuarioVisitadoId,
        Carro_Id: carroId,
        Fecha: formData.fecha,
        Hora: formData.hora
      });

      console.log('Cita creada:', cita);
      alert('Cita registrada exitosamente');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... campos del formulario ... */}
      <button type="submit">Crear Cita</button>
    </form>
  );
};

// ============================================================
// 📌 EJEMPLO 8: BUSCAR VISITANTE POR ID
// ============================================================

const BuscarVisitante = () => {
  const [visitanteId, setVisitanteId] = useState('');
  const [visitante, setVisitante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    setLoading(true);
    setError('');
    setVisitante(null);

    try {
      const data = await visitantesAPI.getById(visitanteId);
      setVisitante(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={visitanteId} 
        onChange={(e) => setVisitanteId(e.target.value)} 
        placeholder="ID del visitante" 
      />
      <button onClick={handleBuscar} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p className="error">{error}</p>}
      {visitante && (
        <div>
          <h3>{visitante.Nombre} {visitante.Apellido_Paterno}</h3>
          <p>Email: {visitante.Correo}</p>
          <p>Teléfono: {visitante.Numero}</p>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 📌 EJEMPLO 9: VERIFICAR AUTENTICACIÓN EN COMPONENTE
// ============================================================

const ComponenteProtegido = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token válido
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Contenido protegido</h1>
      {/* ... */}
    </div>
  );
};

// ============================================================
// 📌 EJEMPLO 10: MANEJO DE ERRORES GLOBAL
// ============================================================

const ComponenteConErrorHandling = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const visitantes = await visitantesAPI.getAll();
        setData(visitantes);
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        
        // Diferentes tipos de errores
        if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          // Token expirado o inválido
          authAPI.logout();
          window.location.href = '/';
        } else if (err.message.includes('404')) {
          setError('Datos no encontrados');
        } else if (err.message.includes('500')) {
          setError('Error del servidor. Intenta más tarde.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      {/* Renderizar datos */}
    </div>
  );
};

// ============================================================
// 📌 TIPS Y MEJORES PRÁCTICAS
// ============================================================

/*

1. SIEMPRE manejar errores con try-catch
2. Mostrar estados de carga (loading) al usuario
3. Validar datos antes de enviar al backend
4. Limpiar formularios después de envíos exitosos
5. Mostrar mensajes de éxito/error al usuario
6. Verificar autenticación en componentes protegidos
7. Usar useEffect para cargar datos al montar componentes
8. No exponer el token en logs o consola
9. Refrescar listas después de crear/actualizar/eliminar
10. Manejar tokens expirados redirigiendo al login

*/

export {
  LoginComponent,
  LogoutButton,
  ListarVisitantes,
  CrearVisitante,
  ActualizarVisitante,
  EliminarVisitante,
  CrearCitaConCarro,
  BuscarVisitante,
  ComponenteProtegido,
  ComponenteConErrorHandling
};

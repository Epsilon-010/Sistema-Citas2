# ✅ Checklist de Testing - SweetAlert2

## 🎯 Objetivo
Verificar que todas las alertas de SweetAlert2 funcionen correctamente en todos los componentes.

---

## 📝 Testing por Componente

### 1. Login (login.jsx)
- [ ] Iniciar sesión con credenciales correctas → Ver loading → Ver mensaje de éxito → Redirección
- [ ] Intentar con email incorrecto → Ver error "Usuario no encontrado"
- [ ] Intentar con contraseña incorrecta → Ver error "Contraseña incorrecta"
- [ ] Simular error de red → Ver error "Error de conexión"

**Comandos de prueba:**
```bash
# Asegúrate de que el backend esté corriendo
cd Backend
uv run uvicorn src.main:app --reload
```

---

### 2. Agregar Cita (Agregar.jsx)

#### Validaciones de Formulario
- [ ] Dejar campos vacíos → Ver alertas de warning
- [ ] Ingresar edad menor a 15 años → Ver warning "Debes tener al menos 15 años"
- [ ] Nombre de persona a visitar con menos de 3 caracteres → Ver warning
- [ ] Nombre sin apellido → Ver warning "ingresa el nombre completo"
- [ ] Seleccionar "En vehículo" sin placas → Ver warning
- [ ] Placas con menos de 5 caracteres → Ver warning
- [ ] Placas sin números o sin letras → Ver warning

#### Validaciones de Horario
- [ ] Intentar agendar en domingo → Ver warning "No se agendan citas los domingos"
- [ ] Intentar hora antes de 7 AM → Ver warning "fuera del horario permitido"
- [ ] Intentar hora después de 7 PM en lunes → Ver warning
- [ ] Intentar hora después de 2 PM en sábado → Ver warning
- [ ] Intentar agendar con menos de 30 min de anticipación → Ver warning

#### Creación Exitosa
- [ ] Llenar formulario correctamente → Ver loading → Ver éxito → Form se limpia

---

### 3. Consultar Citas (Consultar.jsx)

#### Visualización
- [ ] Carga inicial → Ver loading → Ver lista de citas
- [ ] Error al cargar → Ver mensaje de error

#### Filtrado
- [ ] Cambiar mes → Ver citas filtradas correctamente

#### Reagendar
- [ ] Clic en "Reagendar" → Modal abre
- [ ] Cambiar a domingo → Ver warning "No se agendan citas los domingos"
- [ ] Cambiar a hora fuera de rango → Ver warning "fuera del horario"
- [ ] Reagendar correctamente → Ver loading → Ver éxito → Cita actualizada

#### Eliminar
- [ ] Clic en "Eliminar" → Ver alert personalizado con info del visitante
- [ ] Ver mensaje sobre eliminación de visitante si aplica
- [ ] Confirmar eliminación → Ver loading → Ver éxito
- [ ] Cancelar eliminación → No se elimina nada

---

### 4. Consultar Usuarios (ConsultarUsuarios.jsx)

#### Ver Detalles
- [ ] Clic en "Ver Detalles" → Modal abre
- [ ] Error al cargar → Ver mensaje de error

#### Editar Usuario
- [ ] Clic en "Editar" → Modal abre con datos
- [ ] Error al cargar datos → Ver mensaje de error
- [ ] Modificar datos y guardar → Ver loading → Ver éxito
- [ ] Error al actualizar → Ver mensaje de error con detalles

#### Eliminar Usuario
- [ ] Clic en "Eliminar" → Ver confirmación elegante
- [ ] Cancelar → No se elimina
- [ ] Confirmar → Ver loading → Ver éxito → Usuario desaparece
- [ ] Error al eliminar → Ver mensaje de error

---

### 5. Contraseña Olvidada (ContraseniaOlvidada.jsx)
- [ ] Ingresar email → Ver loading "Enviando correo..."
- [ ] Email existe → Ver éxito con mensaje detallado
- [ ] Error de servidor → Ver mensaje de error
- [ ] Error de conexión → Ver mensaje de error

---

### 6. Restablecer Contraseña (RestablecerContrasenia.jsx)
- [ ] Ingresar contraseñas diferentes → Ver warning "no coinciden"
- [ ] Ingresar contraseñas iguales → Ver loading
- [ ] Actualización exitosa → Ver éxito → Redirección automática en 2 seg
- [ ] Error al actualizar → Ver mensaje de error

---

## 🎨 Aspectos Visuales a Verificar

### En Todos los Componentes
- [ ] Los colores coinciden con la paleta universitaria
- [ ] Los íconos son apropiados para cada tipo de alert
- [ ] Las animaciones son suaves
- [ ] Los textos son legibles
- [ ] Los botones tienen buen contraste
- [ ] Los modals se centran correctamente
- [ ] El backdrop oscurece el fondo

### Responsividad
- [ ] Alerts se ven bien en móvil (< 768px)
- [ ] Alerts se ven bien en tablet (768px - 1024px)
- [ ] Alerts se ven bien en desktop (> 1024px)
- [ ] Los botones son fáciles de tocar en móvil

---

## 🔄 Tests de Flujo Completo

### Flujo 1: Usuario Nuevo
1. [ ] Acceder al login
2. [ ] Olvidar contraseña
3. [ ] Recibir correo
4. [ ] Restablecer contraseña
5. [ ] Login exitoso
6. [ ] Ver todas las alertas en el proceso

### Flujo 2: Agendar Cita
1. [ ] Login como usuario
2. [ ] Ir a "Agregar Cita"
3. [ ] Probar varias validaciones (ver warnings)
4. [ ] Crear cita exitosa
5. [ ] Ver confirmación
6. [ ] Ir a "Consultar" y verificar

### Flujo 3: Gestión de Citas
1. [ ] Login como admin/vigilancia
2. [ ] Consultar citas
3. [ ] Reagendar una cita (con validaciones)
4. [ ] Eliminar una cita (ver info completa)
5. [ ] Confirmar todas las alertas

### Flujo 4: Gestión de Usuarios
1. [ ] Login como admin_sistema
2. [ ] Consultar usuarios
3. [ ] Editar usuario
4. [ ] Eliminar usuario
5. [ ] Verificar todos los feedbacks

---

## 🐛 Casos Edge a Probar

### Timing
- [ ] ¿Qué pasa si cierras el loading manualmente?
- [ ] ¿Los alerts se apilan correctamente si hay varios?
- [ ] ¿El loading se cierra siempre (even on error)?

### Datos Extremos
- [ ] Mensajes de error muy largos
- [ ] Nombres muy largos en alerts
- [ ] Caracteres especiales en mensajes

### Navegación
- [ ] ¿Se cierran los alerts al cambiar de página?
- [ ] ¿Funcionan después de volver atrás?
- [ ] ¿Se mantienen durante redirecciones?

---

## 📊 Resultado del Testing

### Resumen
- **Total de tests:** ~50
- **Tests pasados:** ___
- **Tests fallidos:** ___
- **Bugs encontrados:** ___

### Bugs Detectados
1. ___
2. ___
3. ___

### Notas Adicionales
___
___
___

---

## ✅ Aprobación

- [ ] Todos los tests básicos pasaron
- [ ] Todos los tests de flujo pasaron
- [ ] No hay bugs críticos
- [ ] La UX es satisfactoria
- [ ] Listo para producción

**Probado por:** _______________  
**Fecha:** _______________  
**Firma:** _______________

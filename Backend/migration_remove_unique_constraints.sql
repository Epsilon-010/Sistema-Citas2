-- Migración para eliminar restricciones UNIQUE de correo y número
-- Solo mantener el INE como único

-- Eliminar restricción UNIQUE del correo
ALTER TABLE visitantes DROP CONSTRAINT IF EXISTS visitantes_Correo_key;

-- Eliminar restricción UNIQUE del número
ALTER TABLE visitantes DROP CONSTRAINT IF EXISTS visitantes_Numero_key;

-- Verificar que el INE siga siendo único
-- (Esta restricción ya existe, no necesitamos agregarla)

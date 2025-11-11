from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from ..auth.auth import verify_password, create_access_token, create_refresh_token
from ..Usuarios.services.usuarios_servicios import UsuarioServicios
from .auth_schemas import LoginRequest,LoginResponse

auth_routes = APIRouter(prefix='/auth', tags=['autenticacion'])


@auth_routes.post('/login')
async def login(credentials: LoginRequest):
    service = UsuarioServicios()
    try:
        usuario = await service.get_user_by_email(credentials.email)
        
        if not verify_password(credentials.password, usuario.Password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="contraseña Incorrecta"
            )
        
        # Crear nombre completo
        nombre_completo = f"{usuario.Nombre} {usuario.Apellido_Paterno} {usuario.Apellido_Materno}"
        
        access_token = create_access_token(
            subject=str(usuario.Id),
            additional_claims={
                "email": usuario.Email,
                "rol": usuario.Rol,
                "nombre": usuario.Nombre,
                "apellido_paterno": usuario.Apellido_Paterno,
                "apellido_materno": usuario.Apellido_Materno,
                "nombre_completo": nombre_completo,
                "rol_escuela": usuario.Rol_Escuela,
                "area": usuario.Area
            }
        )
        
        refresh_token = create_refresh_token(subject=str(usuario.Id))
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "rol": usuario.Rol,
            "email": usuario.Email,
            "nombre": usuario.Nombre,
            "apellido_paterno": usuario.Apellido_Paterno,
            "apellido_materno": usuario.Apellido_Materno,
            "nombre_completo": nombre_completo,
            "rol_escuela": usuario.Rol_Escuela,
            "area": usuario.Area
        }
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor"
        )
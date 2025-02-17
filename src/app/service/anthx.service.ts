import { Injectable } from '@angular/core';
import { Usuario } from '../interface/Usuario';
import { Empleado } from '../interface/empleado';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticadoSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioAutenticado());
  public usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  private usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
  private empleados: Empleado[] = JSON.parse(localStorage.getItem('empleados') || '[]');

  constructor(public router: Router) {
    // Cargar algunos empleados predefinidos al inicio
    if (this.empleados.length === 0) {
      this.cargarEmpleadosPredefinidos();
    }
  }

  // Método para registrar un usuario
  registrarUsuario(usuario: Usuario): void {
    if (this.camposVacios(usuario)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    const usuarioExistente = this.usuarios.find(u => u.nombreUsuario === usuario.nombreUsuario);
    if (usuarioExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de usuario ya está registrado.',
      });
      return;
    }

    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'El usuario se ha registrado correctamente.',
    });

    this.router.navigate(['/login']);
  }
// Método para registrar un empleado
registrarEmpleado(empleado: Empleado): void {
  // Generar automáticamente el idEmpleado si no está presente
  if (!empleado.idEmpleado) {
    empleado.idEmpleado = this.generarIdEmpleado();
  }

  // Validación de campos vacíos
  if (this.camposVaciosEmpleado(empleado)) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos',
      text: 'Por favor, complete todos los campos.',
    });
    return;
  }

  // Verificar si el empleado ya existe por el correo electrónico (o idEmpleado si es único)
  const empleadoExistente = this.empleados.find(e => e.idEmpleado === empleado.idEmpleado || e.correoElectronico === empleado.correoElectronico);
  if (empleadoExistente) {
    Swal.fire({
      icon: 'error',
      title: 'Empleado ya registrado',
      text: 'El empleado con este ID o correo electrónico ya está registrado.',
    });
    return;
  }

  // Registrar el nuevo empleado
  this.empleados.push(empleado);
  localStorage.setItem('empleados', JSON.stringify(this.empleados));

  // Mensaje de éxito
  Swal.fire({
    icon: 'success',
    title: 'Empleado registrado',
    text: 'El empleado se ha registrado correctamente.',
  });

  // Navegar al dashboard después de registrar el empleado
  this.router.navigate(['/dashboard']);
}

  // Método para obtener todos los empleados
  obtenerEmpleados(): Empleado[] {
    return this.empleados; // Retorna la lista de empleados cargada desde localStorage
  }

  // Método para iniciar sesión (autenticación de usuario)
  login(nombreUsuario: string, contrasena: string): boolean {
    const usuario = this.usuarios.find(u => u.nombreUsuario === nombreUsuario && u.contrasena === contrasena);
    if (usuario) {
      localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
      this.usuarioAutenticadoSubject.next(usuario);  // Emitimos el nuevo usuario autenticado
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido!',
      });
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña incorrectos',
    });
    return false;
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return this.usuarioAutenticadoSubject.value !== null;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('usuarioAutenticado');
    this.usuarioAutenticadoSubject.next(null);  // Emitimos un valor null cuando el usuario cierra sesión
    Swal.fire({
      icon: 'success',
      title: 'Cierre de sesión exitoso',
      text: '¡Hasta pronto!',
    });
    this.router.navigate(['/login']);
  }

  // Método para obtener el usuario autenticado
  obtenerUsuarioAutenticado(): Usuario | null {
    return JSON.parse(localStorage.getItem('usuarioAutenticado') || 'null');
  }

  // Método de validación de campos vacíos para usuario
  private camposVacios(usuario: Usuario): boolean {
    return !usuario.nombreUsuario || !usuario.contrasena || !usuario.correoElectronico || !usuario.nombre || !usuario.apellido || !usuario.fechaNacimiento;
  }

  // Método para validar los campos vacíos del empleado
  private camposVaciosEmpleado(empleado: Empleado): boolean {
    return !empleado.nombre || !empleado.apellido || !empleado.puesto || !empleado.salario || !empleado.fechaContratacion || !empleado.departamento;
  }

  // Método para generar un ID de empleado único (puedes personalizar la lógica)
  private generarIdEmpleado(): string {
    const nuevoId = 'EMP' + new Date().getTime(); // Genera un ID único basado en la fecha
    return nuevoId;
  }

  // Cargar algunos empleados predefinidos
  private cargarEmpleadosPredefinidos(): void {
    const empleadosPredefinidos: Empleado[] = [
      
      // Agrega más empleados predefinidos si es necesario
    ];

    // Si no hay empleados registrados, agregar los predefinidos
    if (this.empleados.length === 0) {
      this.empleados.push(...empleadosPredefinidos);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));  // Guardar en localStorage
    }
  }
}

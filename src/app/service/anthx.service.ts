import { Injectable } from '@angular/core';
import { Usuario } from '../interface/Usuario'; // Importamos la interfaz Usuario
import { Empleado } from '../interface/empleado'; // Importamos la interfaz Empleado
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import { Router } from '@angular/router'; // Importamos Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Arrays para almacenar usuarios y empleados
  private usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Cargar usuarios desde localStorage
  private empleados: Empleado[] = JSON.parse(localStorage.getItem('empleados') || '[]'); // Cargar empleados desde localStorage

  // Inyectamos el Router en el constructor
  constructor(private router: Router) {}

  // Método para registrar un usuario
  registrarUsuario(usuario: Usuario): void {
    // Validaciones
    if (this.camposVacios(usuario)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = this.usuarios.find(u => u.nombreUsuario === usuario.nombreUsuario);
    if (usuarioExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de usuario ya está registrado.',
      });
      return;
    }

    // Si no existe, lo agregamos
    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios)); // Guardar en localStorage
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'El usuario se ha registrado correctamente.',
    });

    // Redirigir al login después de un registro exitoso
    this.router.navigate(['/login']); // Redirige a la página de login
    console.log('Usuario registrado:', usuario); // Imprimir en consola los datos del nuevo usuario
  }

  // Método para registrar un empleado
  registrarEmpleado(empleado: Empleado): void {
    // Validaciones
    if (this.camposVaciosEmpleado(empleado)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    // Verificar si el empleado ya existe
    const empleadoExistente = this.empleados.find(e => e.idEmpleado === empleado.idEmpleado);
    if (empleadoExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El empleado ya está registrado.',
      });
      return;
    }

    // Si no existe, lo agregamos
    this.empleados.push(empleado);
    localStorage.setItem('empleados', JSON.stringify(this.empleados)); // Guardar en localStorage
    Swal.fire({
      icon: 'success',
      title: 'Empleado registrado',
      text: 'El empleado se ha registrado correctamente.',
    });

    // Redirigir al login después de un registro exitoso
    this.router.navigate(['/login']); // Redirige a la página de login
    console.log('Empleado registrado:', empleado); // Imprimir en consola los datos del nuevo empleado
  }

  // Método para iniciar sesión (autenticación de usuario)
  login(nombreUsuario: string, contrasena: string): boolean {
    const usuario = this.usuarios.find(u => u.nombreUsuario === nombreUsuario && u.contrasena === contrasena);
    if (usuario) {
      localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario)); // Guardar el usuario autenticado en localStorage
      console.log('Inicio de sesión exitoso');
      return true; // Si encontramos el usuario, la autenticación es exitosa
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña incorrectos',
    });
    console.log('Usuario o contraseña incorrectos');
    return false; // Si no encontramos el usuario, la autenticación falla
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return localStorage.getItem('usuarioAutenticado') !== null;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('usuarioAutenticado');
    console.log('Cierre de sesión exitoso');
  }

  // Método adicional para obtener el usuario autenticado
  obtenerUsuarioAutenticado(): Usuario | null {
    return JSON.parse(localStorage.getItem('usuarioAutenticado') || 'null');
  }

  // Método de validación de campos vacíos para usuario
  private camposVacios(usuario: Usuario): boolean {
    return !usuario.nombreUsuario || !usuario.contrasena || !usuario.correoElectronico || !usuario.nombre || !usuario.apellido || !usuario.fechaNacimiento;
  }

  // Método de validación de campos vacíos para empleado
  private camposVaciosEmpleado(empleado: Empleado): boolean {
    return !empleado.idEmpleado || !empleado.nombre || !empleado.apellido || !empleado.puesto || !empleado.salario || !empleado.fechaContratacion || !empleado.departamento || !empleado.correoElectronico || !empleado.fechaNacimiento;
  }
}

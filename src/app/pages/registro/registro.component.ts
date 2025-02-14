import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/anthx.service';
import { Usuario } from '../../interface/Usuario';
import { Empleado } from '../../interface/empleado';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  // Datos del usuario
  nombreUsuario: string = '';
  contrasena: string = '';
  correoElectronico: string = '';
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';

  // Datos del empleado
  idEmpleado: string = '';
  puesto: string = '';
  salario: number = 0;
  fechaContratacion: string = '';
  departamento: string = '';

  constructor(private authService: AuthService) {}

  // Método para registrar usuario
  registrarUsuario() {
    const usuario: Usuario = {
      nombreUsuario: this.nombreUsuario,
      contrasena: this.contrasena,
      correoElectronico: this.correoElectronico,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento
    };
    this.authService.registrarUsuario(usuario); // Registrar el usuario
  }

  // Método para registrar empleado
  registrarEmpleado() {
    const empleado: Empleado = {
      idEmpleado: this.idEmpleado,
      nombre: this.nombre,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,
      fechaNacimiento: this.fechaNacimiento,
      puesto: this.puesto,
      salario: this.salario,
      fechaContratacion: this.fechaContratacion,
      departamento: this.departamento
    };
    this.authService.registrarEmpleado(empleado); // Registrar el empleado
  }
}

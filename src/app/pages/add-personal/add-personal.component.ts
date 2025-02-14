import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/anthx.service'; 
import { Empleado } from 'src/app/interface/empleado'; // Importa la interfaz Empleado

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent {
  // Propiedades para el empleado
  idEmpleado: string = '';
  nombre: string = '';
  apellido: string = '';
  correoElectronico: string = ''; // Añadir este campo
  fechaNacimiento: string = '';  // Añadir este campo
  puesto: string = '';
  salario: number = 0;
  fechaContratacion: string = '';
  departamento: string = '';

  constructor(private authService: AuthService) {}

  // Método para registrar un empleado
  registrarEmpleado() {
    // Creamos el objeto empleado con los valores del formulario
    const empleado: Empleado = {
      idEmpleado: this.idEmpleado,
      nombre: this.nombre,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,  // Asegúrate de tener este campo
      fechaNacimiento: this.fechaNacimiento,      // Asegúrate de tener este campo
      puesto: this.puesto,
      salario: this.salario,
      fechaContratacion: this.fechaContratacion,
      departamento: this.departamento
    };

    // Llamamos al servicio para registrar el empleado
    this.authService.registrarEmpleado(empleado);

    // Limpiamos el formulario después de registrar
    this.idEmpleado = '';
    this.nombre = '';
    this.apellido = '';
    this.correoElectronico = '';
    this.fechaNacimiento = '';
    this.puesto = '';
    this.salario = 0;
    this.fechaContratacion = '';
    this.departamento = '';
  }
}

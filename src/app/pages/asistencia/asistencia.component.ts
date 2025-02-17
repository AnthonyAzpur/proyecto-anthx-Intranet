import { Component, OnInit } from '@angular/core';

interface Empleado {
  idEmpleado: string;
  nombre: string;
  puesto: string;
  horaEntrada?: string;
  horaSalida?: string;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  empleados: Empleado[] = [];
  
  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    // Aquí cargamos los empleados desde el LocalStorage (si ya están guardados)
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    } else {
      // Si no hay empleados, podemos cargar algunos datos de ejemplo o dejarlos vacíos
      this.empleados = [
        { idEmpleado: 'E001', nombre: 'Juan', puesto: 'Desarrollador' },
        { idEmpleado: 'E002', nombre: 'Ana', puesto: 'Diseñadora Gráfica' },
        // Agrega más empleados si es necesario
      ];
    }
  }

  registrarHoraEntrada(empleado: Empleado) {
    // Registrar la hora de entrada con la hora actual
    const currentDate = new Date();
    empleado.horaEntrada = currentDate.toLocaleTimeString();
    this.actualizarEmpleadosEnLocalStorage();
  }

  registrarHoraSalida(empleado: Empleado) {
    // Registrar la hora de salida con la hora actual
    const currentDate = new Date();
    empleado.horaSalida = currentDate.toLocaleTimeString();
    this.actualizarEmpleadosEnLocalStorage();
  }

  actualizarEmpleadosEnLocalStorage() {
    // Guardamos la lista de empleados actualizada en el LocalStorage
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  guardarAsistencia() {
    // Aquí guardamos la asistencia del día en otro valor dentro del localStorage
    const asistencia = this.empleados.map(empleado => ({
      idEmpleado: empleado.idEmpleado,
      nombre: empleado.nombre,
      horaEntrada: empleado.horaEntrada,
      horaSalida: empleado.horaSalida,
      asistio: empleado.horaEntrada && empleado.horaSalida ? true : false
    }));

    // Guardamos la asistencia en localStorage
    localStorage.setItem('asistencia', JSON.stringify(asistencia));

    // Muestra un mensaje indicando que la asistencia fue guardada
    console.log('Asistencia guardada', asistencia);
    alert('Asistencia guardada correctamente');
  }
}

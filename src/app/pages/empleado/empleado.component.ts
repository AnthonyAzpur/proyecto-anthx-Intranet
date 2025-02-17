import { Component } from '@angular/core';
import { Empleado } from '../../interface/empleado'; // Importa la interfaz Empleado
import * as XLSX from 'xlsx';  // Importamos la librería XLSX

// Lista de empleados de ejemplo
const EMPLEADOS: Empleado[] = [
  {
    idEmpleado: 'E001',
    nombre: 'Juan',
    apellido: 'Pérez',
    puesto: 'Desarrollador',
    salario: 3500,
    fechaContratacion: '2020-01-15',
    departamento: 'Tecnología',
    correoElectronico: 'juan.perez@empresa.com',
    fechaNacimiento: '1985-06-10'
  },
  {
    idEmpleado: 'E002',
    nombre: 'Ana',
    apellido: 'Gómez',
    puesto: 'Diseñadora Gráfica',
    salario: 3000,
    fechaContratacion: '2019-07-20',
    departamento: 'Diseño',
    correoElectronico: 'ana.gomez@empresa.com',
    fechaNacimiento: '1990-04-22'
  },
];

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
})
export class EmpleadoComponent {
  empleados: Empleado[] = EMPLEADOS;

  constructor() {
    this.refrescarEmpleados();
  }

  refrescarEmpleados() {
    // Cargar empleados desde localStorage si existen
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  // Función para guardar los empleados en localStorage
  guardarEmpleados() {
    // Elimina los empleados pre-cargados (si los hay)
    this.empleados = this.empleados.filter(emp => !['E001', 'E002'].includes(emp.idEmpleado));
    
    // Guardar empleados en localStorage
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    console.log('Empleados guardados en localStorage');
  }

  // Función para descargar los datos como archivo Excel
  descargarExcel() {
    const ws = XLSX.utils.json_to_sheet(this.empleados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    XLSX.writeFile(wb, 'empleados.xlsx');
  }

  // Función para cargar datos desde un archivo Excel
  cargarExcel(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws);
        
        // Actualizar los empleados con los datos cargados desde el archivo Excel
        this.empleados = json as Empleado[];
      };
    }
  }

  // Función para eliminar un empleado
  eliminarEmpleado(idEmpleado: string) {
    this.empleados = this.empleados.filter(emp => emp.idEmpleado !== idEmpleado);
    localStorage.setItem('empleados', JSON.stringify(this.empleados)); // Guardar el cambio en localStorage
  }

  // Definimos trackEmpleadoId para mejorar el rendimiento con *ngFor
  trackEmpleadoId(index: number, empleado: Empleado): string {
    return empleado.idEmpleado;
  }
}

import { Component } from '@angular/core';
import { Empleado } from '../../interface/empleado'; // Importa la interfaz Empleado
import * as XLSX from 'xlsx';  // Importamos la librería XLSX
import Swal from 'sweetalert2';  // Importamos SweetAlert2

// Lista de empleados de ejemplo
const EMPLEADOS: Empleado[] = [];

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

    // SweetAlert para indicar que los empleados se guardaron correctamente
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Empleados guardados correctamente.',
    });
    console.log('Empleados guardados en localStorage');
  }

  // Función para descargar los datos como archivo Excel
  descargarExcel() {
    const ws = XLSX.utils.json_to_sheet(this.empleados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    XLSX.writeFile(wb, 'empleados.xlsx');

    // SweetAlert para indicar que el archivo Excel fue descargado
    Swal.fire({
      icon: 'info',
      title: '¡Descarga Completada!',
      text: 'Los datos de los empleados se descargaron como un archivo Excel.',
    });
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
        const ws = wb.Sheets[wb.SheetNames[0]]; // Leemos la primera hoja
        const json = XLSX.utils.sheet_to_json(ws);
        
        // Actualizar los empleados con los datos cargados desde el archivo Excel
        this.empleados = json as Empleado[];

        // SweetAlert para indicar que el archivo fue cargado
        Swal.fire({
          icon: 'success',
          title: '¡Datos Cargados!',
          text: 'Los empleados fueron cargados desde el archivo Excel.',
        });
      };
    }
  }

  // Función para eliminar un empleado
  eliminarEmpleado(idEmpleado: string) {
    // Usamos SweetAlert para confirmar antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleados = this.empleados.filter(emp => emp.idEmpleado !== idEmpleado);
        localStorage.setItem('empleados', JSON.stringify(this.empleados)); // Guardar el cambio en localStorage

        // SweetAlert para indicar que el empleado fue eliminado
        Swal.fire(
          '¡Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        );
      }
    });
  }

  // Definimos trackEmpleadoId para mejorar el rendimiento con *ngFor
  trackEmpleadoId(index: number, empleado: Empleado): string {
    return empleado.idEmpleado;
  }
}

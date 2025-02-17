import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importamos el Router
import { formatDate } from '@angular/common'; // Para manejar la fecha actual
import { ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Datos para el gráfico de asistencia
  public attendanceSeries: ApexNonAxisChartSeries = [80, 20]; // 80% Asistencia, 20% Ausencias
  public attendanceChart: ApexChart = {
    type: 'pie',
    height: 350,
  };
  public attendanceXaxis: ApexXAxis = {
    categories: ['Asistió', 'No Asistió'],
  };

  // Datos de los empleados y la asistencia
  public asistentes: number = 0;
  public faltantes: number = 0;
  public todayDate: string = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  
  private empleados: any[] = [];
  private asistencia: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarAsistencia();
    this.calcularAsistencia();
  }

  // Cargar empleados desde el localStorage
  cargarEmpleados() {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
      console.log('Empleados cargados:', this.empleados); // Imprimir los empleados en consola
    } else {
      this.empleados = []; // Si no hay empleados guardados, lo dejamos vacío
      console.log('No se encontraron empleados en localStorage');
    }
  }

  // Cargar la asistencia desde el localStorage
  cargarAsistencia() {
    const data = localStorage.getItem('asistencia');
    if (data) {
      this.asistencia = JSON.parse(data);
      console.log('Asistencia cargada:', this.asistencia); // Imprimir la asistencia en consola
    } else {
      this.asistencia = []; // Si no hay asistencia guardada, lo dejamos vacío
      console.log('No se encontraron datos de asistencia en localStorage');
    }
  }

  // Calcular la cantidad de asistentes y faltantes
  calcularAsistencia() {
    let asistentesCount = 0;
    let faltantesCount = 0;

    this.asistencia.forEach((registro) => {
      // Verificar si el empleado asistió (tiene la propiedad 'asistio' en true)
      if (registro.asistio) {
        asistentesCount++;
      } else {
        faltantesCount++;
      }
    });

    // Asignar los resultados a las variables para mostrarlas
    this.asistentes = asistentesCount;
    this.faltantes = faltantesCount;

    // Actualizar el gráfico con los nuevos valores
    this.attendanceSeries = [this.asistentes, this.faltantes];
  }

  // Navegar a la página de asistencia
  goToAsistencia() {
    this.router.navigate(['/anthx/asistencia']);
  }

  // Navegar a la página de añadir personal
  goToPersonal() {
    this.router.navigate(['/anthx/empleado']);
  }

 
}

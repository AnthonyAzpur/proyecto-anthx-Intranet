import { Component, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels } from 'ng-apexcharts';
import { Router } from '@angular/router';  // Importamos el Router

// Para los gráficos
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Datos para el gráfico del personal
  public personalSeries: ApexNonAxisChartSeries = [70, 30]; // 70% Personal Activo, 30% Total
  public personalChart: ApexChart = {
    type: 'pie',
    height: 350
  };
  public personalXaxis: ApexXAxis = {
    categories: ['Personal Activo', 'Personal Inactivo']
  };

  // Datos para el gráfico de asistencia del día
  public attendanceSeries: ApexNonAxisChartSeries = [80, 20]; // 80% Asistencia, 20% Ausencias
  public attendanceChart: ApexChart = {
    type: 'pie',
    height: 350
  };
  public attendanceXaxis: ApexXAxis = {
    categories: ['Asistencia', 'Ausencia']
  };

  // Inyectamos el Router para la navegación
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToAsistencia() {
    // Navegar a la ruta de asistencia
    this.router.navigate(['/asistencia']);
  }
  
  goToPersonal() {
    // Navegar a la ruta de añadir personal
    this.router.navigate(['/personal']);
  }
  
  goToUsuarios() {
    // Navegar a la ruta de usuarios
    this.router.navigate(['/list-usuarios']);
  }
}

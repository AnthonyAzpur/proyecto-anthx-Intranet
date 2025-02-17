import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AddPersonalComponent } from './pages/add-personal/add-personal.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';


const routes: Routes = [
  { path: 'anthx/login', component: LoginComponent },
  { path: 'anthx/registro', component: RegistroComponent },
  { path: 'anthx/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'anthx/empleado', component: EmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'anthx/add-personal', component: AddPersonalComponent, canActivate: [AuthGuard] },  // Ruta para añadir personal
  { path: 'anthx/asistencia', component: AsistenciaComponent, canActivate: [AuthGuard] },  // Ruta para asistencia
  
  { path: '', redirectTo: '/anthx/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/anthx/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AddPersonalComponent } from './pages/add-personal/add-personal.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'empleado', component: EmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'add-personal', component: AddPersonalComponent, canActivate: [AuthGuard] },  // Ruta para añadir personal
  { path: 'asistencia', component: AsistenciaComponent, canActivate: [AuthGuard] },  // Ruta para asistencia
  { path: 'list-usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },  // Ruta para listar usuarios
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

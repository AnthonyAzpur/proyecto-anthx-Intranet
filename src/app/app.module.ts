import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { HeaderComponent } from './components/header/header.component';
import { MenudashComponent } from './components/menudash/menudash.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    DashboardComponent,
    AsistenciaComponent,
    HeaderComponent,
    MenudashComponent,
    FooterComponent,

    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

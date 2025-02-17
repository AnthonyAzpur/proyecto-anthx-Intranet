import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/anthx.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = ''; 
  apellido: string = '';
  private authSubscription!: Subscription;  // Usamos el operador de aserción

  constructor(
    private authService: AuthService,  
    private router: Router  
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable de usuario autenticado
    this.authSubscription = this.authService.usuarioAutenticado$.subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.nombre;  // Asignamos el nombre del usuario
        this.apellido = usuario.apellido;  // Asignamos el apellido del usuario
      } else {
        this.userName = '';  // Si no está autenticado, limpiamos los valores
        this.apellido = '';
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();  // Limpiar la suscripción
    }
  }
  goTodashcoard() {
    this.router.navigate(['/anthx/dashboard']);
  }
}

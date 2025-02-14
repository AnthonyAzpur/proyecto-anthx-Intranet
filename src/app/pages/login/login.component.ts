import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/anthx.service'; // Asegúrate de que AuthService esté importado

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Llama al servicio de autenticación para verificar el usuario
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      // Si la autenticación es exitosa, navega al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Si la autenticación falla, muestra un mensaje de error
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonIcon
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { logInOutline, filmOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  constructor() {
    addIcons({ logInOutline, filmOutline });
  }

  onLogin() {
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      this.authService.login();
      this.router.navigate(['/tabs/movies']);
    } else {
      alert('Please fill in all fields.');
    }
  }
}

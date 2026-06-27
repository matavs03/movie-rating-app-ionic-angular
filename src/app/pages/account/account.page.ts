import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { MoviesService } from '../../services/movies.service';
import { User } from '../../interfaces/user';
import { addIcons } from 'ionicons';
import { logOutOutline, filmOutline, personCircleOutline } from 'ionicons/icons';
import {AuthService} from "../../services/auth.service";
import {personOutline} from "ionicons/icons";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
  ]
})
export class AccountPage {
  private moviesService = inject(MoviesService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: User | null = null;

  ratedMoviesCount: number = 0;

  constructor() {
    addIcons({ logOutOutline, filmOutline, personCircleOutline });
  }

  ionViewWillEnter() {

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user!;
    });
  }
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}

import {Component, inject, Input, OnInit} from '@angular/core';
import {Movie} from "../../interfaces/movie";
import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonRange, IonTextarea, IonTitle, IonToolbar, ModalController
} from "@ionic/angular/standalone";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    DatePipe,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonRange,
    FormsModule,
    IonTextarea
  ]
})
export class MovieRatingComponent  implements OnInit {

  private modalController = inject(ModalController);

  @Input() selectedMovie!: Movie;

  userRating: number = 1;
  userComment: string = '';


  constructor() { }

  ngOnInit() {}



  submitRating() {
    this.modalController.dismiss({
      rating: this.userRating,
      comment: this.userComment,
      movieId: this.selectedMovie.id
    }, 'confirm');
  }
}

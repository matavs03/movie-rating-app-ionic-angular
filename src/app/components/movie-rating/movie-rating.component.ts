import {Component, inject, Input, OnInit} from '@angular/core';
import {Movie} from "../../interfaces/movie";
import {CommonModule, DecimalPipe} from "@angular/common";
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
import {Rating} from "../../interfaces/rating";

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonRange,
    FormsModule,
    IonTextarea,
    DecimalPipe
  ]
})
export class MovieRatingComponent  implements OnInit {

  private modalController = inject(ModalController);

  @Input() selectedMovie!: Movie;
  @Input() existingRating!: Rating;

  isEditing: boolean = false;
  userRating: number = 1;
  userComment: string = '';


  constructor() { }

  ngOnInit() {
    if (this.existingRating !== null) {
      this.isEditing = true;
      this.userRating = this.existingRating.score;
      this.userComment = this.existingRating.comment;
    }
  }



  submitRating() {
    this.modalController.dismiss({
      rating: this.userRating,
      comment: this.userComment,
      movieId: this.selectedMovie.id
    }, 'confirm');
  }

  onDeleteRating() {
    console.log('Brisanje ocene...');
    this.modalController.dismiss({ deleted: true });
  }
}

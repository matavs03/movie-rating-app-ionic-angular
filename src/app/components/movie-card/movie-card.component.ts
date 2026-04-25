import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/angular/standalone";
import {Movie} from "../../interfaces/movie";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    IonCard,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    DatePipe,

  ],
  standalone: true
})
export class MovieCardComponent  implements OnInit {

  @Input() movie! : Movie;
  @Output() cardClicked = new EventEmitter<Movie>();



  constructor() {

  }

  ngOnInit() {}

  private genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    18: 'Drama',
    14: 'Fantasy',
    878: 'Sci-Fi',
    53: 'Thriller',
    27: 'Horror'
  };

  getGenreNames(): string {
    if (!this.movie.genre_ids || this.movie.genre_ids.length === 0) return 'Other';

    return this.movie.genre_ids
      .map(id => this.genreMap[id])
      .filter(name => !!name)
      .slice(0, 2)
      .join(', ');
  }

  onCardClicked() {
    this.cardClicked.emit(this.movie);
  }



}

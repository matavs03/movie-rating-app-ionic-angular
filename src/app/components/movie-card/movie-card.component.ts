import {Component, EventEmitter, inject, Inject, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon, IonText
} from "@ionic/angular/standalone";
import {Movie} from "../../interfaces/movie";
import {DatePipe} from "@angular/common";
import {RatedMovie} from "../../interfaces/rated-movie";
import {MoviesService} from "../../services/movies.service";


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
    IonText,

  ],
  standalone: true
})
export class MovieCardComponent  implements OnInit {

  private movieService = inject(MoviesService);

  @Input() movie! : Movie | RatedMovie;
  @Output() cardClicked = new EventEmitter<Movie>();

  rating: number = 0;
  comment: string = "";

  isRated: boolean = false;

  constructor() {

  }

  ngOnInit() {
    this.checkRating();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie']) {
      this.checkRating();
    }
  }

  private checkRating() {
    const foundRating = this.movieService.returnRating(this.movie.id);
    if (foundRating !== null && foundRating !== undefined) {
      this.isRated = true;
      this.comment = foundRating.comment;
      this.rating = foundRating.score;
    } else {
      // OBAVEZNO resetuj na false ako je ocena obrisana!
      this.isRated = false;
      this.comment = "";
      this.rating = 0;
    }
  }

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

  get userRating(){
    return (this.movie as RatedMovie).rating;
  }


}

import {Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';
import {MovieCardComponent} from "../../components/movie-card/movie-card.component";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../interfaces/movie";
import {addIcons} from "ionicons";
import {trash} from "ionicons/icons";
import {MovieRatingComponent} from "../../components/movie-rating/movie-rating.component";
import {Rating} from "../../interfaces/rating";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-rated',
  templateUrl: './rated.page.html',
  styleUrls: ['./rated.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonSearchbar, MovieCardComponent]
})
export class RatedPage implements OnInit {

  private moviesService = inject(MoviesService);
  private modalController = inject(ModalController);
  private authService = inject(AuthService);

  @ViewChild('mainContent', {static: true}) content!: IonContent;


  movies: Movie[] = [];

  constructor() {
    addIcons({ trash });
  }

  ngOnInit() {
    // this.loadMyRatedMovies();
  }

  ionViewWillEnter() {
    this.loadMyRatedMovies();
  }

  loadMyRatedMovies() {
    this.movies = [];
    const myRatings = this.moviesService.loggedUserRatings;
    for (const rating of myRatings) {
      this.moviesService.getMovieById(rating.movieId).subscribe({
        next: (tmdbMovie: any) => {

          const mappedGenreIds = tmdbMovie.genres ? tmdbMovie.genres.map((g: any) => g.id) : [];

          const fullMovie: Movie = {
            id: tmdbMovie.id,
            title: tmdbMovie.title,
            poster_path: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : 'assets/placeholder.png',
            release_date: tmdbMovie.release_date,
            vote_average: tmdbMovie.vote_average,
            overview: tmdbMovie.overview,
            genre_ids: mappedGenreIds
          };

          this.movies.push(fullMovie);
        }
      });
    }
  }

  onSearchSubmit(event: any){
    const query = event.detail.value;
    if(query && query.trim() !== ''){
      this.movies = this.movies.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.loadMyRatedMovies();
    }
  }

  onSearchCancel(){
    this.loadMyRatedMovies();
  }

  scrollToTop(){
    this.content.scrollToTop(800);
  }

  async openRatingModal(movie: Movie){

    const foundRating = this.moviesService.returnRating(movie.id);

    const modal = await this.modalController.create({
      component: MovieRatingComponent,
      componentProps: {
        selectedMovie: movie,
        existingRating: foundRating
      },
      presentingElement: await this.modalController.getTop(),
      handle: true,
      breakpoints: [0,1],
      initialBreakpoint: 1,
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    const currentUserId = this.authService.getCurrentUserId() ?? 'undefined';

    if(role === 'confirm'){
      const newRating: Rating = {
        movieId: data.movieId,
        score: data.rating,
        comment: data.comment,
        userId: this.authService.getCurrentUserId() ?? 'undefined',
        createdAt: new Date()
      };

      this.moviesService.addRatingWithDatabase(newRating).subscribe({
        next: () => {
          this.movies = this.movies.map(m => {
            if (m.id === movie.id) {
              return { ...m };
            }
            return m;
          });
        }
      });
    }

    else if(data?.deleted){

      this.moviesService.removeRatingSaBazom(movie.id, currentUserId).subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.id !== movie.id);
        }
      });
    }
  }
}

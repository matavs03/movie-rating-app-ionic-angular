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
import {RatedMovie} from "../../interfaces/rated-movie";
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

  private authService = Inject(AuthService);

  MOCK_USER_ID : string = 'matija123'; //OVO OBRISATI KADA SE UBACI BACK

  @ViewChild('mainContent', {static: true}) content!: IonContent;

  movies: RatedMovie[] = [];

  constructor() {
    addIcons({ trash });
  }

  ngOnInit() {
    this.moviesService.returnMovieWithRating().subscribe(
      res => {
        this.movies = res;
      }
    );
  }

  ionViewWillEnter() {
    this.moviesService.returnMovieWithRating().subscribe(
      res => {
        this.movies = res;
      }
    );
  }

  onSearchSubmit(event: any){
    const query = event.detail.value;

    if(query && query.trim() !== ''){
      this.moviesService.searchRatedMovie(query).subscribe(res => this.movies = res);
    }
    else{
      this.resetList();
    }
  }


  onSearchCancel(){
    this.resetList();
  }

  resetList(){
    this.moviesService.returnMovieWithRating().subscribe(res => this.movies = res);
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

    if(role === 'confirm'){
      const newRating: Rating = {
        movieId: data.movieId,
        score: data.rating,
        comment: data.comment,
        userId: this.authService.getCurrentUserId() ?? 'undefined',
        createdAt: new Date()
      };

      this.moviesService.addRating(newRating);
    }
    else if(data?.deleted){
      this.moviesService.removeRating(movie.id);
      this.resetList();
    }
  }
}

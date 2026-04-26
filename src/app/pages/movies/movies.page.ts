import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { MovieCardComponent} from "../../components/movie-card/movie-card.component";
import {Movie} from "../../interfaces/movie";
import {Rating} from "../../interfaces/rating";
import {MoviesService} from "../../services/movies.service";
import {Observable} from "rxjs";
import { trash } from 'ionicons/icons';
import {addIcons} from "ionicons";
import {ModalController} from "@ionic/angular/standalone";
import {MovieRatingComponent} from "../../components/movie-rating/movie-rating.component";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MovieCardComponent, IonSearchbar, IonButtons, IonButton,],

})
export class MoviesPage implements OnInit {

  private moviesService = inject(MoviesService);

  private modalController = inject(ModalController);

  MOCK_USER_ID : string = 'matija123'; //OVO OBRISATI KADA SE UBACI BACK

  @ViewChild('mainContent', {static: true}) content!: IonContent;

  movies: Movie[] = [];

  constructor() {
    addIcons({ trash });
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(
      res => {
        this.movies = res;
      }
    );
  }





  onSearchSubmit(event: any){
    const query = event.detail.value;

    if(query && query.trim() !== ''){
      this.moviesService.searchMovies(query).subscribe(res => this.movies = res);
    }
    else{
      this.resetList();
    }
  }


  onSearchCancel(){
    this.resetList();
  }

  resetList(){
    this.moviesService.getMovies().subscribe(res => this.movies = res);
  }

  scrollToTop(){
    this.content.scrollToTop(800);
  }

  async openRatingModal(movie: Movie){
    const modal = await this.modalController.create({
      component: MovieRatingComponent,
      componentProps: {
        selectedMovie: movie
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
        userId: this.MOCK_USER_ID,
        createdAt: new Date()
      };

      this.moviesService.addRating(newRating);
    }
  }

}

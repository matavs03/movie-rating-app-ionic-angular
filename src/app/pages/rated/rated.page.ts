import {Component, inject, OnInit, ViewChild} from '@angular/core';
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
}

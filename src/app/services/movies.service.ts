import {inject, Injectable} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {Rating} from "../interfaces/rating";
import {Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  private httpClient = inject(HttpClient);


  public loggedUserRatings: Rating[] = [];

  getPopularMovies(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
    return this.httpClient.get(url);
  }

  getLoggedUserRatings(userId: string): Observable<any> {
    return this.httpClient.get<{ [key: string]: Rating }>(
      `https://movie-rating-app-backend-default-rtdb.europe-west1.firebasedatabase.app/ratings/${userId}.json`
    ).pipe(
      tap(response => {
        if (response) {
          this.loggedUserRatings = Object.values(response);
        } else {
          this.loggedUserRatings = [];
        }
      })
    );
  }

  returnRating(movieId: number) {
    return this.loggedUserRatings.find(r => r.movieId === movieId) ?? null;
  }

  searchMovies(query: string) : Observable<any>{
    const url = `${environment.tmdbBaseUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
    return this.httpClient.get(url);
  }



  addRatingWithDatabase(newRating: Rating) {
    return this.httpClient.put(
      `https://movie-rating-app-backend-default-rtdb.europe-west1.firebasedatabase.app/ratings/${newRating.userId}/${newRating.movieId}.json`,
      newRating
    ).pipe(tap(() => {
        const index = this.loggedUserRatings.findIndex(r => r.movieId === newRating.movieId);
        if (index !== -1) {
          this.loggedUserRatings[index] = newRating;
        } else {
          this.loggedUserRatings.push(newRating);
        }
      })
    );
  }



  removeRatingSaBazom(movieId: number, userId: string) {
    return this.httpClient.delete(
      `https://movie-rating-app-backend-default-rtdb.europe-west1.firebasedatabase.app/ratings/${userId}/${movieId}.json`
    ).pipe(
      tap(() => {
        this.loggedUserRatings = this.loggedUserRatings.filter(r => r.movieId !== movieId);
      })
    );
  }

  getMovieById(movieId: number): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=en-US`;
    return this.httpClient.get(url);
  }


}

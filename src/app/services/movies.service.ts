import { Injectable } from '@angular/core';
import {Movie} from "../interfaces/movie";
import {Rating} from "../interfaces/rating";
import {Observable, of} from "rxjs";
import {RatedMovie} from "../interfaces/rated-movie";

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      poster_path: 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
      release_date: '2010-07-16',
      vote_average: 8.8,
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      genre_ids: [28, 878]
    },
    {
      id: 2,
      title: 'Interstellar',
      poster_path: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      release_date: '2014-11-07',
      vote_average: 8.7,
      overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      genre_ids: [12, 18, 878]
    },
    {
      id: 3,
      title: 'The Godfather',
      poster_path: 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      release_date: '1972-03-14',
      vote_average: 8.7,
      overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.',
      genre_ids: [18, 80]
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      poster_path: 'https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
      release_date: '1994-09-10',
      vote_average: 8.5,
      overview: 'A burger-loving hit man, his philosophical partner, and a washed-up boxer.',
      genre_ids: [18, 80]
    },
    {
      id: 5,
      title: 'The Shawshank Redemption',
      poster_path: 'https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
      release_date: '1994-09-23',
      vote_average: 8.7,
      overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life.',
      genre_ids: [18, 80]
    }
  ];

  ratings: Rating[] = [];

  getMovies() {
    return of(this.movies);
  }

  getRatedMovies() {
    return of(this.ratings);
  }

  searchMovies(query: string) : Observable<Movie[]>{

    const filtered = this.movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
    return of(filtered);
  }

  addRating(newRating: Rating) {
    const index = this.ratings.findIndex(r => r.movieId === newRating.movieId);

    if(index > -1){
      this.ratings[index] = newRating;
    }
    else{
      this.ratings.push(newRating);
    }
  }

  private mapRatingsToRatedMovies(): RatedMovie[] {
    return this.ratings.map(rating => {
      const movie = this.movies.find(m => m.id === rating.movieId);
      return { ...movie, rating: rating } as RatedMovie;
    });
  }

  returnMovieWithRating(): Observable<RatedMovie[]> {
    return of(this.mapRatingsToRatedMovies());
  }

  searchRatedMovie(query: string): Observable<RatedMovie[]> {
    const all = this.mapRatingsToRatedMovies();
    const filtered = all.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    return of(filtered);
  }
}

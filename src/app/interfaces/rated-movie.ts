import {Movie} from "./movie";
import {Rating} from "./rating";

export interface RatedMovie extends Movie {
  rating: Rating;
}

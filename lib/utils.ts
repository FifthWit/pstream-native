import { MovieDetails, TvShowDetails } from 'tmdb-ts';

export function PosterResolver(poster_path: string | undefined, size: string = 'w342'): string {
  if (!poster_path) {
    return '';
  }
  return `https://image.tmdb.org/t/p/${size}${poster_path}`;
}

export type MediaDetails = MovieDetails | TvShowDetails;

export function getTitle(media: MediaDetails) {
  if (!media) return '';
  return isMovie(media) ? media.title : media.name;
}

export function getReleaseDate(media: MediaDetails): string {
  if (!media) return '';
  return isMovie(media) ? media.release_date : media.first_air_date;
}

export function isMovie(media: MediaDetails): media is MovieDetails {
  return 'title' in media;
}

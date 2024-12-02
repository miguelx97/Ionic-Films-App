export interface FilmResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export class Result {
    adult?: boolean;
    backdrop_path?: null | string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: Date;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;

    constructor(baseResult: Result) {
        Object.assign(this, baseResult);
    }

    fullPosterImage?() {
        if (this.poster_path != null) {
            return `https://image.tmdb.org/t/p/w500/${this.poster_path}`;
        } else {
            return 'https://www.idsplus.net/wp-content/uploads/default-placeholder.png';
        }
    }

    starsByRating?(): string {
        if (this.vote_average) {
            const rating = Math.floor(this.vote_average / 2);
            return '🔥'.repeat(rating);
        } else {
            return "";
        }
    }

    formattedDate?(): string {
        if (this.release_date) {
            return new Date(this.release_date).toLocaleDateString(
                'es-ES',
                {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            );
        } else {
            return "";
        }
    }
}

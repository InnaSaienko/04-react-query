import axios from 'axios';
import type {Movie} from "../types/movie.ts";

interface FetchMoviesResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
});

export const getMovies = async (query: string, { signal }: { signal?: AbortSignal } = {}): Promise<Movie[]> => {
    const response = await api.get<FetchMoviesResponse>('/search/movie', {
        params: {
            query: query
        },
        signal
    });
    return response.data.results || [];
};
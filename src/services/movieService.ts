import axios from 'axios';
import type {FetchMoviesResponse} from "../types/movie.ts";


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
});

export const getMovies = async (query: string, page: number, { signal }: { signal?: AbortSignal } = {}): Promise<FetchMoviesResponse> => {
    const response = await api.get<FetchMoviesResponse>('/search/movie', {
        params: {
            query,
            page
        },
        signal
    });
    return response.data;
};
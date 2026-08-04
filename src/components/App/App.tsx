import {useEffect, useState} from 'react';
import styles from './App.module.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {MovieGrid} from '../MovieGrid/MovieGrid';
import {getMovies} from '../../services/movieService.ts';
import type {Movie} from '../../types/movie';
import Loader from "../Loader/Loader.tsx";
import MovieModal from '../MovieModal/MovieModal';
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function App() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const {data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['movies', query, page],

        queryFn: () => getMovies(query, page, {signal: controller.signal}),
        enabled: query !== '',
        placeholderData: keepPreviousData,
    });

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        if (!query) return;
        setIsError(false);
        const controller = new AbortController();
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const movies = await getMovies(query, {signal: controller.signal});
                if (movies.length === 0) {
                    setIsError(true);
                }
                setData(movies);
            } catch (error) {
                if (!(error instanceof Error) || error.name !== 'AbortError') {
                    setIsError(true);
                }
            }
            setIsLoading(false);
        };
        fetchData();
        return () => controller.abort();
    }, [query]);

    return (
        <div className={styles.app}>
            <SearchBar onSubmit={handleSearch}/>
            {isLoading && <Loader/>}
            {isError && <ErrorMessage/>}
            {!isLoading && !isError && data.length > 0 && <MovieGrid movies={data} onSelect={handleMovieClick}/>}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>
            )}
        </div>
    )
}

export default App

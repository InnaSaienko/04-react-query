import css from './App.module.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {MovieGrid} from '../MovieGrid/MovieGrid';
import {getMovies} from '../../services/movieService.ts';
import type {Movie} from '../../types/movie';
import Loader from "../Loader/Loader.tsx";
import MovieModal from '../MovieModal/MovieModal';
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import ReactPaginateImport from "react-paginate";
import {useState} from "react";

const ReactPaginate =
    (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport }).default ?? ReactPaginateImport;

function App() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const {data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['movies', query, page],
        queryFn: () => getMovies(query, page),
        enabled: query !== '',
        placeholderData: keepPreviousData,
    });

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;


    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch}/>
            {totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={({selected}) => setPage(selected + 1)}
                    forcePage={page - 1}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    nextLabel="→"
                    previousLabel="←"
                />
            )}
            {isLoading && <Loader/>}
            {isError && <ErrorMessage/>}
            {isSuccess && movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleMovieClick}/>
            )}
            {isSuccess && movies.length === 0 && (
                <ErrorMessage message="No movies found for your request."/>
            )}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>
            )}
        </div>
    )
}

export default App

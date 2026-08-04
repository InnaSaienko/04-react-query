import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieModal.module.css';
import type {Movie} from "../../types/movie.ts";

const imageModalBaseUrl = 'https://image.tmdb.org/t/p/original';

export interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <img
                    src={`${imageModalBaseUrl}${movie.backdrop_path}`}
                    alt={movie.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MovieModal;
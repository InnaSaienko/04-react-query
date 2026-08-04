import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSubmit}) => {
    function search (formData: FormData) {
        const query = formData.get('query') as string;
        if (!query.trim()) {
            toast.error('Please enter your search query.');
            return;
        }
        onSubmit(query);
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={search}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button type="submit" className={styles.button}>Search</button>
                </form>
            </div>
        </header>
    );
};

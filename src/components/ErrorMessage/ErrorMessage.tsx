import React from 'react';
import css from './ErrorMessage.module.css';

export interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className={css.text}>{message || 'There was an error, please try again...'}</p>
  );
};

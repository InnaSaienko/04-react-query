import css from "./VoteOptions.module.css";
import type {VoteType} from "../../types/votes.ts";
import type {ReactElement} from "react";
import clsx from 'clsx';

interface VoteOptionsProps {
    onVote: (vote: VoteType) => void;
    onReset: () => void;
    canReset?: boolean;
}

const VoteOptions = ({onVote, onReset, canReset = true}: VoteOptionsProps): ReactElement => {
    const options: VoteType[] = ["good", "neutral", "bad"];

    return (
        <div className={css.container}>
            {options.map(option => (
                <button
                    key={option}
                    className={css.button}
                    onClick={() => onVote(option)}
                >
                    {option}
                </button>
            ))}
            {canReset && <button className={clsx(css.button, css.reset)} onClick={onReset}>Reset</button>}
        </div>
    )
}

export default VoteOptions;
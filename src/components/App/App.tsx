import css from './App.module.css'
import {useState} from "react";
import type {Votes, VoteType} from "../../types/votes.ts";
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import VoteOptions from "../VoteOptions/VoteOptions.tsx";
import VoteStats from "../VoteStats/VoteStats.tsx";
import Notification from "../Notification/Notification.tsx";

const DEFAULT_VOTES = {
    good: 0,
    neutral: 0,
    bad: 0,
}


function App() {
    const [votes, setVotes] = useState<Votes>(DEFAULT_VOTES)
    const totalVotes = votes.good + votes.neutral + votes.bad;
    const positiveRate = totalVotes
        ? Math.round((votes.good / totalVotes) * 100)
        : 0;
    const canReset = totalVotes > 0;

    const handleVote = (vote: VoteType) => {
        setVotes(prev => ({
            ...prev,
            [vote]: prev[vote] + 1,
        }));
    };

    return (
        <div className={css.app}>
            <CafeInfo/>
            <VoteOptions onVote={handleVote} onReset={() => setVotes(DEFAULT_VOTES)} canReset={canReset} />
            {canReset ? (
                <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>
            ) : (
                <Notification />
            )}
        </div>
    )
}

export default App

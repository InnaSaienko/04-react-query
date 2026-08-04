import { render, screen } from '@testing-library/react'
import { describe, expect, it } from "vitest";
import '@testing-library/jest-dom/vitest';
import VoteStats from './VoteStats'

describe('VoteStats', () => {
  it('renders all vote statistics', () => {
    const mockProps = {
      votes: {
        good: 5,
        neutral: 2,
        bad: 1,
      },
      totalVotes: 8,
      positiveRate: 62,
    }

    render(<VoteStats {...mockProps} />)

    expect(screen.getByText((content) => content.startsWith('Good:'))).toHaveTextContent('5')
    expect(screen.getByText((content) => content.startsWith('Neutral:'))).toHaveTextContent('2')
    expect(screen.getByText((content) => content.startsWith('Bad:'))).toHaveTextContent('1')
    expect(screen.getByText((content) => content.startsWith('Total:'))).toHaveTextContent('8')
    expect(screen.getByText((content) => content.startsWith('Positive:'))).toHaveTextContent('62%')
  })

  it('renders zero values correctly', () => {
    const mockProps = {
      votes: {
        good: 0,
        neutral: 0,
        bad: 0,
      },
      totalVotes: 0,
      positiveRate: 0,
    }

    render(<VoteStats {...mockProps} />)

    expect(screen.getByText((content) => content.startsWith('Good:'))).toHaveTextContent('0')
    expect(screen.getByText((content) => content.startsWith('Neutral:'))).toHaveTextContent('0')
    expect(screen.getByText((content) => content.startsWith('Bad:'))).toHaveTextContent('0')
    expect(screen.getByText((content) => content.startsWith('Total:'))).toHaveTextContent('0')
    expect(screen.getByText((content) => content.startsWith('Positive:'))).toHaveTextContent('0%')
  })

  it('displays positive rate as percentage', () => {
    const mockProps = {
      votes: {
        good: 3,
        neutral: 1,
        bad: 1,
      },
      totalVotes: 5,
      positiveRate: 60,
    }

    render(<VoteStats {...mockProps} />)
    expect(screen.getByText((content) => content.startsWith('Positive:'))).toHaveTextContent('60%')
  })
})
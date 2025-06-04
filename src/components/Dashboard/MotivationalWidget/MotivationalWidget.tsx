'use client';

import { useQuery } from '@tanstack/react-query';
import classes from './MotivationalWidsget.module.scss';

const { motivationalWidgetContainer, quoteSection, quoteText, authorText, scrollBackground, errorState } = classes;

type Quote = {
    content: string;
    author: string;
    _id: string;
};

const fetchDailyQuote = async (): Promise<Quote> => {
    // TODO - Fix the errrors of the API
    // Temporarily commented out to avoid Bitdefender issues
    // const response = await fetch('https://api.quotable.io/random?tags=motivational|inspirational|success|wisdom');
    // if (!response.ok) {
    //     throw new Error('Failed to fetch quote');
    // }
    // return response.json();
    
    // Force error state for now
    throw new Error('API temporarily disabled');
};

const MotivationalWidget = () => {
    const today = new Date().toDateString();
    
    const { data: quote, isLoading, error } = useQuery({
        queryKey: ['dailyQuote', today],
        queryFn: fetchDailyQuote,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        gcTime: 24 * 60 * 60 * 1000, // 24 hours (formerly cacheTime)
    });

    if (isLoading) {
        return (
            <div className={motivationalWidgetContainer}>
                <section className={scrollBackground}>
                    <h6>Daily Motivation Quote</h6>
                    <section className={quoteSection}>
                        <p>Loading your daily inspiration...</p>
                    </section>
                </section>
            </div>
        );
    };

    if (error) {
        return (
            <div className={motivationalWidgetContainer}>
                <section className={scrollBackground}>
                    <h6>Daily Motivation Quote</h6>
                    <section className={`${quoteSection} ${errorState}`}>
                        <p>✨ Magic is temporarily unavailable ✨</p>
                        <p><em>Please try again later</em></p>
                    </section>
                </section>
            </div>
        );
    };

    return (
        <div className={motivationalWidgetContainer}>
            <section className={scrollBackground}>
                <h6>Daily Motivation Quote</h6>
                <section className={quoteSection}>
                    <blockquote className={quoteText}>
                        "{quote?.content}"
                    </blockquote>
                    <cite className={authorText}>
                        — {quote?.author}
                    </cite>
                </section>
            </section>
        </div>
    );
};

export default MotivationalWidget;
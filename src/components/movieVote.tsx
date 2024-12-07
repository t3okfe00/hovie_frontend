import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp } from 'lucide-react';
import { SuggestMovieDialog } from './suggestMovieDialog';

interface MovieVoteItem {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    votes: number;
    hasVoted?: boolean;
}

const movieVotes: MovieVoteItem[] = [
    {
        id: '1',
        title: 'Chinatown',
        imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200',
        description: 'Classic noir film about corruption in 1930s Los Angeles',
        votes: 15
    },
    {
        id: '2',
        title: 'The Big Sleep',
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
        description: 'Humphrey Bogart stars as private detective Philip Marlowe',
        votes: 12
    }
];

export function MovieVote() {
    const [votes, setVotes] = useState(movieVotes);
    const totalVotes = votes.reduce((acc, movie) => acc + movie.votes, 0);

    const handleVote = (movieId: string) => {
        setVotes(votes.map(movie =>
            movie.id === movieId
                ? { ...movie, votes: movie.votes + 1, hasVoted: true }
                : movie
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Current Vote: Weekend Movie</h3>
                <SuggestMovieDialog />
            </div>

            <div className="space-y-4">
                {votes.map(movie => (
                    <Card key={movie.id} className="p-4">
                        <div className="flex gap-4">
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-24 h-24 rounded object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold">{movie.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{movie.description}</p>
                                <div className="space-y-2">
                                    <Progress value={(movie.votes / totalVotes) * 100} />
                                    <div className="flex items-center justify-between text-sm">
                                        <span>{movie.votes} votes</span>
                                        <span>{Math.round((movie.votes / totalVotes) * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant={movie.hasVoted ? "secondary" : "default"}
                                disabled={movie.hasVoted}
                                onClick={() => handleVote(movie.id)}
                                className="self-center"
                            >
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                Vote
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
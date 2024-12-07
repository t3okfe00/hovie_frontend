import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { MovieSuggestionButton } from './movieSuggestionButton';
import { useAuth } from "@/hooks/useAuth";

interface Movie {
    poster_path: string;
    id: number;
    title: string;
}

interface Message {
    id: string;
    user: {
        name: string;
        avatar: string;
        role: 'owner' | 'moderator' | 'member';
    };
    content: string;
    timestamp: Date;
    type: 'text' | 'movie';
    movieData?: {
        title: string;
        imageUrl: string;
        year: string;
        genres: string[];
        review: string;
    };
}

interface GroupChatProps {
    readonly groupId: number
}

export function GroupChat({ groupId }: GroupChatProps) {
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const { user } = useAuth();
    const userId = user?.id ?? 0;
    const queryClient = useQueryClient();

    const { data: fetchedMessages, isLoading, isError, error } = useQuery<Message[]>({
        queryKey: ['groupContent', groupId, userId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/groups/${groupId}/contents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) throw new Error('Failed to fetch content');
            const data = await response.json();
            const messages = Array.isArray(data) ? data : [data];

            const movieDetailsPromises = messages.map(async (item) => {
                const role = item.userRole as 'owner' | 'moderator' | 'member';
                if (item.content.movieId !== -1) {
                    const movieResponse = await fetch(`http://localhost:3000/movie/${item.content.movieId}`);
                    if (!movieResponse.ok) throw new Error('Failed to fetch movie details');
                    const movieData = await movieResponse.json();
                    return {
                        id: item.content.id.toString(),
                        user: {
                            name: item.userName,
                            avatar: '',
                            role
                        },
                        content: item.content.message,
                        timestamp: new Date(item.content.timestamp),
                        type: 'movie' as const,
                        movieData: {
                            title: movieData.title,
                            imageUrl: item.content.message,
                            year: new Date(movieData.release_date).getFullYear().toString(),
                            genres: movieData.genres.map((genre: { name: string }) => genre.name),
                            review: `${movieData.vote_average}/10`
                        }
                    };
                } else {
                    return {
                        id: item.content.id.toString(),
                        user: {
                            name: item.userName,
                            avatar: '',
                            role
                        },
                        content: item.content.message,
                        timestamp: new Date(item.content.timestamp),
                        type: 'text' as const
                    };
                }
            });

            return Promise.all(movieDetailsPromises);
        },
        staleTime: 0,
    });

    useEffect(() => {
        if (fetchedMessages) {
            setChatMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    const addContentMutation = useMutation({
        mutationFn: async (contentData: { userId: number; message: string; movieId: string }) => {
            const response = await fetch(`http://localhost:3000/groups/${groupId}/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    content: contentData.movieId,
                    message: contentData.message
                })
            });
            if (!response.ok) throw new Error('Failed to add content');
            return response.json();
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['groupContent', groupId, userId] });
            setNewMessage('');
        },
    });

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        addContentMutation.mutate({ userId, message: newMessage, movieId: '-1' });
    };

    const handleMovieSelect = (movie: Movie) => {
        addContentMutation.mutate({
            userId,
            message: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            movieId: movie.id.toString()
        });
    };

    if (isLoading) {
        return <p>Loading messages...</p>;
    }

    if (isError) {
        console.error(error);
        return <p>Failed to load messages. Please try again later.</p>;
    }

    return (
        <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 h-[calc(600px-80px)] overflow-y-auto">
                <div className="space-y-4 p-4">
                    {chatMessages?.map((message) => (
                        <div key={message.id} className="flex items-start gap-3">
                            <Avatar>
                                <AvatarImage src={message.user.avatar} />
                                <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{message.user.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {message.timestamp.toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: false,
                                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                                        })}
                                    </span>
                                </div>

                                {message.type === 'text' ? (
                                    <p className="mt-1 text-sm">{message.content}</p>
                                ) : (
                                    <div className="mt-2 rounded-lg border p-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={message.movieData?.imageUrl}
                                                alt={message.movieData?.title}
                                                className="w-16 h-24 rounded object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium">{message.movieData?.title}</h4>
                                                <p className="text-sm text-muted-foreground">Year: {message.movieData?.year}</p>
                                                <p className="text-sm text-muted-foreground">Genres: {message.movieData?.genres.join(', ')}</p>
                                                <p className="text-sm text-muted-foreground">Review: {message.movieData?.review}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="mt-4 flex gap-2 p-4 border-t bg-background">
                <MovieSuggestionButton onMovieSelect={handleMovieSelect} />
                <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button className="bg-orange-500" onClick={handleSendMessage}>
                    <Send className="h-4 w-4 text-primary-foreground" />
                </Button>
            </div>
        </div>
    );
}
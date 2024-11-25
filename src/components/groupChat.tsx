import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { MovieSuggestionButton } from './movieSuggestionButton';

interface Movie {
    id: string;
    title: string;
    year: string;
    poster: string;
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
    };
}

const messages: Message[] = [
    {
        id: '1',
        user: {
            name: 'Alice Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            role: 'owner'
        },
        content: 'Has anyone seen "The Maltese Falcon"?',
        timestamp: new Date('2024-01-15T14:30:00'),
        type: 'text'
    },
    {
        id: '2',
        user: {
            name: 'Bob Smith',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
            role: 'member'
        },
        content: "Let's watch this together!",
        timestamp: new Date('2024-01-15T14:32:00'),
        type: 'movie',
        movieData: {
            title: 'Double Indemnity',
            imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200'
        }
    },
    // Adding more messages to demonstrate scrolling
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 3}`,
        user: {
            name: 'Test User',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
            role: 'member'
        },
        content: `Test message ${i + 1} for scroll demonstration`,
        timestamp: new Date(2024, 0, 15, 14, 32 + i),
        type: 'text' as const
    }))
];

export function GroupChat() {
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(messages);

    const handleMovieSelect = (movie: Movie) => {
        const newMovieMessage: Message = {
            id: Date.now().toString(),
            user: {
                name: 'You',
                avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
                role: 'member'
            },
            content: "Check out this movie!",
            timestamp: new Date(),
            type: 'movie',
            movieData: {
                title: movie.title,
                imageUrl: movie.poster
            }
        };
        setChatMessages([...chatMessages, newMovieMessage]);
    };

    return (
        <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 h-[calc(600px-80px)] overflow-y-auto">
                <div className="space-y-4 p-4">
                    {chatMessages.map((message) => (
                        <div key={message.id} className="flex items-start gap-3">
                            <Avatar>
                                <AvatarImage src={message.user.avatar} />
                                <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{message.user.name}</span>
                                    <span className="text-xs text-muted-foreground">
                    {format(message.timestamp, 'MMM d, h:mm a')}
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
                                                className="w-16 h-16 rounded object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium">{message.movieData?.title}</h4>
                                                <p className="text-sm text-muted-foreground">{message.content}</p>
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
                <Button>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
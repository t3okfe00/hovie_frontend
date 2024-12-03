import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { MovieSuggestionButton } from './movieSuggestionButton';
import { useAuth } from "@/hooks/useAuth";

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

interface GroupChatProps {
    groupId: number;
}

export function GroupChat({ groupId }: GroupChatProps) {
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const { user } = useAuth();
    const userId = user?.id ?? 0; // Provide a default value for userId
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
            return messages.map((item: { content: { id: number; timestamp: string; message: string; movieId: number }; userName: string }) => ({
                id: item.content.id.toString(),
                user: {
                    name: item.userName, // Use userName from the response
                    avatar: 'https://via.placeholder.com/150', // Mock user avatar
                    role: 'member' // Mock user role
                },
                content: item.content.message,
                timestamp: new Date(item.content.timestamp),
                type: item.content.movieId === -1 ? 'text' : 'movie',
                movieData: item.content.movieId !== -1 ? { title: 'Mock Movie Title', imageUrl: 'https://via.placeholder.com/150' } : undefined // Mock movie data
            }));
        },
        staleTime: 0, // Cache for 10 minutes
    });

    useEffect(() => {
        if (fetchedMessages) {
            setChatMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    const addContentMutation = useMutation({
        mutationFn: async (contentData: { userId: number; message: string }) => {
            const response = await fetch(`http://localhost:3000/groups/${groupId}/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    content: -1,
                    message: contentData.message
                })
            });
            if (!response.ok) throw new Error('Failed to add content');
            return response.json();
        },
        onSettled: () => {
            queryClient.invalidateQueries(['groupContent', groupId, userId]);
            setNewMessage('');
        },
    });

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        addContentMutation.mutate({ userId, message: newMessage });
    };

    const handleMovieSelect = (movie: Movie) => {
        const newMovieMessage: Message = {
            id: Date.now().toString(),
            user: {
                name: 'You',
                avatar: 'https://via.placeholder.com/150',
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
        setChatMessages((prevMessages: Message[]) => [...prevMessages, newMovieMessage]);
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
                <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
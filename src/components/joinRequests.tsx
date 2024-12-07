import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, UserPlus } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';

interface JoinRequest {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    status: string;
    timestamp: string;
}

const BASE_URL = 'http://localhost:3000';

export function JoinRequestsDialog() {
    const { id } = useParams<{ id: string }>();
    const [requests, setRequests] = useState<JoinRequest[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    const fetchJoinRequests = async () => {
        try {
            const userId = user?.id;
            const response = await fetch(`${BASE_URL}/groups/${id}/joinrequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) throw new Error('Failed to fetch join requests');
            const data: JoinRequest[] = await response.json();

            const detailedRequests = data
                .filter((request: JoinRequest) => request.status === 'pending')
                .map((request: JoinRequest) => ({
                    id: request.id,
                    user: {
                        id: request.user.id,
                        name: request.user.name,
                        avatar: 'https://via.placeholder.com/100',
                    },
                    status: request.status,
                    timestamp: new Date().toLocaleTimeString(),
                }));

            setRequests(detailedRequests);
        } catch (error) {
            console.error('Error fetching join requests:', error);
        }
    };

    const handleAccept = async (requestId: string, userId: string) => {
        const requestBody = { userId, ownerId: user?.id };
        try {
            const response = await fetch(`${BASE_URL}/groups/${id}/addmembers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) throw new Error('Failed to accept join request');
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting join request:', error);
        }
    };

    const handleDecline = async (requestId: string, userId: string) => {
        const requestBody = { userId, ownerId: user?.id };
        try {
            const response = await fetch(`${BASE_URL}/groups/${id}/declineJoinRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) throw new Error('Failed to decline join request');
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error('Error declining join request:', error);
        }
    };

    useEffect(() => {
        fetchJoinRequests();
    }, [id]);

    if (requests.length === 0) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Requests
                    <Badge variant="secondary" className="ml-2">
                        {requests.length}
                    </Badge>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Join Requests</DialogTitle>
                    <DialogDescription>
                        Review and manage pending requests to join the group
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] overflow-y-auto mt-4">
                    <div className="space-y-4 pr-4">
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <div key={request.id} className="flex items-start gap-3 pb-4 border-b last:border-0 p-2">
                                    {request.user && (
                                        <>
                                            <Avatar>
                                                <AvatarImage src={request.user.avatar} />
                                                <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{request.user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{request.timestamp}</span>
                                                </div>
                                                <div className="flex gap-2 mt-3">
                                                    <Button size="sm" className="w-full" onClick={() => handleAccept(request.id, request.user.id)}>
                                                        <Check className="w-4 h-4 mr-1" /> Accept
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleDecline(request.id, request.user.id)}>
                                                        <X className="w-4 h-4 mr-1" /> Decline
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No join requests available.</p>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
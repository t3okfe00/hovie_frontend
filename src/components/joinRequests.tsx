import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, UserPlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface JoinRequest {
    id: string;
    user: {
        name: string;
        avatar: string;
        message: string;
    };
    timestamp: string;
}

const requests: JoinRequest[] = [
    {
        id: '1',
        user: {
            name: 'David Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            message: 'Big fan of film noir, would love to join discussions!'
        },
        timestamp: '2h ago'
    },
    {
        id: '2',
        user: {
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
            message: 'Looking to explore classic cinema with like-minded people.'
        },
        timestamp: '5h ago'
    },
    // Adding more requests to demonstrate scrolling
    ...Array.from({ length: 5 }, (_, i) => ({
        id: `${i + 3}`,
        user: {
            name: `Test User ${i + 1}`,
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
            message: 'Would love to join this group!'
        },
        timestamp: `${i + 3}h ago`
    }))
];

export function JoinRequestsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
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
                        {requests.map((request) => (
                            <div key={request.id} className="flex items-start gap-3 pb-4 border-b last:border-0 p-2">
                                <Avatar>
                                    <AvatarImage src={request.user.avatar} />
                                    <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{request.user.name}</span>
                                        <span className="text-xs text-muted-foreground">{request.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{request.user.message}</p>
                                    <div className="flex gap-2 mt-3">
                                        <Button size="sm" className="w-full">
                                            <Check className="w-4 h-4 mr-1" /> Accept
                                        </Button>
                                        <Button size="sm" variant="outline" className="w-full">
                                            <X className="w-4 h-4 mr-1" /> Decline
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
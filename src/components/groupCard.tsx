import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from "@/hooks/useAuth";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

interface GroupCardProps {
    id: number;
    name: string;
    members: number;
    description: string;
    category: string;
    pictureUrl: string;
    ownersId: number;
    imageUrl: string;
    userId: number | undefined;
}

const BASE_URL = 'http://localhost:3000';

export function GroupCard({ id, name, members = 0, description, category, pictureUrl, ownersId }: Readonly<GroupCardProps>) {
    const { user } = useAuth();
    const isOwner = ownersId === user?.id;
    useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const handleJoinGroup = async () => {
        try {
            const userId = user?.id;
            const response = await fetch(`${BASE_URL}/groups/${id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) throw new Error('You have already requested to join this group');
            setModalTitle('Request Sent');
            setModalMessage(`Your request to join ${name} has been sent.`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setModalTitle('Error');
                setModalMessage(error.message);
            } else {
                setModalTitle('Error');
                setModalMessage('An unknown error occurred.');
            }
        } finally {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 flex flex-col justify-between">
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={`${BASE_URL}${pictureUrl}`}
                        alt={name}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge className="absolute top-3 right-3" variant="secondary">
                        {category}
                    </Badge>
                </div>
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{members.toLocaleString()} members</span>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                    <CardDescription className="line-clamp-2 mb-4">{description}</CardDescription>
                    {user && (
                        isOwner ? (
                            <Button className="w-full mt-auto" variant="secondary">
                                View Group
                            </Button>
                        ) : (
                            <Button className="w-full mt-auto" variant="secondary" onClick={handleJoinGroup}>
                                Request to Join
                            </Button>
                        )
                    )}
                </CardContent>
            </Card>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{modalTitle}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{modalMessage}</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="w-full mt-auto" variant="secondary" onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
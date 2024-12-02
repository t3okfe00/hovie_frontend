import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface YourGroupCardProps {
    id: number;
    name: string;
    members: number;
    description: string;
    category: string;
    pictureUrl: string;
    isOwner: boolean;
}

interface Member {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'moderator' | 'member';
    joinDate: string;
}

const userId = 17; // Replace with actual user ID
const BASE_URL = 'http://localhost:3000'; // Base URL

export function YourGroupCard({ id, name, members, description, category, pictureUrl, isOwner }: YourGroupCardProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const deleteGroupMutation = useMutation({
        mutationFn: async (groupId: number) => {
            const response = await fetch(`${BASE_URL}/groups/${groupId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete group');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['yourGroups', userId] });
        },
    });

    const removeMemberMutation = useMutation({
        mutationFn: async (memberId: number) => {
            const response = await fetch(`${BASE_URL}/groups/${id}/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ownerId: isOwner ? userId : null })
            });
            if (!response.ok) throw new Error('Failed to remove member');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members', id] });
            toast({
                title: "Member Removed",
                description: `Member has been removed from ${name}.`,
                duration: 3000,
            });
        },
    });

    const handleDelete = () => {
        deleteGroupMutation.mutate(id);
    };

    const handleViewGroup = () => {
        navigate(`/groupPage/${id}`);
    };

    const handleLeaveGroup = () => {
        removeMemberMutation.mutate(userId);
    };

    const handleRemoveMember = (memberId: number) => {
        removeMemberMutation.mutate(memberId);
    };

    const { data: membersData, isLoading, isError } = useQuery<Member[]>({
        queryKey: ['members', id],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/groups/${id}/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) throw new Error('Failed to fetch members');
            const data = await response.json();
            return data
                .filter((member: { role: string }) => member.role !== 'owner')
                .map((member: { usersId: number; userName: string; role: string }) => ({
                    id: member.usersId.toString(),
                    name: member.userName,
                    avatar: '', // Replace with actual avatar URL if available
                    role: member.role as 'moderator' | 'member',
                    joinDate: 'Jan 2024' // Replace with actual join date if available
                }));
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 flex flex-col justify-between">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={`${BASE_URL}${pictureUrl}`}
                    alt={name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge
                    className={`absolute top-3 right-3 ${isOwner ? 'bg-orange-500' : ''}`} variant="secondary"
                >
                    {isOwner ? "Owner" : "Member"}
                </Badge>
            </div>
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    {isOwner ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Group</DropdownMenuItem>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            Manage Members
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Manage Members</DialogTitle>
                                            <DialogDescription>
                                                Review and manage group members
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="max-h-[400px] overflow-y-auto">
                                            {isLoading ? (
                                                <p>Loading members...</p>
                                            ) : isError ? (
                                                <p>Failed to load members. Please try again later.</p>
                                            ) : (
                                                <ScrollArea className="h-[400px] overflow-y-auto">
                                                    <div className="space-y-4 pr-4">
                                                        {membersData?.map((member) => (
                                                            member && member.name ? (
                                                                <div key={member.id} className="flex items-center justify-between py-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Avatar>
                                                                            <AvatarImage src={member.avatar} />
                                                                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <p className="text-sm font-medium">{member.name}</p>
                                                                            <p className="text-xs text-muted-foreground">Joined {member.joinDate}</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="outline" size="sm" onClick={() => handleRemoveMember(Number(member.id))}>Remove</Button>
                                                                </div>
                                                            ) : null
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                                    Delete Group
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Leave Group</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to leave {name}? You'll need to request to join again if you change your mind.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLeaveGroup}>Leave Group</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{members.toLocaleString()} members</span>
                    <span>•</span>
                    <span>{category}</span>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
                <CardDescription className="line-clamp-2 mb-4">{description}</CardDescription>
                <Button className="w-full mt-auto" variant="secondary" onClick={handleViewGroup}>
                    View Group
                </Button>
            </CardContent>
        </Card>
    );
}
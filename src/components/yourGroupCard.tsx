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
    DialogFooter,
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
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface YourGroupCardProps {
    id: number;
    name: string;
    members: number;
    description: string;
    category: string;
    pictureUrl: string;
    isOwner: boolean;
}

const userId = 9; // Replace with actual user ID
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
            queryClient.invalidateQueries({ queryKey: ['yourGroups', userId] }).then(() => {
                // Optional: Add any additional logic here if needed
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
        toast({
            title: "Left Group",
            description: `You have successfully left ${name}.`,
            duration: 3000,
        });
    };

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
                                            {/* Example member list */}
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className="flex items-center justify-between py-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-secondary" />
                                                        <div>
                                                            <p className="text-sm font-medium">Member {i + 1}</p>
                                                            <p className="text-xs text-muted-foreground">Joined Jan 2024</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">Remove</Button>
                                                </div>
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <Button type="button">Save Changes</Button>
                                        </DialogFooter>
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
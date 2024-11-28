import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

    const handleDelete = () => {
        deleteGroupMutation.mutate(id);
    };

    const handleViewGroup = () => {
        navigate(`/groupPage/${id}`);
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 flex flex-col justify-between">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={`${BASE_URL}${pictureUrl}`}
                    alt={name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
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
                    {isOwner && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Group</DropdownMenuItem>
                                <DropdownMenuItem>Manage Members</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                                    Delete Group
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
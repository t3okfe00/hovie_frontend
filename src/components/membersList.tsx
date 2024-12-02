import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from "@/hooks/useAuth";

interface Member {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'moderator' | 'member';
    joinDate: string;
}

const roleColors = {
    owner: 'bg-primary text-primary-foreground',
    moderator: 'bg-blue-500 text-white',
    member: 'bg-secondary text-secondary-foreground'
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function MembersList() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const userId = user?.id;

    const { data: members, isLoading, isError } = useQuery<Member[]>({
        queryKey: ['members', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/groups/${id}/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) throw new Error('Failed to fetch members');
            const data = await response.json();
            // Transform the data to match the expected structure
            return data.map((member: { usersId: number; userName: string; role: string }) => ({
                id: member.usersId.toString(),
                name: member.userName, // Use the actual user name
                avatar: '', // Replace with actual avatar URL if available
                role: member.role as 'owner' | 'moderator' | 'member',
                joinDate: 'Jan 2024' // Replace with actual join date if available
            }));
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    if (isLoading) return <p>Loading members...</p>;
    if (isError) return <p>Failed to load members. Please try again later.</p>;

    return (
        <ScrollArea className="h-[600px] overflow-y-auto">
            <div className="space-y-4 pr-4">
                {members?.map((member) => (
                    member && member.name ? (
                        <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                            <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{member.name}</span>
                                    <Badge variant="secondary" className={roleColors[member.role]}>
                                        {capitalizeFirstLetter(member.role)}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </ScrollArea>
    );
}
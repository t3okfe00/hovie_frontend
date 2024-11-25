import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Member {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'moderator' | 'member';
    joinDate: string;
}

const members: Member[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        role: 'owner',
        joinDate: 'Jan 2024'
    },
    {
        id: '2',
        name: 'Bob Smith',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
        role: 'moderator',
        joinDate: 'Jan 2024'
    },
    {
        id: '3',
        name: 'Carol Williams',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        role: 'member',
        joinDate: 'Jan 2024'
    },
    // Adding more members to demonstrate scrolling
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 4}`,
        name: `Test Member ${i + 1}`,
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
        role: 'member' as const,
        joinDate: 'Jan 2024'
    }))
];

const roleColors = {
    owner: 'bg-primary text-primary-foreground',
    moderator: 'bg-blue-500 text-white',
    member: 'bg-secondary text-secondary-foreground'
};

export function MembersList() {
    return (
        <ScrollArea className="h-[600px] overflow-y-auto">
            <div className="space-y-4 pr-4">
                {members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{member.name}</span>
                                <Badge variant="secondary" className={roleColors[member.role]}>
                                    {member.role}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
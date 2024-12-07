import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { GroupChat } from '@/components/groupChat';
import { MembersList } from '@/components/membersList';
import { JoinRequestsDialog } from '@/components/joinRequests';
import { MovieVote } from '@/components/movieVote';

const BASE_URL = 'http://localhost:3000/groups';

interface GroupPageProps {
    isOwner?: boolean;
}

interface Group {
    id: number;
    name: string;
    description: string;
    category: string;
    members: number;
    pictureUrl: string;
}

export function GroupPage({ isOwner = true }: Readonly<GroupPageProps>) {
    const { id } = useParams<{ id: string }>();
    const groupId = Number(id);

    const { data: group, isLoading, isError } = useQuery<Group>({
        queryKey: ['group', groupId],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group data');
            return response.json();
        },
        staleTime: 1000 * 60 * 10,
    });

    if (isLoading) {
        return <p>Loading group data...</p>;
    }

    if (isError) {
        return <p>Failed to load group data. Please try again later.</p>;
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                            src={`http://localhost:3000${group?.pictureUrl}`}
                            alt="Group cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        {group && (
                            <div className="absolute bottom-6 left-6">
                                <h1 className="text-4xl font-bold text-white mb-2">{group.name}</h1>
                                <p className="text-white/80">{group.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <Tabs defaultValue="chat" className="w-full">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList>
                                    <TabsTrigger value="chat" className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Group Chat
                                    </TabsTrigger>
                                    <TabsTrigger value="votes" className="flex items-center gap-2">
                                        <ThumbsUp className="w-4 h-4" />
                                        Movie Votes
                                    </TabsTrigger>
                                </TabsList>
                                {isOwner && <JoinRequestsDialog />}
                            </div>

                            <TabsContent value="chat">
                                <Card className="p-6">
                                    <GroupChat groupId={groupId} />
                                </Card>
                            </TabsContent>

                            <TabsContent value="votes">
                                <Card className="p-6">
                                    <MovieVote />
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="lg:col-span-4">
                        <Card className="p-6 h-[692px]">
                            <h3 className="text-lg font-semibold mb-4">Members</h3>
                            <MembersList />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
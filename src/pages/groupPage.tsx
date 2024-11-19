import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { GroupChat } from '@/components/groupChat';
import { MembersList } from '@/components/membersList';
import { JoinRequestsDialog } from '@/components/joinRequests';
import { MovieVote } from '@/components/movieVote';

interface GroupPageProps {
    isOwner?: boolean;
}

export function GroupPage({ isOwner = true }: GroupPageProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200"
                            alt="Group cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl font-bold text-white mb-2">Film Noir Appreciation</h1>
                            <p className="text-white/80">Exploring the shadowy world of film noir and neo-noir cinema</p>
                        </div>
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
                                    <GroupChat />
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
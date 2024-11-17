import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { GroupCard } from '@/components/groupCard';
import { YourGroupCard } from '@/components/yourGroupCard';
import { CreateGroupDialog } from '@/components/createGroupDialog.tsx';
import { useState } from "react";

const yourGroups = [
    {
        name: "Film Noir Appreciation",
        members: 345,
        category: "Classics",
        description: "Exploring the shadowy world of film noir and neo-noir cinema.",
        imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isOwner: true
    },
    {
        name: "Indie Film Collective",
        members: 892,
        category: "Independent",
        description: "Supporting and discussing independent films from around the world.",
        imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isOwner: false
    },
    {
        name: "Documentary Enthusiasts",
        members: 567,
        category: "Documentary",
        description: "For those who believe truth is stranger than fiction.",
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isOwner: false
    },
    {
        name: "Indie Film Collective",
        members: 892,
        category: "Independent",
        description: "Supporting and discussing independent films from around the world.",
        imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isOwner: false
    }
];

const popularGroups = [
    {
        name: "Horror Movie Fanatics",
        members: 1234,
        category: "Horror",
        description: "A community dedicated to discussing and reviewing horror movies from all eras.",
        imageUrl: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "Sci-Fi Cinema Club",
        members: 892,
        category: "Sci-Fi",
        description: "Explore the vast universe of science fiction films with fellow enthusiasts.",
        imageUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "Classic Film Society",
        members: 567,
        category: "Classics",
        description: "Celebrating and discussing timeless cinema masterpieces.",
        imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "Classic Film Society",
        members: 567,
        category: "Classics",
        description: "Celebrating and discussing timeless cinema masterpieces.",
        imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
];

const featuredGroups = [
    {
        name: "Nolan Universe",
        members: 2547,
        category: "Director",
        description: "Dedicated to Christopher Nolan's filmography and discussing his unique storytelling style.",
        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "A24 Film Club",
        members: 1893,
        category: "Studio",
        description: "Exploring and analyzing the innovative films from A24 studio.",
        imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "International Cinema",
        members: 1456,
        category: "World",
        description: "Discovering and discussing films from around the globe.",
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        name: "International Cinema",
        members: 1456,
        category: "World",
        description: "Discovering and discussing films from around the globe.",
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
];

export function Groups() {
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                        <Input
                            placeholder="Search groups..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <CreateGroupDialog/>
                </div>

                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Your Groups</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {yourGroups.map((group) => (
                            <YourGroupCard key={group.name} {...group} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Featured Groups</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredGroups.map((group) => (
                            <GroupCard key={group.name} {...group} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Popular Groups</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {popularGroups.map((group) => (
                            <GroupCard key={group.name} {...group} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
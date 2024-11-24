import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GroupCard } from "@/components/groupCard";
import { YourGroupCard } from "@/components/yourGroupCard";
import { CreateGroupDialog } from "@/components/createGroupDialog.tsx";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000/groups";
const userId = 17; // Hardcoded user ID

interface Group {
    id: number;
    name: string;
    ownersId: number;
    description: string;
    category: string;
    members: number;
    role: string;
    profileUrl: string; // New property for group image URL
}

export function Groups() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    // Fetching Your Groups dynamically
    const {
        data: yourGroups,
        isLoading: isLoadingYourGroups,
        isError: isErrorYourGroups,
    } = useQuery<Group[]>({
        queryKey: ["yourGroups", userId],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/yourGroups`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) throw new Error("Failed to fetch your groups");
            return response.json();
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // Fetching Featured Groups dynamically
    const {
        data: featuredGroups,
        isLoading: isLoadingFeatured,
        isError: isErrorFeatured,
    } = useQuery<Group[]>({
        queryKey: ["featuredGroups", userId],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/featured`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) throw new Error("Failed to fetch featured groups");
            return response.json();
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // Fetching Popular Groups dynamically
    const {
        data: popularGroups,
        isLoading: isLoadingPopular,
        isError: isErrorPopular,
    } = useQuery<Group[]>({
        queryKey: ["popularGroups", userId],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/popular`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) throw new Error("Failed to fetch popular groups");
            return response.json();
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // Fetching Search Results dynamically
    const {
        data: searchResults,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
    } = useQuery<Group[]>({
        queryKey: ["searchResults", query],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/search?name=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to fetch search results");
            return response.json();
        },
        enabled: !!query, // Only run query if there is a search query
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.trim() === "") {
            setQuery("");
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery(search);
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search groups..."
                            value={search}
                            onChange={handleSearch}
                            className="pl-10"
                        />
                    </form>
                    <CreateGroupDialog />
                </div>

                {query ? (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
                        {isLoadingSearch ? (
                            <p>Loading search results...</p>
                        ) : isErrorSearch ? (
                            <p>Failed to load search results. Please try again later.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {searchResults?.map((group) => (
                                    <GroupCard
                                        key={group.id}
                                        {...group}
                                        members={Number(group.members)}
                                        imageUrl={group.profileUrl}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ) : (
                    <>
                        {yourGroups && yourGroups.length > 0 && (
                            <section className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold">Your Groups</h2>
                                </div>
                                {isLoadingYourGroups ? (
                                    <p>Loading your groups...</p>
                                ) : isErrorYourGroups ? (
                                    <p>Failed to load your groups. Please try again later.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {yourGroups?.map((group) => (
                                            <YourGroupCard
                                                key={group.id}
                                                {...group}
                                                members={Number(group.members)}
                                                imageUrl={group.profileUrl}
                                                isOwner={group.ownersId === userId}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">Featured Groups</h2>
                            </div>
                            {isLoadingFeatured ? (
                                <p>Loading featured groups...</p>
                            ) : isErrorFeatured ? (
                                <p>Failed to load featured groups. Please try again later.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {featuredGroups?.map((group) => (
                                        <GroupCard
                                            key={group.id}
                                            {...group}
                                            members={Number(group.members)}
                                            imageUrl={group.profileUrl}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Popular Groups</h2>
                            {isLoadingPopular ? (
                                <p>Loading popular groups...</p>
                            ) : isErrorPopular ? (
                                <p>Failed to load popular groups. Please try again later.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {popularGroups?.map((group) => (
                                        <GroupCard
                                            key={group.id}
                                            {...group}
                                            members={Number(group.members)}
                                            imageUrl={group.profileUrl}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GroupCardProps {
    name: string;
    members?: number;
    description: string;
    category: string;
    pictureUrl: string; // Updated property name
}

const BASE_URL = 'http://localhost:3000'; // Base URL

export function GroupCard({ name, members = 0, description, category, pictureUrl }: GroupCardProps) {

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 flex flex-col justify-between">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={`${BASE_URL}${pictureUrl}`}
                    alt={name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} // Placeholder image
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
                <Button className="w-full mt-auto" variant="secondary">
                    Request to Join
                </Button>
            </CardContent>
        </Card>
    );
}
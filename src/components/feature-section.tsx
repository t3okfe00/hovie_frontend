import { ListChecks, Heart, Users, Star, List, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: ListChecks,
    title: 'Buy tickets and secure your favorite movie seats',
    link: '/Showtimes'
  },
  {
    icon: Heart,
    title: 'Share your love for your favorite movies',
    link: '/movie'
  },
  {
    icon: Users,
    title: 'Create groups and add friends and family',
    link: '/Groups'
  },
  {
    icon: Star,
    title: 'Rate each movie on a five-star scale',
  },
  {
    icon: List,
    title: 'Compile and share lists of movies',
    link: '/Movies'
  },
  {
    icon: Share2,
    title: 'Share your thoughts with the community',
    link: '/Reviews'
  },
];

export function FeatureSection() {
  return (
    <div className="py-16">
      {/* bg-muted/50 */}
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-orange-500 mb-8 text-center">
          Community for movie enthusiasts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur">
              <CardContent className="p-6 flex items-start space-x-4">
                <feature.icon className="h-6 w-6 text-orange-500" />
                <p className="text-sm">{feature.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
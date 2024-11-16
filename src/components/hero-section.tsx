import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative text-center space-y-6 max-w-2xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-white">
          Get movie tickets.
          <br />
          Review movies.
          <br />
          Share with friends.
        </h2>
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
          Get Started
        </Button>
      </div>
    </div>
  );
}
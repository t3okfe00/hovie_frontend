import { Film } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-semibold">MovieHub</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6">
                <NavigationMenuItem>
                  <Link to="/movies">
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-orange-500",
                        window.location.pathname === "/movies" &&
                          "text-orange-500"
                      )}
                    >
                      Movies
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/showtimes">
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-orange-500",
                        window.location.pathname === "/showtimes" &&
                          "text-orange-500"
                      )}
                    >
                      Showtimes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/lists">
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-orange-500",
                        window.location.pathname === "/lists" &&
                          "text-orange-500"
                      )}
                    >
                      Lists
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/groups">
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-orange-500",
                        window.location.pathname === "/groups" &&
                          "text-orange-500"
                      )}
                    >
                      Groups
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

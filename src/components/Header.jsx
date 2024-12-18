import React from "react";
import { Search, CircleUser, Menu } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function Header({ toggleSidebar }) {
  return (
    <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Button 
        variant="outline" 
        size="icon" 
        className="shrink-0 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
      </Button>
    </header>
  );
} 
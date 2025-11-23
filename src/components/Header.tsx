import { useState } from "react";
import { Menu, Home, Baby, GraduationCap, Briefcase, Info, Shield, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavLink } from "./NavLink";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Kid Zone", path: "/kid-zone", icon: Baby },
    { name: "Student Zone", path: "/student-zone", icon: GraduationCap },
    { name: "Professional Zone", path: "/professional-zone", icon: Briefcase },
    { name: "About", path: "/about", icon: Info },
    { name: "Privacy", path: "/privacy", icon: Shield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/30">
      <div className="flex items-center justify-between px-4 py-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-card border-primary/30">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold glow-text">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 transition-colors"
                  activeClassName="bg-primary/20 text-primary font-semibold glow-border"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <NavLink to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-wider font-game glow-text">
            FINCONNECT
          </h1>
        </NavLink>

        <Button
          variant="outline"
          className="border-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground glow-border"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;

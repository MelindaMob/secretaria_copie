import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/Autocolant-Dark.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/50" style={{ backgroundColor: '#313467' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Secretar IA : agent répondeur IA pour restaurant" className="h-10 md:h-12 w-auto" />
            </Link>
          </div>

          {/* Boutons d'accès - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login?type=restaurant">
              <Button
                variant="outline"
                size="sm"
              >
                Espace Client
              </Button>
            </Link>
            <Link to="/login?type=commercial">
              <Button
                variant="default"
                size="sm"
              >
                Espace Commercial
              </Button>
            </Link>
          </div>

          {/* Menu Burger - Mobile */}
          <div className="sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  <Link
                    to="/login?type=restaurant"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      🏪 Espace Client
                    </Button>
                  </Link>
                  <Link
                    to="/login?type=commercial"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      size="lg"
                    >
                      💼 Espace Commercial
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/Autocolant-Dark.svg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/50" style={{ backgroundColor: '#313467' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Secretar.IA Logo" className="h-10 md:h-12 w-auto" />
          </div>

          {/* Boutons d'accès */}
          <div className="flex items-center gap-3">
            <Link to="/login?type=restaurant">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                Espace Client
              </Button>
            </Link>
            <Link to="/login?type=commercial">
              <Button
                variant="default"
                size="sm"
                className="hidden sm:flex"
              >
                 Espace Commercial
              </Button>
            </Link>
            
            {/* Version mobile */}
            <div className="flex sm:hidden gap-2">
              <Link to="/login?type=restaurant">
                <Button variant="outline" size="sm">
                  🏪
                </Button>
              </Link>
              <Link to="/login?type=commercial">
                <Button variant="default" size="sm">
                  💼
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


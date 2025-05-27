
import { MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-brand-green/30 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/mb-uploads/548484bf-d801-4ad7-a562-6b97b4471a7d.png"
              alt="Mbytes07 Logo"
              className="h-10 sm:h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-sm lg:text-base"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("processo")}
              className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-sm lg:text-base"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("agendamento")}
              className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-sm lg:text-base"
            >
              Solicitar Serviço
            </button>
            <button
              onClick={() => scrollToSection("seguranca")}
              className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-sm lg:text-base"
            >
              Segurança
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop WhatsApp Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs lg:text-sm"
              onClick={() => window.open("https://wa.me/5519991766019", "_blank")}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              (19) 99176-6019
            </Button>
            <Button
              className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs lg:text-sm"
              onClick={() => window.open("https://wa.me/5519999608356", "_blank")}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              (19) 99960-8356
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-brand-green/30">
            <nav className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("processo")}
                className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-left"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("agendamento")}
                className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-left"
              >
                Solicitar Serviço
              </button>
              <button
                onClick={() => scrollToSection("seguranca")}
                className="text-white hover:text-brand-green transition-colors duration-200 font-medium text-left"
              >
                Segurança
              </button>
              <Button
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold justify-start"
                onClick={() => {
                  window.open("https://wa.me/5519991766019", "_blank");
                  setIsMenuOpen(false);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp: (19) 99176-6019
              </Button>
              <Button
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold justify-start"
                onClick={() => {
                  window.open("https://wa.me/5519999608356", "_blank");
                  setIsMenuOpen(false);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp: (19) 99960-8356
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

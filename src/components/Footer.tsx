
import { Monitor, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white py-8 md:py-16 border-t border-brand-green/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Monitor className="h-6 w-6 md:h-8 md:w-8 text-brand-green" />
              <span className="text-xl md:text-2xl font-bold text-white font-tomorrow">Mbytes07 Informática</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              Assistência técnica remota que você pode confiar.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Contato</h3>
            <div className="space-y-3">
              <Button 
                className="bg-brand-green hover:bg-brand-green-dark text-white mb-2 w-full font-semibold text-sm md:text-base"
                onClick={() => window.open('https://wa.me/5519993714912', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp: +55 (19) 99371-4912
              </Button>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <Mail className="h-4 w-4 text-brand-green" />
                <span className="text-sm md:text-base">mbytes07informatica@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left md:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Nossos Serviços</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              <li>• Avaliação Técnica</li>
              <li>• Diagnóstico e Reparo</li>
              <li>• Formatação de Sistema</li>
              <li>• Instalação de Programas</li>
              <li>• Upgrade de Peças</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 Mbytes07 Informática. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

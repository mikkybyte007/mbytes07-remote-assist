
import { MessageCircle, Calendar, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 tech-bg text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in font-tomorrow">
            Mbytes07 Informática
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 text-green-200">
            Assistência Técnica Remota Exclusiva
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-green-300">
            Seu PC, Nossa Prioridade.
          </p>

          <div className="mb-8 sm:mb-12">
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200 px-4">
              <strong>
                Cansado de problemas com o computador e soluções complicadas?
              </strong>
              Oferecemos suporte técnico remoto, direto e transparente para
              resolver seus problemas de forma rápida e segura, no conforto da
              sua casa. Com a Mbytes07 Informática, você tem acesso a
              especialistas de verdade com apenas um clique.
            </p>
          </div>

          <div className="flex flex-col gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green-dark text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={() =>
                window.open("https://wa.me/5519999608356", "_blank")
              }
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Fale Conosco no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              onClick={() =>
                document
                  .getElementById("agendamento")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Agende seu Atendimento
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center px-4">
            <div className="p-4 sm:p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-green-500/20">
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-3 sm:mb-4 text-brand-green" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Rápido</h3>
              <p className="text-sm sm:text-base text-gray-300">Soluções em tempo real</p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-green-500/20">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-3 sm:mb-4 text-brand-green" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Seguro</h3>
              <p className="text-sm sm:text-base text-gray-300">Processo 100% transparente</p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-green-500/20 sm:col-span-2 md:col-span-1">
              <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-3 sm:mb-4 text-brand-green" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Direto</h3>
              <p className="text-sm sm:text-base text-gray-300">Contato imediato via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

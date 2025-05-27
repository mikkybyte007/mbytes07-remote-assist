
import { Shield, Award, Users, Zap, HeadphonesIcon, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CompanyPresentation = () => {
  const features = [
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Conexões criptografadas e processo 100% transparente"
    },
    {
      icon: Zap,
      title: "Atendimento Rápido",
      description: "Diagnóstico e solução em tempo real"
    },
    {
      icon: Users,
      title: "Técnicos Experientes",
      description: "Profissionais certificados e especializados"
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte Completo",
      description: "Acompanhamento até a resolução total"
    },
    {
      icon: Clock,
      title: "Disponibilidade",
      description: "Horários flexíveis e atendimento de emergência"
    },
    {
      icon: Award,
      title: "Garantia",
      description: "Satisfação garantida ou seu dinheiro de volta"
    }
  ];

  return (
    <section id="apresentacao" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-tomorrow">
            Por que escolher a MBYTES Informática?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Somos especialistas em <strong className="text-brand-green">assistência técnica remota</strong>, 
              oferecendo soluções rápidas e seguras para todos os tipos de problemas em computadores. 
              Nossa missão é resolver seu problema com <strong className="text-brand-green">transparência total</strong> 
              e <strong className="text-brand-green">preços justos</strong>.
            </p>
            
            <div className="bg-black/40 p-6 rounded-lg border border-brand-green/30 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Nossa Diferenciação:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <p className="text-gray-200">✅ <strong>Sem deslocamento:</strong> Atendimento 100% remoto</p>
                  <p className="text-gray-200">✅ <strong>Preço fixo:</strong> Você sabe quanto vai pagar antes</p>
                  <p className="text-gray-200">✅ <strong>Acompanhamento:</strong> Você vê tudo sendo feito</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-200">✅ <strong>Sem surpresas:</strong> Orçamento transparente</p>
                  <p className="text-gray-200">✅ <strong>Pagamento seguro:</strong> PIX ou cartão</p>
                  <p className="text-gray-200">✅ <strong>Garantia:</strong> 30 dias para serviços realizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-black/50 border-brand-green/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-12 w-12 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-brand-green/20 to-transparent p-6 rounded-lg border-l-4 border-brand-green">
            <h3 className="text-xl font-semibold text-white mb-3">
              🏆 Mais de 1000+ computadores já atendidos
            </h3>
            <p className="text-gray-200">
              Nossa experiência e dedicação nos tornaram referência em suporte técnico remoto. 
              Junte-se aos nossos clientes satisfeitos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyPresentation;

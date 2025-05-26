
import { Shield, Lock, Eye, Phone } from "lucide-react";

const Security = () => {
  const features = [
    {
      icon: Lock,
      title: "Plataforma Inviolável",
      description: "Utilizamos as melhores ferramentas de acesso remoto do mercado, com criptografia de ponta a ponta. Você vê tudo o que fazemos, em tempo real."
    },
    {
      icon: Shield,
      title: "Ticket de Serviço Único",
      description: "Seu ticket é a prova de um sistema projetado para ser individual e seguro. Sem duplicidade, sem confusão. Apenas o seu atendimento."
    },
    {
      icon: Eye,
      title: "Transparência Total",
      description: "Do diagnóstico ao pagamento, nosso processo é claro e direto. Sem taxas ocultas, sem jargão técnico indecifrável. Você sempre sabe pelo que está pagando."
    },
    {
      icon: Phone,
      title: "Contato Direto",
      description: "Nada de robôs ou longas esperas. Você fala diretamente com o técnico responsável pelo seu caso."
    }
  ];

  return (
    <section id="seguranca" className="py-16 sm:py-20 tech-bg text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Sua Segurança é a Nossa Arquitetura
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-tomorrow px-4">
            Na Mbytes07, confiança não é apenas uma palavra, é o código-fonte do nosso serviço.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-brand-green/20 rounded-lg flex-shrink-0 self-center sm:self-start">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-brand-green" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 font-tomorrow">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-tomorrow text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center px-4 sm:px-6 py-3 bg-brand-green/10 rounded-full">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-brand-green mr-2" />
            <span className="text-brand-green font-semibold font-tomorrow text-sm sm:text-base">
              100% Seguro e Transparente
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;

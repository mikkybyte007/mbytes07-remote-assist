
import { MessageCircle, Ticket, Calendar, CheckCircle } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Primeiro Contato e Pagamento",
      description: "Clique no botão de WhatsApp para falar diretamente conosco. Descreva seu problema e, após a confirmação, realize o pagamento do serviço via Pix ou outro método combinado."
    },
    {
      icon: Ticket,
      title: "Receba seu Ticket Seguro",
      description: "Após o pagamento, você receberá um Ticket de Serviço Único e Intransferível. Este código é a sua chave de acesso e a garantia de que seu atendimento é exclusivo e seguro."
    },
    {
      icon: Calendar,
      title: "Agendamento e Sessão Remota",
      description: "Com o ticket em mãos, você pode agendar o melhor horário para o atendimento. No horário marcado, iniciaremos a sessão de suporte remoto utilizando uma plataforma segura, onde você acompanha todo o processo em tempo real."
    },
    {
      icon: CheckCircle,
      title: "Problema Resolvido!",
      description: "Nós trabalhamos na solução até que tudo esteja funcionando perfeitamente. Sua satisfação é nossa garantia."
    }
  ];

  return (
    <section id="processo" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Nosso Processo: Simples, Seguro e Transparente
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-tomorrow px-4">
            Criamos um fluxo de atendimento pensado na sua segurança e comodidade.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row items-start mb-8 sm:mb-12 last:mb-0 px-4">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 self-center sm:self-start">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-brand-green rounded-full text-white font-bold text-lg sm:text-xl font-tomorrow">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start mb-3">
                    <IconComponent className="h-6 w-6 text-brand-green mb-2 sm:mb-0 sm:mr-3" />
                    <h3 className="text-xl sm:text-2xl font-semibold text-white font-tomorrow">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-base sm:text-lg font-tomorrow">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:flex flex-shrink-0 ml-6">
                    <div className="w-px h-16 bg-white/20"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;

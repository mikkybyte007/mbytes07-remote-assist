
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CalendlyScheduling = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/mbytes07informatica/30min", "_blank");
  };

  return (
    <section id="agendamento-calendly" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Agende Seu Atendimento
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Escolha o melhor horário para ser atendido. Nosso sistema de agendamento é rápido e fácil.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-brand-green/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-brand-green" />
              </div>
              <CardTitle className="text-white text-xl">Agendamento Online</CardTitle>
              <CardDescription className="text-gray-300">
                Sistema integrado com Calendly em português
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-200">
                <Clock className="h-5 w-5 text-brand-green" />
                <span>Sessões de 30 minutos</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <User className="h-5 w-5 text-brand-green" />
                <span>Atendimento personalizado</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <Calendar className="h-5 w-5 text-brand-green" />
                <span>Horários flexíveis</span>
              </div>
              
              <Button
                onClick={openCalendly}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 mt-6"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Atendimento
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="bg-black/30 p-6 rounded-lg border border-brand-green/20">
              <h3 className="text-lg font-semibold text-white mb-3">Como funciona:</h3>
              <ol className="space-y-2 text-gray-200 text-sm">
                <li>1. Clique em "Agendar Atendimento"</li>
                <li>2. Escolha data e horário disponível</li>
                <li>3. Preencha suas informações</li>
                <li>4. Receba confirmação por e-mail</li>
                <li>5. No horário marcado, receba nosso contato</li>
              </ol>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-brand-green/20">
              <h3 className="text-lg font-semibold text-white mb-3">Horários de Atendimento:</h3>
              <div className="text-gray-200 text-sm space-y-1">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 12h</p>
                <p>Domingo: Plantão (emergências)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlyScheduling;

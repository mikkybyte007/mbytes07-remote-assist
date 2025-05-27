
import { Monitor, Shield, Download, Cog, HardDrive, Wrench, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Diagnóstico Completo",
      description: "Análise detalhada do seu computador para identificar todos os problemas",
      details: [
        "Verificação de hardware e software",
        "Teste de performance e velocidade",
        "Identificação de vírus e malwares",
        "Relatório completo dos problemas encontrados"
      ],
      price: "A partir de R$ 30,00"
    },
    {
      icon: Shield,
      title: "Remoção de Vírus",
      description: "Limpeza completa de vírus, malwares e programas indesejados",
      details: [
        "Scan completo do sistema",
        "Remoção de vírus e trojans",
        "Limpeza de adwares e spywares",
        "Instalação de antivírus gratuito"
      ],
      price: "A partir de R$ 50,00"
    },
    {
      icon: Download,
      title: "Instalação de Programas",
      description: "Instalação e configuração de softwares essenciais",
      details: [
        "Pacote Office completo",
        "Navegadores atualizados",
        "Drivers e atualizações",
        "Programas personalizados"
      ],
      price: "A partir de R$ 40,00"
    },
    {
      icon: HardDrive,
      title: "Formatação e Backup",
      description: "Formatação completa com backup dos seus arquivos importantes",
      details: [
        "Backup completo dos documentos",
        "Formatação e instalação do Windows",
        "Restauração dos arquivos salvos",
        "Configuração inicial personalizada"
      ],
      price: "A partir de R$ 80,00"
    },
    {
      icon: Cog,
      title: "Otimização de Performance",
      description: "Melhoria da velocidade e performance do computador",
      details: [
        "Limpeza de arquivos temporários",
        "Desfragmentação do disco",
        "Otimização da inicialização",
        "Configuração de memória virtual"
      ],
      price: "A partir de R$ 45,00"
    },
    {
      icon: Wrench,
      title: "Manutenção Preventiva",
      description: "Cuidados regulares para manter seu PC funcionando perfeitamente",
      details: [
        "Limpeza regular do sistema",
        "Verificação de atualizações",
        "Monitoramento de performance",
        "Suporte técnico mensal"
      ],
      price: "Planos a partir de R$ 35,00/mês"
    }
  ];

  return (
    <section id="servicos" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Nossos Serviços de Suporte Remoto
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Soluções completas para todos os problemas do seu computador, 
            realizadas remotamente com total segurança e transparência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-black/50 border-brand-green/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-200 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-12 w-12 text-brand-green" />
                  </div>
                  <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {service.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-brand-green/30 pt-4">
                    <div className="text-center">
                      <span className="text-brand-green font-semibold">{service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 p-6 rounded-lg border border-brand-green/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-brand-green mr-2" />
                  Como Funciona o Atendimento Remoto
                </h3>
                <ol className="space-y-2 text-gray-200 text-sm">
                  <li>1. <strong>Contato inicial:</strong> Via WhatsApp ou formulário</li>
                  <li>2. <strong>Diagnóstico:</strong> Avaliação do problema</li>
                  <li>3. <strong>Orçamento:</strong> Preço fixo e transparente</li>
                  <li>4. <strong>Pagamento:</strong> PIX ou cartão (seguro)</li>
                  <li>5. <strong>Acesso remoto:</strong> Conexão segura autorizada</li>
                  <li>6. <strong>Execução:</strong> Você acompanha todo o processo</li>
                  <li>7. <strong>Finalização:</strong> Teste e garantia do serviço</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-brand-green mr-2" />
                  Garantias e Segurança
                </h3>
                <ul className="space-y-2 text-gray-200 text-sm">
                  <li>• <strong>Conexão criptografada:</strong> Máxima segurança</li>
                  <li>• <strong>Você mantém controle:</strong> Pode interromper a qualquer momento</li>
                  <li>• <strong>Sem acesso a dados pessoais:</strong> Focamos apenas no problema</li>
                  <li>• <strong>Garantia de 30 dias:</strong> Para todos os serviços</li>
                  <li>• <strong>Suporte pós-serviço:</strong> Dúvidas esclarecidas gratuitamente</li>
                  <li>• <strong>Satisfação garantida:</strong> Ou seu dinheiro de volta</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

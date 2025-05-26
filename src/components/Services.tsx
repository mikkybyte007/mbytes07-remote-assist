
import {
  Wrench,
  RefreshCw,
  Download,
  HardDrive,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "Diagnóstico e Reparo de Problemas",
      price: "R$ 100",
      description:
        "Seu computador está lento, travando ou apresentando erros? Realizamos um diagnóstico completo para identificar a causa raiz do problema e aplicamos a solução correta, otimizando o desempenho do seu sistema.",
      features: [
        "Análise de lentidão e travamentos",
        "Remoção de vírus e malware",
        "Correção de erros de sistema (Windows/macOS)",
      ],
      image: "/lovable-uploads/c56c89db-d330-421b-9fde-37b6cd1bf69f.png",
      gradient: "bg-black/68",
    },
    {
      icon: RefreshCw,
      title: "Formatação e Instalação de Sistema",
      price: "R$ 100",
      description:
        "Deixe seu computador como novo. Guiamos você passo a passo no processo de formatação e reinstalação do sistema operacional, garantindo uma máquina limpa, rápida e segura.",
      features: [
        "Backup de arquivos importantes (opcional)",
        "Instalação limpa do Windows ou outro SO",
        "Instalação de drivers essenciais",
      ],
      image: "/lovable-uploads/71152f27-fd12-45ba-ac8a-3eea4365d1fb.png",
      gradient: "bg-black/68",
    },
    {
      icon: Download,
      title: "Instalação de Programas e Jogos",
      price: "R$ 100",
      description:
        "Precisa instalar aquele software de trabalho ou o seu jogo favorito, mas está com dificuldades? Nós fazemos a instalação e configuração para você, garantindo que tudo funcione perfeitamente.",
      features: [
        "Instalação de pacotes de software (Office, Adobe, etc.)",
        "Configuração de jogos e otimização de performance",
        "Resolução de problemas de compatibilidade",
      ],
      image: "/lovable-uploads/fce5061a-4e52-40a8-abb1-7ee0497775d9.png",
      gradient: "bg-black/68",
    },
    {
      icon: HardDrive,
      title: "Upgrade de Peças (HD, SSD, RAM)",
      price: "R$ 150",
      subtitle: "Serviço Complexo",
      description:
        "Comprou um SSD ou mais memória RAM e precisa de ajuda para instalar? Oferecemos assistência guiada por vídeo para garantir que a troca seja feita com segurança e que o novo componente seja reconhecido e configurado corretamente pelo sistema.",
      features: [
        "Instruções passo a passo para instalação física",
        "Configuração de BIOS/UEFI",
        "Clonagem de sistema para o novo SSD",
      ],
      image: "/lovable-uploads/63b22c4e-c3f2-4709-9f2c-37c20160224a.png",
      gradient: "bg-black/68",
    },
  ];

  return (
    <section id="servicos" className="py-16 sm:py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Nossos Serviços de Suporte Remoto
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Soluções eficientes para os problemas mais comuns do seu computador.
            Tudo feito a distância, com seu auxílio e nossa expertise.
          </p>
        </div>

        <div className="block md:hidden space-y-6 px-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border-0 shadow-2xl h-full bg-black overflow-hidden">
                <div className="relative">
                  <div className={`absolute inset-0 ${service.gradient}`} />
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                            <IconComponent className="h-6 w-6 text-brand-green" />
                          </div>
                          <div className="text-base font-bold text-brand-green bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                            {service.price}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white mb-1 font-tomorrow">
                            {service.title}
                          </CardTitle>
                          {service.subtitle && (
                            <span className="text-sm text-brand-green font-semibold">
                              {service.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-100 mb-4 leading-relaxed text-sm">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-100 text-sm"
                          >
                            <div className="w-2 h-2 bg-brand-green rounded-full mr-3 flex-shrink-0 mt-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold transform hover:scale-105 transition-all duration-200"
                        onClick={() =>
                          window.open(
                            "https://wa.me/5519999608356",
                            "_blank"
                          )
                        }
                      >
                        Solicitar Serviço
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
                  >
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full bg-black overflow-hidden group">
                      <div className="relative">
                        <div className={`absolute inset-0 ${service.gradient}`} />
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                        <div className="relative z-10">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                                  <IconComponent className="h-8 w-8 text-brand-green" />
                                </div>
                                <div>
                                  <CardTitle className="text-xl text-white mb-1 font-tomorrow">
                                    {service.title}
                                  </CardTitle>
                                  {service.subtitle && (
                                    <span className="text-sm text-brand-green font-semibold">
                                      {service.subtitle}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-brand-green bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                                  {service.price}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-100 mb-6 leading-relaxed">
                              {service.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                              {service.features.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-gray-100"
                                >
                                  <div className="w-2 h-2 bg-brand-green rounded-full mr-3 flex-shrink-0"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button
                              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold transform hover:scale-105 transition-all duration-200"
                              onClick={() =>
                                window.open(
                                  "https://wa.me/5519999608356",
                                  "_blank"
                                )
                              }
                            >
                              Solicitar Serviço
                            </Button>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20 -left-12" />
            <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20 -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Services;

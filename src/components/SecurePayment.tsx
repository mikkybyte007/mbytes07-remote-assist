import { useState } from "react";
import {
  Lock,
  Shield,
  CheckCircle,
  MessageCircle,
  CreditCard,
  QrCode,
} from "lucide-react";
import { PaymentForm } from "./PaymentForm";

export function SecurePayment() {
  const [selectedService, setSelectedService] = useState<
    "evaluation" | "standard" | "advanced" | null
  >(null);
  const [clientName, setClientName] = useState("");
  const [paymentOption, setPaymentOption] = useState<"direct" | "whatsapp">(
    "direct"
  );
  const [showPayment, setShowPayment] = useState(false);

  const services = {
    evaluation: {
      title: "Avaliação Técnica",
      description:
        "Diagnóstico inicial do problema do seu equipamento. Ideal para entender o que precisa ser feito.",
      price: 25,
      serviceType: "avaliacao",
    },
    standard: {
      title: "Suporte Padrão",
      description:
        "Ideal para diagnóstico de problemas, formatação guiada, remoção de vírus e instalação de programas.",
      price: 100,
      serviceType: "diagnostico",
    },
    advanced: {
      title: "Suporte Avançado",
      description:
        "Perfeito para serviços que exigem mais tempo, como auxílio na troca de peças (SSD, HD, RAM) e configurações complexas de sistema ou jogos.",
      price: 150,
      serviceType: "upgrade",
    },
  };

  const handleServiceSelect = (
    serviceKey: "evaluation" | "standard" | "advanced"
  ) => {
    if (!clientName.trim()) {
      alert("Por favor, digite seu nome antes de continuar");
      return;
    }
    setSelectedService(serviceKey);
    if (paymentOption === "direct") {
      setShowPayment(true);
    } else {
      handleWhatsAppPayment(serviceKey);
    }
  };

  const handleWhatsAppPayment = async (
    serviceKey: "evaluation" | "standard" | "advanced"
  ) => {
    const service = services[serviceKey];

    // Gerar ticket para pagamento via WhatsApp
    const apiUrl =
      "https://mbytes07-api-509774337649.northamerica-south1.run.app/create-ticket";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          serviceType: service.serviceType,
          paymentConfirmed: false,
          paymentMethod: "whatsapp",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          `Ticket gerado: ${result.ticketId}\nEntre em contato pelo WhatsApp com seu ticket para acertar o pagamento.`
        );

        // Redirecionar para WhatsApp
        const whatsappMessage = `Olá! Gostaria de contratar o serviço ${service.title} (R$ ${service.price}). Meu ticket é: ${result.ticketId}`;
        window.open(
          `https://wa.me/5519999608356?text=${encodeURIComponent(
            whatsappMessage
          )}`,
          "_blank"
        );

        // Reset form
        setSelectedService(null);
        setClientName("");
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      alert("Erro ao gerar ticket. Tente novamente.");
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    alert(`Pagamento confirmado! ID: ${paymentIntentId}`);
    setShowPayment(false);
    setSelectedService(null);
    setClientName("");
  };

  const handlePaymentError = (error: string) => {
    alert(`Erro no pagamento: ${error}`);
    setShowPayment(false);
  };

  if (showPayment && selectedService) {
    const service = services[selectedService];
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-tomorrow">
              Finalize seu Pagamento
            </h3>
            <div className="mb-6 p-4 bg-gray-800 rounded-md border border-gray-600">
              <p className="text-white font-tomorrow mb-2">
                <strong>Cliente:</strong> {clientName}
              </p>
              <p className="text-white font-tomorrow mb-2">
                <strong>Serviço:</strong> {service.title}
              </p>
              <p className="text-white font-tomorrow">
                <strong>Valor:</strong> R$ {service.price.toFixed(2)}
              </p>
            </div>

            <PaymentForm
              amount={service.price}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              clientName={clientName}
              serviceType={service.serviceType}
            />

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-4 bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 font-tomorrow"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: "#1A202C" }}>
      <div className="container mx-auto px-4">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Seção de Pagamento Seguro: Garanta seu Atendimento
          </h2>
          <h3 className="text-2xl font-semibold text-white mb-4 font-tomorrow">
            Escolha seu Serviço e Forma de Pagamento
          </h3>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg font-tomorrow">
            Pague diretamente na plataforma (cartão/PIX) ou acerte o pagamento
            depois via WhatsApp. Após a confirmação, seu ticket de serviço será
            gerado instantaneamente.
          </p>
        </div>

        {/* Campo Nome */}
        <div className="max-w-md mx-auto mb-8">
          <label className="block text-white font-medium mb-2 font-tomorrow">
            Seu Nome Completo:
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Digite seu nome para continuar"
            className="w-full px-4 py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800 text-white font-tomorrow"
            required
          />
        </div>

        {/* Seção de Forma de Pagamento - DESTACADA */}
        <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-xl shadow-2xl border-2 border-green-400">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-center text-white mb-6 font-tomorrow">
              🎯 ESCOLHA A FORMA DE PAGAMENTO:
            </h3>

            {/* Opções de Pagamento com Cards Visuais */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Opção 1: Pagar na Plataforma */}
              <label
                className={`cursor-pointer transition-all duration-300 ${
                  paymentOption === "direct"
                    ? "transform scale-105 ring-4 ring-blue-400"
                    : "hover:scale-102"
                }`}
              >
                <input
                  type="radio"
                  name="paymentOption"
                  value="direct"
                  checked={paymentOption === "direct"}
                  onChange={(e) =>
                    setPaymentOption(e.target.value as "direct" | "whatsapp")
                  }
                  className="sr-only"
                />
                <div
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                    paymentOption === "direct"
                      ? "bg-blue-600 border-blue-400 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 mr-3" />
                    <span className="text-xl font-bold font-tomorrow">
                      Pagar na Plataforma
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-tomorrow mb-2">
                      💳 Cartão até 3x sem juros
                    </p>
                    <p className="font-tomorrow">🔐 PIX instantâneo</p>
                  </div>
                </div>
              </label>

              {/* Opção 2: WhatsApp */}
              <label
                className={`cursor-pointer transition-all duration-300 ${
                  paymentOption === "whatsapp"
                    ? "transform scale-105 ring-4 ring-green-400"
                    : "hover:scale-102"
                }`}
              >
                <input
                  type="radio"
                  name="paymentOption"
                  value="whatsapp"
                  checked={paymentOption === "whatsapp"}
                  onChange={(e) =>
                    setPaymentOption(e.target.value as "direct" | "whatsapp")
                  }
                  className="sr-only"
                />
                <div
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                    paymentOption === "whatsapp"
                      ? "bg-green-600 border-green-400 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:border-green-400"
                  }`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 mr-3" />
                    <span className="text-xl font-bold font-tomorrow">
                      Acertar via WhatsApp
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-tomorrow mb-2">💬 Negociar condições</p>
                    <p className="font-tomorrow">📱 Pagamento flexível</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Informações de Pagamento */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="text-lg font-bold text-white mb-3 font-tomorrow text-center">
                💰 Formas de Pagamento Disponíveis:
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-white font-tomorrow font-semibold">
                    Cartão de Crédito
                  </p>
                  <p className="text-gray-300 font-tomorrow">
                    Até 3x sem juros
                  </p>
                </div>
                <div className="text-center">
                  <QrCode className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p className="text-white font-tomorrow font-semibold">PIX</p>
                  <p className="text-gray-300 font-tomorrow">
                    Chave: df040e12-4f56-40a8-8338-3dae77961dfa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Serviço */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Card 1: Avaliação Técnica */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
            <h4 className="text-2xl font-bold text-white mb-4 font-tomorrow">
              Avaliação Técnica
            </h4>
            <p className="text-gray-300 mb-6 font-tomorrow">
              Diagnóstico inicial do problema do seu equipamento. Ideal para
              entender o que precisa ser feito.
            </p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white font-tomorrow">
                R$ 25,00
              </span>
            </div>
            <button
              onClick={() => handleServiceSelect("evaluation")}
              className="w-full font-bold py-4 px-6 rounded-md transition-colors duration-300 font-tomorrow text-black hover:opacity-90 flex items-center justify-center"
              style={{ backgroundColor: "#39FF14" }}
            >
              {paymentOption === "direct" ? (
                "Pagar Agora"
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Gerar Ticket WhatsApp
                </>
              )}
            </button>
          </div>

          {/* Card 2: Suporte Padrão */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
            <h4 className="text-2xl font-bold text-white mb-4 font-tomorrow">
              Suporte Padrão
            </h4>
            <p className="text-gray-300 mb-6 font-tomorrow">
              Ideal para diagnóstico de problemas, formatação guiada, remoção de
              vírus e instalação de programas.
            </p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white font-tomorrow">
                R$ 100,00
              </span>
            </div>
            <button
              onClick={() => handleServiceSelect("standard")}
              className="w-full font-bold py-4 px-6 rounded-md transition-colors duration-300 font-tomorrow text-black hover:opacity-90 flex items-center justify-center"
              style={{ backgroundColor: "#39FF14" }}
            >
              {paymentOption === "direct" ? (
                "Pagar Agora"
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Gerar Ticket WhatsApp
                </>
              )}
            </button>
          </div>

          {/* Card 3: Suporte Avançado */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
            <h4 className="text-2xl font-bold text-white mb-4 font-tomorrow">
              Suporte Avançado
            </h4>
            <p className="text-gray-300 mb-6 font-tomorrow">
              Perfeito para serviços que exigem mais tempo, como auxílio na
              troca de peças (SSD, HD, RAM) e configurações complexas.
            </p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white font-tomorrow">
                R$ 150,00
              </span>
            </div>
            <button
              onClick={() => handleServiceSelect("advanced")}
              className="w-full font-bold py-4 px-6 rounded-md transition-colors duration-300 font-tomorrow text-black hover:opacity-90 flex items-center justify-center"
              style={{ backgroundColor: "#39FF14" }}
            >
              {paymentOption === "direct" ? (
                "Pagar Agora"
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Gerar Ticket WhatsApp
                </>
              )}
            </button>
          </div>
        </div>

        {/* Como Funciona o Pagamento */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-tomorrow">
            Como Funciona o Pagamento
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Seleção
              </h4>
              <p className="text-gray-300 font-tomorrow">
                Escolha o serviço e a forma de pagamento (direto na plataforma
                ou via WhatsApp).
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Pagamento
              </h4>
              <p className="text-gray-300 font-tomorrow">
                Pague com cartão (até 3x)/PIX na plataforma ou gere um ticket
                para acertar via WhatsApp.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Confirmação
              </h4>
              <p className="text-gray-300 font-tomorrow">
                Receba seu ticket de serviço e entre em contato para agendar o
                atendimento.
              </p>
            </div>
          </div>
        </div>

        {/* Por que Confiamos na Stripe */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-green-500 mr-4" />
            <h3 className="text-3xl font-bold text-white font-tomorrow">
              Pagamento Seguro com Stripe
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Líder Mundial
              </h4>
              <p className="text-gray-300 font-tomorrow">
                A Stripe é utilizada por milhões de empresas no mundo todo.
              </p>
            </div>
            <div className="text-center">
              <Lock className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Segurança Máxima
              </h4>
              <p className="text-gray-300 font-tomorrow">
                Todas as transações são criptografadas com o mais alto nível de
                segurança.
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
                Flexibilidade
              </h4>
              <p className="text-gray-300 font-tomorrow">
                Cartão até 3x, PIX ou acerte depois via WhatsApp.
              </p>
            </div>
          </div>

          {/* Logo Stripe */}
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-white bg-indigo-600 px-6 py-3 rounded-lg font-tomorrow">
              Powered by Stripe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


import { useState } from "react";
import { PaymentForm } from "./PaymentForm";
import { ServiceCard } from "./ServiceCard";
import { PaymentOptions } from "./PaymentOptions";
import { PaymentInfo } from "./PaymentInfo";
import { HowItWorks } from "./HowItWorks";
import { SecurityBadge } from "./SecurityBadge";

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
          `https://wa.me/5519993714912?text=${encodeURIComponent(
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

        {/* Seção de Forma de Pagamento */}
        <PaymentOptions
          paymentOption={paymentOption}
          onPaymentOptionChange={setPaymentOption}
        />

        {/* Adicionar PaymentInfo dentro das PaymentOptions */}
        <div className="max-w-2xl mx-auto mb-12">
          <PaymentInfo />
        </div>

        {/* Cards de Serviço */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <ServiceCard
            title="Avaliação Técnica"
            description="Diagnóstico inicial do problema do seu equipamento. Ideal para entender o que precisa ser feito."
            price={25}
            paymentOption={paymentOption}
            onServiceSelect={() => handleServiceSelect("evaluation")}
          />
          <ServiceCard
            title="Suporte Padrão"
            description="Ideal para diagnóstico de problemas, formatação guiada, remoção de vírus e instalação de programas."
            price={100}
            paymentOption={paymentOption}
            onServiceSelect={() => handleServiceSelect("standard")}
          />
          <ServiceCard
            title="Suporte Avançado"
            description="Perfeito para serviços que exigem mais tempo, como auxílio na troca de peças (SSD, HD, RAM) e configurações complexas."
            price={150}
            paymentOption={paymentOption}
            onServiceSelect={() => handleServiceSelect("advanced")}
          />
        </div>

        {/* Como Funciona o Pagamento */}
        <HowItWorks />

        {/* Por que Confiamos na Stripe */}
        <SecurityBadge />
      </div>
    </section>
  );
}

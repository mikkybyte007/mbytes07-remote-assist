
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ServiceForm } from "./ServiceForm";
import { PaymentSection } from "./PaymentSection";
import { TicketDisplay } from "./TicketDisplay";

export function Scheduling() {
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("avaliacao");
  const [paymentOption, setPaymentOption] = useState<"direct" | "whatsapp">("direct");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");
  const { toast } = useToast();

  // URL base correta da sua API no Google Cloud Run
  const correctApiBaseUrl =
    "https://mbytes07-api-509774337649.northamerica-south1.run.app";

  const getServicePrice = (service: string) => {
    switch (service) {
      case "avaliacao":
      case "componentes":
        return 25;
      case "diagnostico":
      case "formatacao":
      case "instalacao":
        return 100;
      case "upgrade":
        return 150;
      default:
        return 25;
    }
  };

  const getServiceName = (service: string) => {
    switch (service) {
      case "avaliacao":
        return "Avaliação Técnica";
      case "diagnostico":
        return "Diagnóstico e Reparo";
      case "formatacao":
        return "Formatação";
      case "instalacao":
        return "Instalação de Programas";
      case "upgrade":
        return "Upgrade de Peças";
      case "componentes":
        return "Troca de Componentes na Placa";
      default:
        return "Avaliação Técnica";
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponseMessage("");

    if (!clientName.trim()) {
      setResponseMessage(
        '<p style="color: red;">Por favor, preencha seu nome.</p>'
      );
      return;
    }

    if (paymentOption === "whatsapp") {
      handleWhatsAppPayment();
    } else {
      setShowPayment(true);
    }
  };

  const handleWhatsAppPayment = async () => {
    setIsLoading(true);
    setResponseMessage("Gerando seu ticket para pagamento via WhatsApp...");

    const apiUrl = `${correctApiBaseUrl}/create-ticket`;

    try {
      console.log("Enviando dados para criar ticket (WhatsApp):", {
        clientName: clientName.trim(),
        serviceType,
        paymentConfirmed: false,
        paymentMethod: "whatsapp",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          clientName: clientName.trim(),
          serviceType,
          paymentConfirmed: false,
          paymentMethod: "whatsapp",
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resposta da API (WhatsApp):", result);

      setIsLoading(false);

      if (result.ticketId) {
        setGeneratedTicketId(result.ticketId);
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
             <p>${result.message || 'Ticket criado com sucesso!'}</p>
             <p>Entre em contato pelo WhatsApp com seu ticket para acertar o pagamento e agendar o serviço.</p>
           </div>`
        );
        setPaymentCompleted(true);
        setClientName("");

        // Redirecionar para WhatsApp automaticamente
        const serviceName = getServiceName(serviceType);
        const servicePrice = getServicePrice(serviceType);
        const whatsappMessage = `Olá! Gostaria de contratar o serviço ${serviceName} (R$ ${servicePrice}). Meu ticket é: ${result.ticketId}`;
        
        setTimeout(() => {
          window.open(
            `https://wa.me/5519993714912?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
          );
        }, 1000);
      } else {
        const errorMsg = result.error || result.message || "Erro desconhecido ao gerar ticket.";
        setResponseMessage(
          `<p style="color: red;">Erro ao gerar ticket: ${errorMsg}</p>`
        );
      }
    } catch (error) {
      console.error("Falha na comunicação com a API (WhatsApp):", error);
      setIsLoading(false);
      
      // Fallback: gerar ticket manual quando API não estiver disponível
      const fallbackTicketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setGeneratedTicketId(fallbackTicketId);
      setResponseMessage(
        `<div style="color: orange; font-weight: normal;">
           <p>Ticket gerado localmente: ${fallbackTicketId}</p>
           <p>Entre em contato pelo WhatsApp com seu ticket para acertar o pagamento e agendar o serviço.</p>
           <p><small>Nota: A API está temporariamente indisponível, mas seu atendimento não será prejudicado.</small></p>
         </div>`
      );
      setPaymentCompleted(true);
      setClientName("");

      // Redirecionar para WhatsApp mesmo com ticket de fallback
      const serviceName = getServiceName(serviceType);
      const servicePrice = getServicePrice(serviceType);
      const whatsappMessage = `Olá! Gostaria de contratar o serviço ${serviceName} (R$ ${servicePrice}). Meu ticket é: ${fallbackTicketId}`;
      
      setTimeout(() => {
        window.open(
          `https://wa.me/5519993714912?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank"
        );
      }, 1000);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setIsLoading(true);
    setResponseMessage(
      "Pagamento confirmado! Gerando seu ticket de serviço..."
    );

    const apiUrl = `${correctApiBaseUrl}/create-ticket`;

    try {
      console.log("Enviando dados para criar ticket (Pós-Pagamento Stripe):", {
        clientName: clientName.trim(),
        serviceType,
        paymentConfirmed: true,
        paymentMethod: "stripe",
        stripePaymentIntentId: paymentIntentId,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          clientName: clientName.trim(),
          serviceType,
          paymentConfirmed: true,
          paymentMethod: "stripe",
          stripePaymentIntentId: paymentIntentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resposta da API (Pós-Pagamento Stripe):", result);

      setIsLoading(false);

      if (result.ticketId) {
        setGeneratedTicketId(result.ticketId);
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
            <p>${result.message || 'Ticket criado com sucesso!'}</p>
            <p>Pagamento confirmado! Entraremos em contato em breve para agendar seu atendimento.</p>
          </div>`
        );
        setPaymentCompleted(true);
        setClientName("");
        setShowPayment(false);
      } else {
        const errorMsg = result.error || result.message || "Erro ao registrar ticket após pagamento.";
        setResponseMessage(
          `<p style="color: red;">Erro ao registrar ticket: ${errorMsg}</p>`
        );
      }
    } catch (error) {
      console.error("Falha na comunicação com a API (Pós-Pagamento Stripe):", error);
      setIsLoading(false);
      
      // Fallback para pagamento confirmado
      const fallbackTicketId = `PAID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setGeneratedTicketId(fallbackTicketId);
      setResponseMessage(
        `<div style="color: green; font-weight: normal;">
          <p>Ticket gerado: ${fallbackTicketId}</p>
          <p>Pagamento confirmado! Entraremos em contato em breve para agendar seu atendimento.</p>
          <p><small>Nota: A API está temporariamente indisponível, mas seu pagamento foi processado com sucesso.</small></p>
        </div>`
      );
      setPaymentCompleted(true);
      setClientName("");
      setShowPayment(false);
    }
  };

  const handlePaymentError = (errorMsg: string) => {
    setResponseMessage(
      `<p style="color: red;">Erro no pagamento: ${errorMsg}</p>`
    );
    setShowPayment(false);
    setIsLoading(false);
  };

  const resetForm = () => {
    setShowPayment(false);
    setPaymentCompleted(false);
    setResponseMessage("");
    setClientName("");
    setServiceType("avaliacao");
    setPaymentOption("direct");
    setGeneratedTicketId("");
  };

  return (
    <section id="agendamento" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white font-tomorrow">
          Gere seu Ticket de Atendimento
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 font-tomorrow">
          Preencha o formulário abaixo para registrar seu pedido. Escolha entre
          pagamento direto na plataforma ou acerte o pagamento depois via
          WhatsApp.
        </p>

        <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
          {!showPayment && !paymentCompleted && (
            <ServiceForm
              clientName={clientName}
              setClientName={setClientName}
              serviceType={serviceType}
              setServiceType={setServiceType}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          )}

          {showPayment && !paymentCompleted && (
            <PaymentSection
              clientName={clientName}
              serviceType={serviceType}
              amount={getServicePrice(serviceType)}
              serviceName={getServiceName(serviceType)}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onBack={() => {
                setShowPayment(false);
                setResponseMessage("");
              }}
            />
          )}

          {paymentCompleted && generatedTicketId && (
            <TicketDisplay
              ticketId={generatedTicketId}
              responseMessage={responseMessage}
              onReset={resetForm}
            />
          )}

          {responseMessage &&
            !paymentCompleted && (
              <div
                className="mt-6 p-4 border border-gray-600 rounded-md bg-gray-800"
                dangerouslySetInnerHTML={{ __html: responseMessage }}
              />
            )}
        </div>
      </div>
    </section>
  );
}

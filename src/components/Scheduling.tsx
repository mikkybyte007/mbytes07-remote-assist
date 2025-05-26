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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          serviceType,
          paymentConfirmed: false,
          paymentMethod: "whatsapp",
        }),
      });

      const result = await response.json();
      console.log("Resposta da API (WhatsApp):", result);

      setIsLoading(false);

      if (response.ok && result.ticketId) {
        setGeneratedTicketId(result.ticketId);
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
             <p>${result.message}</p>
             <p>Entre em contato pelo WhatsApp com seu ticket para acertar o pagamento e agendar o serviço.</p>
           </div>`
        );
        setPaymentCompleted(true);
        setClientName("");
      } else {
        const errorMsg =
          result.error ||
          result.message ||
          "Erro desconhecido ao gerar ticket.";
        setResponseMessage(
          `<p style="color: red;">Erro ao gerar ticket: ${errorMsg}</p>`
        );
      }
    } catch (error) {
      console.error("Falha na comunicação com a API (WhatsApp):", error);
      setIsLoading(false);
      setResponseMessage(
        '<p style="color: red;">Erro: Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.</p>'
      );
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          serviceType,
          paymentConfirmed: true,
          paymentMethod: "stripe",
          stripePaymentIntentId: paymentIntentId,
        }),
      });

      const result = await response.json();
      console.log("Resposta da API (Pós-Pagamento Stripe):", result);

      setIsLoading(false);

      if (response.ok && result.ticketId) {
        setGeneratedTicketId(result.ticketId);
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
            <p>${result.message}</p>
            <p>Pagamento confirmado! Entraremos em contato em breve para agendar seu atendimento.</p>
          </div>`
        );
        setPaymentCompleted(true);
        setClientName("");
        setShowPayment(false);
      } else {
        const errorMsg =
          result.error ||
          result.message ||
          "Erro ao registrar ticket após pagamento.";
        setResponseMessage(
          `<p style="color: red;">Erro ao registrar ticket: ${errorMsg}</p>`
        );
      }
    } catch (error) {
      console.error(
        "Falha na comunicação com a API (Pós-Pagamento Stripe):",
        error
      );
      setIsLoading(false);
      setResponseMessage(
        '<p style="color: red;">Erro: Não foi possível conectar ao servidor para registrar o ticket. Verifique sua conexão e tente novamente.</p>'
      );
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

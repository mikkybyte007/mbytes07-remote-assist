import { useState } from "react";
import { PaymentForm } from "./PaymentForm"; // Certifique-se que este componente está criado e funcional

export function Scheduling() {
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("avaliacao"); // Valor padrão
  const [paymentOption, setPaymentOption] = useState<"direct" | "whatsapp">(
    "direct" // Valor padrão
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // URL base correta da sua API no Google Cloud Run
  const correctApiBaseUrl =
    "https://mbytes07-api-509774337649.northamerica-south1.run.app";

  const getServicePrice = (service: string) => {
    switch (service) {
      case "avaliacao":
        return 25; // Lembre-se que para o Stripe, o valor deve ser em centavos (ex: 2500 para R$25,00)
      case "diagnostico":
      case "formatacao":
      case "instalacao":
        return 100; // 10000 para Stripe
      case "upgrade":
        return 150; // 15000 para Stripe
      default:
        return 25; // 2500 para Stripe
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
      // Se for pagamento direto, apenas mostra o formulário de pagamento
      // O PaymentForm.tsx lidará com a criação do PaymentIntent
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
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
             <p>${result.message}</p>
             <p>Seu Ticket é: <strong>${result.ticketId}</strong></p>
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

  // Esta função será chamada pelo PaymentForm APÓS um pagamento Stripe bem-sucedido
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setIsLoading(true);
    setResponseMessage(
      "Pagamento confirmado! Gerando seu ticket de serviço..."
    );

    const apiUrl = `${correctApiBaseUrl}/create-ticket`; // Rota para criar o ticket no seu backend

    try {
      console.log("Enviando dados para criar ticket (Pós-Pagamento Stripe):", {
        clientName: clientName.trim(),
        serviceType,
        paymentConfirmed: true,
        paymentMethod: "stripe",
        stripePaymentIntentId: paymentIntentId, // Importante para referência
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
        setResponseMessage(
          `<div style="color: green; font-weight: normal;">
            <p>${result.message}</p>
            <p>Seu Ticket é: <strong>${result.ticketId}</strong></p>
            <p>Pagamento confirmado! Entraremos em contato em breve para agendar seu atendimento.</p>
          </div>`
        );
        setPaymentCompleted(true);
        setClientName(""); // Limpa o formulário
        setShowPayment(false); // Esconde o formulário de pagamento
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

  // Esta função será chamada pelo PaymentForm em caso de erro no pagamento Stripe
  const handlePaymentError = (errorMsg: string) => {
    setResponseMessage(
      `<p style="color: red;">Erro no pagamento: ${errorMsg}</p>`
    );
    setShowPayment(false); // Esconde o formulário de pagamento
    setIsLoading(false);
  };

  const resetForm = () => {
    setShowPayment(false);
    setPaymentCompleted(false);
    setResponseMessage("");
    setClientName("");
    setServiceType("avaliacao");
    setPaymentOption("direct");
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
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="clientName"
                  className="block text-white font-medium mb-2 font-tomorrow"
                >
                  Seu Nome:
                </label>
                <input
                  type="text"
                  id="clientName"
                  placeholder="Digite seu nome completo"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white font-tomorrow"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="serviceType"
                  className="block text-white font-medium mb-2 font-tomorrow"
                >
                  Tipo de Serviço:
                </label>
                <select
                  id="serviceType"
                  required
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white font-tomorrow"
                >
                  <option value="avaliacao">Avaliação Técnica (R$ 25)</option>
                  <option value="diagnostico">
                    Diagnóstico e Reparo (R$ 100)
                  </option>
                  <option value="formatacao">Formatação (R$ 100)</option>
                  <option value="instalacao">
                    Instalação de Programas (R$ 100)
                  </option>
                  <option value="upgrade">Upgrade de Peças (R$ 150)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2 font-tomorrow">
                  Forma de Pagamento:
                </label>
                <div className="space-y-3">
                  <label className="flex items-center text-white font-tomorrow">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="direct"
                      checked={paymentOption === "direct"}
                      onChange={(e) =>
                        setPaymentOption(
                          e.target.value as "direct" | "whatsapp"
                        )
                      }
                      className="mr-3 text-blue-600"
                    />
                    Pagar agora na plataforma (Cartão de Crédito/PIX)
                  </label>
                  <label className="flex items-center text-white font-tomorrow">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="whatsapp"
                      checked={paymentOption === "whatsapp"}
                      onChange={(e) =>
                        setPaymentOption(
                          e.target.value as "direct" | "whatsapp"
                        )
                      }
                      className="mr-3 text-green-600"
                    />
                    Acertar pagamento depois via WhatsApp
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3 px-6 rounded-md transition-colors duration-300 font-tomorrow disabled:bg-gray-400 ${
                  paymentOption === "direct"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isLoading
                  ? "Processando..."
                  : paymentOption === "direct"
                  ? "Prosseguir para Pagamento"
                  : "Gerar Ticket para WhatsApp"}
              </button>
            </form>
          )}

          {showPayment && !paymentCompleted && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-tomorrow text-center">
                Pagamento Seguro
              </h3>
              <div className="mb-4 p-4 bg-gray-800 rounded-md border border-gray-600">
                <p className="text-white font-tomorrow">
                  <strong>Cliente:</strong> {clientName}
                </p>
                <p className="text-white font-tomorrow">
                  <strong>Serviço:</strong> {getServiceName(serviceType)}
                </p>
                <p className="text-white font-tomorrow">
                  <strong>Valor:</strong> R${" "}
                  {getServicePrice(serviceType).toFixed(2)}
                </p>
              </div>

              <PaymentForm
                amount={getServicePrice(serviceType) * 100} // Envie o valor em centavos para o PaymentForm
                clientName={clientName}
                serviceType={getServiceName(serviceType)}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />

              <button
                onClick={() => {
                  setShowPayment(false);
                  setResponseMessage(""); // Limpa mensagens anteriores
                }}
                className="w-full mt-4 bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 font-tomorrow"
              >
                Voltar / Alterar Dados
              </button>
            </div>
          )}

          {paymentCompleted && (
            <div className="text-center mt-6">
              <button
                onClick={resetForm}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 font-tomorrow"
              >
                Fazer Novo Agendamento
              </button>
            </div>
          )}

          {responseMessage &&
            !paymentCompleted && ( // Mostra apenas se não for mensagem de sucesso final
              <div
                className="mt-6 p-4 border border-gray-600 rounded-md bg-gray-800"
                dangerouslySetInnerHTML={{ __html: responseMessage }}
              />
            )}

          {/* Mensagem de sucesso final, se o paymentCompleted for true e houver responseMessage */}
          {responseMessage && paymentCompleted && (
            <div
              className="mt-6 p-4 border-green-500 rounded-md bg-green-900/30"
              dangerouslySetInnerHTML={{ __html: responseMessage }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

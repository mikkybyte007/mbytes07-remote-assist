
import { PaymentSelection } from "./PaymentSelection";
import { ShippingInfo } from "./ShippingInfo";

interface ServiceFormProps {
  clientName: string;
  setClientName: (name: string) => void;
  serviceType: string;
  setServiceType: (type: string) => void;
  paymentOption: "direct" | "whatsapp";
  setPaymentOption: (option: "direct" | "whatsapp") => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ServiceForm({
  clientName,
  setClientName,
  serviceType,
  setServiceType,
  paymentOption,
  setPaymentOption,
  onSubmit,
  isLoading,
}: ServiceFormProps) {
  return (
    <form onSubmit={onSubmit}>
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
          <option value="componentes">
            Troca de Componentes na Placa (R$ 25 - Diagnóstico)
          </option>
        </select>
      </div>

      <ShippingInfo />

      <PaymentSelection
        paymentOption={paymentOption}
        onPaymentOptionChange={setPaymentOption}
      />

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
  );
}

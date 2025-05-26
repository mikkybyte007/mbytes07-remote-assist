
import { PaymentForm } from "./PaymentForm";

interface PaymentSectionProps {
  clientName: string;
  serviceType: string;
  amount: number;
  serviceName: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  onBack: () => void;
}

export function PaymentSection({
  clientName,
  serviceType,
  amount,
  serviceName,
  onPaymentSuccess,
  onPaymentError,
  onBack,
}: PaymentSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4 font-tomorrow text-center">
        Pagamento Seguro
      </h3>
      <div className="mb-4 p-4 bg-gray-800 rounded-md border border-gray-600">
        <p className="text-white font-tomorrow">
          <strong>Cliente:</strong> {clientName}
        </p>
        <p className="text-white font-tomorrow">
          <strong>Serviço:</strong> {serviceName}
        </p>
        <p className="text-white font-tomorrow">
          <strong>Valor:</strong> R$ {amount.toFixed(2)}
        </p>
      </div>

      <PaymentForm
        amount={amount * 100} // Envie o valor em centavos para o PaymentForm
        clientName={clientName}
        serviceType={serviceName}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />

      <button
        onClick={onBack}
        className="w-full mt-4 bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 font-tomorrow"
      >
        Voltar / Alterar Dados
      </button>
    </div>
  );
}

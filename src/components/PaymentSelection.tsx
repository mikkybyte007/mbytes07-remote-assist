
interface PaymentSelectionProps {
  paymentOption: "direct" | "whatsapp";
  onPaymentOptionChange: (option: "direct" | "whatsapp") => void;
}

export function PaymentSelection({ paymentOption, onPaymentOptionChange }: PaymentSelectionProps) {
  return (
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
              onPaymentOptionChange(e.target.value as "direct" | "whatsapp")
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
              onPaymentOptionChange(e.target.value as "direct" | "whatsapp")
            }
            className="mr-3 text-green-600"
          />
          Acertar pagamento depois via WhatsApp
        </label>
      </div>
    </div>
  );
}

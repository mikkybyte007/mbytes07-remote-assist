
import { CreditCard, MessageCircle } from "lucide-react";

interface PaymentOptionsProps {
  paymentOption: "direct" | "whatsapp";
  onPaymentOptionChange: (option: "direct" | "whatsapp") => void;
}

export function PaymentOptions({ paymentOption, onPaymentOptionChange }: PaymentOptionsProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-xl shadow-2xl border-2 border-green-400">
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white mb-6 font-tomorrow">
          🎯 ESCOLHA A FORMA DE PAGAMENTO:
        </h3>

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
                onPaymentOptionChange(e.target.value as "direct" | "whatsapp")
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
                onPaymentOptionChange(e.target.value as "direct" | "whatsapp")
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
      </div>
    </div>
  );
}

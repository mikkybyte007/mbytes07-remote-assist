
import { CreditCard, QrCode } from "lucide-react";

export function PaymentInfo() {
  return (
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
  );
}

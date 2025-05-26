
import { Shield, Lock, CheckCircle } from "lucide-react";

export function SecurityBadge() {
  return (
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

      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-white bg-indigo-600 px-6 py-3 rounded-lg font-tomorrow">
          Powered by Stripe
        </span>
      </div>
    </div>
  );
}

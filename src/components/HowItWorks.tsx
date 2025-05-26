
export function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center font-tomorrow">
        Como Funciona o Pagamento
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">1</span>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
            Seleção
          </h4>
          <p className="text-gray-300 font-tomorrow">
            Escolha o serviço e a forma de pagamento (direto na plataforma
            ou via WhatsApp).
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">2</span>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
            Pagamento
          </h4>
          <p className="text-gray-300 font-tomorrow">
            Pague com cartão (até 3x)/PIX na plataforma ou gere um ticket
            para acertar via WhatsApp.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">3</span>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2 font-tomorrow">
            Confirmação
          </h4>
          <p className="text-gray-300 font-tomorrow">
            Receba seu ticket de serviço e entre em contato para agendar o
            atendimento.
          </p>
        </div>
      </div>
    </div>
  );
}

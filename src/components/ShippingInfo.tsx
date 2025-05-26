
export function ShippingInfo() {
  return (
    <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
      <h4 className="text-lg font-bold text-yellow-400 mb-3 font-tomorrow">
        📦 Informações para Envio
      </h4>
      <div className="space-y-2 text-sm text-yellow-200">
        <p className="font-tomorrow">
          <strong>Endereço para envio:</strong>
        </p>
        <div className="pl-4 font-tomorrow">
          <p>Rua Doutor Pinto Ferraz, 584</p>
          <p>Bairro São Bernardo</p>
          <p>Campinas - SP</p>
          <p>CEP: 13030-500</p>
        </div>
        <div className="mt-3 p-3 bg-yellow-800/30 rounded border border-yellow-500">
          <p className="font-tomorrow text-yellow-100">
            <strong>⏰ Prazo de diagnóstico:</strong> 25 dias úteis
          </p>
          <p className="font-tomorrow text-yellow-100 mt-1">
            <strong>💰 Política de devolução:</strong> Caso não aceite o orçamento, 
            devolvemos o produto sem custo. Apenas taxa dos correios será cobrada.
          </p>
        </div>
      </div>
    </div>
  );
}

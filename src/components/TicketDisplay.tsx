
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TicketDisplayProps {
  ticketId: string;
  responseMessage: string;
  onReset: () => void;
}

export function TicketDisplay({ ticketId, responseMessage, onReset }: TicketDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyTicketToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      toast({
        title: "Ticket copiado!",
        description: "O número do ticket foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o ticket. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="text-center mt-6">
      {/* Ticket Display - Maior e mais destacado */}
      <div className="mb-8 p-8 bg-gradient-to-r from-green-600 to-green-800 rounded-xl border-2 border-green-400 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4 font-tomorrow">
          🎫 Seu Ticket foi Gerado!
        </h3>
        <div className="bg-white rounded-lg p-6 mb-4">
          <p className="text-gray-600 font-tomorrow text-sm mb-2">
            NÚMERO DO TICKET
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl font-bold text-gray-900 font-mono tracking-wider">
              {ticketId}
            </span>
            <button
              onClick={copyTicketToClipboard}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              title="Copiar ticket"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
        <p className="text-green-100 font-tomorrow text-sm">
          Guarde este número! Você precisará dele para o atendimento.
        </p>
      </div>

      <button
        onClick={onReset}
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 font-tomorrow"
      >
        Fazer Novo Agendamento
      </button>

      {/* Mensagem de sucesso final */}
      {responseMessage && (
        <div
          className="mt-6 p-4 border-green-500 rounded-md bg-green-900/30"
          dangerouslySetInnerHTML={{ __html: responseMessage }}
        />
      )}
    </div>
  );
}

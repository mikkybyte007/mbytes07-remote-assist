
import { MessageCircle } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  paymentOption: "direct" | "whatsapp";
  onServiceSelect: () => void;
}

export function ServiceCard({
  title,
  description,
  price,
  paymentOption,
  onServiceSelect,
}: ServiceCardProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-green-500 transition-colors duration-300">
      <h4 className="text-2xl font-bold text-white mb-4 font-tomorrow">
        {title}
      </h4>
      <p className="text-gray-300 mb-6 font-tomorrow">
        {description}
      </p>
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-white font-tomorrow">
          R$ {price.toFixed(2)}
        </span>
      </div>
      <button
        onClick={onServiceSelect}
        className="w-full font-bold py-4 px-6 rounded-md transition-colors duration-300 font-tomorrow text-black hover:opacity-90 flex items-center justify-center"
        style={{ backgroundColor: "#39FF14" }}
      >
        {paymentOption === "direct" ? (
          "Pagar Agora"
        ) : (
          <>
            <MessageCircle className="w-4 h-4 mr-2" />
            Gerar Ticket WhatsApp
          </>
        )}
      </button>
    </div>
  );
}

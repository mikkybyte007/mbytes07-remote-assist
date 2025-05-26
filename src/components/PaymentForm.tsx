
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Substitua pela sua chave pública do Stripe
const stripePromise = loadStripe('pk_test_51234567890abcdef...');

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  clientName: string;
  serviceType: string;
}

const CheckoutForm = ({ amount, onPaymentSuccess, onPaymentError, clientName, serviceType }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onPaymentError('Stripe não está carregado. Tente novamente.');
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      onPaymentError('Elemento do cartão não encontrado.');
      return;
    }

    try {
      console.log('Criando payment intent...');
      
      // Criar Payment Intent no seu backend
      const response = await fetch('https://mbytes07-api-509774337649.southamerica-east1.run.app/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Stripe usa centavos
          currency: 'brl',
          clientName,
          serviceType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar payment intent');
      }

      const { client_secret } = await response.json();

      if (!client_secret) {
        throw new Error('Client secret não recebido do servidor');
      }

      console.log('Confirmando pagamento...');

      // Confirmar pagamento
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: clientName,
          },
        },
      });

      if (error) {
        console.error('Erro no pagamento:', error);
        onPaymentError(error.message || 'Erro no pagamento');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Pagamento confirmado:', paymentIntent.id);
        onPaymentSuccess(paymentIntent.id);
      } else {
        onPaymentError('Status de pagamento não reconhecido');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      onPaymentError(error instanceof Error ? error.message : 'Erro ao processar pagamento');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-600 rounded-md bg-gray-800">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#9ca3af',
                },
                backgroundColor: '#374151',
              },
            },
          }}
        />
      </div>
      
      <div className="text-center">
        <p className="text-white font-tomorrow mb-2">
          Total: R$ {amount.toFixed(2)}
        </p>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 font-tomorrow"
        >
          {isProcessing ? 'Processando...' : 'Pagar Agora'}
        </button>
      </div>
    </form>
  );
};

export const PaymentForm = (props: PaymentFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};


// Adicione esta rota ao seu backend/index.js

const stripe = require('stripe')('sk_test_...'); // Substitua pela sua chave secreta do Stripe

// ROTA PARA CRIAR PAYMENT INTENT
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, clientName, serviceType } = req.body;

        if (!amount || !currency) {
            return res.status(400).send({ error: 'Amount e currency são obrigatórios.' });
        }

        // Criar Payment Intent no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Valor em centavos
            currency: currency,
            metadata: {
                clientName: clientName,
                serviceType: serviceType
            }
        });

        res.status(200).send({
            client_secret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error("Erro ao criar payment intent:", error);
        res.status(500).send({ error: 'Falha ao criar payment intent.' });
    }
});

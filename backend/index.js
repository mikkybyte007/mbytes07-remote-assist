// Importa as bibliotecas necessárias
const express = require("express");
const { Firestore } = require("@google-cloud/firestore");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// NOVO: Importa a biblioteca do Stripe e a inicializa com a chave secreta
// A chave será lida de forma segura do ambiente que o Google Cloud Run vai fornecer
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Inicializa o servidor Express
const app = express();
app.use(express.json()); // Permite que a API entenda JSON

// Configuração do CORS mais específica
app.use(
  cors({
    origin: "https://mbytes07informatica.netlify.app", // Permite apenas o seu site Netlify
  })
);

// Inicializa a conexão com o Firestore
const firestore = new Firestore();

// ROTA PARA CRIAR UM NOVO AGENDAMENTO/TICKET
app.post("/create-ticket", async (req, res) => {
  try {
    const {
      clientName,
      serviceType,
      paymentConfirmed,
      paymentIntentId, // Recebido do front-end se o pagamento foi via Stripe
      paymentMethod, // Recebido do front-end (ex: "stripe" ou "whatsapp")
    } = req.body;

    console.log("Dados recebidos para /create-ticket:", {
      clientName,
      serviceType,
      paymentConfirmed,
      paymentIntentId,
      paymentMethod,
    });

    if (!clientName || !serviceType) {
      console.error(
        "Erro em /create-ticket: Dados obrigatórios não fornecidos.",
        { clientName, serviceType }
      );
      return res
        .status(400)
        .send({ error: "Nome do cliente e tipo de serviço são obrigatórios." });
    }

    const ticketId = uuidv4();
    const ticketRef = firestore.collection("tickets").doc(ticketId);

    const ticketData = {
      ticketId: ticketId,
      clientName: clientName,
      serviceType: serviceType,
      paymentConfirmed: paymentConfirmed || false,
      status: "pending",
      createdAt: new Date(),
    };

    if (paymentIntentId) {
      ticketData.stripePaymentIntentId = paymentIntentId; // Salva o ID da intenção de pagamento do Stripe
    }
    if (paymentMethod) {
      ticketData.paymentMethod = paymentMethod; // Salva o método de pagamento
    }

    await ticketRef.set(ticketData);

    console.log(
      `Ticket ${ticketId} criado para ${clientName}. Método: ${
        paymentMethod || "Não especificado"
      }`
    );

    res.status(201).send({
      message: "Ticket criado com sucesso!",
      ticketId: ticketId,
      success: true, // Adicionado para consistência com o front-end, se desejar
    });
  } catch (error) {
    console.error("Erro ao criar o ticket:", error.message, error.stack);
    res.status(500).send({
      error: "Falha ao se comunicar com o banco de dados.",
      details: error.message,
    });
  }
});

// NOVO: ROTA PARA CRIAR A INTENÇÃO DE PAGAMENTO NO STRIPE
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, clientName, serviceType } = req.body;

    console.log("Criando payment intent para Stripe:", {
      amount,
      currency,
      clientName,
      serviceType,
    });

    if (!amount || !currency) {
      console.error(
        "Erro em /create-payment-intent: Amount e currency são obrigatórios."
      );
      return res
        .status(400)
        .send({ error: "Amount (valor) e currency (moeda) são obrigatórios." });
    }

    // Criar Payment Intent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Valor em centavos
      currency: currency,
      description: `Serviço: ${serviceType || "Não especificado"} para ${
        clientName || "Cliente"
      }`, // Melhorar descrição
      metadata: {
        clientName: clientName || "Não fornecido",
        serviceType: serviceType || "Não fornecido",
      },
    });

    console.log("Payment intent criado com ID:", paymentIntent.id);

    res.status(200).send({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(
      "Erro ao criar payment intent no Stripe:",
      error.message,
      error.stack
    );
    res.status(500).send({
      error: "Falha ao criar intenção de pagamento com o Stripe.",
      details: error.message,
    });
  }
});

// Inicia o servidor (APENAS UMA VEZ NO FINAL DO ARQUIVO)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileText, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  servico: string;
  valor: number;
  dataAtendimento: string;
}

const AdminPanel = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    servico: "",
    valor: 0
  });
  const { toast } = useToast();

  const servicos = [
    { nome: "Diagnóstico e Reparo", valor: 100 },
    { nome: "Formatação de Sistema", valor: 100 },
    { nome: "Instalação de Programas", valor: 100 },
    { nome: "Upgrade de Peças", valor: 150 }
  ];

  const adicionarCliente = () => {
    if (!novoCliente.nome || !novoCliente.telefone || !novoCliente.servico) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const cliente: Cliente = {
      id: Date.now().toString(),
      ...novoCliente,
      dataAtendimento: new Date().toLocaleDateString('pt-BR')
    };

    setClientes([...clientes, cliente]);
    setNovoCliente({
      nome: "",
      telefone: "",
      email: "",
      servico: "",
      valor: 0
    });

    toast({
      title: "Cliente adicionado",
      description: "Cliente registrado com sucesso!"
    });
  };

  const gerarComprovante = (cliente: Cliente) => {
    const comprovante = `
=== COMPROVANTE DE PAGAMENTO ===
MBYTES07 - Assistência Técnica Remota

Cliente: ${cliente.nome}
Telefone: ${cliente.telefone}
Email: ${cliente.email}
Serviço: ${cliente.servico}
Valor: R$ ${cliente.valor},00
Data de Atendimento: ${cliente.dataAtendimento}

Ticket de Serviço: ${cliente.id}

Obrigado pela preferência!
WhatsApp: +55 (19) 99960-8356
================================
    `;

    // Criar um blob com o texto e fazer download
    const blob = new Blob([comprovante], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprovante_${cliente.nome}_${cliente.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Comprovante gerado",
      description: "Download do comprovante iniciado!"
    });
  };

  const valorTotalArrecadado = clientes.reduce((total, cliente) => total + cliente.valor, 0);

  return (
    <section id="admin" className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Painel Administrativo
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Gerencie clientes, gere comprovantes e acompanhe estatísticas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-blue">{clientes.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Valor Arrecadado</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-green">R$ {valorTotalArrecadado},00</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Comprovantes Gerados</CardTitle>
              <FileText className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">{clientes.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader>
              <CardTitle className="text-white">Cadastrar Novo Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome" className="text-white">Nome *</Label>
                <Input
                  id="nome"
                  value={novoCliente.nome}
                  onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})}
                  placeholder="Nome completo do cliente"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="text-white">Telefone *</Label>
                <Input
                  id="telefone"
                  value={novoCliente.telefone}
                  onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
                  placeholder="(19) 99999-9999"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoCliente.email}
                  onChange={(e) => setNovoCliente({...novoCliente, email: e.target.value})}
                  placeholder="cliente@email.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="servico" className="text-white">Serviço *</Label>
                <Select 
                  value={novoCliente.servico}
                  onValueChange={(value) => {
                    const servicoSelecionado = servicos.find(s => s.nome === value);
                    setNovoCliente({
                      ...novoCliente, 
                      servico: value,
                      valor: servicoSelecionado?.valor || 0
                    });
                  }}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {servicos.map((servico) => (
                      <SelectItem key={servico.nome} value={servico.nome} className="text-white hover:bg-gray-700">
                        {servico.nome} - R$ {servico.valor},00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={adicionarCliente}
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
              >
                Cadastrar Cliente
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader>
              <CardTitle className="text-white">Lista de Clientes</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {clientes.length === 0 ? (
                <p className="text-center text-gray-400">Nenhum cliente cadastrado</p>
              ) : (
                <div className="space-y-4">
                  {clientes.map((cliente) => (
                    <div key={cliente.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{cliente.nome}</h4>
                          <p className="text-sm text-gray-300">{cliente.telefone}</p>
                          {cliente.email && <p className="text-sm text-gray-300">{cliente.email}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-brand-green">R$ {cliente.valor},00</p>
                          <p className="text-xs text-gray-400">{cliente.dataAtendimento}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{cliente.servico}</p>
                      <Button
                        size="sm"
                        onClick={() => gerarComprovante(cliente)}
                        className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Gerar Comprovante
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;

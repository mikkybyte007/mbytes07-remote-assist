
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/mbytes07informatica@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Recebemos sua mensagem e responderemos em breve.",
        });
        form.reset();
      } else {
        throw new Error("Erro ao enviar mensagem");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-tomorrow">
            Envie sua Mensagem
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Descreva seu problema e entraremos em contato rapidamente
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/50 border-brand-green/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-brand-green" />
              </div>
              <CardTitle className="text-white text-xl">Formulário de Contato</CardTitle>
              <CardDescription className="text-gray-300">
                Preencha os campos abaixo e enviaremos uma resposta para seu e-mail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_subject" value="Nova solicitação de suporte - MBYTES Informática" />
                
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white">Telefone (opcional)</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(19) 99999-9999"
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-white">Descreva seu problema</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Conte-nos detalhadamente qual problema está enfrentando com seu computador..."
                    required
                    rows={6}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

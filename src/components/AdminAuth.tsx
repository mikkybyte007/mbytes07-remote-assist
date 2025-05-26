
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = () => {
    setIsLoading(true);
    
    // Senha administrativa simples (em produção, use autenticação mais robusta)
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      onAuthenticated();
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo ao painel administrativo!"
      });
    } else {
      toast({
        title: "Acesso negado",
        description: "Senha incorreta",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
    setPassword('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <section className="py-20 bg-black/80">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-gray-900/90 border-brand-green/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-brand-green" />
              </div>
              <CardTitle className="text-white text-2xl">Acesso Administrativo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-password" className="text-white">Senha do Administrador</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite a senha administrativa"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <Button 
                onClick={handleAuth}
                disabled={isLoading}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold"
              >
                {isLoading ? 'Verificando...' : 'Acessar Painel'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminAuth;

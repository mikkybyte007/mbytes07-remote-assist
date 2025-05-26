
import { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import AdminAuth from './AdminAuth';

const ProtectedAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdminSection, setShowAdminSection] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Verificar se deve mostrar a seção admin (sequência de teclas especial)
    const handleKeySequence = (e: KeyboardEvent) => {
      // Detectar Ctrl+Shift+A para mostrar acesso administrativo
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminSection(true);
      }
    };

    window.addEventListener('keydown', handleKeySequence);
    return () => window.removeEventListener('keydown', handleKeySequence);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setShowAdminSection(false);
  };

  // Se não está mostrando a seção admin, não renderiza nada
  if (!showAdminSection) {
    return null;
  }

  // Se não está autenticado, mostra tela de login
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  // Se está autenticado, mostra o painel com opção de logout
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Sair do Admin
        </button>
      </div>
      <AdminPanel />
    </div>
  );
};

export default ProtectedAdminPanel;

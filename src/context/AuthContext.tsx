import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, googleSignIn, logoutGoogle } from '../services/googleAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<User | null> => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result?.user) {
        setUser(result.user);
        return result.user;
      }
      return null;
    } catch (err: any) {
      console.error('Falha ao autenticar com Google:', err);
      let errorMsg = 'Não foi possível conectar com o Google. Tente novamente.';
      if (err?.code === 'auth/popup-blocked') {
        errorMsg = 'O pop-up de login foi bloqueado pelo seu navegador. Por favor, permita pop-ups para este site.';
      } else if (err?.code === 'auth/popup-closed-by-user') {
        errorMsg = 'A janela de autenticação foi fechada antes de concluir o login.';
      } else if (err?.code === 'auth/cancelled-popup-request') {
        errorMsg = 'Solicitação de login cancelada.';
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      return null;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await logoutGoogle();
      setUser(null);
    } catch (err: any) {
      console.error('Erro ao sair da conta:', err);
      setError('Erro ao desconectar.');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggingIn,
        error,
        loginWithGoogle,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};

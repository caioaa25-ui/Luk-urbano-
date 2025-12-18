
import React, { useState } from 'react';
import { ViewState } from '../types';
import Button from './ui/Button';

interface AuthProps {
  mode: 'login' | 'register';
  onSuccess: (type: 'client' | 'partner') => void;
  onSwitchMode: (mode: ViewState) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onSuccess, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'client' | 'partner'>('client');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(userType);
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 border border-gray-100 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Entre com seu e-mail' : 'Crie sua conta LookUrbano'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-ml-blue outline-none transition-all font-medium"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-ml-blue outline-none transition-all font-medium"
                placeholder="Sua senha"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ml-blue transition-colors"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Perfil da Conta:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`py-3 rounded-lg text-xs font-bold uppercase border-2 transition-all ${userType === 'client' ? 'border-ml-blue bg-blue-50 text-ml-blue' : 'border-gray-100 text-gray-400'}`}
                >
                  <i className="fas fa-shopping-bag mr-2"></i> Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('partner')}
                  className={`py-3 rounded-lg text-xs font-bold uppercase border-2 transition-all ${userType === 'partner' ? 'border-ml-blue bg-blue-50 text-ml-blue' : 'border-gray-100 text-gray-400'}`}
                >
                  <i className="fas fa-handshake mr-2"></i> Vendedor
                </button>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
            >
              {mode === 'login' ? 'CONECTAR' : 'CADASTRAR'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-sm font-medium text-gray-500">
            {mode === 'login' ? 'Ainda não é membro?' : 'Já possui conta?'}
            <button
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="ml-2 text-ml-blue font-bold hover:underline"
            >
              {mode === 'login' ? 'Cadastre-se' : 'Entrar agora'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

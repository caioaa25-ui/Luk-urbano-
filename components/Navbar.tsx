
import React from 'react';
import { ViewState, UserProfile } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentView: ViewState;
  user?: UserProfile | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, cartCount, onOpenCart, currentView, user, onLogout }) => {
  return (
    <header className="header-gradient w-full fixed top-0 left-0 z-50 shadow-sm border-b border-yellow-200">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Top Row: Logo and Nav Items */}
        <div className="flex items-center justify-between py-3 gap-2">
          <div className="flex items-center gap-4">
            <div 
              className="cursor-pointer flex items-center gap-1" 
              onClick={() => onNavigate('home')}
            >
              <span className="text-2xl font-black text-blue-700 italic tracking-tighter">LookUrbano</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenCart} className="relative p-2 text-gray-800 hover:scale-110 transition-transform">
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-yellow-200">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate(user.type === 'admin' ? 'admin-dashboard' : user.type === 'partner' ? 'partner-dashboard' : 'client-dashboard')}
                  className="flex items-center gap-2 bg-white/30 px-3 py-1.5 rounded-full text-xs font-bold text-blue-900 border border-white/40"
                >
                  <i className="fas fa-user-circle text-lg"></i>
                  <span className="hidden sm:inline">Perfil</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="text-xs font-bold text-blue-900 bg-white/30 px-4 py-2 rounded-full border border-white/40"
              >
                ENTRAR
              </button>
            )}

            <button 
              onClick={() => onNavigate('stylist')} 
              className="p-2 text-blue-700 hover:rotate-12 transition-transform"
              title="Personal Stylist IA"
            >
              <i className="fas fa-magic text-xl"></i>
            </button>
          </div>
        </div>

        {/* Search Bar Row (Identical to Mobile Look) */}
        <div className="pb-3 flex gap-2">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Buscar em LookUrbano..." 
              className="w-full h-10 px-4 py-2 rounded-md shadow-inner border border-yellow-200 outline-none text-sm placeholder:text-gray-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="fas fa-search text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

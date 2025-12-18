
import React from 'react';
import Button from './ui/Button';
import { UserProfile } from '../types';

interface ClientDashboardProps {
  user: UserProfile | null;
  sellerName?: string;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, sellerName = "Consultoria LookUrbano" }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Perfil */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border shadow-sm text-gray-400">
              <i className="fas fa-user text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{user?.name || 'Cliente'}</h3>
            <p className="text-xs text-ml-blue font-bold uppercase tracking-widest mt-1">Membro VIP LookUrbano</p>
            
            {/* Vendedor Responsável */}
            <div className="mt-8 pt-6 border-t border-dashed">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Seu Consultor de Estilo</p>
              <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
                <div className="w-10 h-10 bg-ml-blue rounded-full flex items-center justify-center text-white text-xs">
                   <i className="fas fa-user-tie"></i>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900 truncate">{sellerName}</p>
                  <p className="text-[10px] text-ml-green font-bold uppercase">Atendimento Online</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {[
              { id: 'orders', label: 'Meus Pedidos', icon: 'fa-shopping-bag', active: true },
              { id: 'favs', label: 'Favoritos', icon: 'fa-heart', active: false },
              { id: 'settings', label: 'Minha Conta', icon: 'fa-cog', active: false }
            ].map(item => (
              <button key={item.id} className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-all ${item.active ? 'bg-blue-50 text-ml-blue font-bold border-r-4 border-ml-blue' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}>
                <i className={`fas ${item.icon} text-lg`}></i>
                <span className="text-xs uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <span className="text-xs font-bold text-gray-400 uppercase">Cashback LookUrbano</span>
              <p className="text-3xl font-bold text-ml-blue mt-2 italic">R$ 45,00</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <span className="text-xs font-bold text-gray-400 uppercase">Pedidos Recentes</span>
              <p className="text-3xl font-bold text-gray-900 mt-2 italic">02</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="font-bold text-sm uppercase mb-6 flex items-center gap-2">
              <i className="fas fa-history text-ml-blue"></i> Histórico de Compras
            </h4>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-6 p-4 bg-gray-50/50 border rounded-lg hover:bg-white transition-all">
                  <div className="w-16 h-16 bg-white rounded border overflow-hidden">
                    <img src={i === 1 ? "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100" : "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100"} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-ml-green">Entregue</p>
                    <h5 className="text-sm font-bold text-gray-800">{i === 1 ? 'Blazer Estruturado' : 'Camisa Silk Oversized'}</h5>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Vendido por: <span className="text-ml-blue font-bold">{sellerName}</span></p>
                  </div>
                  <Button variant="outlined" size="sm">DETALHES</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

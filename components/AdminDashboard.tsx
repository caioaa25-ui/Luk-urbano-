
import React, { useState } from 'react';
import Button from './ui/Button';

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<'overview' | 'payouts' | 'products'>('overview');

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Control Center</h2>
          <p className="text-gray-500 font-medium">Administração Global LookUrbano</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button onClick={() => setView('overview')} className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${view === 'overview' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}>Visão Geral</button>
          <button onClick={() => setView('payouts')} className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${view === 'payouts' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}>Pagamentos</button>
          <button onClick={() => setView('products')} className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${view === 'products' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}>Estoque</button>
        </div>
      </div>

      {view === 'overview' && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Receita Total', val: 'R$ 145.670', color: 'text-gray-900', icon: 'fa-chart-pie' },
              { label: 'Lucro Líquido', val: 'R$ 42.120', color: 'text-ml-green', icon: 'fa-dollar-sign' },
              { label: 'Afiliados Ativos', val: '124', color: 'text-ml-blue', icon: 'fa-users' },
              { label: 'Pedidos Pendentes', val: '18', color: 'text-orange-500', icon: 'fa-clock' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm group hover:border-ml-blue transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-gray-200 group-hover:text-ml-blue transition-colors`}></i>
                </div>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h4 className="font-black text-sm uppercase tracking-wider">Últimas Transações da Plataforma</h4>
              <Button variant="ghost" size="sm">Download CSV</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-gray-400 border-b">
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Vendedor</th>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Venda</th>
                    <th className="px-6 py-4">Comissão</th>
                    <th className="px-6 py-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-medium">14/10/24</td>
                      <td className="px-6 py-4 font-bold text-ml-blue">Marcos Souza</td>
                      <td className="px-6 py-4">Blazer Premium...</td>
                      <td className="px-6 py-4 font-bold text-gray-900">R$ 459,90</td>
                      <td className="px-6 py-4 font-bold text-ml-green">R$ 45,99</td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-gray-900"><i className="fas fa-ellipsis-h"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {view === 'payouts' && (
        <div className="animate-fadeIn max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-hand-holding-usd text-ml-green"></i> Solicitações de Saque de Afiliados
          </h3>
          <div className="bg-white rounded-2xl border shadow-sm divide-y">
            {[1, 2].map(i => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400">
                    {i === 1 ? 'RS' : 'ML'}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 uppercase tracking-tighter">{i === 1 ? 'Ricardo Silva' : 'Maria Luiza'}</p>
                    <p className="text-xs text-gray-500">PIX: {i === 1 ? 'ricardo@email.com' : '45.923.842/0001-20'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900">R$ {i === 1 ? '850,00' : '1.240,00'}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Solicitado em 15/10</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="success" size="sm">APROVAR</Button>
                    <Button variant="danger" size="sm">RECUSAR</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'products' && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed animate-fadeIn">
          <i className="fas fa-boxes text-4xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 font-bold">Módulo de Estoque em desenvolvimento...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

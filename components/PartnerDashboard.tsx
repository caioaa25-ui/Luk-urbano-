
import React, { useState } from 'react';
import Button from './ui/Button';
import { UserProfile, BankDetails, Product } from '../types';

interface Props {
  user: UserProfile | null;
  adminProducts?: Product[];
}

const PartnerDashboard: React.FC<Props> = ({ user, adminProducts = [] }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'finance' | 'links' | 'catalog'>('sales');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dados pré-preenchidos de forma profissional para evitar erros de escrita
  const [bankData, setBankData] = useState<BankDetails>(user?.bankDetails || {
    pixKey: user?.email || 'financeiro@lookurbano.com.br',
    bankName: 'Nubank S.A.',
    accountType: 'corrente',
    document: '123.456.789-00'
  });

  const appBaseUrl = window.location.origin;
  const affiliateLink = `${appBaseUrl}/?ref=${user?.id || 'parceiro_master'}`;

  const copyToClipboard = (text: string = affiliateLink) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveFinance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("✅ Dados bancários salvos com sucesso!");
    }, 1200);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 animate-slide-up">
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white text-2xl border-4 border-white shadow-lg">
            <i className="fas fa-crown"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tighter italic uppercase">Gerente de Estilo</h2>
            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Nível: Platinum Expert</p>
          </div>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl border overflow-x-auto max-w-full">
          {[
            { id: 'sales', label: 'Vendas', icon: 'fa-chart-line' },
            { id: 'finance', label: 'Dados Bancários', icon: 'fa-university' },
            { id: 'catalog', label: 'Sua Vitrine', icon: 'fa-shop' },
            { id: 'links', label: 'Links de Ouro', icon: 'fa-link' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border shadow-sm border-t-4 border-t-blue-600">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Disponível para Saque</span>
            <p className="text-4xl font-black text-gray-900 mt-2">R$ 1.842,50</p>
            <Button variant="outlined" size="sm" className="mt-4 rounded-full">SACAR VIA PIX</Button>
          </div>
          <div className="bg-white p-8 rounded-2xl border shadow-sm border-t-4 border-t-green-500">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendas Concluídas</span>
            <p className="text-4xl font-black text-gray-900 mt-2">37</p>
            <p className="text-[10px] text-green-600 font-bold mt-2">Sua meta: 50 vendas</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border shadow-sm border-t-4 border-t-yellow-400">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sua Comissão</span>
            <p className="text-4xl font-black text-gray-900 mt-2">12%</p>
            <p className="text-[10px] text-gray-400 font-bold mt-2">Taxa fixa por venda</p>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl border shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter">Onde quer receber?</h3>
            <p className="text-sm text-gray-500 font-medium">Configure seu PIX corretamente para evitar atrasos.</p>
          </div>
          
          <form onSubmit={handleSaveFinance} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Chave PIX Oficial</label>
              <input 
                type="text" 
                required 
                value={bankData.pixKey}
                onChange={e => setBankData({...bankData, pixKey: e.target.value})}
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold text-gray-800" 
                placeholder="E-mail, CPF ou Celular" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Nome do Banco</label>
              <input 
                type="text" 
                required
                value={bankData.bankName}
                onChange={e => setBankData({...bankData, bankName: e.target.value})}
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold text-gray-800" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">CPF do Titular</label>
              <input 
                type="text" 
                required
                inputMode="numeric"
                value={bankData.document}
                onChange={e => setBankData({...bankData, document: e.target.value})}
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold text-gray-800" 
              />
            </div>
            <Button fullWidth size="lg" type="submit" isLoading={isSaving} className="rounded-2xl shadow-xl uppercase">SALVAR DADOS</Button>
          </form>
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adminProducts.map(prod => (
            <div key={prod.id} className="bg-white rounded-2xl border p-4 hover:shadow-xl transition-all group">
               <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-gray-50">
                 <img src={prod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Button size="sm" fullWidth onClick={() => copyToClipboard(`${affiliateLink}&p=${prod.id}`)}>COPIAR MEU LINK</Button>
                 </div>
               </div>
               <h5 className="text-xs font-bold text-gray-800 truncate mb-1">{prod.name}</h5>
               <p className="text-lg font-black text-gray-900">R$ {prod.price.toFixed(2)}</p>
               <p className="text-[10px] text-green-600 font-black mt-1">GANHE: R$ {(prod.price * 0.12).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'links' && (
        <div className="max-w-2xl mx-auto py-12 text-center">
          <div className="bg-white p-12 rounded-[2.5rem] border shadow-2xl">
            <i className="fas fa-link text-5xl text-blue-600 mb-8"></i>
            <h3 className="text-3xl font-black text-gray-900 italic mb-4 uppercase tracking-tighter">Link Geral da Loja</h3>
            <p className="text-gray-500 mb-10 font-medium">Tudo que o cliente comprar vindo deste link rende sua comissão de 12%.</p>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col md:flex-row items-center gap-4">
              <code className="flex-1 text-[11px] font-black text-blue-700 truncate">{affiliateLink}</code>
              <Button size="md" onClick={() => copyToClipboard()}>
                {copied ? 'COPIADO!' : 'COPIAR'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerDashboard;

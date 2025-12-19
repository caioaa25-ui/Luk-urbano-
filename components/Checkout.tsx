
import React, { useState } from 'react';
import Button from './ui/Button';

interface CheckoutProps {
  items: any[];
  total: number;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, total, onComplete }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dados pré-preenchidos para teste imediato e evitar erros de digitação
  const [formData, setFormData] = useState({
    name: 'Henrique Almeida de Souza',
    cpf: '123.456.789-00',
    cep: '04571-010',
    address: 'Avenida Paulista, 1200 - Bela Vista, São Paulo/SP'
  });

  const pixCode = "00020126580014BR.GOV.BCB.PIX0136lookurbano-pix-key-pro-9283-4920-5204000053039865406"+total.toFixed(2).replace('.', '')+"5802BR5910LookUrbano6009Sao Paulo62070503***6304E2B1";

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2500);
  };

  const copyPix = () => {
    const el = document.createElement('textarea');
    el.value = pixCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("🚀 Código Pix Copiado!");
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 animate-slide-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="bg-[#fff159] px-8 py-5 flex gap-8 border-b">
               <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${step === 1 ? 'text-blue-800' : 'text-blue-900/40'}`}>
                 <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'border-blue-800 bg-white' : 'border-blue-900/20'}`}>1</span>
                 Entrega
               </div>
               <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${step === 2 ? 'text-blue-800' : 'text-blue-900/40'}`}>
                 <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'border-blue-800 bg-white' : 'border-blue-900/20'}`}>2</span>
                 Pagamento
               </div>
            </div>

            <div className="p-10">
              {step === 1 ? (
                <form onSubmit={(e) => {e.preventDefault(); setStep(2);}} className="space-y-6">
                  <h3 className="text-2xl font-black italic text-gray-900 uppercase tracking-tighter">Informações de Entrega</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Nome Completo</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">CPF (Somente Números)</label>
                      <input 
                        type="text" 
                        required 
                        inputMode="numeric" 
                        value={formData.cpf}
                        onChange={e => setFormData({...formData, cpf: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">CEP</label>
                      <input 
                        type="text" 
                        required 
                        inputMode="numeric" 
                        value={formData.cep}
                        onChange={e => setFormData({...formData, cep: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Endereço Completo</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 font-bold transition-all" 
                      />
                    </div>
                  </div>
                  <Button fullWidth size="lg" type="submit" className="rounded-2xl shadow-xl uppercase mt-4">IR PARA O PAGAMENTO</Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black italic text-gray-900 uppercase tracking-tighter">Forma de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-8 border-2 rounded-[2rem] flex flex-col items-center gap-3 transition-all ${paymentMethod === 'pix' ? 'border-green-500 bg-green-50 shadow-md scale-[1.02]' : 'border-gray-100'}`}
                    >
                      <i className="fab fa-pix text-4xl text-green-500"></i>
                      <span className="text-[11px] font-black uppercase text-gray-700">PIX</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('credit')}
                      className={`p-8 border-2 rounded-[2rem] flex flex-col items-center gap-3 transition-all ${paymentMethod === 'credit' ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]' : 'border-gray-100'}`}
                    >
                      <i className="fas fa-credit-card text-4xl text-blue-500"></i>
                      <span className="text-[11px] font-black uppercase text-gray-700">CARTÃO</span>
                    </button>
                  </div>

                  {paymentMethod === 'pix' ? (
                    <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                       <p className="text-xs font-black text-gray-600 mb-6 uppercase">Pague e receba aprovação instantânea!</p>
                       <textarea readOnly value={pixCode} className="w-full h-24 p-4 text-[10px] font-mono border-2 border-gray-100 rounded-2xl mb-5 bg-white resize-none outline-none" />
                       <Button variant="success" fullWidth onClick={copyPix} className="rounded-2xl uppercase">COPIAR PIX</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       <input type="text" inputMode="numeric" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold focus:border-blue-500 transition-all outline-none" placeholder="Número do Cartão" />
                       <div className="grid grid-cols-2 gap-4">
                         <input type="text" inputMode="numeric" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold focus:border-blue-500 transition-all outline-none" placeholder="MM/AA" />
                         <input type="text" inputMode="numeric" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold focus:border-blue-500 transition-all outline-none" placeholder="CVV" />
                       </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button variant="ghost" onClick={() => setStep(1)} className="uppercase">VOLTAR</Button>
                    <Button fullWidth size="lg" isLoading={isProcessing} onClick={handleComplete} className="rounded-2xl shadow-xl uppercase">CONFIRMAR COMPRA</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-2xl border sticky top-32 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h4 className="font-black text-sm uppercase tracking-tighter italic">Seu Carrinho</h4>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[11px] font-bold text-gray-800 line-clamp-1 uppercase leading-tight">{item.name}</h5>
                      <p className="text-xs font-black text-blue-700 mt-1">1x R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-dashed">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total do Look</span>
                   <span className="text-3xl font-black text-blue-700 italic leading-none">R$ {total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-green-600 font-black text-right uppercase">Frete Full Grátis Ativo</p>
              </div>
            </div>
            <div className="p-5 bg-green-50 text-center">
               <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">
                 <i className="fas fa-lock mr-2"></i> Pagamento 100% Protegido
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

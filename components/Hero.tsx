
import React from 'react';
import Button from './ui/Button';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="w-full bg-[#f5f5f5] pt-4 pb-6 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div 
          onClick={onShopNow}
          className="relative w-full aspect-[21/9] md:aspect-[32/10] rounded-xl overflow-hidden cursor-pointer shadow-lg bg-[#00a650] group"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
             <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase italic tracking-tighter">
               OFERTAS DE VERÃO
             </h2>
             <p className="text-white/90 text-sm md:text-lg font-medium mt-2 mb-6 max-w-lg">
               O melhor da moda nacional com descontos imperdíveis e entrega em 24h.
             </p>
             <button className="bg-white text-[#00a650] px-8 py-3 rounded-md font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-xl">
               APROVEITAR AGORA
             </button>
          </div>
        </div>

        {/* Categories / Info Chips */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 custom-scrollbar scroll-smooth">
          {[
            { label: 'Frete Grátis', icon: 'fa-truck-fast', color: 'text-green-600' },
            { label: 'Moda Masculina', icon: 'fa-user-tie', color: 'text-blue-600' },
            { label: 'Moda Feminina', icon: 'fa-person-dress', color: 'text-pink-600' },
            { label: 'Acessórios', icon: 'fa-gem', color: 'text-orange-600' },
            { label: 'Lançamentos', icon: 'fa-fire', color: 'text-red-600' },
          ].map((cat, i) => (
            <div key={i} className="flex-shrink-0 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <i className={`fas ${cat.icon} ${cat.color} text-sm`}></i>
              <span className="text-[11px] font-bold uppercase text-gray-700 whitespace-nowrap">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;


import React from 'react';
import { CartItem } from '../types';
import Button from './ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, total, onCheckout }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">Meu Carrinho</h2>
            <span className="px-2 py-0.5 bg-ml-blue text-white text-[10px] rounded-full font-bold">{items.length}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-basket text-3xl text-gray-200"></i>
              </div>
              <p className="text-gray-900 font-bold mb-1">Seu carrinho está vazio</p>
              <p className="text-xs text-gray-400 px-10">Adicione produtos e aproveite o frete grátis a partir de R$ 79,00.</p>
              <Button onClick={onClose} className="mt-6">COMEÇAR A COMPRAR</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 group">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-ml-blue transition-colors">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <i className="fas fa-trash-alt text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center bg-gray-50 border rounded-sm overflow-hidden h-7">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 flex items-center justify-center hover:bg-gray-200 transition-colors text-xs">-</button>
                        <span className="w-8 text-[11px] font-bold text-center border-x">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 flex items-center justify-center hover:bg-gray-200 transition-colors text-xs">+</button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 font-medium">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-4 border-t">
                <span>TOTAL</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <Button fullWidth size="lg" onClick={onCheckout}>FINALIZAR COMPRA</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

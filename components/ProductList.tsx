
import React from 'react';
import { Product } from '../types';
import Button from './ui/Button';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onBuyNow }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-1">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg card-shadow group overflow-hidden flex flex-col border border-gray-200/60 hover:border-blue-300 transition-all"
        >
          {/* Image Section */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-2 gap-2">
                <Button size="sm" fullWidth onClick={() => onAddToCart(product)} className="text-[10px]">CARRINHO</Button>
                <Button size="sm" fullWidth variant="success" onClick={() => onBuyNow(product)} className="text-[10px]">COMPRAR</Button>
            </div>
            {/* Discount Badge */}
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
              FRETE FULL
            </div>
          </div>

          {/* Details Section */}
          <div className="p-3 flex flex-col flex-1">
            <h3 className="text-[12px] text-gray-500 font-medium line-clamp-2 min-h-[32px] mb-1 leading-tight uppercase">
              {product.name}
            </h3>
            
            <div className="mt-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 line-through">R$ {(product.price * 1.2).toFixed(2)}</span>
              </div>
              <p className="text-xl font-black text-gray-900 leading-none">R$ {product.price.toFixed(2)}</p>
              <p className="text-[11px] text-green-600 font-bold mt-1">10x de R$ {(product.price/10).toFixed(2)} sem juros</p>
              
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[9px] font-black text-green-600 uppercase italic tracking-tighter">Entrega amanhã</span>
                <i className="fas fa-bolt text-green-600 text-[10px]"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

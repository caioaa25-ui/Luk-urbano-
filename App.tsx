
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Auth from './components/Auth';
import ClientDashboard from './components/ClientDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Checkout from './components/Checkout';
import { Product, CartItem, ViewState, UserProfile } from './types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Blazer Estruturado Premium', price: 459.90, category: 'Alfaiataria', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500', sizes: ['P', 'M', 'G'], description: 'Blazer elegante para todas as ocasiões.' },
  { id: '2', name: 'Vestido Midi Casual Verão', price: 289.00, category: 'Vestidos', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500', sizes: ['PP', 'P', 'M'], description: 'Leveza e estilo.' },
  { id: '3', name: 'Calça Wide Leg Conforto', price: 199.90, category: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500', sizes: ['36', '38', '40', '42'], description: 'O clássico urbano.' },
  { id: '4', name: 'Camisa Silk Oversized', price: 159.00, category: 'Camisas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500', sizes: ['P', 'M', 'G'], description: 'Toque suave e caimento perfeito.' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [affiliateId, setAffiliateId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seller = params.get('ref');
    if (seller) {
      setAffiliateId(seller);
      localStorage.setItem('last_affiliate_id', seller);
    } else {
      const stored = localStorage.getItem('last_affiliate_id');
      if (stored) setAffiliateId(stored);
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    setCart([{ ...product, quantity: 1 }]);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleLoginSuccess = (type: any) => {
    if (type === 'admin') {
       setUser({ id: 'admin', name: 'Administrador LookUrbano', email: 'admin@lookurbano.com', type: 'admin' });
       setCurrentView('admin-dashboard');
    } else {
       const role = type as 'client' | 'partner';
       setUser({ 
         id: 'user_' + Date.now(), 
         name: role === 'client' ? 'Marcos Oliveira' : 'Consultor Parceiro', 
         email: 'user@email.com', 
         type: role,
         balance: role === 'partner' ? 850.00 : 0
       });
       setCurrentView(role === 'client' ? 'client-dashboard' : 'partner-dashboard');
    }
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setCurrentView('success');
    window.scrollTo(0, 0);
  };

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const currentSellerName = affiliateId ? (affiliateId === 'partner-id' ? "Consultor VIP" : `Vendedor #${affiliateId}`) : "Loja LookUrbano Oficial";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar 
        onNavigate={setCurrentView} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
        user={user}
        onLogout={() => { setUser(null); setCurrentView('home'); }}
      />
      
      <main className="pt-[100px] pb-20">
        {currentView === 'home' && (
          <>
            <Hero onShopNow={() => setCurrentView('catalog')} />
            <div className="max-w-[1200px] mx-auto px-4 py-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Sugestões LookUrbano</h2>
              <ProductList products={MOCK_PRODUCTS} onAddToCart={addToCart} onBuyNow={handleBuyNow} />
            </div>
          </>
        )}

        {currentView === 'catalog' && (
          <div className="max-w-[1200px] mx-auto px-4 py-8 animate-fadeIn">
            <h1 className="text-2xl font-bold mb-8">Nossa Coleção</h1>
            <ProductList products={MOCK_PRODUCTS} onAddToCart={addToCart} onBuyNow={handleBuyNow} />
          </div>
        )}
        
        {currentView === 'login' && <Auth mode="login" onSuccess={handleLoginSuccess} onSwitchMode={setCurrentView} />}
        {currentView === 'register' && <Auth mode="register" onSuccess={handleLoginSuccess} onSwitchMode={setCurrentView} />}
        
        {currentView === 'client-dashboard' && (
          <ClientDashboard user={user} sellerName={currentSellerName} />
        )}
        
        {currentView === 'partner-dashboard' && (
          <PartnerDashboard user={user} adminProducts={MOCK_PRODUCTS} />
        )}
        
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        
        {currentView === 'checkout' && (
          <Checkout items={cart} total={cartTotal} onComplete={handleCheckoutComplete} />
        )}

        {currentView === 'success' && (
          <div className="max-w-md mx-auto py-20 text-center px-4 animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold mb-2">Pedido Recebido!</h2>
            <p className="text-gray-500 mb-8">Seu pagamento está sendo processado.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => setCurrentView('client-dashboard')} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md">Meus Pedidos</button>
              <button onClick={() => setCurrentView('home')} className="w-full py-4 bg-white text-gray-700 font-bold rounded-lg border">Continuar Comprando</button>
            </div>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
        onCheckout={() => { setIsCartOpen(false); setCurrentView('checkout'); }}
      />
    </div>
  );
};

export default App;

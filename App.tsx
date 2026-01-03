
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PricingMode, Product, CartItem, User, Order, UserRole, CompanySettings } from './types';
import { MOCK_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import CartDrawer from './components/CartDrawer';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [pricingMode, setPricingMode] = useState<PricingMode>(PricingMode.RETAIL);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'TERROÁ',
    cnpj: '12.345.678/0001-90',
    logo: '', // Se vazio, usa o SVG padrão
    address: 'Fazenda Raiz, KM 42 - Chapada Diamantina, BA',
    phone: '(71) 99876-5432',
    email: 'contato@terroa.com'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('terroa_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedSettings = localStorage.getItem('terroa_settings');
    if (savedSettings) setCompanySettings(JSON.parse(savedSettings));
  }, []);

  const updateSettings = (newSettings: CompanySettings) => {
    setCompanySettings(newSettings);
    localStorage.setItem('terroa_settings', JSON.stringify(newSettings));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${companySettings.name} - B2B`,
          text: 'Conheça nosso catálogo de produtos naturais direto do campo.',
          url: window.location.origin
        });
      } catch (err) {
        console.log('Erro ao compartilhar');
      }
    } else {
      alert('Link copiado para a área de transferência!');
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('terroa_user');
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = pricingMode === PricingMode.WHOLESALE ? item.wholesalePrice : item.retailPrice;
      return acc + (price * item.quantity);
    }, 0);
  }, [cart, pricingMode]);

  const userOrders = useMemo(() => {
    return user?.role === UserRole.ADMIN ? orders : orders.filter(o => o.userId === user?.id);
  }, [orders, user]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-terroa-green/20 selection:text-terroa-green">
        <Navbar 
          user={user} 
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)}
          pricingMode={pricingMode}
          setPricingMode={setPricingMode}
          onLogout={handleLogout}
          companyName={companySettings.name}
          companyLogo={companySettings.logo}
        />
        
        <main className="flex-grow pt-32 md:pt-40 pb-16 container mx-auto px-4 md:px-6">
          <Routes>
            <Route path="/" element={<Catalog pricingMode={pricingMode} setPricingMode={setPricingMode} addToCart={addToCart} />} />
            <Route path="/checkout" element={
              user ? (
                <Checkout 
                  cart={cart} 
                  user={user}
                  pricingMode={pricingMode} 
                  total={cartTotal} 
                  onOrderPlaced={(order) => {
                    setOrders([order, ...orders]);
                    clearCart();
                  }}
                />
              ) : <Navigate to="/login" />
            } />
            <Route path="/orders" element={user ? <Orders orders={userOrders} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={
              user?.role === UserRole.ADMIN 
                ? <AdminDashboard 
                    allOrders={orders} 
                    setOrders={setOrders} 
                    settings={companySettings}
                    onUpdateSettings={updateSettings}
                  /> 
                : <Navigate to="/" />
            } />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          pricingMode={pricingMode}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          total={cartTotal}
        />

        <footer className="bg-white border-t border-terroa-sand py-12">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex flex-col items-center md:items-start gap-4">
                <Logo className="h-12" customLogo={companySettings.logo} showText={false} />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-black font-terroa-title text-terroa-brown uppercase tracking-tighter leading-none">{companySettings.name}</span>
                  <p className="text-terroa-green text-sm font-terroa-script lowercase">a essência da raiz</p>
                </div>
             </div>
             
             <div className="flex flex-col items-center md:items-end gap-6">
                <button 
                  onClick={handleShare}
                  className="bg-terroa-green text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-terroa-brown transition-all shadow-xl flex items-center gap-3"
                >
                  <i className="fas fa-share-alt"></i>
                  Compartilhar App
                </button>
                <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-terroa-brown/60">
                  <a href="#" className="hover:text-terroa-green transition-colors">Origens</a>
                  <a href="#" className="hover:text-terroa-green transition-colors">Termos</a>
                  <a href="#" className="hover:text-terroa-green transition-colors">Parceiros</a>
                </div>
             </div>

             <p className="text-terroa-brown/40 text-[11px] font-medium text-center md:text-right">
              &copy; 2024 {companySettings.name} B2B. <br/>Conectando a essência ao seu negócio.
             </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;

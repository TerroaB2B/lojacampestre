
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, PricingMode, UserRole } from '../types';
import Logo from './Logo';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onOpenCart: () => void;
  pricingMode: PricingMode;
  setPricingMode: (mode: PricingMode) => void;
  onLogout: () => void;
  companyName?: string;
  companyLogo?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  cartCount, 
  onOpenCart, 
  pricingMode, 
  setPricingMode,
  onLogout,
  companyName = 'TERROÁ',
  companyLogo
}) => {
  const location = useLocation();
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-40 h-24 md:h-32 flex items-center border-b border-terroa-sand">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-2">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0 group">
          <Logo className="h-14 md:h-20" customLogo={companyLogo} />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-black font-terroa-title text-terroa-brown tracking-tighter group-hover:text-terroa-green transition-colors">{companyName}</h1>
            <p className="text-[9px] font-black text-terroa-green uppercase tracking-widest leading-tight">B2B Solutions</p>
          </div>
        </Link>

        {/* Pricing Mode Toggle */}
        <div className="flex bg-terroa-sand p-1 rounded-full border border-terroa-sand shadow-inner scale-75 sm:scale-90 md:scale-100 mx-auto sm:mx-0">
          <button 
            onClick={() => setPricingMode(PricingMode.RETAIL)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest transition-all ${
              pricingMode === PricingMode.RETAIL 
              ? 'bg-white text-terroa-green shadow-md' 
              : 'text-terroa-brown/60 hover:text-terroa-brown'
            }`}
          >
            Varejo
          </button>
          <button 
            onClick={() => setPricingMode(PricingMode.WHOLESALE)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest transition-all ${
              pricingMode === PricingMode.WHOLESALE 
              ? 'bg-terroa-brown text-white shadow-md' 
              : 'text-terroa-brown/60 hover:text-terroa-brown'
            }`}
          >
            Atacado
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={`text-xs font-black uppercase tracking-[0.2em] ${location.pathname === '/' ? 'text-terroa-green border-b-2 border-terroa-green pb-1' : 'text-terroa-brown/70 hover:text-terroa-green transition-colors'}`}>Catálogo</Link>
            {user && (
              <>
                {isAdmin && (
                  <Link to="/admin" className={`text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all ${location.pathname === '/admin' ? 'ring-2 ring-orange-200' : ''}`}>
                    <i className="fas fa-lock mr-2"></i>
                    Admin
                  </Link>
                )}
                <Link to="/orders" className={`text-xs font-black uppercase tracking-[0.2em] ${location.pathname === '/orders' ? 'text-terroa-green border-b-2 border-terroa-green pb-1' : 'text-terroa-brown/70 hover:text-terroa-green transition-colors'}`}>Pedidos</Link>
                <Link to="/profile" className={`text-xs font-black uppercase tracking-[0.2em] ${location.pathname === '/profile' ? 'text-terroa-green border-b-2 border-terroa-green pb-1' : 'text-terroa-brown/70 hover:text-terroa-green transition-colors'}`}>Perfil</Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {!user ? (
              <Link to="/login" className="hidden sm:block bg-terroa-green text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-terroa-green/90 transition-all shadow-lg shadow-terroa-green/20">
                Entrar
              </Link>
            ) : (
              <button onClick={onLogout} className="text-terroa-brown hover:text-red-600 transition-colors p-2 bg-terroa-sand rounded-full">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            )}

            <button 
              onClick={onOpenCart}
              className="relative p-2.5 sm:p-3 bg-terroa-brown text-white rounded-full hover:bg-terroa-brown/90 transition-all shadow-xl shadow-terroa-brown/10"
            >
              <i className="fas fa-shopping-basket text-base sm:text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terroa-green text-white text-[9px] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-black border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

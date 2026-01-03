
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem, PricingMode } from '../types';
import { WHOLESALE_MIN_ORDER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  pricingMode: PricingMode;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  total: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  pricingMode, 
  updateQuantity, 
  removeFromCart,
  total 
}) => {
  const isWholesale = pricingMode === PricingMode.WHOLESALE;
  const isBelowMin = isWholesale && total < WHOLESALE_MIN_ORDER;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-terroa-brown/40 backdrop-blur-md z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-terroa-light z-50 shadow-2xl flex flex-col transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-terroa-sand flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black text-terroa-brown uppercase tracking-tighter">Cesta Terroá</h2>
            <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isWholesale ? 'text-terroa-green' : 'text-terroa-brown/40'}`}>
              {isWholesale ? 'Modalidade Atacado' : 'Modalidade Varejo'}
            </p>
          </div>
          <button onClick={onClose} className="p-3 bg-terroa-sand hover:bg-terroa-green hover:text-white rounded-full transition-all text-terroa-brown">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-terroa-sand rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-basket-shopping text-terroa-brown/20 text-4xl"></i>
              </div>
              <h3 className="text-terroa-brown font-black uppercase tracking-widest text-sm">Sua cesta está vazia</h3>
              <p className="text-xs text-terroa-brown/40 font-bold uppercase tracking-widest mt-4">Nossa colheita espera por você</p>
              <button onClick={onClose} className="mt-8 text-terroa-green font-black uppercase tracking-[0.2em] text-[10px] underline underline-offset-8 decoration-2">Explorar Origens</button>
            </div>
          ) : (
            cart.map((item) => {
              const price = isWholesale ? item.wholesalePrice : item.retailPrice;
              return (
                <div key={item.id} className="flex gap-6 border-b border-terroa-sand pb-6 group">
                  <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-terroa-sand">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-black text-terroa-brown uppercase tracking-tight">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-terroa-brown/20 hover:text-red-500 transition-colors">
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-terroa-brown/40 uppercase tracking-widest mb-3">{item.unit}</p>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center bg-terroa-sand rounded-xl p-1 shadow-inner">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-terroa-brown hover:bg-white rounded-lg transition-all"
                        >
                          <i className="fas fa-minus text-[8px]"></i>
                        </button>
                        <span className="w-8 text-center text-xs font-black text-terroa-brown">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-terroa-brown hover:bg-white rounded-lg transition-all"
                        >
                          <i className="fas fa-plus text-[8px]"></i>
                        </button>
                      </div>
                      <span className="text-sm font-black text-terroa-green">
                        {(price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white border-t border-terroa-sand space-y-6">
            {isBelowMin && (
              <div className="bg-terroa-brown/5 border border-terroa-brown/10 p-5 rounded-[1.5rem] flex gap-4 shadow-sm">
                <i className="fas fa-info-circle text-terroa-brown mt-1"></i>
                <div className="text-[10px] text-terroa-brown font-black uppercase tracking-widest leading-relaxed">
                  <p className="mb-1">Pedido Mínimo Atacado</p>
                  <p className="text-terroa-green opacity-80">Faltam <b>{(WHOLESALE_MIN_ORDER - total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-terroa-brown/40">
                <span>Subtotal</span>
                <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-terroa-brown tracking-tighter pt-3 border-t border-terroa-sand">
                <span className="uppercase text-sm tracking-[0.2em] self-center">Total</span>
                <span className="text-terroa-green">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>

            <Link 
              to={isBelowMin ? '#' : '/checkout'} 
              onClick={(e) => {
                if(isBelowMin) e.preventDefault();
                else onClose();
              }}
              className={`w-full py-5 rounded-[1.5rem] flex items-center justify-center gap-4 font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl ${
                isBelowMin 
                ? 'bg-terroa-sand text-terroa-brown/30 cursor-not-allowed' 
                : 'bg-terroa-brown text-white hover:bg-terroa-green shadow-terroa-brown/10'
              }`}
            >
              Confirmar Origem
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, PricingMode, Order, OrderStatus, User } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  user: User;
  pricingMode: PricingMode;
  total: number;
  onOrderPlaced: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, pricingMode, total, onOrderPlaced }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Por favor, informe o endereço de entrega.');

    setIsProcessing(true);
    
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 6).toUpperCase(),
        userId: user.id,
        userName: user.name,
        businessName: user.businessName,
        date: new Date().toISOString(),
        items: [...cart],
        total,
        status: OrderStatus.RECEIVED,
        pricingMode
      };
      
      onOrderPlaced(newOrder);
      setIsProcessing(false);
      navigate('/orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <h2 className="text-3xl font-black text-terroa-brown uppercase tracking-tighter mb-4">Cesta Desocupada</h2>
        <p className="text-terroa-brown/50 font-bold uppercase tracking-widest text-[10px] mb-10">Você precisa selecionar itens da raiz para continuar.</p>
        <button onClick={() => navigate('/')} className="bg-terroa-green text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl">Voltar ao Catálogo</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 mt-8">
      <h1 className="text-4xl font-black text-terroa-brown tracking-tighter uppercase border-b-4 border-terroa-green inline-block pb-2">Finalizar Pedido</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-terroa-sand">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-terroa-brown mb-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-terroa-sand rounded-full flex items-center justify-center">
                <i className="fas fa-truck text-terroa-green"></i>
              </div>
              Destino da Colheita
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 ml-2 mb-2">Endereço do Estabelecimento</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, Número, Bairro, Cidade - CEP"
                  className="w-full p-6 bg-terroa-sand/30 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all h-32 text-sm font-bold text-terroa-brown"
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-terroa-sand">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-terroa-brown mb-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-terroa-sand rounded-full flex items-center justify-center">
                <i className="fas fa-hand-holding-dollar text-terroa-green"></i>
              </div>
              Forma de Pagamento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button 
                onClick={() => setPaymentMethod('pix')}
                className={`p-8 border-4 rounded-[2rem] flex flex-col items-center gap-4 transition-all ${paymentMethod === 'pix' ? 'border-terroa-green bg-terroa-green/5 text-terroa-green' : 'border-terroa-sand bg-terroa-sand/30 text-terroa-brown/30 hover:border-terroa-green/20'}`}
              >
                <i className="fab fa-pix text-4xl"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">PIX Instantâneo</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('boleto')}
                className={`p-8 border-4 rounded-[2rem] flex flex-col items-center gap-4 transition-all ${paymentMethod === 'boleto' ? 'border-terroa-green bg-terroa-green/5 text-terroa-green' : 'border-terroa-sand bg-terroa-sand/30 text-terroa-brown/30 hover:border-terroa-green/20'}`}
              >
                <i className="fas fa-file-invoice-dollar text-4xl"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Boleto Faturado</span>
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-terroa-brown text-white p-10 rounded-[3rem] shadow-2xl sticky top-28 border-b-8 border-terroa-green">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 text-terroa-light">Resumo do Pedido</h3>
            <div className="space-y-5 mb-10">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-terroa-light/40">
                <span>Subtotal</span>
                <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-terroa-light/40">
                <span>Logística</span>
                <span className="text-terroa-green">Gratuita</span>
              </div>
              <div className="pt-5 border-t border-white/10 flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-terroa-light/60">Total</span>
                <span className="text-3xl font-black text-terroa-green tracking-tighter leading-none">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-terroa-green hover:bg-white hover:text-terroa-green text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-terroa-green/10 flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-seedling fa-spin"></i>
                  Processando...
                </>
              ) : (
                <>
                  Confirmar Pedido
                  <i className="fas fa-check-circle"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

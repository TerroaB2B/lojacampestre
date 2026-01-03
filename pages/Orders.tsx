
import React from 'react';
import { Order } from '../types';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-terroa-brown uppercase tracking-tighter">Meus Pedidos</h1>
          <p className="text-terroa-brown/50 font-bold uppercase tracking-widest text-[10px] mt-2">Acompanhe a jornada dos seus produtos da terra.</p>
        </div>
        <button className="text-terroa-green text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
          <i className="fas fa-file-export mr-2"></i>
          Exportar Histórico
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-terroa-sand shadow-sm">
          <div className="w-20 h-20 bg-terroa-sand rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-receipt text-terroa-brown/20 text-3xl"></i>
          </div>
          <h2 className="text-xl font-black text-terroa-brown uppercase tracking-tight">Nenhuma colheita registrada</h2>
          <p className="text-terroa-brown/40 mt-3 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto">Comece a abastecer seu estoque com a essência da raiz hoje mesmo.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-terroa-sand overflow-hidden hover:border-terroa-green/30 transition-all duration-300">
              <div className="p-8">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-terroa-sand rounded-2xl flex items-center justify-center shadow-inner">
                      <i className="fas fa-box text-terroa-brown"></i>
                    </div>
                    <div>
                      <h3 className="font-black text-terroa-brown text-xl uppercase tracking-tight">Pedido #{order.id}</h3>
                      <p className="text-[10px] font-bold text-terroa-brown/40 uppercase tracking-widest mt-1">
                        {new Date(order.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-terroa-green/10 text-terroa-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {order.status}
                    </span>
                    <span className="text-[9px] font-black text-terroa-brown/30 uppercase tracking-[0.2em] mt-2">Previsão: Próxima rota</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-terroa-sand/30 rounded-3xl mb-8 border border-terroa-sand/50">
                  <div>
                    <p className="text-[9px] text-terroa-brown/30 uppercase font-black tracking-widest mb-1">Modalidade</p>
                    <p className="text-xs font-black text-terroa-brown uppercase">{order.pricingMode === 'WHOLESALE' ? 'Atacado' : 'Varejo'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-terroa-brown/30 uppercase font-black tracking-widest mb-1">Volume</p>
                    <p className="text-xs font-black text-terroa-brown uppercase">{order.items.reduce((a, b) => a + b.quantity, 0)} itens</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-terroa-brown/30 uppercase font-black tracking-widest mb-1">Total</p>
                    <p className="text-xs font-black text-terroa-green uppercase">{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-terroa-brown/30 uppercase font-black tracking-widest mb-1">Pagamento</p>
                    <p className="text-xs font-black text-terroa-brown uppercase">PIX</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="flex-grow md:flex-grow-0 px-6 py-3 border-2 border-terroa-sand rounded-xl text-[10px] font-black uppercase tracking-widest text-terroa-brown/60 hover:bg-terroa-sand transition-all">
                    Nota Fiscal
                  </button>
                  <button className="flex-grow md:flex-grow-0 px-6 py-3 border-2 border-terroa-sand rounded-xl text-[10px] font-black uppercase tracking-widest text-terroa-brown/60 hover:bg-terroa-sand transition-all">
                    Repetir Pedido
                  </button>
                  <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-terroa-brown text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-terroa-green transition-all shadow-lg shadow-terroa-brown/10 ml-auto">
                    Rastrear Entrega
                  </button>
                </div>
              </div>
              
              <div className="px-8 pb-8 pt-0">
                <div className="relative h-2 bg-terroa-sand rounded-full mt-2 overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 h-full w-1/4 bg-terroa-green rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

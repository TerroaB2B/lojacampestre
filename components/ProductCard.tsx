
import React, { useState } from 'react';
import { Product, PricingMode } from '../types';

interface ProductCardProps {
  product: Product;
  pricingMode: PricingMode;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, pricingMode, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const currentPrice = pricingMode === PricingMode.WHOLESALE ? product.wholesalePrice : product.retailPrice;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white rounded-[2rem] border border-terroa-sand overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col group hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-terroa-sand/30">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black text-terroa-brown uppercase tracking-widest shadow-sm">
            {product.category}
          </span>
          {pricingMode === PricingMode.WHOLESALE && (
            <span className="bg-terroa-brown px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-md">
              Lote Atacado
            </span>
          )}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-terroa-brown/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-terroa-brown px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Esgotado</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-black text-terroa-brown text-lg leading-tight mb-2 group-hover:text-terroa-green transition-colors">{product.name}</h3>
        <p className="text-terroa-brown/50 text-xs font-medium line-clamp-2 mb-4 h-9 leading-relaxed">{product.description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-terroa-brown">
              {currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="text-[10px] font-bold text-terroa-brown/40 uppercase tracking-widest">/ {product.unit}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${product.stock < 20 ? 'text-orange-600' : 'text-terroa-green'}`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.stock < 20 ? 'bg-orange-600' : 'bg-terroa-green'}`}></div>
              {product.stock} unidades disponíveis
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center bg-terroa-sand/50 rounded-2xl overflow-hidden h-12 p-1 border border-transparent hover:border-terroa-green/20 transition-all">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={isOutOfStock}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-terroa-brown disabled:opacity-30 transition-all"
            >
              <i className="fas fa-minus text-xs"></i>
            </button>
            <input 
              type="number" 
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={isOutOfStock}
              className="flex-grow text-center text-sm font-black text-terroa-brown focus:outline-none bg-transparent"
            />
            <button 
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              disabled={isOutOfStock}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-terroa-brown disabled:opacity-30 transition-all"
            >
              <i className="fas fa-plus text-xs"></i>
            </button>
          </div>
          
          <button 
            onClick={() => onAddToCart(product, qty)}
            disabled={isOutOfStock}
            className="w-full bg-terroa-green text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-terroa-green/90 transition-all flex items-center justify-center gap-3 disabled:bg-terroa-sand disabled:text-terroa-brown/30 disabled:cursor-not-allowed shadow-lg hover:shadow-terroa-green/20"
          >
            <i className="fas fa-seedling"></i>
            Colher Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

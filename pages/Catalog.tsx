
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { PricingMode, Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CatalogProps {
  pricingMode: PricingMode;
  setPricingMode: (mode: PricingMode) => void;
  addToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ pricingMode, setPricingMode, addToCart }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-10 mt-8 max-w-[1600px] mx-auto">
      {/* Hero Section Responsive */}
      <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-terroa-brown text-white p-8 md:p-20 shadow-2xl border-b-[12px] border-terroa-green">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 md:mb-12 leading-[1.05] tracking-tighter">
            Conectando <span className="text-terroa-green">Origem</span> <br/>ao seu Negócio.
          </h1>
          
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-10 md:gap-16">
            <div className="space-y-4 w-full xl:w-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-terroa-green">Escolha como abastecer:</p>
              <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-[2rem] border border-white/10 shadow-2xl w-full sm:w-max">
                <button 
                  onClick={() => setPricingMode(PricingMode.RETAIL)}
                  className={`flex-grow sm:flex-none px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                    pricingMode === PricingMode.RETAIL 
                    ? 'bg-white text-terroa-brown shadow-xl' 
                    : 'text-white/60 hover:text-white'
                  }`}
                >
                  Varejo
                </button>
                <button 
                  onClick={() => setPricingMode(PricingMode.WHOLESALE)}
                  className={`flex-grow sm:flex-none px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                    pricingMode === PricingMode.WHOLESALE 
                    ? 'bg-terroa-green text-white shadow-xl' 
                    : 'text-white/60 hover:text-white'
                  }`}
                >
                  Atacado B2B
                </button>
              </div>
            </div>

            <div className="hidden lg:flex flex-wrap gap-10 border-l border-white/10 pl-10">
              <div className="space-y-2">
                <p className="text-3xl font-black text-terroa-green leading-none">500+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Itens Ativos</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-black text-white leading-none">24h</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Tempo Logístico</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-black text-white leading-none">100%</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Origem Pura</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-2/5 opacity-30 hidden lg:block pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" alt="harvest" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        {/* Sidebar Desktop - Filtros Dinâmicos */}
        <aside className="w-full lg:w-80 space-y-8 sticky top-40 h-fit">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-terroa-sand">
            <h2 className="font-black text-terroa-brown text-xs uppercase tracking-[0.2em] mb-10 flex items-center justify-between border-b border-terroa-sand pb-4">
              Categorias
              <i className="fas fa-leaf text-[10px] text-terroa-green"></i>
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between group ${!selectedCategory ? 'bg-terroa-green text-white shadow-xl shadow-terroa-green/20' : 'text-terroa-brown/50 hover:bg-terroa-sand hover:text-terroa-brown'}`}
              >
                Todos
                <i className={`fas fa-chevron-right text-[8px] transition-transform ${!selectedCategory ? 'translate-x-1' : 'opacity-0'}`}></i>
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between group ${selectedCategory === cat ? 'bg-terroa-green text-white shadow-xl shadow-terroa-green/20' : 'text-terroa-brown/50 hover:bg-terroa-sand hover:text-terroa-brown'}`}
                >
                  {cat}
                  <i className={`fas fa-chevron-right text-[8px] transition-transform ${selectedCategory === cat ? 'translate-x-1' : 'opacity-0'}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-terroa-sand/50 p-10 rounded-[2.5rem] border border-terroa-sand hidden lg:block">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-6 text-terroa-brown/30">Suporte ao Parceiro</h3>
            <p className="text-xs font-bold text-terroa-brown/60 leading-relaxed mb-8">Dúvidas sobre o fechamento de carga ou faturamento? Nossa equipe B2B está pronta.</p>
            <a href="#" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-terroa-green hover:text-terroa-brown transition-colors">
              <i className="fab fa-whatsapp text-lg"></i>
              Central WhatsApp
            </a>
          </div>
        </aside>

        {/* Catalog Content Area */}
        <div className="flex-grow space-y-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-terroa-sand flex flex-col md:flex-row gap-8 items-center">
            <div className="relative flex-grow w-full">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-terroa-brown/30"></i>
              <input 
                type="text" 
                placeholder="Busque por ingredientes, marcas ou origem..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-terroa-sand/40 border-2 border-transparent focus:bg-white focus:border-terroa-green outline-none transition-all text-sm font-bold text-terroa-brown"
              />
            </div>
            <div className="flex items-center gap-4 min-w-[240px] w-full md:w-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-terroa-brown/30 whitespace-nowrap">Ordenar:</span>
              <select className="flex-grow bg-terroa-sand/40 border-none rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest text-terroa-brown outline-none cursor-pointer focus:ring-2 focus:ring-terroa-green/20">
                <option>Tendências</option>
                <option>Novas Colheitas</option>
                <option>Maior Valor</option>
                <option>Menor Valor</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-10">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  pricingMode={pricingMode}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[4rem] p-32 text-center border-2 border-dashed border-terroa-sand">
              <i className="fas fa-leaf text-terroa-sand text-7xl mb-10"></i>
              <h3 className="text-terroa-brown font-black text-4xl tracking-tighter mb-4">Solo Infértil</h3>
              <p className="text-terroa-brown/40 font-bold uppercase tracking-widest text-[11px] max-w-sm mx-auto leading-relaxed">Não encontramos itens para sua busca atual. Tente redefinir os filtros ou categorias.</p>
              <button 
                onClick={() => {setSearch(''); setSelectedCategory(null);}}
                className="mt-12 px-12 py-5 bg-terroa-brown text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-terroa-green transition-all shadow-2xl"
              >
                Resetar Origem
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;

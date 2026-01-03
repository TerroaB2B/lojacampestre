
import React, { useState, useMemo } from 'react';
import { Product, Order, OrderStatus, User, CompanySettings } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AdminDashboardProps {
  allOrders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  settings: CompanySettings;
  onUpdateSettings: (settings: CompanySettings) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ allOrders, setOrders, settings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'customers' | 'settings'>('stats');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [customerSearch, setCustomerSearch] = useState('');
  const [editSettings, setEditSettings] = useState<CompanySettings>(settings);

  // Simulação de base de clientes estendida com histórico
  const mockCustomers: User[] = [
    { 
      id: 'c1', name: 'Ricardo Almeida', email: 'compras@mercadonatureza.com.br', businessName: 'Mercado Natureza Ltda', 
      cnpj: '45.123.890/0001-12', role: 'USER' as any, lastPurchaseDate: '2024-03-15', totalSpent: 4500.80 
    },
    { 
      id: 'c2', name: 'Bia Fernandes', email: 'chef@restauranteraiz.com', businessName: 'Restaurante Raiz & Sabor', 
      cnpj: '12.987.456/0001-88', role: 'USER' as any, lastPurchaseDate: '2024-03-10', totalSpent: 8900.50 
    },
    { 
      id: 'c3', name: 'Marcos Silva', email: 'marcos@emporiogourmet.com.br', businessName: 'Empório Gourmet Capital', 
      cnpj: '33.444.555/0002-33', role: 'USER' as any, lastPurchaseDate: '2024-03-01', totalSpent: 1200.00 
    },
    { 
      id: 'c4', name: 'Ana Souza', email: 'contato@cafeteriaterra.com', businessName: 'Cafeteria Terra Viva', 
      cnpj: '09.888.777/0001-00', role: 'USER' as any, lastPurchaseDate: '2024-02-20', totalSpent: 550.00 
    },
  ];

  // Calculando Analytics
  const topProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.stock || 0) - (a.stock || 0)).slice(0, 3);
  }, [products]);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(c => 
      c.businessName.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.cnpj?.includes(customerSearch)
    );
  }, [customerSearch]);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(editSettings);
    alert('Configurações atualizadas com sucesso!');
  };

  const totalRevenue = allOrders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      {/* Header com Navegação Desktop-First */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-terroa-sand shadow-sm">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-terroa-brown uppercase tracking-tighter leading-none">Painel de Controle</h1>
          <p className="text-terroa-brown/50 font-bold uppercase tracking-widest text-[10px] mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sistema Online • Gestão Integrada {settings.name}
          </p>
        </div>
        
        <nav className="flex bg-terroa-sand p-1.5 rounded-2xl border border-terroa-sand overflow-x-auto max-w-full no-scrollbar">
          {[
            { id: 'stats', label: 'Dashboard', icon: 'fa-chart-pie' },
            { id: 'products', label: 'Estoque', icon: 'fa-boxes-stacked' },
            { id: 'orders', label: 'Vendas', icon: 'fa-receipt' },
            { id: 'customers', label: 'Clientes', icon: 'fa-users' },
            { id: 'settings', label: 'Configurações', icon: 'fa-cog' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${activeTab === tab.id ? 'bg-white text-terroa-green shadow-lg shadow-terroa-green/5' : 'text-terroa-brown/50 hover:text-terroa-brown'}`}
            >
              <i className={`fas ${tab.icon} text-xs`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 1. DASHBOARD ANALYTICS */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-terroa-sand group hover:border-terroa-green transition-all">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-terroa-brown/30">Faturamento Bruto</p>
              <i className="fas fa-arrow-up-right-dots text-terroa-green"></i>
            </div>
            <h3 className="text-4xl font-black text-terroa-green tracking-tighter">
              {totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h3>
            <p className="text-[9px] font-bold text-terroa-brown/40 uppercase mt-4 tracking-wider">+12.5% em relação ao mês anterior</p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-terroa-sand">
            <p className="text-[10px] font-black uppercase tracking-widest text-terroa-brown/30 mb-6">Parceiros Ativos</p>
            <h3 className="text-4xl font-black text-terroa-brown tracking-tighter">
              {mockCustomers.length}
            </h3>
            <div className="flex gap-1 mt-4">
              <div className="h-1 w-full bg-terroa-green rounded-full"></div>
              <div className="h-1 w-2/3 bg-terroa-sand rounded-full"></div>
            </div>
          </div>

          {/* Widget Mais Vendidos */}
          <div className="md:col-span-2 bg-terroa-brown p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-terroa-green mb-6">Ranking de Colheita</p>
                <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">Produtos Estrela</h3>
                <div className="space-y-4">
                  {topProducts.map((p, idx) => (
                    <div key={p.id} className="flex items-center gap-4 group">
                      <span className="text-terroa-green font-black text-xl">0{idx + 1}</span>
                      <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{p.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <i className="fas fa-leaf text-4xl text-terroa-green animate-bounce"></i>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 bg-terroa-green/5 skew-x-12 translate-x-1/4"></div>
          </div>
        </div>
      )}

      {/* 2. GESTÃO DE ESTOQUE (PRODUTOS) */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-[2.5rem] border border-terroa-sand overflow-hidden shadow-sm">
          <div className="p-8 border-b border-terroa-sand flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-black text-terroa-brown uppercase tracking-tighter">Inventário Raiz</h2>
            <button className="bg-terroa-green text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-terroa-brown transition-all">
              Novo Produto +
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-terroa-sand/30 border-b border-terroa-sand">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40">Item / Categoria</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-center">Nível de Estoque</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-right">Tabela Varejo</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-right">Tabela Atacado</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-center">Gestão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-terroa-sand">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-terroa-sand/10 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img src={product.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="" />
                        <div>
                          <p className="font-black text-terroa-brown text-sm">{product.name}</p>
                          <p className="text-[9px] font-bold text-terroa-brown/40 uppercase tracking-widest">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="inline-flex items-center gap-4 bg-terroa-sand px-5 py-2.5 rounded-2xl border border-terroa-sand">
                          <button onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))} className="text-terroa-brown/40 hover:text-terroa-brown"><i className="fas fa-minus text-[10px]"></i></button>
                          <span className={`text-sm font-black ${product.stock < 20 ? 'text-orange-600' : 'text-terroa-brown'}`}>{product.stock}</span>
                          <button onClick={() => updateStock(product.id, product.stock + 1)} className="text-terroa-brown/40 hover:text-terroa-brown"><i className="fas fa-plus text-[10px]"></i></button>
                        </div>
                        {product.stock < 20 && <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Reposicão Necessária</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="text-sm font-black text-terroa-green">{product.retailPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="text-sm font-black text-terroa-brown">{product.wholesalePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button className="w-10 h-10 rounded-xl text-terroa-brown/20 hover:bg-terroa-green hover:text-white transition-all"><i className="fas fa-edit"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. GESTÃO DE CLIENTES & ÚLTIMAS COMPRAS */}
      {activeTab === 'customers' && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-terroa-sand flex flex-col xl:flex-row gap-8 items-center">
            <div className="relative flex-grow w-full">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-terroa-brown/30"></i>
              <input 
                type="text" 
                placeholder="Buscar parceiro por nome, CNPJ ou região..." 
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-terroa-sand/40 border-2 border-transparent focus:bg-white focus:border-terroa-green outline-none transition-all text-sm font-bold text-terroa-brown"
              />
            </div>
            <div className="flex gap-4 w-full xl:w-auto">
              <button className="flex-grow xl:flex-none px-10 py-5 bg-terroa-brown text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-terroa-green transition-all shadow-xl">Exportar Clientes</button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-terroa-sand overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1100px]">
                <thead>
                  <tr className="bg-terroa-sand/30 border-b border-terroa-sand">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40">Parceiro B2B</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40">Responsável</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40">Última Colheita</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-right">Investimento Total</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-terroa-sand">
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-terroa-sand/10 transition-colors cursor-pointer group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-terroa-sand rounded-2xl flex items-center justify-center border border-terroa-sand group-hover:bg-white transition-colors">
                            <i className="fas fa-store text-terroa-brown/30 text-lg"></i>
                          </div>
                          <div>
                            <p className="font-black text-terroa-brown text-sm">{customer.businessName}</p>
                            <p className="text-[9px] font-black text-terroa-brown/40 uppercase tracking-widest font-mono">{customer.cnpj}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs font-bold text-terroa-brown/70">{customer.name}</p>
                        <p className="text-[9px] font-bold text-terroa-green lowercase mt-1">{customer.email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <p className="text-xs font-black text-terroa-brown">
                            {customer.lastPurchaseDate ? new Date(customer.lastPurchaseDate).toLocaleDateString('pt-BR') : '--/--/--'}
                          </p>
                          <span className="text-[8px] font-black text-terroa-brown/30 uppercase mt-1">Há {Math.floor(Math.random() * 30)} dias</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <p className="text-sm font-black text-terroa-green">
                          {customer.totalSpent?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <div className="flex justify-center gap-3">
                            <button title="Ver Histórico" className="w-10 h-10 bg-terroa-sand rounded-xl text-terroa-brown/40 hover:bg-terroa-brown hover:text-white transition-all">
                              <i className="fas fa-file-invoice text-xs"></i>
                            </button>
                            <button title="Painel 360" className="w-10 h-10 bg-terroa-sand rounded-xl text-terroa-brown/40 hover:bg-terroa-green hover:text-white transition-all">
                              <i className="fas fa-eye text-xs"></i>
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONFIGURAÇÕES DE MARCA & EMPRESA */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-sm border border-terroa-sand overflow-hidden">
          <div className="bg-terroa-brown p-12 text-white relative">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Identidade & Origem</h2>
            <p className="text-terroa-light/40 text-[10px] font-black uppercase tracking-widest">Personalize como o mundo vê sua marca raiz.</p>
            <i className="fas fa-fingerprint absolute top-12 right-12 text-white/5 text-8xl"></i>
          </div>
          
          <form onSubmit={handleSaveSettings} className="p-12 space-y-12">
            {/* Logo Upload Section */}
            <div className="flex flex-col md:flex-row gap-12 items-center border-b border-terroa-sand pb-12">
              <div className="relative group">
                <div className="w-40 h-40 bg-terroa-sand rounded-[2rem] border-4 border-dashed border-terroa-brown/10 flex items-center justify-center overflow-hidden">
                  {editSettings.logo ? (
                    <img src={editSettings.logo} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <i className="fas fa-cloud-arrow-up text-terroa-brown/20 text-4xl"></i>
                  )}
                </div>
                <div className="absolute inset-0 bg-terroa-brown/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center cursor-pointer">
                  <span className="text-white text-[9px] font-black uppercase tracking-widest">Alterar Logo</span>
                </div>
              </div>
              <div className="flex-grow space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-terroa-brown/40">URL da Logomarca (PNG/SVG)</label>
                <input 
                  type="text" 
                  value={editSettings.logo}
                  onChange={(e) => setEditSettings({...editSettings, logo: e.target.value})}
                  className="w-full p-5 bg-terroa-sand/40 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-bold text-sm"
                  placeholder="https://sua-logo.com/logo.png"
                />
                <p className="text-[9px] text-terroa-brown/30 font-bold uppercase italic">Recomendado: Fundo transparente, proporção 1:1 ou 3:1.</p>
              </div>
            </div>

            {/* Dados da Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 ml-2">Razão Social / Nome Fantasia</label>
                <input 
                  type="text" 
                  value={editSettings.name}
                  onChange={(e) => setEditSettings({...editSettings, name: e.target.value})}
                  className="w-full p-5 bg-terroa-sand/40 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-black text-terroa-brown text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 ml-2">CNPJ Principal</label>
                <input 
                  type="text" 
                  value={editSettings.cnpj}
                  onChange={(e) => setEditSettings({...editSettings, cnpj: e.target.value})}
                  className="w-full p-5 bg-terroa-sand/40 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-black text-terroa-brown text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-terroa-brown/40 ml-2">Endereço da Matriz</label>
                <input 
                  type="text" 
                  value={editSettings.address}
                  onChange={(e) => setEditSettings({...editSettings, address: e.target.value})}
                  className="w-full p-5 bg-terroa-sand/40 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-bold text-terroa-brown text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-terroa-brown hover:bg-terroa-green text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-4"
            >
              Gravar Configurações
              <i className="fas fa-check-circle"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

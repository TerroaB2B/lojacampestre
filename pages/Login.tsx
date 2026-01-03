
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import Logo from '../components/Logo';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'admin-001',
      name: 'Admin Terroá',
      email: 'admin@terroa.com',
      businessName: 'Terroá Matriz',
      cnpj: '12.345.678/0001-90',
      role: UserRole.ADMIN
    };
    localStorage.setItem('terroa_user', JSON.stringify(adminUser));
    setUser(adminUser);
    navigate('/admin');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAdmin = email.toLowerCase() === 'admin@terroa.com';
    
    const mockUser: User = {
      id: isAdmin ? 'admin-001' : 'user-' + Math.random().toString(36).substr(2, 5),
      name: isAdmin ? 'Admin Terroá' : 'João Silva',
      email: email || (isAdmin ? 'admin@terroa.com' : 'contato@terroa.com'),
      businessName: businessName || (isAdmin ? 'Terroá Matriz' : 'Restaurante Raiz'),
      cnpj: '12.345.678/0001-90',
      role: isAdmin ? UserRole.ADMIN : UserRole.USER
    };

    localStorage.setItem('terroa_user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-12 rounded-[3rem] shadow-2xl border border-terroa-sand relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-3 bg-terroa-green"></div>
      
      <div className="text-center mb-12">
        <Logo className="h-20 mb-8" />
        <h1 className="text-3xl font-black text-terroa-brown tracking-tighter uppercase mb-2">
          {isRegistering ? 'Novo Parceiro' : 'Acesse seu Painel'}
        </h1>
        <p className="text-terroa-brown/50 font-bold uppercase tracking-widest text-[10px]">
          {isRegistering ? 'Abra as portas do seu negócio para a essência' : 'Gerencie seus pedidos com agilidade'}
        </p>
        
        {/* Quick Admin Access */}
        {!isRegistering && (
          <button 
            onClick={loginAsAdmin}
            className="mt-6 w-full bg-orange-50 text-orange-600 border-2 border-orange-100 p-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-user-shield"></i>
            Entrar como Administrador (Demo)
          </button>
        )}
      </div>

      <form onSubmit={handleAuth} className="space-y-6">
        {isRegistering && (
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-terroa-brown/40 ml-2">Razão Social / Nome</label>
            <input 
              type="text" 
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-4.5 bg-terroa-sand/30 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-bold text-terroa-brown text-sm placeholder:text-terroa-brown/20"
              placeholder="Sua empresa aqui"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-terroa-brown/40 ml-2">E-mail Corporativo</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4.5 bg-terroa-sand/30 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-bold text-terroa-brown text-sm placeholder:text-terroa-brown/20"
            placeholder="contato@empresa.com.br"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-terroa-brown/40 ml-2">Sua Senha</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4.5 bg-terroa-sand/30 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-terroa-green transition-all font-bold text-terroa-brown text-sm"
            placeholder="••••••••"
          />
          {!isRegistering && (
            <button type="button" className="text-[10px] text-terroa-green font-black uppercase tracking-widest hover:text-terroa-brown transition-colors mt-3 block ml-2 underline decoration-2 underline-offset-4">Recuperar Acesso</button>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-terroa-brown hover:bg-terroa-green text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-terroa-brown/20 mt-8 group"
        >
          {isRegistering ? 'Cadastrar Registro' : 'Entrar Agora'}
          <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
        </button>
      </form>

      <div className="mt-12 pt-10 border-t border-terroa-sand text-center">
        <p className="text-[10px] font-black text-terroa-brown/40 uppercase tracking-widest mb-4">
          {isRegistering ? 'Já é um parceiro?' : 'Deseja ser parceiro?'}
        </p>
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-terroa-green font-black uppercase tracking-[0.2em] text-[11px] hover:text-terroa-brown transition-all"
        >
          {isRegistering ? 'Fazer meu Login' : 'Cadastrar meu Estabelecimento'}
        </button>
      </div>
    </div>
  );
};

export default Login;

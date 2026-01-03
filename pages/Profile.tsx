
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-10 mt-8">
      <h1 className="text-4xl font-black text-terroa-brown uppercase tracking-tighter border-b-4 border-terroa-green inline-block pb-2">Meu Perfil</h1>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-terroa-sand overflow-hidden">
        <div className="bg-terroa-brown h-40 relative">
          <div className="absolute -bottom-14 left-10 w-28 h-28 bg-white rounded-3xl shadow-xl border-4 border-terroa-sand flex items-center justify-center p-3">
            <div className="w-full h-full bg-terroa-sand rounded-2xl flex items-center justify-center shadow-inner">
              <i className="fas fa-store text-terroa-brown/30 text-4xl"></i>
            </div>
          </div>
        </div>
        
        <div className="pt-20 p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-terroa-brown tracking-tight uppercase">{user.businessName}</h2>
              <p className="text-terroa-brown/40 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 mt-2">
                <i className="fas fa-envelope text-terroa-green"></i>
                {user.email}
              </p>
            </div>
            <button className="bg-terroa-sand text-terroa-brown px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-terroa-green hover:text-white transition-all shadow-sm">
              Editar Dados
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-terroa-brown/20 uppercase tracking-[0.3em]">Dados do Registro</h3>
              <div className="bg-terroa-sand/30 p-6 rounded-[2rem] space-y-4 border border-terroa-sand/50">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-terroa-brown/30 tracking-widest">Razão Social</span>
                  <span className="text-xs font-black text-terroa-brown text-right">{user.businessName}</span>
                </div>
                <div className="flex justify-between items-center border-t border-terroa-sand pt-4">
                  <span className="text-[9px] font-black uppercase text-terroa-brown/30 tracking-widest">CNPJ</span>
                  <span className="text-xs font-black text-terroa-brown">{user.cnpj}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-terroa-brown/20 uppercase tracking-[0.3em]">Gerenciamento</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-4 hover:bg-terroa-sand rounded-2xl text-[11px] font-black uppercase tracking-widest text-terroa-brown flex items-center gap-4 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-terroa-sand flex items-center justify-center group-hover:bg-white transition-colors">
                    <i className="fas fa-bell text-terroa-green text-[10px]"></i>
                  </div>
                  Alertas de Rota
                </button>
                <button className="w-full text-left p-4 hover:bg-terroa-sand rounded-2xl text-[11px] font-black uppercase tracking-widest text-terroa-brown flex items-center gap-4 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-terroa-sand flex items-center justify-center group-hover:bg-white transition-colors">
                    <i className="fas fa-shield-halved text-terroa-green text-[10px]"></i>
                  </div>
                  Chaves de Segurança
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left p-4 hover:bg-red-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-600 flex items-center gap-4 transition-all group mt-2"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-white transition-colors">
                    <i className="fas fa-sign-out-alt text-[10px]"></i>
                  </div>
                  Encerrar Sessão
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-terroa-brown rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10 border-b-8 border-terroa-green shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-4xl shadow-inner border border-white/10">
            <i className="fas fa-seedling text-terroa-green"></i>
          </div>
          <div>
            <h3 className="font-black text-2xl tracking-tight uppercase">Precisa de consultoria?</h3>
            <p className="text-terroa-light/40 text-[10px] font-bold uppercase tracking-widest mt-2">Nossos especialistas da terra estão à disposição.</p>
          </div>
        </div>
        <button className="bg-white text-terroa-brown px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-terroa-green hover:text-white transition-all shadow-xl relative z-10">
          Falar com Especialista
        </button>
      </div>
    </div>
  );
};

export default Profile;

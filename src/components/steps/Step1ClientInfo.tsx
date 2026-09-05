import React from 'react';
import { Building2, User, Phone, Mail, MapPin, UserCheck, Calendar } from 'lucide-react';
import { FormDataState } from '../../types';
import { formatPhone } from '../../utils/formatters';

interface Step1Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step1ClientInfo: React.FC<Step1Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">1. Identificação do Cliente & Transportadora</h2>
            <p className="text-sm text-slate-400">Dados cadastrais básicos e responsável pelo contato na frota.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nome da Transportadora */}
        <div className="md:col-span-2">
          <label htmlFor="companyName" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Nome da Transportadora <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="companyName"
              placeholder="Ex: TransBrasil Logística e Transportes Rodoviários Ltda"
              value={formData.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Pessoa de Contato */}
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Pessoa de Contato <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="contactPerson"
              placeholder="Ex: Carlos Eduardo Silveira"
              value={formData.contactPerson}
              onChange={(e) => onChange({ contactPerson: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Cargo / Função do Contato */}
        <div>
          <label htmlFor="contactRole" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Cargo / Departamento
          </label>
          <input
            type="text"
            id="contactRole"
            placeholder="Ex: Gerente de Frota / Comprador / Proprietário"
            value={formData.contactRole}
            onChange={(e) => onChange({ contactRole: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm"
          />
        </div>

        {/* Telefone / WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Telefone / WhatsApp <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              id="whatsapp"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={(e) => onChange({ whatsapp: formatPhone(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-1.5">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              id="email"
              placeholder="contato@transportadora.com.br"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Cidade & Estado */}
        <div className="grid grid-cols-3 gap-3 md:col-span-2">
          <div className="col-span-2">
            <label htmlFor="city" className="block text-sm font-semibold text-slate-200 mb-1.5">
              Cidade
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                id="city"
                placeholder="Ex: Rondonópolis, Paulínia, Cascavel..."
                value={formData.city}
                onChange={(e) => onChange({ city: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-slate-200 mb-1.5">
              UF
            </label>
            <input
              type="text"
              id="state"
              maxLength={2}
              placeholder="SP, MT..."
              value={formData.state.toUpperCase()}
              onChange={(e) => onChange({ state: e.target.value.toUpperCase() })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-sm uppercase text-center font-bold"
            />
          </div>
        </div>

        {/* Consultor Técnico da Recapadora */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <label htmlFor="consultantName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Consultor Técnico / Vendedor da Recapadora
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                id="consultantName"
                placeholder="Seu nome (Consultor Comercial da Recapadora)"
                value={formData.consultantName}
                onChange={(e) => onChange({ consultantName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/80 px-3 py-2.5 rounded-lg border border-slate-800 shrink-0">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Coleta iniciada hoje</span>
          </div>
        </div>
      </div>
    </div>
  );
};

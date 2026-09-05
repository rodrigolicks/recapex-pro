import React, { useState, useMemo } from 'react';
import { 
  Building2, Truck, Disc, Plus, Search, Filter, Download, 
  Trash2, Edit3, Eye, Copy, Share2, Calendar, MapPin, 
  TrendingUp, DollarSign, Award, ChevronRight, CheckCircle2, FileSpreadsheet, FileText, Check
} from 'lucide-react';
import { FormDataState } from '../types';
import { calculateFleetMetrics } from '../utils/calculations';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters';
import { exportCollectionsAsCSV, exportCollectionsAsJSON } from '../utils/storage';
import { downloadSurveyPDF } from '../utils/pdfGenerator';
import { useTheme } from '../context/ThemeContext';

interface SavedSurveysViewProps {
  collections: FormDataState[];
  onNewSurvey: () => void;
  onEditSurvey: (survey: FormDataState) => void;
  onViewReport: (survey: FormDataState) => void;
  onDeleteSurvey: (id: string) => void;
  onDuplicateSurvey: (survey: FormDataState) => void;
}

export const SavedSurveysView: React.FC<SavedSurveysViewProps> = ({
  collections,
  onNewSurvey,
  onEditSurvey,
  onViewReport,
  onDeleteSurvey,
  onDuplicateSurvey,
}) => {
  const { config, themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'trucks' | 'score'>('recent');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadPDF = (survey: FormDataState) => {
    setDownloadingId(survey.id);
    try {
      downloadSurveyPDF(survey, config.primaryHex);
    } catch (err) {
      console.error('Erro ao gerar PDF da coleta:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 2000);
    }
  };

  // Compute Global Dashboard KPIs
  const dashboardStats = useMemo(() => {
    let totalTrucks = 0;
    let totalTires = 0;
    let totalAnnualRetreads = 0;
    let totalAnnualSavings = 0;

    collections.forEach((col) => {
      const metrics = calculateFleetMetrics(col);
      totalTrucks += typeof col.truckCount === 'number' ? col.truckCount : 0;
      totalTires += metrics.totalEstimatedTires;
      totalAnnualRetreads += metrics.annualRetreadPotential;
      totalAnnualSavings += metrics.annualSavingsPotential;
    });

    return {
      totalSurveys: collections.length,
      totalTrucks,
      totalTires,
      totalAnnualRetreads,
      totalAnnualSavings,
    };
  }, [collections]);

  // Unique segments for filter
  const segments = useMemo(() => {
    const list = Array.from(new Set(collections.map(c => c.transportSegment).filter(Boolean)));
    return list;
  }, [collections]);

  // Filtered & Sorted list
  const filteredCollections = useMemo(() => {
    return collections.filter((item) => {
      const matchesSearch = 
        (item.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.contactPerson || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.consultantName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.predominantTruckBrand || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSegment = selectedSegment === 'all' || item.transportSegment === selectedSegment;

      return matchesSearch && matchesSegment;
    }).sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'trucks') {
        const aCount = typeof a.truckCount === 'number' ? a.truckCount : 0;
        const bCount = typeof b.truckCount === 'number' ? b.truckCount : 0;
        return bCount - aCount;
      }
      if (sortBy === 'score') {
        return calculateFleetMetrics(b).opportunityScore - calculateFleetMetrics(a).opportunityScore;
      }
      return 0;
    });
  }, [collections, searchTerm, selectedSegment, sortBy]);

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full max-w-full overflow-hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
            <span>Painel de Coletas & Frotas Cadastradas</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gestão técnica e comercial de transportadoras mapeadas para reforma de pneus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={exportCollectionsAsCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            title="Exportar em Planilha Excel (CSV)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Excel / CSV</span>
          </button>

          <button
            type="button"
            onClick={exportCollectionsAsJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            title="Exportar Backup JSON"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>JSON</span>
          </button>

          <button
            type="button"
            id="btn-nova-coleta"
            onClick={onNewSurvey}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-950 text-sm font-bold shadow-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: config.primaryHex,
              boxShadow: `0 10px 20px -5px ${config.primaryHex}40`
            }}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Nova Coleta</span>
          </button>
        </div>
      </div>

      {/* Global Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Frotas Cadastradas</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 mt-2">
            {dashboardStats.totalSurveys}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Transportadoras</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Caminhões Mapeados</span>
            <Truck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 mt-2">
            {formatNumber(dashboardStats.totalTrucks)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Veículos Pesados</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Potencial Reformas / Ano</span>
            <Disc className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400 mt-2">
            ~{formatNumber(dashboardStats.totalAnnualRetreads)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Pneus Recape / Ano</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Economia Anual Estimada</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {formatCurrency(dashboardStats.totalAnnualSavings)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Gerada às frotas</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between w-full max-w-full overflow-hidden">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar transportadora, contato, cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Segment Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs"
            >
              <option value="all" className="bg-slate-900">Todos os Segmentos</option>
              {segments.map((seg) => (
                <option key={seg} value={seg} className="bg-slate-900">{seg}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium"
            >
              <option value="recent" className="bg-slate-900">Mais Recentes</option>
              <option value="trucks" className="bg-slate-900">Maior Frota</option>
              <option value="score" className="bg-slate-900">Maior Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collections List */}
      {filteredCollections.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-200">Nenhuma coleta encontrada</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {searchTerm || selectedSegment !== 'all'
              ? 'Tente ajustar os filtros ou termo de busca para visualizar outros registros.'
              : 'Inicie sua primeira coleta de dados de pneus clicando no botão abaixo.'}
          </p>
          <button
            onClick={onNewSurvey}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Nova Coleta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCollections.map((col) => {
            const metrics = calculateFleetMetrics(col);
            return (
              <div
                key={col.id}
                id={`survey-card-${col.id}`}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all shadow-md flex flex-col justify-between w-full max-w-full overflow-hidden"
              >
                <div>
                  {/* Top card header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                          {col.transportSegment || 'Segmento não informado'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {formatDate(col.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 hover:text-amber-400 transition-colors cursor-pointer" onClick={() => onViewReport(col)}>
                        {col.companyName || 'Transportadora Sem Nome'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {col.city ? `${col.city}, ${col.state || ''}` : 'Local não especificado'}
                        </span>
                        {col.contactPerson && (
                          <span>• Contato: <strong className="text-slate-300">{col.contactPerson}</strong></span>
                        )}
                        {col.whatsapp && (
                          <span>• {col.whatsapp}</span>
                        )}
                      </div>
                    </div>

                    {/* Score badge */}
                    <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-center shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Score</div>
                      <div className="text-lg font-black text-amber-400">{metrics.opportunityScore}</div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 my-3 text-xs">
                    <div className="bg-slate-950/60 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Caminhões:</span>
                      <strong className="text-slate-200 font-bold">{col.truckCount || 0} veículos</strong>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Reforma Atual:</span>
                      <strong className="text-purple-300 font-bold truncate block">{col.currentRetreadBrand || '-'}</strong>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[11px]">Potencial Ano:</span>
                      <strong className="text-emerald-400 font-bold">~{formatNumber(metrics.annualRetreadPotential)} pneus</strong>
                    </div>
                  </div>

                  {/* Proposal Summary Snippet if available */}
                  {col.commercialProposalSuggestion && (
                    <div className="text-xs text-slate-400 line-clamp-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 mb-3">
                      <strong className="text-slate-300">Sugestão Comercial:</strong> {col.commercialProposalSuggestion}
                    </div>
                  )}
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => onViewReport(col)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-semibold border border-sky-500/30 transition-colors"
                      title="Visualizar laudo completo e WhatsApp"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha</span>
                    </button>

                    <button
                      onClick={() => handleDownloadPDF(col)}
                      disabled={downloadingId === col.id}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-950 text-xs font-bold shadow transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: config.primaryHex }}
                      title="Baixar Laudo Técnico Oficial em PDF"
                    >
                      {downloadingId === col.id ? (
                        <Check className="w-3.5 h-3.5 text-slate-950" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-slate-950" />
                      )}
                      <span>{downloadingId === col.id ? 'Baixando...' : 'PDF'}</span>
                    </button>

                    <button
                      onClick={() => onEditSurvey(col)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                      title="Editar respostas"
                    >
                      <Edit3 className="w-3.5 h-3.5" style={{ color: config.primaryHex }} />
                      <span>Editar</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateSurvey(col)}
                      className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Duplicar coleta para nova filial/visita"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Deseja realmente excluir a coleta da transportadora "${col.companyName || 'Sem nome'}"?`)) {
                          onDeleteSurvey(col.id);
                        }
                      }}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Excluir coleta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

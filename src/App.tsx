/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, ArrowRight, Save, CheckCircle, FileText, 
  RotateCcw, Sparkles, AlertCircle, Building2, Truck, Disc
} from 'lucide-react';
import { FormDataState } from './types';
import { INITIAL_FORM_STATE } from './data/constants';
import { 
  getCurrentDraft, saveCurrentDraft, clearCurrentDraft,
  getSavedCollections, saveCollectionToStorage, deleteCollectionFromStorage 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { StepProgress, STEPS_CONFIG } from './components/StepProgress';
import { Step1ClientInfo } from './components/steps/Step1ClientInfo';
import { Step2FleetProfile } from './components/steps/Step2FleetProfile';
import { Step3TireManagement } from './components/steps/Step3TireManagement';
import { Step4RetreadMarket } from './components/steps/Step4RetreadMarket';
import { Step5FuelEfficiency } from './components/steps/Step5FuelEfficiency';
import { Step6CommercialStrategy } from './components/steps/Step6CommercialStrategy';
import { SurveyReportModal } from './components/SurveyReportModal';
import { SavedSurveysView } from './components/SavedSurveysView';

export default function App() {
  const [currentView, setCurrentView] = useState<'form' | 'list'>('form');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataState>(() => getCurrentDraft());
  const [savedCollections, setSavedCollections] = useState<FormDataState[]>(() => getSavedCollections());
  const [activeModalSurvey, setActiveModalSurvey] = useState<FormDataState | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDraftSaved, setIsDraftSaved] = useState<boolean>(true);

  // Auto-save draft on form changes
  const handleFormUpdate = useCallback((updates: Partial<FormDataState>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveCurrentDraft(next);
      setIsDraftSaved(true);
      return next;
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNextStep = () => {
    // Basic validation per step
    if (currentStep === 1 && !formData.companyName.trim()) {
      showToast('⚠️ Por favor, informe o Nome da Transportadora para continuar.');
      return;
    }
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteSurvey();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    const updated = saveCollectionToStorage({ ...formData, status: 'draft' });
    setSavedCollections(updated);
    showToast('💾 Rascunho salvo com sucesso nas coletas!');
  };

  const handleCompleteSurvey = () => {
    const completedRecord: FormDataState = {
      ...formData,
      status: 'completed',
      companyName: formData.companyName.trim() || 'Transportadora Sem Nome',
      updatedAt: new Date().toISOString(),
      id: formData.id && !formData.id.startsWith('draft-') ? formData.id : `col-${Date.now()}`
    };

    const updated = saveCollectionToStorage(completedRecord);
    setSavedCollections(updated);
    clearCurrentDraft();

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    showToast('🎉 Coleta concluída com sucesso! Visualizando laudo técnico...');
    setActiveModalSurvey(completedRecord);
  };

  const handleNewSurvey = () => {
    const newDraft: FormDataState = {
      ...INITIAL_FORM_STATE,
      id: `draft-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFormData(newDraft);
    saveCurrentDraft(newDraft);
    setCurrentStep(1);
    setCurrentView('form');
    showToast('✨ Nova coleta iniciada!');
  };

  const handleEditSurvey = (survey: FormDataState) => {
    setFormData(survey);
    saveCurrentDraft(survey);
    setCurrentStep(1);
    setCurrentView('form');
    showToast(`📝 Editando coleta da "${survey.companyName || 'Transportadora'}"`);
  };

  const handleDuplicateSurvey = (survey: FormDataState) => {
    const duplicated: FormDataState = {
      ...survey,
      id: `col-${Date.now()}`,
      companyName: `${survey.companyName} (Cópia / Nova Visita)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = saveCollectionToStorage(duplicated);
    setSavedCollections(updated);
    showToast('📋 Coleta duplicada com sucesso!');
  };

  const handleDeleteSurvey = (id: string) => {
    const updated = deleteCollectionFromStorage(id);
    setSavedCollections(updated);
    showToast('🗑️ Coleta excluída.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        savedCount={savedCollections.length}
        isDraftSaved={isDraftSaved}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'list' ? (
          <SavedSurveysView
            collections={savedCollections}
            onNewSurvey={handleNewSurvey}
            onEditSurvey={handleEditSurvey}
            onViewReport={(survey) => setActiveModalSurvey(survey)}
            onDeleteSurvey={handleDeleteSurvey}
            onDuplicateSurvey={handleDuplicateSurvey}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Step Progress Tracker */}
            <StepProgress
              currentStep={currentStep}
              totalSteps={STEPS_CONFIG.length}
              onSelectStep={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Step Form Container */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur">
              {currentStep === 1 && (
                <Step1ClientInfo formData={formData} onChange={handleFormUpdate} />
              )}
              {currentStep === 2 && (
                <Step2FleetProfile formData={formData} onChange={handleFormUpdate} />
              )}
              {currentStep === 3 && (
                <Step3TireManagement formData={formData} onChange={handleFormUpdate} />
              )}
              {currentStep === 4 && (
                <Step4RetreadMarket formData={formData} onChange={handleFormUpdate} />
              )}
              {currentStep === 5 && (
                <Step5FuelEfficiency formData={formData} onChange={handleFormUpdate} />
              )}
              {currentStep === 6 && (
                <Step6CommercialStrategy formData={formData} onChange={handleFormUpdate} />
              )}

              {/* Bottom Form Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      id="btn-etapa-anterior"
                      onClick={handlePrevStep}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors w-full sm:w-auto"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Etapa Anterior</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-800 transition-colors w-full sm:w-auto"
                    title="Salvar progresso atual"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Salvar Rascunho</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentStep < 6 ? (
                    <button
                      type="button"
                      id="btn-proxima-etapa"
                      onClick={handleNextStep}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/25 transition-all w-full sm:w-auto"
                    >
                      <span>Próxima Etapa</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="btn-finalizar-coleta"
                      onClick={handleCompleteSurvey}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-sm font-black shadow-lg shadow-emerald-500/25 transition-all w-full sm:w-auto"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Finalizar Coleta & Gerar Laudo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Report Modal */}
      {activeModalSurvey && (
        <SurveyReportModal
          formData={activeModalSurvey}
          onClose={() => setActiveModalSurvey(null)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-slate-100 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* App Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500 print:hidden">
        <p>RecapData Pro • Sistema de Coleta Técnica de Pneus para Reformadoras e Recapadoras</p>
      </footer>
    </div>
  );
}

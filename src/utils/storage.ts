import { INITIAL_FORM_STATE, SAMPLE_SAVED_COLLECTIONS } from '../data/constants';
import { FormDataState } from '../types';

const STORAGE_KEY_COLLECTIONS = 'recapadora_coletas_v1';
const STORAGE_KEY_CURRENT_DRAFT = 'recapadora_draft_v1';

export function getSavedCollections(): FormDataState[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
    if (!raw) {
      // Seed with realistic sample collections
      localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(SAMPLE_SAVED_COLLECTIONS));
      return SAMPLE_SAVED_COLLECTIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading collections from storage', err);
    return SAMPLE_SAVED_COLLECTIONS;
  }
}

export function saveCollectionToStorage(collection: FormDataState): FormDataState[] {
  const existing = getSavedCollections();
  const index = existing.findIndex(c => c.id === collection.id);
  let updated: FormDataState[];

  const toSave: FormDataState = {
    ...collection,
    updatedAt: new Date().toISOString(),
    id: collection.id || `col-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
  };

  if (index >= 0) {
    updated = [...existing];
    updated[index] = toSave;
  } else {
    updated = [toSave, ...existing];
  }

  try {
    localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving collections to localStorage', err);
  }

  return updated;
}

export function deleteCollectionFromStorage(id: string): FormDataState[] {
  const existing = getSavedCollections();
  const updated = existing.filter(c => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting collection from localStorage', err);
  }
  return updated;
}

export function getCurrentDraft(): FormDataState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_DRAFT);
    if (raw) {
      return { ...INITIAL_FORM_STATE, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error loading draft', err);
  }
  return { ...INITIAL_FORM_STATE, id: `draft-${Date.now()}` };
}

export function saveCurrentDraft(draft: FormDataState): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_DRAFT, JSON.stringify(draft));
  } catch (err) {
    console.error('Error saving draft', err);
  }
}

export function clearCurrentDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_CURRENT_DRAFT);
  } catch (err) {
    console.error('Error clearing draft', err);
  }
}

export function exportCollectionsAsJSON(): void {
  const data = getSavedCollections();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `coletas_recapadora_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCollectionsAsCSV(): void {
  const data = getSavedCollections();
  if (data.length === 0) return;

  const headers = [
    'Data Coleta',
    'Consultor',
    'Transportadora',
    'Contato',
    'Telefone/WhatsApp',
    'Email',
    'Cidade/UF',
    'Segmento',
    'Qtd Caminhoes',
    'Qtd Pneus em Uso',
    'Marca Caminhao Principal',
    'Marca Pneu Novo Principal',
    'Marca Reforma Atual',
    'Preco Reforma (R$)',
    'Controle Pressao',
    'Borracharia Propria',
    'Controle Rendimento',
    'Controle Combustivel',
    'Conceito Reforma',
    'Fator Decisivo Fornecedor',
    'Acao Para Ser Fornecedor',
    'Proposta Comercial'
  ];

  const rows = data.map(item => [
    `"${new Date(item.createdAt).toLocaleDateString('pt-BR')}"`,
    `"${item.consultantName || ''}"`,
    `"${item.companyName || ''}"`,
    `"${item.contactPerson || ''} (${item.contactRole || ''})"`,
    `"${item.whatsapp || ''}"`,
    `"${item.email || ''}"`,
    `"${item.city || ''}/${item.state || ''}"`,
    `"${item.transportSegment || ''}"`,
    `"${item.truckCount || ''}"`,
    `"${item.tiresInUseCount || ''}"`,
    `"${item.predominantTruckBrand || ''}"`,
    `"${(item.predominantNewTireBrands || []).join('; ')}"`,
    `"${item.currentRetreadBrand || ''}"`,
    `"${item.averageRetreadPrice || ''}"`,
    `"${item.pressureControl || ''}"`,
    `"${item.hasOwnTireShop || ''}"`,
    `"${item.hasTireYieldControl || ''}"`,
    `"${item.hasFuelControl || ''}"`,
    `"${item.clientConceptOnRetread || ''}"`,
    `"${(item.currentSupplierDecisiveFactor || []).join('; ')}"`,
    `"${(item.actionToBecomeMainSupplier || []).join('; ')}"`,
    `"${(item.commercialProposalSuggestion || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `coletas_recapadora_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

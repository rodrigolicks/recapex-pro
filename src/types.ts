export type VehicleConfigurationType = 
  | 'toco_3_4' // 6 rodas
  | 'truck_6x2' // 10 rodas
  | 'cavalo_carreta_3e' // 18 rodas (Caminhão simples + Carreta)
  | 'vanderleia' // 18 rodas
  | 'bitrem_7e' // 22 rodas (Bitrem)
  | 'rodotrem_9e' // 30 rodas (Rodotrem / Tritrem)
  | 'outro';

export interface VehicleConfigOption {
  id: VehicleConfigurationType;
  label: string;
  sublabel: string;
  defaultTires: number;
  description: string;
}

export interface FormDataState {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed';
  consultantName: string;

  // 1. Identificação da Transportadora
  companyName: string;
  contactPerson: string;
  contactRole: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;

  // 2. Perfil da Frota & Operação
  vehicleTypes: VehicleConfigurationType[];
  customVehicleTypeDetails?: string;
  truckCount: number | '';
  transportSegment: string;
  customTransportSegment?: string;
  predominantTruckBrand: string;
  customTruckBrand?: string;
  truckHorsepower: string;
  routeType: 'longa_distancia' | 'regional' | 'urbano' | 'misto' | '';
  pavedRoadOnly: 'sim_100' | 'misto_asfalto_terra' | 'severo_offroad' | '';
  pavedPercentage: number | '';
  tractionNeed: 'baixa' | 'moderada' | 'alta' | 'extrema' | '';

  // 3. Gestão e Uso de Pneus
  tiresInUseCount: number | '';
  predominantNewTireBrands: string[];
  customNewTireBrand?: string;
  preferredBrandAndModel: string;
  pressureControl: 'sim_sensores_tpms' | 'sim_manual_frequente' | 'parcial' | 'nao_possui' | '';
  hasOwnTireShop: 'sim_propria_equipe' | 'sim_sem_equipe' | 'terceirizada' | 'nao_tem_posto' | '';
  standardPressurePsi: number | '';
  calibrationFrequency: 'diaria' | '2_3_vezes_semana' | 'semanal' | 'quinzenal' | 'mensal' | 'apenas_preventiva' | '';
  hasTireYieldControl: 'sim_software_gestao' | 'sim_planilhas' | 'sim_relatorios_terceiros' | 'nao_possui' | '';

  // 4. Reforma e Mercado de Pneus
  currentRetreadBrand: string;
  customRetreadBrand?: string;
  mostUsedTreadPatterns: string[];
  customTreadPattern?: string;
  averageRetreadPrice: number | '';
  clientConceptOnRetread: 'excelente_confianca' | 'bom_indispensavel' | 'regular_desconfiado' | 'negativo_apenas_novos' | '';
  clientConceptOnRetreadNotes?: string;
  clientConceptOnChineseTires: 'positivo_custo' | 'usa_apenas_terceiro_eixo' | 'baixa_durabilidade_rejeita' | 'nao_utiliza' | '';
  clientConceptOnChineseTiresNotes?: string;
  mainTireDisposalReason: string;
  customDisposalReason?: string;

  // 5. Combustível e Eficiência
  hasFuelControl: 'sim_rigoroso' | 'sim_global' | 'nao_possui' | '';
  relatesTreadDepthToFuel: 'sim_conhece' | 'parcialmente' | 'desconhece' | '';

  // 6. Diagnóstico Comercial & Estratégia
  currentSupplierDecisiveFactor: string[];
  customSupplierFactor?: string;
  actionToBecomeMainSupplier: string[];
  customActionToSupplier?: string;
  commercialProposalSuggestion: string;
  notes?: string;
}

export interface CollectionMetrics {
  totalEstimatedTires: number;
  annualRetreadPotential: number; // quantidade de reformas estimadas por ano
  annualSavingsPotential: number; // economia estimada em R$ ao ano
  opportunityScore: number; // 0-100 pontuação de oportunidade
  maturityLevel: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Alta Performance';
}

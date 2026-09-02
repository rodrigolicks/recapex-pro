import { FormDataState, VehicleConfigOption } from '../types';

export const VEHICLE_CONFIGURATIONS: VehicleConfigOption[] = [
  {
    id: 'cavalo_carreta_3e',
    label: 'Caminhão Carreta 3 Eixos',
    sublabel: 'Cavalo 6x2 / 6x4 + Semirreboque 3 Eixos',
    defaultTires: 18,
    description: 'Configuração padrão para transporte rodoviário de média e longa distância (18 a 22 pneus).'
  },
  {
    id: 'bitrem_7e',
    label: 'Bitrem 7 Eixos',
    sublabel: 'Cavalo 6x4 + 2 Semirreboques (7 eixos)',
    defaultTires: 22,
    description: 'Muito comum no transporte de grãos, granéis e combustíveis (22 pneus).'
  },
  {
    id: 'rodotrem_9e',
    label: 'Rodotrem / Tritrem 9 Eixos',
    sublabel: 'Cavalo 6x4 + Dolly + 2 Semirreboques (9 eixos)',
    defaultTires: 30,
    description: 'Composição de alta capacidade de carga para agronegócio e florestal (30 pneus).'
  },
  {
    id: 'truck_6x2',
    label: 'Truck 6x2 / 6x4 (Chassi Rígido)',
    sublabel: 'Caminhão Pesado / Médio Rígido',
    defaultTires: 10,
    description: 'Utilizado em distribuição regional, caçambas, basculantes e carga seca (10 a 12 pneus).'
  },
  {
    id: 'toco_3_4',
    label: 'Toco 4x2 / 3/4',
    sublabel: 'Caminhão Urbano / Leve',
    defaultTires: 6,
    description: 'Distribuição urbana e coletas de curto raio (6 pneus).'
  },
  {
    id: 'vanderleia',
    label: 'Carreta Vanderleia (Eixos Espaçados)',
    sublabel: 'Cavalo + 3 Eixos Distanciados',
    defaultTires: 18,
    description: 'Semirreboque com eixos pneumáticos espaçados para maior PBTC (18 pneus).'
  },
];

export const TRANSPORT_SEGMENTS = [
  'Grãos / Agronegócio',
  'Combustíveis / Cargas Perigosas',
  'Carga Frigorificada / Perecíveis',
  'Carga Geral Seca / Paletizada',
  'Construção Civil / Mineração',
  'Florestal / Madeira / Celulose',
  'Cana-de-Açúcar / Sucroalcooleiro',
  'Bebidas / Distribuição',
  'Químicos / Petroquímicos',
  'Siderúrgico / Cargas Pesadas',
  'Outro (especificar)'
];

export const TRUCK_BRANDS = [
  'Scania',
  'Volvo',
  'Mercedes-Benz',
  'MAN / Volkswagen Caminhões',
  'DAF',
  'Iveco',
  'Ford Caminhões',
  'Frota Mista / Multimarcas',
  'Outra'
];

export const HORSEPOWER_RANGES = [
  'Até 280 cv (Leves/Médios)',
  '290 a 360 cv (Semipesados)',
  '370 a 440 cv (Pesados Regionais)',
  '450 a 540 cv (Pesados Longa Distância)',
  'Acima de 540 cv (Superpesados / Rodotrem)',
  'Frota com potências variadas'
];

export const NEW_TIRE_BRANDS = [
  'Michelin',
  'Bridgestone',
  'Goodyear',
  'Continental',
  'Pirelli / Prometeon',
  'Firestone',
  'Dunlop',
  'Yokohama',
  'Triangle (Importado/Chinês)',
  'Linglong (Importado/Chinês)',
  'Sailun (Importado/Chinês)',
  'Double Coin (Importado/Chinês)',
  'Outra marca importada'
];

export const RETREAD_BRANDS = [
  'Vipal',
  'Bandag (Bridgestone)',
  'Tipler',
  'Borrachas VIP',
  'Marangoni',
  'Novata',
  'Moreflex',
  'Tortuga',
  'Recapadora Regional Própria',
  'Não sabe informar / Diversas'
];

export const TREAD_PATTERNS = [
  'Tração Rodo (Banda Rodoestrada Tração)',
  'Tração Borrachudo / Bloco Profundo',
  'Direcional / Liso (Eixo Livre / Dianteiro)',
  'Misto Tração / Asfalto e Terra',
  'Fora de Estrada Severo (Lameiro/Mineração)',
  'Trailer / Semirreboque (Eixo Carreta)',
  'Banda de Baixa Resistência ao Rolamento (Eco/Fuel)'
];

export const DISPOSAL_REASONS = [
  'Fim de vida útil regular (atingiu o limite de segurança TWI)',
  'Desgaste irregular / Falha de geometria / Alinhamento',
  'Cortes na banda / Perfurações e avarias de pista',
  'Danos laterais / Impacto em guias e buracos',
  'Separação de lonas / Fadiga prematura da carcaça',
  'Problemas de baixa pressão / Rodagem murcho / Superaquecimento',
  'Rejeição na inspeção de reforma (carcaça condenada)'
];

export const SUPPLIER_DECISIVE_FACTORS = [
  'Preço da reforma / Tabela mais competitiva',
  'Qualidade da borracha e alto rendimento quilométrico (CPK)',
  'Prazo ágil de coleta e entrega (giro rápido de carcaça)',
  'Assistência técnica na frota e relatórios de acompanhamento',
  'Prazo de pagamento e facilidade de faturamento',
  'Garantia confiável contra falhas de processo/defeito',
  'Relacionamento comercial de longa data / Confiança'
];

export const ACTIONS_TO_BECOME_MAIN_SUPPLIER = [
  'Realizar teste prático comparativo de rendimento (CPK) em veículos piloto',
  'Oferecer condição comercial diferenciada por volume de carcaças',
  'Garantir cronograma de coleta/entrega expressa (ex: 48h a 72h)',
  'Implantar consultoria técnica periódica de pressão e calibração',
  'Apresentar certificado de garantia e laudos de carcaça com fotos',
  'Disponibilizar treinamento prático para os motoristas e borracheiros',
  'Oferecer carcaças de empréstimo / estoque pulmão consignado'
];

export const INITIAL_FORM_STATE: FormDataState = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
  consultantName: '',

  // 1. Identificação
  companyName: '',
  contactPerson: '',
  contactRole: '',
  whatsapp: '',
  email: '',
  city: '',
  state: '',

  // 2. Perfil da Frota
  vehicleTypes: ['cavalo_carreta_3e'],
  truckCount: '',
  transportSegment: 'Grãos / Agronegócio',
  predominantTruckBrand: 'Scania',
  truckHorsepower: '450 a 540 cv (Pesados Longa Distância)',
  routeType: 'longa_distancia',
  pavedRoadOnly: 'sim_100',
  pavedPercentage: 100,
  tractionNeed: 'alta',

  // 3. Gestão de Pneus
  tiresInUseCount: '',
  predominantNewTireBrands: ['Michelin', 'Bridgestone'],
  preferredBrandAndModel: '',
  pressureControl: 'sim_manual_frequente',
  hasOwnTireShop: 'sim_propria_equipe',
  standardPressurePsi: 110,
  calibrationFrequency: 'semanal',
  hasTireYieldControl: 'sim_software_gestao',

  // 4. Reforma
  currentRetreadBrand: 'Vipal',
  mostUsedTreadPatterns: ['Tração Rodo (Banda Rodoestrada Tração)', 'Trailer / Semirreboque (Eixo Carreta)'],
  averageRetreadPrice: 850,
  clientConceptOnRetread: 'bom_indispensavel',
  clientConceptOnRetreadNotes: '',
  clientConceptOnChineseTires: 'baixa_durabilidade_rejeita',
  clientConceptOnChineseTiresNotes: '',
  mainTireDisposalReason: 'Fim de vida útil regular (atingiu o limite de segurança TWI)',

  // 5. Combustível
  hasFuelControl: 'sim_rigoroso',
  relatesTreadDepthToFuel: 'sim_conhece',

  // 6. Estratégia Comercial
  currentSupplierDecisiveFactor: ['Qualidade da borracha e alto rendimento quilométrico (CPK)', 'Prazo ágil de coleta e entrega (giro rápido de carcaça)'],
  actionToBecomeMainSupplier: ['Realizar teste prático comparativo de rendimento (CPK) em veículos piloto', 'Oferecer condição comercial diferenciada por volume de carcaças'],
  commercialProposalSuggestion: '',
  notes: ''
};

export const SAMPLE_SAVED_COLLECTIONS: FormDataState[] = [
  {
    id: 'col-sample-01',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'completed',
    consultantName: 'Carlos Eduardo Ramos',
    companyName: 'TransAgro Logística & Cargas Ltda',
    contactPerson: 'Marcos Vinicius',
    contactRole: 'Gerente de Manutenção e Frota',
    whatsapp: '(65) 99872-4510',
    email: 'marcos.frota@transagrolog.com.br',
    city: 'Rondonópolis',
    state: 'MT',
    vehicleTypes: ['rodotrem_9e', 'bitrem_7e'],
    truckCount: 45,
    transportSegment: 'Grãos / Agronegócio',
    predominantTruckBrand: 'Volvo',
    truckHorsepower: 'Acima de 540 cv (Superpesados / Rodotrem)',
    routeType: 'longa_distancia',
    pavedRoadOnly: 'misto_asfalto_terra',
    pavedPercentage: 85,
    tractionNeed: 'alta',
    tiresInUseCount: 1250,
    predominantNewTireBrands: ['Michelin', 'Bridgestone'],
    preferredBrandAndModel: 'Michelin X Multiway 3D XZE 295/80R22.5',
    pressureControl: 'sim_manual_frequente',
    hasOwnTireShop: 'sim_propria_equipe',
    standardPressurePsi: 115,
    calibrationFrequency: 'semanal',
    hasTireYieldControl: 'sim_software_gestao',
    currentRetreadBrand: 'Bandag (Bridgestone)',
    mostUsedTreadPatterns: ['Tração Borrachudo / Bloco Profundo', 'Trailer / Semirreboque (Eixo Carreta)'],
    averageRetreadPrice: 890,
    clientConceptOnRetread: 'excelente_confianca',
    clientConceptOnRetreadNotes: 'Frota reforma 2 a 3 vezes cada carcaça premium.',
    clientConceptOnChineseTires: 'baixa_durabilidade_rejeita',
    clientConceptOnChineseTiresNotes: 'Já testaram marcas chinesas, mas carcaças não aguentam reforma na safra.',
    mainTireDisposalReason: 'Fim de vida útil regular (atingiu o limite de segurança TWI)',
    hasFuelControl: 'sim_rigoroso',
    relatesTreadDepthToFuel: 'sim_conhece',
    currentSupplierDecisiveFactor: ['Qualidade da borracha e alto rendimento quilométrico (CPK)', 'Prazo ágil de coleta e entrega (giro rápido de carcaça)'],
    actionToBecomeMainSupplier: ['Realizar teste prático comparativo de rendimento (CPK) em veículos piloto', 'Garantir cronograma de coleta/entrega expressa (ex: 48h a 72h)'],
    commercialProposalSuggestion: 'Montar teste comparativo com 12 pneus reformados com nossa banda de alta resistência a picotamento na rota MT-Santos. Apresentar tabela progressiva para volume acima de 60 pneus/mês.',
    notes: 'Cliente muito receptivo a visitas técnicas agendadas nas quartas-feiras.'
  },
  {
    id: 'col-sample-02',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    status: 'completed',
    consultantName: 'Carlos Eduardo Ramos',
    companyName: 'PetroTrans Distribuidora de Combustíveis',
    contactPerson: 'Ana Paula Siqueira',
    contactRole: 'Diretora de Operações',
    whatsapp: '(19) 98112-9900',
    email: 'ana.siqueira@petrotransdist.com.br',
    city: 'Paulínia',
    state: 'SP',
    vehicleTypes: ['cavalo_carreta_3e', 'bitrem_7e'],
    truckCount: 28,
    transportSegment: 'Combustíveis / Cargas Perigosas',
    predominantTruckBrand: 'Scania',
    truckHorsepower: '450 a 540 cv (Pesados Longa Distância)',
    routeType: 'regional',
    pavedRoadOnly: 'sim_100',
    pavedPercentage: 100,
    tractionNeed: 'moderada',
    tiresInUseCount: 560,
    predominantNewTireBrands: ['Goodyear', 'Continental'],
    preferredBrandAndModel: 'Goodyear KMax S / D 295/80R22.5',
    pressureControl: 'sim_sensores_tpms',
    hasOwnTireShop: 'terceirizada',
    standardPressurePsi: 110,
    calibrationFrequency: 'diaria',
    hasTireYieldControl: 'sim_software_gestao',
    currentRetreadBrand: 'Vipal',
    mostUsedTreadPatterns: ['Tração Rodo (Banda Rodoestrada Tração)', 'Banda de Baixa Resistência ao Rolamento (Eco/Fuel)'],
    averageRetreadPrice: 830,
    clientConceptOnRetread: 'bom_indispensavel',
    clientConceptOnRetreadNotes: 'Foco total em segurança e economia de combustível devido à carga líquida.',
    clientConceptOnChineseTires: 'nao_utiliza',
    clientConceptOnChineseTiresNotes: 'Política interna de compliance proíbe pneus sem homologação técnica rigorosa.',
    mainTireDisposalReason: 'Fim de vida útil regular (atingiu o limite de segurança TWI)',
    hasFuelControl: 'sim_rigoroso',
    relatesTreadDepthToFuel: 'sim_conhece',
    currentSupplierDecisiveFactor: ['Garantia confiável contra falhas de processo/defeito', 'Prazo de pagamento e facilidade de faturamento'],
    actionToBecomeMainSupplier: ['Apresentar certificado de garantia e laudos de carcaça com fotos', 'Oferecer condição comercial diferenciada por volume de carcaças'],
    commercialProposalSuggestion: 'Oferecer proposta com banda ECO de baixa resistência ao rolamento demonstrando redução de 2.5% no diesel.',
    notes: 'Exigem auditoria prévia nas instalações da recapadora para homologação como fornecedor oficial.'
  }
];

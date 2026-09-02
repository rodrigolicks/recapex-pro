import { CollectionMetrics, FormDataState } from '../types';
import { VEHICLE_CONFIGURATIONS } from '../data/constants';

export function calculateFleetMetrics(formData: FormDataState): CollectionMetrics {
  // Estimated tires in fleet
  let estimatedTires = 0;
  const truckCount = typeof formData.truckCount === 'number' ? formData.truckCount : 0;

  if (typeof formData.tiresInUseCount === 'number' && formData.tiresInUseCount > 0) {
    estimatedTires = formData.tiresInUseCount;
  } else if (truckCount > 0 && formData.vehicleTypes.length > 0) {
    // calculate average tires per vehicle type
    const avgTiresPerTruck = formData.vehicleTypes.reduce((acc, typeId) => {
      const config = VEHICLE_CONFIGURATIONS.find(c => c.id === typeId);
      return acc + (config ? config.defaultTires : 18);
    }, 0) / formData.vehicleTypes.length;

    estimatedTires = Math.round(truckCount * avgTiresPerTruck);
  }

  // Estimated annual retread consumption
  // In typical Brazilian transport, an average truck replaces/retreads between 4 to 8 tires per year depending on route
  const annualFactor = formData.routeType === 'longa_distancia' ? 0.45 :
                       formData.routeType === 'regional' ? 0.35 :
                       formData.routeType === 'misto' ? 0.40 : 0.30;

  const annualRetreadPotential = Math.round(estimatedTires * annualFactor);

  // Annual savings calculation vs buying 100% new tires
  // Average new premium tire: ~R$ 2,800
  // Average retread: ~R$ 850 (or formData.averageRetreadPrice)
  const avgNewPrice = 2800;
  const currentRetreadPrice = typeof formData.averageRetreadPrice === 'number' && formData.averageRetreadPrice > 0 
    ? formData.averageRetreadPrice 
    : 850;

  const savingsPerTire = Math.max(0, avgNewPrice - currentRetreadPrice);
  const annualSavingsPotential = annualRetreadPotential * savingsPerTire;

  // Calculate Opportunity Score (0 to 100)
  let score = 50; // base

  // Fleet size bonus
  if (truckCount >= 40) score += 20;
  else if (truckCount >= 15) score += 15;
  else if (truckCount >= 5) score += 10;

  // Good retread acceptance bonus
  if (formData.clientConceptOnRetread === 'excelente_confianca') score += 15;
  else if (formData.clientConceptOnRetread === 'bom_indispensavel') score += 10;
  else if (formData.clientConceptOnRetread === 'negativo_apenas_novos') score -= 15;

  // Pressure & Yield control (higher maturity = easier to prove ROI)
  if (formData.pressureControl === 'sim_sensores_tpms' || formData.pressureControl === 'sim_manual_frequente') score += 5;
  if (formData.hasTireYieldControl === 'sim_software_gestao') score += 5;

  // Action orientation bonus
  if (formData.actionToBecomeMainSupplier && formData.actionToBecomeMainSupplier.length >= 2) score += 10;
  if (formData.commercialProposalSuggestion && formData.commercialProposalSuggestion.trim().length > 10) score += 5;

  // Clamp score
  score = Math.min(100, Math.max(10, score));

  // Determine maturity level
  let maturityLevel: CollectionMetrics['maturityLevel'] = 'Intermediário';
  const maturityScore = 
    (formData.hasTireYieldControl === 'sim_software_gestao' ? 2 : formData.hasTireYieldControl === 'sim_planilhas' ? 1 : 0) +
    (formData.pressureControl === 'sim_sensores_tpms' ? 2 : formData.pressureControl === 'sim_manual_frequente' ? 1 : 0) +
    (formData.hasFuelControl === 'sim_rigoroso' ? 2 : formData.hasFuelControl === 'sim_global' ? 1 : 0) +
    (formData.relatesTreadDepthToFuel === 'sim_conhece' ? 2 : formData.relatesTreadDepthToFuel === 'parcialmente' ? 1 : 0);

  if (maturityScore >= 6) maturityLevel = 'Alta Performance';
  else if (maturityScore >= 4) maturityLevel = 'Avançado';
  else if (maturityScore >= 2) maturityLevel = 'Intermediário';
  else maturityLevel = 'Iniciante';

  return {
    totalEstimatedTires: estimatedTires,
    annualRetreadPotential,
    annualSavingsPotential,
    opportunityScore: score,
    maturityLevel
  };
}

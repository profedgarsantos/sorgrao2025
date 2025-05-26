import { config } from "./environment"

interface FeatureFlags {
  enableNewDashboard: boolean
  enableAdvancedReports: boolean
  enableBetaFeatures: boolean
}

// Configuração padrão de features
const defaultFeatures: FeatureFlags = {
  enableNewDashboard: false,
  enableAdvancedReports: false,
  enableBetaFeatures: false,
}

// Configuração específica por ambiente
const environmentFeatures: Record<string, Partial<FeatureFlags>> = {
  development: {
    enableNewDashboard: true,
    enableAdvancedReports: true,
    enableBetaFeatures: true,
  },
  test: {
    enableNewDashboard: true,
    enableAdvancedReports: true,
    enableBetaFeatures: false,
  },
  staging: {
    enableNewDashboard: true,
    enableAdvancedReports: false,
    enableBetaFeatures: false,
  },
  production: {
    enableNewDashboard: false,
    enableAdvancedReports: false,
    enableBetaFeatures: false,
  },
}

// Mescla as configurações padrão com as específicas do ambiente
export const features: FeatureFlags = {
  ...defaultFeatures,
  ...environmentFeatures[config.environment],
}

// Hook para usar feature flags
export function useFeature(featureName: keyof FeatureFlags): boolean {
  return features[featureName] || false
}

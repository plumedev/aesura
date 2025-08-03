import type { IExampleData } from './interfaces/IExampleData'

// Simulation d'une API simple qui retourne des données fake
export const getExampleData = async (): Promise<IExampleData> => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simuler parfois une erreur (20% de chance)
  if (Math.random() < 0.2) {
    throw new Error('Erreur simulée de l\'API')
  }

  return {
    id: Math.floor(Math.random() * 1000),
    title: 'Données de démonstration',
    message: 'Ceci est un exemple de données récupérées depuis une API fake',
    timestamp: new Date().toISOString()
  }
}

/**
 * Helper pour la gestion centralisée des erreurs Firebase
 */

export interface FirebaseErrorContext {
  action: string
  entity?: string
  operation?: string
}

/**
 * Gère les erreurs Firebase et retourne des messages d'erreur contextualisés
 */
export const handleFirebaseError = (
  error: unknown,
  context: FirebaseErrorContext
): Error => {
  if (error instanceof Error) {
    const { action, entity, operation } = context
    const entityText = entity ? ` pour ${entity}` : ''
    const operationText = operation ? ` (${operation})` : ''

    switch (true) {
      case error.message.includes('permission-denied'):
        return new Error(
          `Accès refusé${entityText}. Vérifiez vos permissions Firebase.${operationText}`
        )

      case error.message.includes('not-found'):
        return new Error(
          `${entity || 'Élément'} introuvable${entityText}. Vérifiez votre authentification.${operationText}`
        )

      case error.message.includes('unavailable'):
        return new Error(
          `Service Firebase temporairement indisponible. Veuillez réessayer.${operationText}`
        )

      case error.message.includes('unauthenticated'):
        return new Error(
          `Vous devez être authentifié pour ${action}${entityText}.${operationText}`
        )

      case error.message.includes('network'):
        return new Error(
          `Erreur de connexion réseau. Vérifiez votre connexion internet.${operationText}`
        )

      case error.message.includes('invalid-argument'):
        return new Error(
          `Argument invalide${entityText}. Vérifiez les données fournies.${operationText}`
        )

      case error.message.includes('already-exists'):
        return new Error(
          `${entity || 'Élément'} existe déjà${entityText}.${operationText}`
        )

      case error.message.includes('resource-exhausted'):
        return new Error(
          `Limite de ressources atteinte${entityText}. Veuillez réessayer plus tard.${operationText}`
        )

      case error.message.includes('deadline-exceeded'):
        return new Error(
          `Délai d'exécution dépassé${entityText}. Veuillez réessayer.${operationText}`
        )

      default:
        return new Error(
          `Erreur lors de ${action}${entityText}: ${error.message}${operationText}`
        )
    }
  }

  return new Error(
    `Erreur lors de ${context.action}${context.entity ? ` pour ${context.entity}` : ''}: Erreur inconnue`
  )
}

/**
 * Gestion d'erreur simple sans contexte détaillé
 */
export const handleSimpleFirebaseError = (
  error: unknown,
  action: string
): Error => {
  return handleFirebaseError(error, { action })
}

/**
 * Gestion d'erreur avec contexte d'entité
 */
export const handleEntityFirebaseError = (
  error: unknown,
  action: string,
  entity: string
): Error => {
  return handleFirebaseError(error, { action, entity })
}

/**
 * Gestion d'erreur complète avec tous les contextes
 */
export const handleFullFirebaseError = (
  error: unknown,
  action: string,
  entity: string,
  operation: string
): Error => {
  return handleFirebaseError(error, { action, entity, operation })
}

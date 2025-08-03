/**
 * Helper de démonstration pour le formatage de chaînes
 */

/**
 * Capitalise la première lettre d'une chaîne
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Tronque une chaîne à la longueur spécifiée
 */
export const truncate = (str: string, length: number): string => {
  if (!str || str.length <= length) return str
  return str.substring(0, length) + '...'
}

/**
 * Supprime les espaces en début et fin et normalise les espaces multiples
 */
export const normalizeSpaces = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ')
}

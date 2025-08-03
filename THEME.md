# Thème Personnalisé NuxtUI

Ce projet utilise un thème personnalisé pour NuxtUI avec des couleurs et des variantes par défaut configurées.

## 🎨 Couleurs Personnalisées

### Couleur Primaire
- **Couleur principale** : `#76E0B0` (vert personnalisé)
- **Couleur de texte** : `#383838` (gris foncé)

### Palette Complète
```typescript
primary: {
  500: '#76E0B0', // Couleur principale
  // ... autres teintes
}
gray: {
  900: '#383838', // Couleur de texte
  // ... autres teintes
}
```

## ⚙️ Configuration

### 1. Configuration dans `vite.config.ts`
```typescript
ui({
  ui: {
    colors: {
      primary: { /* palette verte personnalisée */ },
      gray: { /* palette grise personnalisée */ }
    },
    defaultVariants: {
      Button: { color: 'primary', size: 'lg' },
      Card: { color: 'white' },
      Alert: { color: 'error', variant: 'soft' }
    }
  }
})
```

### 2. Plugin NuxtUI (`src/plugins/nuxtui.ts`)
- Définit la palette de couleurs
- Configure les variantes par défaut
- Injecte la configuration dans l'application

## 🚀 Utilisation

### Utilisation Automatique
Les composants utilisent automatiquement les variantes par défaut :

```vue
<!-- Utilise automatiquement color="primary" et size="lg" -->
<UButton @click="handleClick">
  Mon Bouton
</UButton>

<!-- Utilise automatiquement color="error" et variant="soft" -->
<UAlert v-if="error">
  Message d'erreur
</UAlert>
```

### Utilisation Programmatique
```vue
<script setup>
import { useTheme } from '@/composables/useTheme'

const { getPrimaryColor, getTextColor } = useTheme()

const primaryColor = getPrimaryColor(500) // #76E0B0
const textColor = getTextColor(900) // #383838
</script>
```

### Utilisation des Utilitaires
```vue
<script setup>
import { COLORS, getColorValue } from '@/utils/colors'

// Constantes prédéfinies
const primaryColor = COLORS.PRIMARY // #76E0B0
const textColor = COLORS.TEXT_PRIMARY // #383838

// Ou obtenir une couleur spécifique
const customColor = getColorValue('primary', 600)
</script>
```

## 📁 Structure des Fichiers

```
src/
├── plugins/
│   └── nuxtui.ts          # Configuration du thème
├── composables/
│   └── useTheme.ts         # Composable pour utiliser le thème
├── types/
│   └── theme.ts            # Types TypeScript
└── utils/
    └── colors.ts           # Utilitaires pour les couleurs
```

## 🎯 Avantages

1. **Configuration centralisée** : Toutes les couleurs dans un seul endroit
2. **Variantes par défaut** : Plus besoin de spécifier `color="primary"` et `size="lg"` partout
3. **Type safety** : Types TypeScript pour les couleurs
4. **Réutilisabilité** : Composable `useTheme()` pour accéder aux couleurs
5. **Cohérence** : Tous les composants utilisent le même thème

## 🔧 Personnalisation

Pour modifier les couleurs, éditez le fichier `src/plugins/nuxtui.ts` :

```typescript
export const colorPalette = {
  primary: {
    500: '#VOTRE_COULEUR', // Changez ici
    // ...
  }
}
```

Pour modifier les variantes par défaut, éditez `vite.config.ts` :

```typescript
defaultVariants: {
  Button: { 
    color: 'primary', 
    size: 'lg' // Changez la taille par défaut
  }
}
``` 
# 🎨 Configuration du Thème NuxtUI

## Configuration Simple et Officielle

Cette configuration suit exactement la [documentation officielle de NuxtUI](https://ui.nuxt.com/getting-started/theme).

### 1. Configuration des Couleurs

Pour changer les couleurs de votre application, modifiez simplement le fichier `vite.config.ts` :

```typescript
ui({
  ui: {
    colors: {
      primary: 'red',    // Couleur principale = ROUGE
      secondary: 'blue', // Couleur secondaire = BLEU
      neutral: 'gray'    // Couleur neutre
    }
  }
})
```

### 2. Couleurs Disponibles

Vous pouvez utiliser n'importe quelle couleur Tailwind CSS :

| Couleur | Description |
|---------|-------------|
| `red` | Rouge |
| `blue` | Bleu |
| `green` | Vert |
| `yellow` | Jaune |
| `purple` | Violet |
| `pink` | Rose |
| `indigo` | Indigo |
| `gray` | Gris |
| `orange` | Orange |
| `teal` | Bleu-vert |
| `cyan` | Cyan |
| `emerald` | Émeraude |
| `violet` | Violet |
| `fuchsia` | Fuchsia |
| `rose` | Rose |

### 3. Utilisation dans vos Composants

#### Avec les Props NuxtUI
```vue
<template>
  <!-- Bouton rouge (primary) -->
  <UButton color="primary">Mon bouton</UButton>
  
  <!-- Bouton bleu (secondary) -->
  <UButton color="secondary">Mon bouton</UButton>
  
  <!-- Bouton vert (success) -->
  <UButton color="success">Mon bouton</UButton>
  
  <!-- Bouton jaune (warning) -->
  <UButton color="warning">Mon bouton</UButton>
  
  <!-- Bouton rouge (error) -->
  <UButton color="error">Mon bouton</UButton>
</template>
```

#### Avec les Classes Tailwind
```vue
<template>
  <!-- Arrière-plan rouge -->
  <div class="bg-primary-500 text-white">
    Contenu rouge
  </div>
  
  <!-- Arrière-plan bleu -->
  <div class="bg-secondary-500 text-white">
    Contenu bleu
  </div>
  
  <!-- Texte rouge -->
  <div class="text-primary-600">
    Texte rouge
  </div>
</template>
```

### 4. Exemples de Configurations

#### Application Rouge
```typescript
colors: {
  primary: 'red',
  secondary: 'gray',
  neutral: 'gray'
}
```

#### Application Bleue
```typescript
colors: {
  primary: 'blue',
  secondary: 'indigo',
  neutral: 'gray'
}
```

#### Application Verte
```typescript
colors: {
  primary: 'green',
  secondary: 'emerald',
  neutral: 'gray'
}
```

#### Application Violette
```typescript
colors: {
  primary: 'purple',
  secondary: 'violet',
  neutral: 'gray'
}
```

### 5. Avantages de cette Approche

✅ **Officielle** : Suit la documentation NuxtUI  
✅ **Simple** : Une seule configuration dans `vite.config.ts`  
✅ **Flexible** : Utilise toutes les couleurs Tailwind  
✅ **Cohérent** : Système de couleurs unifié  
✅ **Type-safe** : Pas d'erreurs TypeScript  
✅ **Performant** : Classes CSS natives  

### 6. Couleurs du Design System

NuxtUI fournit un système de couleurs prédéfini :

| Couleur | Utilisation | Couleur par défaut |
|---------|-------------|-------------------|
| `primary` | Couleur principale de la marque | `green` |
| `secondary` | Couleur secondaire | `blue` |
| `success` | États de succès | `green` |
| `info` | États informatifs | `blue` |
| `warning` | États d'avertissement | `yellow` |
| `error` | États d'erreur | `red` |
| `neutral` | Couleur neutre | `slate` |

### 7. Personnalisation Avancée

Pour des personnalisations plus avancées, vous pouvez également utiliser la directive `@theme` dans votre CSS :

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --color-primary-500: #ef4444; /* Rouge personnalisé */
  --color-secondary-500: #3b82f6; /* Bleu personnalisé */
}
```

C'est tout ! Cette approche est simple, officielle et suit les meilleures pratiques de NuxtUI. 🎉 
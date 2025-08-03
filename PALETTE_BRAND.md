# 🎨 Palette Simple

## Identité Visuelle Élégante

Cette palette utilise des couleurs simples et élégantes : bleu, rouge et gris pour créer une identité visuelle claire et professionnelle.

### 🎯 **Couleurs Principales**

| Couleur | Code Hex | Utilisation | Description |
|---------|----------|-------------|-------------|
| **Bleu** | `#60a5fa` | Primary | Votre couleur principale - bleu moderne |
| **Rouge** | `#f87171` | Secondary | Rouge pour les éléments secondaires |
| **Bleu Moyen** | `#3b82f6` | Success | Bleu pour les états de succès |
| **Bleu Foncé** | `#2563eb` | Text | Bleu foncé pour les textes importants |
| **Bleu Très Foncé** | `#1d4ed8` | Dark | Bleu très foncé pour les contrastes |

### 🎨 **Couleurs Neutres**

| Couleur | Code Hex | Utilisation | Description |
|---------|----------|-------------|-------------|
| **Gris Clair** | `#f3f4f6` | Background | Arrière-plan clair et moderne |
| **Gris Moyen** | `#e5e7eb` | Border | Bordures subtiles |
| **Gris Principal** | `#6b7280` | Text | Texte secondaire |
| **Gris Foncé** | `#4b5563` | Muted | Éléments atténués |

## 🛠️ **Configuration**

### CSS Variables (src/assets/styles/main.css)
```css
@theme {
  /* Palette simple - Bleu, Rouge, Gris */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-200: #bfdbfe;
  --color-brand-300: #93c5fd;
  --color-brand-400: #60a5fa;  /* Bleu */
  --color-brand-500: #3b82f6;  /* Bleu moyen */
  --color-brand-600: #2563eb;  /* Bleu foncé */
  --color-brand-700: #1d4ed8;  /* Bleu très foncé */
  --color-brand-800: #1e40af;
  --color-brand-900: #1e3a8a;
  --color-brand-950: #172554;
}
```

### Configuration NuxtUI (vite.config.ts)
```typescript
ui({
  ui: {
    colors: {
      primary: 'brand',      // Bleu (#60a5fa)
      secondary: 'stone',    // Rouge (#f87171)
      neutral: 'neutral',    // Gris personnalisé
      success: 'brand',      // Même palette pour le succès
      warning: 'yellow',     // Jaune pour les avertissements
      error: 'red'          // Rouge pour les erreurs
    }
  }
})
```

## 🎯 **Utilisation dans vos Composants**

### Avec les Props NuxtUI
```vue
<template>
  <!-- Bouton principal avec Bleu -->
  <UButton color="primary">Action principale</UButton>
  
  <!-- Bouton secondaire avec Rouge -->
  <UButton color="secondary">Action secondaire</UButton>
  
  <!-- Bouton de succès avec Bleu -->
  <UButton color="success">Succès</UButton>
  
  <!-- Carte avec arrière-plan Gris Clair -->
  <UCard class="bg-neutral-100">
    Contenu sur fond Gris Clair
  </UCard>
</template>
```

### Avec les Classes Tailwind
```vue
<template>
  <!-- Arrière-plan Bleu -->
  <div class="bg-brand-400 text-white">
    Section principale
  </div>
  
  <!-- Arrière-plan Rouge -->
  <div class="bg-stone-400 text-white">
    Section secondaire
  </div>
  
  <!-- Arrière-plan Gris Clair -->
  <div class="bg-neutral-100 text-neutral-600">
    Section neutre
  </div>
  
  <!-- Texte Bleu Foncé -->
  <div class="text-brand-600">
    Texte important
  </div>
</template>
```

## 🎨 **Exemples de Combinaisons**

### Interface Principale
```vue
<template>
  <!-- Header avec Rouge -->
  <header class="bg-stone-400 text-white">
    <h1 class="text-brand-400">Votre Logo</h1>
  </header>
  
  <!-- Contenu principal avec Gris Clair -->
  <main class="bg-neutral-100">
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-neutral-700">Titre</h2>
      <p class="text-neutral-600">Contenu</p>
      <UButton color="primary">Action</UButton>
    </div>
  </main>
</template>
```

### Formulaires
```vue
<template>
  <form class="space-y-4">
    <div class="bg-neutral-100 p-4 rounded">
      <label class="text-neutral-700 font-medium">Email</label>
      <UInput class="bg-white border-neutral-300" />
    </div>
    <UButton color="primary" type="submit">
      Envoyer
    </UButton>
  </form>
</template>
```

## 🚀 **Avantages de cette Palette**

✅ **Simple** : Couleurs claires et faciles à utiliser  
✅ **Élégante** : Palette professionnelle et moderne  
✅ **Accessible** : Contraste optimal pour la lisibilité  
✅ **Flexible** : Utilisable dans tous les contextes  
✅ **Mémorable** : Identité visuelle claire et reconnaissable  

## 🎯 **Conseils d'Utilisation**

### Pour les Actions Principales
- Utilisez `color="primary"` (Bleu) pour les CTA importants
- Utilisez `color="secondary"` (Rouge) pour les actions secondaires

### Pour les Arrière-plans
- Utilisez `bg-neutral-100` (Gris Clair) pour les sections principales
- Utilisez `bg-neutral-200` (Gris Moyen) pour les bordures et séparateurs

### Pour les Textes
- Utilisez `text-neutral-700` pour les titres
- Utilisez `text-neutral-600` pour le contenu principal
- Utilisez `text-brand-600` (Bleu Foncé) pour les éléments importants

### Pour les États
- Utilisez `color="success"` (Bleu) pour les succès
- Utilisez `color="warning"` (Jaune) pour les avertissements
- Utilisez `color="error"` (Rouge) pour les erreurs

Cette palette simple offre une identité visuelle claire et professionnelle ! 🎨 
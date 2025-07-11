/**
 * Palette de couleurs centralisée pour l'application de facturation 
 * Design inspiré de l'artisanat moderne avec une ambiance chaleureuse et professionnelle
 */

export const Colors = {
  // Couleurs principales
  primary: '#6C4F3D',      // Brun pain - couleur principale
  secondary: '#F5E9DA',    // Beige farine - couleur secondaire
  accent: '#D9A066',       // Doré croûte - couleur d'accent
  background: '#FAFAFA',   // Blanc cassé - fond principal
  text: '#222222',         // Gris foncé - texte principal
  
  // Variations pour les états
  primaryHover: '#5A3F2E',
  primaryLight: '#8B6B58',
  accentHover: '#C8935A',
  accentLight: '#E6B380',
  
  // Couleurs système
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Couleurs neutres
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  darkGray: '#757575',
  
  // Ombres
  shadow: 'rgba(108, 79, 61, 0.1)',
  shadowMedium: 'rgba(108, 79, 61, 0.15)',
  shadowStrong: 'rgba(108, 79, 61, 0.2)',
} as const;

export type ColorKey = keyof typeof Colors;
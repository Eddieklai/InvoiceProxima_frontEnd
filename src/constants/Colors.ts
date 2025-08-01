export const ColorPalettes = {
  brown: {
    primary: '#6C4F3D',
    secondary: '#F5E9DA',
    accent: '#D9A066',
    background: '#FAFAFA',
    text: '#222222',
    primaryHover: '#5A3F2E',
    primaryLight: '#8B6B58',
    accentHover: '#C8935A',
    accentLight: '#E6B380',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    mediumGray: '#E0E0E0',
    darkGray: '#757575',
    shadow: 'rgba(108, 79, 61, 0.1)',
    shadowMedium: 'rgba(108, 79, 61, 0.15)',
    shadowStrong: 'rgba(108, 79, 61, 0.2)',
  },
  blue: {
    primary: '#283593',
    secondary: '#E3F2FD',
    accent: '#1976D2',
    background: '#F5F7FB',
    text: '#1A237E',
    primaryHover: '#1A237E',
    primaryLight: '#5C6BC0',
    accentHover: '#1565C0',
    accentLight: '#64B5F6',
    success: '#388E3C',
    warning: '#FFA000',
    error: '#D32F2F',
    info: '#0288D1',
    white: '#FFFFFF',
    lightGray: '#E3F2FD',
    mediumGray: '#90A4AE',
    darkGray: '#263238',
    shadow: 'rgba(40, 53, 147, 0.1)',
    shadowMedium: 'rgba(40, 53, 147, 0.15)',
    shadowStrong: 'rgba(40, 53, 147, 0.2)',
  },
  green: {
    primary: '#388E3C',
    secondary: '#E8F5E9',
    accent: '#43A047',
    background: '#F7FAF7',
    text: '#1B5E20',
    primaryHover: '#2E7D32',
    primaryLight: '#81C784',
    accentHover: '#388E3C',
    accentLight: '#A5D6A7',
    success: '#388E3C',
    warning: '#FFA000',
    error: '#D32F2F',
    info: '#0288D1',
    white: '#FFFFFF',
    lightGray: '#E8F5E9',
    mediumGray: '#A5D6A7',
    darkGray: '#1B5E20',
    shadow: 'rgba(56, 142, 60, 0.1)',
    shadowMedium: 'rgba(56, 142, 60, 0.15)',
    shadowStrong: 'rgba(56, 142, 60, 0.2)',
  },
  violet: {
    primary: '#4527A0',
    secondary: '#EDE7F6',
    accent: '#7E57C2',
    background: '#F8F7FB',
    text: '#311B92',
    primaryHover: '#311B92',
    primaryLight: '#9575CD',
    accentHover: '#5E35B1',
    accentLight: '#B39DDB',
    success: '#388E3C',
    warning: '#FFA000',
    error: '#D32F2F',
    info: '#0288D1',
    white: '#FFFFFF',
    lightGray: '#EDE7F6',
    mediumGray: '#B39DDB',
    darkGray: '#311B92',
    shadow: 'rgba(69, 39, 160, 0.1)',
    shadowMedium: 'rgba(69, 39, 160, 0.15)',
    shadowStrong: 'rgba(69, 39, 160, 0.2)',
  },
  blueViolet: {
    primary: '#3F51B5',         // Bleu profond
    secondary: '#EDE7F6',       // Violet très clair (fond)
    accent: '#7E57C2',          // Violet moyen (accent)
    background: '#F5F7FB',      // Bleu très pâle (fond général)
    text: '#2C2C54',            // Bleu-violet foncé (texte)
    primaryHover: '#283593',    // Bleu foncé (hover)
    primaryLight: '#9575CD',    // Violet clair (light)
    accentHover: '#5E35B1',     // Violet foncé (accent hover)
    accentLight: '#B39DDB',     // Violet pastel (accent light)
    success: '#388E3C',
    warning: '#FFA000',
    error: '#D32F2F',
    info: '#0288D1',
    white: '#FFFFFF',
    lightGray: '#E3F2FD',
    mediumGray: '#B39DDB',
    darkGray: '#311B92',
    shadow: 'rgba(63, 81, 181, 0.1)',         // bleu
    shadowMedium: 'rgba(63, 81, 181, 0.15)',  // bleu
    shadowStrong: 'rgba(63, 81, 181, 0.2)',   // bleu
  },
} as const;

export type PaletteKey = keyof typeof ColorPalettes;
export type ColorsType = typeof ColorPalettes[keyof typeof ColorPalettes];

export let Colors: ColorsType = ColorPalettes.brown;

// Fonction pour changer la palette
export function setColorsPalette(key: PaletteKey) {
  Colors = ColorPalettes[key];
}

setColorsPalette('blue');
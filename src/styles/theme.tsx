import { Colors } from '@/constants/Colors';

export const theme = {
  colors: { ...Colors },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '48px',
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '24px',
  },
  font: {
    family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    size: {
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '32px',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  shadow: {
    sm: Colors.shadow,
    md: Colors.shadowMedium,
    lg: Colors.shadowStrong,
  },
  animation: {
    fadeIn: 'fade-in 0.3s ease',
    slideIn: 'slide-in 0.3s ease',
  },
};

export type AppTheme = typeof theme;
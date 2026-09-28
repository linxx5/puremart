/** Puremart design tokens v0.2 — bright blue theme. Single source of truth for web + mobile. */
export const colors = {
  midnight: '#04265E',
  blue: '#0057FF',
  blueDark: '#0043CE',
  sky: '#00B2FF',
  ice: '#D9E8FF',
  iceBg: '#EFF5FF',
  ink: '#081B3D',
  slate: '#475569',
  mist: '#CBDDF5',
  paper: '#F4F8FF',
  white: '#FFFFFF',
  amber: '#D97706',
  amberBg: '#FEF3C7',
  red: '#E11D48',
  redBg: '#FFE1E8',
} as const;

export const radius = { sm: 6, md: 10, lg: 14, pill: 999 } as const;

export const fontFamily =
  'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

export type SafetyStatus = 'passed' | 'under-review' | 'rejected';

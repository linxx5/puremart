/** Puremart design tokens v1.0 — bright blue theme. Single source of truth for web + mobile. */
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

/** Dark-mode-ready surface overrides. Swap `colors` for `darkColors` under a dark theme. */
export const darkColors = {
  ...colors,
  paper: '#081B3D',
  white: '#0E2A5C',
  ink: '#F4F8FF',
  slate: '#CBDDF5',
  mist: '#1E3A6E',
  iceBg: '#0E2A5C',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;

export const fontSize = {
  caption: 12,
  small: 14,
  body: 16,
  h2: 20,
  h1: 24,
  display: 32,
} as const;

export const fontWeight = { regular: 400, semibold: 600, bold: 700, extrabold: 800 } as const;

export const shadows = {
  card: '0 1px 3px rgba(8, 27, 61, 0.12)',
  pop: '0 4px 14px rgba(8, 27, 61, 0.18)',
} as const;

export const statusMeta = {
  passed: { bg: colors.ice, fg: '#0043CE', label: 'Passed' },
  'under-review': { bg: colors.amberBg, fg: colors.amber, label: 'Under Review' },
  rejected: { bg: colors.redBg, fg: colors.red, label: 'Rejected' },
} as const;

export const deliveryStages = [
  'Order placed',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'In transit',
  'Out for delivery',
  'Delivered',
] as const;

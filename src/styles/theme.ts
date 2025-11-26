import { colors, ColorTheme } from './colors';

export interface Theme {
  colors: ColorTheme;
  primary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  periods: typeof colors.periods;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const lightTheme: Theme = {
  colors: colors.light,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
  periods: colors.periods,
  spacing,
  borderRadius,
};

export const darkTheme: Theme = {
  colors: colors.dark,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
  periods: colors.periods,
  spacing,
  borderRadius,
};
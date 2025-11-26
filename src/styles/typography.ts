export const typography = {
    fonts: {
        regular: 'Nunito_400Regular',
        medium: 'Nunito_500Medium',
        semiBold: 'Nunito_600SemiBold',
        bold: 'Nunito_700Bold',
        extraBold: 'Nunito_800ExtraBold',
    },

    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
    },

    weights: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};
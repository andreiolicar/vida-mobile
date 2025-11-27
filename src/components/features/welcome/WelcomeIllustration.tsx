import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/hooks';

const { width } = Dimensions.get('window');
const illustrationSize = Math.min(width * 0.8, 320);

export function WelcomeIllustration() {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Svg
                width={illustrationSize}
                height={illustrationSize}
                viewBox="0 0 320 320"
                fill="none"
            >
                <Defs>
                    <LinearGradient id="primaryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={theme.primary} stopOpacity="1" />
                        <Stop offset="100%" stopColor={theme.primary} stopOpacity="0.6" />
                    </LinearGradient>
                    <LinearGradient id="successGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
                    </LinearGradient>
                    <LinearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    </LinearGradient>
                </Defs>

                {/* Fundo decorativo com círculos */}
                <Circle cx="160" cy="160" r="140" fill={`${theme.primary}05`} />
                <Circle cx="160" cy="160" r="100" fill={`${theme.primary}08`} />

                {/* Pessoa central (estilo minimalista) */}
                <G>
                    {/* Corpo */}
                    <Rect
                        x="135"
                        y="160"
                        width="50"
                        height="70"
                        rx="25"
                        fill="url(#primaryGrad)"
                    />

                    {/* Cabeça */}
                    <Circle cx="160" cy="140" r="25" fill="url(#primaryGrad)" />

                    {/* Braço esquerdo (levantado - conquista) */}
                    <Rect
                        x="120"
                        y="165"
                        width="15"
                        height="45"
                        rx="8"
                        fill="url(#primaryGrad)"
                        opacity="0.9"
                        rotation="-30"
                        origin="120, 165"
                    />

                    {/* Braço direito */}
                    <Rect
                        x="185"
                        y="165"
                        width="15"
                        height="45"
                        rx="8"
                        fill="url(#primaryGrad)"
                        opacity="0.9"
                        rotation="20"
                        origin="200, 165"
                    />
                </G>

                {/* Elementos flutuantes ao redor */}

                {/* Check - Tarefa concluída (esquerda superior) */}
                <G transform="translate(40, 60)">
                    <Circle cx="0" cy="0" r="24" fill="url(#successGrad)" opacity="0.2" />
                    <Circle cx="0" cy="0" r="18" fill="#10B981" />
                    <Path
                        d="M -6 0 L -2 4 L 6 -4"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </G>

                {/* Estrela - XP/Gamificação (direita superior) */}
                <G transform="translate(270, 80)">
                    <Path
                        d="M 0,-12 L 3,-3 L 12,0 L 3,3 L 0,12 L -3,3 L -12,0 L -3,-3 Z"
                        fill="#FBBF24"
                    />
                    <Circle cx="0" cy="0" r="20" fill="#FBBF2420" />
                </G>

                {/* Relógio - Rotina (esquerda inferior) */}
                <G transform="translate(50, 240)">
                    <Circle cx="0" cy="0" r="20" fill="url(#purpleGrad)" opacity="0.2" />
                    <Circle cx="0" cy="0" r="15" fill="white" stroke={theme.primary} strokeWidth="2" />
                    <Path
                        d="M 0,-8 L 0,0 L 6,0"
                        stroke={theme.primary}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </G>

                {/* Coração - Bem-estar (direita inferior) */}
                <G transform="translate(260, 220)">
                    <Path
                        d="M 0,-6 C -2,-10 -8,-10 -8,-4 C -8,2 0,8 0,8 C 0,8 8,2 8,-4 C 8,-10 2,-10 0,-6 Z"
                        fill="#EC4899"
                    />
                    <Circle cx="0" cy="0" r="18" fill="#EC489920" />
                </G>

                {/* Gráfico crescente - Progresso (direita) */}
                <G transform="translate(270, 160)">
                    <Rect x="-4" y="8" width="8" height="12" rx="2" fill={theme.primary} opacity="0.6" />
                    <Rect x="6" y="2" width="8" height="18" rx="2" fill={theme.primary} opacity="0.8" />
                    <Rect x="16" y="-4" width="8" height="24" rx="2" fill={theme.primary} />
                </G>

                {/* Linhas decorativas conectando elementos */}
                <Path
                    d="M 64 84 Q 100 120 135 140"
                    stroke={`${theme.primary}30`}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                />
                <Path
                    d="M 246 100 Q 220 130 185 145"
                    stroke={`${theme.primary}30`}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
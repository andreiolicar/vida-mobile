import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/hooks';
import { Button } from '@/components/ui';
import { WelcomeIllustration } from '@/components/features/welcome';
import { AuthStackParamList } from '@/navigation/types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function WelcomeScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation<WelcomeScreenNavigationProp>();

    // Animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const illustrationAnim = useRef(new Animated.Value(0)).current;
    const titleAnim = useRef(new Animated.Value(0)).current;
    const subtitleAnim = useRef(new Animated.Value(0)).current;
    const buttonsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sequência de animações suaves tipo Duolingo
        Animated.sequence([
            // 1. Ilustração aparece com bounce
            Animated.spring(illustrationAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            // 2. Título desliza
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            // 3. Subtítulo aparece
            Animated.timing(subtitleAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            // 4. Botões aparecem
            Animated.spring(buttonsAnim, {
                toValue: 1,
                tension: 80,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Fade geral
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleGetStarted = () => {
        navigation.navigate('Register');
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                {/* Logo/Brand pequeno no topo */}
                <View style={styles.header}>
                    <View
                        style={[
                            styles.brandCircle,
                            { backgroundColor: `${theme.primary}15` },
                        ]}
                    >
                        <Text style={[styles.brandText, { color: theme.primary }]}>
                            V
                        </Text>
                    </View>
                </View>

                {/* Ilustração Central */}
                <Animated.View
                    style={[
                        styles.illustrationContainer,
                        {
                            opacity: illustrationAnim,
                            transform: [
                                {
                                    scale: illustrationAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1],
                                    }),
                                },
                                {
                                    translateY: illustrationAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <WelcomeIllustration />
                </Animated.View>

                {/* Textos */}
                <View style={styles.textContainer}>
                    <Animated.View
                        style={{
                            opacity: titleAnim,
                            transform: [
                                {
                                    translateY: titleAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Text style={[styles.title, { color: colors.text }]}>
                            Bem-vindo ao VIDA
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={{
                            opacity: subtitleAnim,
                            transform: [
                                {
                                    translateY: subtitleAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Organize sua rotina, alcance seus objetivos e viva uma vida
                            mais equilibrada com o poder da IA.
                        </Text>
                    </Animated.View>
                </View>

                {/* Botões */}
                <Animated.View
                    style={[
                        styles.buttonsContainer,
                        {
                            opacity: buttonsAnim,
                            transform: [
                                {
                                    translateY: buttonsAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onPress={handleGetStarted}
                        style={styles.primaryButton}
                    >
                        Começar agora
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onPress={handleLogin}
                        style={styles.secondaryButton}
                    >
                        Já tenho uma conta
                    </Button>

                    <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                        Ao continuar, você concorda com nossos{' '}
                        <Text style={{ color: theme.primary }}>Termos de Uso</Text> e{' '}
                        <Text style={{ color: theme.primary }}>Política de Privacidade</Text>
                    </Text>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    brandCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 32,
        fontFamily: 'Nunito_800ExtraBold',
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    textContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Nunito_800ExtraBold',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 8,
    },
    buttonsContainer: {
        gap: 12,
    },
    primaryButton: {
        width: '100%',
    },
    secondaryButton: {
        width: '100%',
    },
    termsText: {
        fontSize: 12,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 18,
    },
});
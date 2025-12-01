import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';
import { Button, Input } from '@/components/ui';
import { useAuthStore, useUserStore } from '@/store';
import { loginUser } from '@/services/api/authApi';
import { mockDashboardData } from '@/services/mock/dashboardData';

export default function LoginScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const { login } = useAuthStore();
    const { setUser } = useUserStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email é obrigatório');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Email inválido');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError('Senha é obrigatória');
            return false;
        }
        if (password.length < 6) {
            setPasswordError('Senha deve ter pelo menos 6 caracteres');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleLogin = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true);

        try {
            // Mock de API
            const response = await loginUser(email, password);

            console.log('✅ Login bem-sucedido');

            // ✅ Popular userStore com streak inicial = 1
            const mockUser = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                avatar: undefined,
                level: mockDashboardData.user.level, // 12
                currentXP: mockDashboardData.user.currentXP, // 450
                nextLevelXP: mockDashboardData.user.nextLevelXP, // 600
                dailyXP: 0,
                totalXP: mockDashboardData.user.currentXP, // 450
                streak: 1, // ✅ STREAK COMEÇA EM 1
            };

            console.log('📊 Populando userStore com:', mockUser);

            // Salvar no userStore
            setUser(mockUser);

            // Salvar tokens no authStore
            login(response.accessToken, response.refreshToken);

            console.log('🚀 Login concluído, navegando...');
        } catch (error) {
            console.error('❌ Erro no login:', error);
            setPasswordError('Email ou senha incorretos');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.text }]}>
                                Bem-vindo de volta!
                            </Text>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                Faça login para continuar
                            </Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Input
                                label="Email"
                                placeholder="seu@email.com"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (emailError) validateEmail(text);
                                }}
                                onBlur={() => validateEmail(email)}
                                error={emailError}
                                leftIcon="mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            <Input
                                label="Senha"
                                placeholder="Sua senha"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) validatePassword(text);
                                }}
                                onBlur={() => validatePassword(password)}
                                error={passwordError}
                                leftIcon="lock-closed"
                                secureTextEntry
                            />

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={[styles.forgotPasswordText, { color: theme.primary }]}>
                                    Esqueceu a senha?
                                </Text>
                            </TouchableOpacity>

                            <Button
                                variant="primary"
                                size="lg"
                                onPress={handleLogin}
                                loading={isLoading}
                                style={styles.loginButton}
                            >
                                Entrar
                            </Button>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                Não tem uma conta?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register' as never)}
                            >
                                <Text style={[styles.footerLink, { color: theme.primary }]}>
                                    Cadastre-se
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Nunito_800ExtraBold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
    },
    form: {
        marginBottom: 32,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -8,
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
    loginButton: {
        marginTop: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    footerLink: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
});
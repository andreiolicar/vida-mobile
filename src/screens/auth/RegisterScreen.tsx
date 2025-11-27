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
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button, Input } from '@/components/ui';
import { useAuthStore, useUserStore } from '@/store';
import { AuthStackParamList } from '@/navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function RegisterScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { login } = useAuthStore();
    const { setUser } = useUserStore();

    // Estados do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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

    // Validação
    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        let isValid = true;

        // Validar nome
        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório';
            isValid = false;
        } else if (name.trim().length < 3) {
            newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email é obrigatório';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email inválido';
            isValid = false;
        }

        // Validar senha
        if (!password) {
            newErrors.password = 'Senha é obrigatória';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
            isValid = false;
        }

        // Validar confirmação de senha
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handler de registro
    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Mock de registro - simula delay de API
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock: aceita qualquer dados para testes
            const mockAccessToken = 'mock-access-token-' + Date.now();
            const mockRefreshToken = 'mock-refresh-token-' + Date.now();

            // Atualiza store de autenticação
            login(mockAccessToken, mockRefreshToken);

            // Atualiza store de usuário
            setUser({
                id: Date.now().toString(),
                name: name.trim(),
                email,
                level: 1,
                currentXP: 0,
                nextLevelXP: 100,
                dailyXP: 0,
                totalXP: 0,
                streak: 0,
            });

            // Sucesso! Navegação automática pelo AppNavigator
            Alert.alert(
                'Bem-vindo ao VIDA! 🎉',
                'Sua conta foi criada com sucesso!',
                [{ text: 'Começar', style: 'default' }]
            );
        } catch (error) {
            console.error('Register error:', error);
            Alert.alert(
                'Erro no cadastro',
                'Não foi possível criar sua conta. Tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleGoToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
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
                        {/* Header com botão voltar */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={handleGoBack}
                                style={styles.backButton}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={colors.text}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Logo/Brand */}
                        <View style={styles.brandContainer}>
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

                        {/* Título */}
                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, { color: colors.text }]}>
                                Criar conta
                            </Text>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                Comece sua jornada de produtividade
                            </Text>
                        </View>

                        {/* Formulário */}
                        <View style={styles.form}>
                            <Input
                                label="Nome completo"
                                placeholder="João Silva"
                                value={name}
                                onChangeText={setName}
                                error={errors.name}
                                autoCapitalize="words"
                                autoComplete="name"
                                leftIcon="person"
                            />

                            <Input
                                label="Email"
                                placeholder="seu@email.com"
                                value={email}
                                onChangeText={setEmail}
                                error={errors.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                leftIcon="mail"
                            />

                            <Input
                                label="Senha"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                error={errors.password}
                                secureTextEntry
                                autoCapitalize="none"
                                autoComplete="password"
                                leftIcon="lock-closed"
                            />

                            <Input
                                label="Confirmar senha"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                error={errors.confirmPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoComplete="password"
                                leftIcon="lock-closed"
                            />

                            <Button
                                variant="primary"
                                size="lg"
                                onPress={handleRegister}
                                loading={loading}
                                disabled={loading}
                                style={styles.registerButton}
                            >
                                Criar conta
                            </Button>

                            <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                                Ao criar uma conta, você concorda com nossos{' '}
                                <Text style={{ color: theme.primary }}>Termos de Uso</Text> e{' '}
                                <Text style={{ color: theme.primary }}>
                                    Política de Privacidade
                                </Text>
                            </Text>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider}>
                            <View
                                style={[styles.dividerLine, { backgroundColor: colors.border }]}
                            />
                            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
                                ou
                            </Text>
                            <View
                                style={[styles.dividerLine, { backgroundColor: colors.border }]}
                            />
                        </View>

                        {/* Link para login */}
                        <View style={styles.loginContainer}>
                            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                                Já tem uma conta?{' '}
                            </Text>
                            <TouchableOpacity onPress={handleGoToLogin}>
                                <Text style={[styles.loginLink, { color: theme.primary }]}>
                                    Entrar
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
        paddingTop: 8,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    brandCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 40,
        fontFamily: 'Nunito_800ExtraBold',
    },
    titleContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Nunito_800ExtraBold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
    },
    registerButton: {
        width: '100%',
        marginTop: 8,
        marginBottom: 16,
    },
    termsText: {
        fontSize: 12,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 18,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
    loginLink: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
});
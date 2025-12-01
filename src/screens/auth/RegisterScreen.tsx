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
import { registerUser } from '@/services/api/authApi';

export default function RegisterScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const { login } = useAuthStore();
    const { setUser } = useUserStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
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

    const validateName = (name: string) => {
        if (!name) {
            setNameError('Nome é obrigatório');
            return false;
        }
        if (name.length < 3) {
            setNameError('Nome deve ter pelo menos 3 caracteres');
            return false;
        }
        setNameError('');
        return true;
    };

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

    const validateConfirmPassword = (confirm: string) => {
        if (!confirm) {
            setConfirmError('Confirme sua senha');
            return false;
        }
        if (confirm !== password) {
            setConfirmError('As senhas não coincidem');
            return false;
        }
        setConfirmError('');
        return true;
    };

    const handleRegister = async () => {
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmValid = validateConfirmPassword(confirmPassword);

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await registerUser(name, email, password);

            console.log('✅ Cadastro bem-sucedido');

            // ✅ Popular userStore com streak inicial = 1
            const mockUser = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                avatar: undefined,
                level: 1, // Novo usuário começa no nível 1
                currentXP: 0,
                nextLevelXP: 100,
                dailyXP: 0,
                totalXP: 0,
                streak: 1, // ✅ STREAK COMEÇA EM 1
            };

            console.log('📊 Criando novo usuário:', mockUser);

            setUser(mockUser);
            login(response.accessToken, response.refreshToken);

            console.log('🚀 Cadastro concluído, navegando...');
        } catch (error) {
            console.error('❌ Erro no cadastro:', error);
            setEmailError('Erro ao criar conta. Tente novamente.');
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
                                Criar conta
                            </Text>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                Junte-se ao VIDA e organize sua rotina
                            </Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Input
                                label="Nome completo"
                                placeholder="João Silva"
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                    if (nameError) validateName(text);
                                }}
                                onBlur={() => validateName(name)}
                                error={nameError}
                                leftIcon="person"
                                autoCapitalize="words"
                            />

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
                                placeholder="Mínimo 6 caracteres"
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

                            <Input
                                label="Confirmar senha"
                                placeholder="Digite sua senha novamente"
                                value={confirmPassword}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    if (confirmError) validateConfirmPassword(text);
                                }}
                                onBlur={() => validateConfirmPassword(confirmPassword)}
                                error={confirmError}
                                leftIcon="lock-closed"
                                secureTextEntry
                            />

                            <Button
                                variant="primary"
                                size="lg"
                                onPress={handleRegister}
                                loading={isLoading}
                                style={styles.registerButton}
                            >
                                Criar conta
                            </Button>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                Já tem uma conta?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login' as never)}
                            >
                                <Text style={[styles.footerLink, { color: theme.primary }]}>
                                    Faça login
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
    registerButton: {
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
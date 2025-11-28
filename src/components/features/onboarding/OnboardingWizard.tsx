import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button, Card } from '@/components/ui';
import { useAuthStore } from '@/store';

const { width } = Dimensions.get('window');

interface TaskSelection {
    taskId: string;
    period: 'morning' | 'afternoon' | 'evening';
}

interface TaskAnimations {
    [key: string]: Animated.Value;
}

interface OnboardingData {
    tasks: TaskSelection[];
    theme: 'light' | 'dark';
}

interface OnboardingWizardProps {
    onComplete: (data: OnboardingData) => void;
}

const TASK_OPTIONS = [
    { id: 'exercise', label: 'Praticar Exercícios', icon: 'fitness', color: '#10B981' },
    { id: 'study', label: 'Estudar', icon: 'book', color: '#3B82F6' },
    { id: 'meditate', label: 'Meditar', icon: 'leaf', color: '#8B5CF6' },
    { id: 'read', label: 'Ler', icon: 'library', color: '#F59E0B' },
    { id: 'work', label: 'Trabalhar em Projetos', icon: 'briefcase', color: '#EC4899' },
    { id: 'organize', label: 'Organizar Ambiente', icon: 'home', color: '#06B6D4' },
    { id: 'cook', label: 'Cozinhar', icon: 'restaurant', color: '#EF4444' },
    { id: 'socialize', label: 'Conversar com Amigos', icon: 'people', color: '#14B8A6' },
];

const PERIOD_OPTIONS = [
    { id: 'morning', label: 'Manhã', icon: 'sunny', color: '#F59E0B' },
    { id: 'afternoon', label: 'Tarde', icon: 'partly-sunny', color: '#3B82F6' },
    { id: 'evening', label: 'Noite', icon: 'moon', color: '#8B5CF6' },
];

const LOADING_MESSAGES = [
    { text: 'Analisando seus objetivos...', duration: 1500 },
    { text: 'Gerando rotina ideal...', duration: 2000 },
    { text: 'Rotina criada com sucesso!', duration: 3000 },
];

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const { colors, theme } = useTheme();
    const { completeOnboarding } = useAuthStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTasks, setSelectedTasks] = useState<TaskSelection[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    // Animações - Inicia INVISÍVEL (0) para evitar flash
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    // Animações para cada tarefa (expansão dos períodos)
    const taskAnimations = useRef<TaskAnimations>({});

    // Animações de loading/sucesso
    const successIconAnim = useRef(new Animated.Value(0)).current;
    const successCardAnim = useRef(new Animated.Value(0)).current;

    // Inicializa animações para todas as tarefas
    useEffect(() => {
        TASK_OPTIONS.forEach((task) => {
            if (!taskAnimations.current[task.id]) {
                taskAnimations.current[task.id] = new Animated.Value(0);
            }
        });
    }, []);

    // Anima a primeira vez que o componente monta
    useEffect(() => {
        animateStepChange();
    }, []);

    // Anima quando muda de step (mas não na primeira montagem)
    useEffect(() => {
        if (!isLoading && currentStep > 0) {
            animateStepChange();
        }
    }, [currentStep]);

    const animateStepChange = () => {
        // Reset para invisível
        fadeAnim.setValue(0);
        slideAnim.setValue(20);

        // Anima para visível
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNext = () => {
        if (currentStep < 2) {
            // Fade out antes de mudar de step
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: -20,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setCurrentStep(currentStep + 1);
            });
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            // Fade out antes de voltar
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 20,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setCurrentStep(currentStep - 1);
            });
        }
    };

    const handleComplete = async () => {
        setIsLoading(true);
        setLoadingMessageIndex(0);

        // Simular loading com mensagens sequenciais
        for (let i = 0; i < LOADING_MESSAGES.length; i++) {
            setLoadingMessageIndex(i);

            // Se é a mensagem de sucesso, anima o ícone e o card
            if (i === LOADING_MESSAGES.length - 1) {
                // Reset das animações
                successIconAnim.setValue(0);
                successCardAnim.setValue(0);

                // Aguarda um frame antes de animar
                await new Promise(resolve => setTimeout(resolve, 100));

                // Anima ícone de sucesso (scale + bounce)
                Animated.spring(successIconAnim, {
                    toValue: 1,
                    damping: 10,
                    stiffness: 100,
                    useNativeDriver: true,
                }).start();

                // Anima card de informação (fade + slide) com delay
                setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(successCardAnim, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, 300);
            }

            await new Promise((resolve) =>
                setTimeout(resolve, LOADING_MESSAGES[i].duration)
            );
        }

        const data: OnboardingData = {
            tasks: selectedTasks,
            theme: selectedTheme,
        };

        completeOnboarding();
        onComplete(data);
    };

    const toggleTask = (taskId: string) => {
        const exists = selectedTasks.find((t) => t.taskId === taskId);

        if (exists) {
            // Anima para fechar (0)
            Animated.timing(taskAnimations.current[taskId], {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start(() => {
                setSelectedTasks(selectedTasks.filter((t) => t.taskId !== taskId));
            });
        } else {
            // Adiciona tarefa
            setSelectedTasks([...selectedTasks, { taskId, period: 'morning' }]);

            // Anima para abrir (1)
            Animated.spring(taskAnimations.current[taskId], {
                toValue: 1,
                damping: 20,
                stiffness: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const updateTaskPeriod = (
        taskId: string,
        period: 'morning' | 'afternoon' | 'evening'
    ) => {
        setSelectedTasks(
            selectedTasks.map((t) => (t.taskId === taskId ? { ...t, period } : t))
        );
    };

    const isTaskSelected = (taskId: string) => {
        return selectedTasks.some((t) => t.taskId === taskId);
    };

    const getTaskPeriod = (taskId: string) => {
        return selectedTasks.find((t) => t.taskId === taskId)?.period || 'morning';
    };

    const canProceed = () => {
        if (currentStep === 1 && selectedTasks.length === 0) return false;
        return true;
    };

    // Loading Screen
    if (isLoading) {
        const currentMessage = LOADING_MESSAGES[loadingMessageIndex];
        const isSuccess = loadingMessageIndex === LOADING_MESSAGES.length - 1;

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.loadingContainer}>
                    {isSuccess ? (
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        scale: successIconAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 1],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={120}
                                color={theme.success}
                            />
                        </Animated.View>
                    ) : (
                        <ActivityIndicator size="large" color={theme.primary} />
                    )}

                    <Text style={[styles.loadingText, { color: colors.text }]}>
                        {currentMessage.text}
                    </Text>

                    {isSuccess && (
                        <Animated.View
                            style={{
                                opacity: successCardAnim,
                                transform: [
                                    {
                                        translateY: successCardAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <Card
                                variant="duolingo"
                                style={[styles.successCard, { backgroundColor: `${theme.success}10` }]}
                            >
                                <View style={styles.successRow}>
                                    <Ionicons name="information-circle" size={20} color={theme.success} />
                                    <Text style={[styles.successMessage, { color: colors.text }]}>
                                        Você pode visualizar e editar sua rotina na aba "Rotina"
                                    </Text>
                                </View>
                            </Card>
                        </Animated.View>
                    )}
                </View>
            </SafeAreaView>
        );
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="sparkles" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Vamos começar!
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Em poucos passos, vamos personalizar o VIDA para você e criar sua
                            primeira rotina inteligente.
                        </Text>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="calendar" size={24} color="#3B82F6" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Rotina Personalizada
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        Baseada nos seus períodos e objetivos
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="flash" size={24} color="#F59E0B" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Assistente IA
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        Sugestões inteligentes para seu dia
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="trophy" size={24} color="#10B981" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Gamificação
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        XP, níveis e conquistas
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </Animated.View>
                );

            case 1:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="list" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Suas tarefas diárias
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Selecione as atividades que deseja incluir na sua rotina e escolha
                            o melhor período para cada uma.
                        </Text>

                        <ScrollView
                            style={styles.tasksScrollView}
                            showsVerticalScrollIndicator={false}
                        >
                            {TASK_OPTIONS.map((task) => {
                                const isSelected = isTaskSelected(task.id);
                                const currentPeriod = getTaskPeriod(task.id);
                                const animValue = taskAnimations.current[task.id] || new Animated.Value(0);

                                // Altura máxima do seletor de período
                                const periodHeight = animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50],
                                });

                                const periodOpacity = animValue.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 0, 1],
                                });

                                return (
                                    <View key={task.id} style={styles.taskContainer}>
                                        <TouchableOpacity
                                            style={[
                                                styles.taskCard,
                                                {
                                                    backgroundColor: isSelected
                                                        ? `${task.color}15`
                                                        : colors.card,
                                                    borderWidth: 2,
                                                    borderColor: isSelected
                                                        ? task.color
                                                        : colors.border,
                                                },
                                            ]}
                                            onPress={() => toggleTask(task.id)}
                                            activeOpacity={0.7}
                                        >
                                            <Ionicons
                                                name={task.icon as any}
                                                size={28}
                                                color={isSelected ? task.color : colors.textSecondary}
                                            />
                                            <Text
                                                style={[
                                                    styles.taskLabel,
                                                    {
                                                        color: isSelected
                                                            ? colors.text
                                                            : colors.textSecondary,
                                                    },
                                                ]}
                                            >
                                                {task.label}
                                            </Text>

                                            {isSelected && (
                                                <View
                                                    style={[
                                                        styles.checkBadge,
                                                        { backgroundColor: task.color },
                                                    ]}
                                                >
                                                    <Ionicons
                                                        name="checkmark"
                                                        size={16}
                                                        color="#ffffff"
                                                    />
                                                </View>
                                            )}
                                        </TouchableOpacity>

                                        {isSelected && (
                                            <Animated.View
                                                style={[
                                                    styles.periodSelector,
                                                    {
                                                        height: periodHeight,
                                                        opacity: periodOpacity,
                                                        overflow: 'hidden',
                                                    },
                                                ]}
                                            >
                                                {PERIOD_OPTIONS.map((period) => (
                                                    <TouchableOpacity
                                                        key={period.id}
                                                        style={[
                                                            styles.periodButton,
                                                            {
                                                                backgroundColor:
                                                                    currentPeriod === period.id
                                                                        ? period.color
                                                                        : colors.card,
                                                                borderWidth: 1,
                                                                borderColor:
                                                                    currentPeriod === period.id
                                                                        ? period.color
                                                                        : colors.border,
                                                            },
                                                        ]}
                                                        onPress={() =>
                                                            updateTaskPeriod(
                                                                task.id,
                                                                period.id as any
                                                            )
                                                        }
                                                        activeOpacity={0.7}
                                                    >
                                                        <Ionicons
                                                            name={period.icon as any}
                                                            size={16}
                                                            color={
                                                                currentPeriod === period.id
                                                                    ? '#ffffff'
                                                                    : colors.textSecondary
                                                            }
                                                        />
                                                        <Text
                                                            style={[
                                                                styles.periodLabel,
                                                                {
                                                                    color:
                                                                        currentPeriod === period.id
                                                                            ? '#ffffff'
                                                                            : colors.textSecondary,
                                                                },
                                                            ]}
                                                        >
                                                            {period.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </Animated.View>
                                        )}
                                    </View>
                                );
                            })}
                        </ScrollView>

                        {selectedTasks.length === 0 && (
                            <Text style={[styles.errorText, { color: theme.error }]}>
                                Selecione pelo menos uma tarefa
                            </Text>
                        )}
                    </Animated.View>
                );

            case 2:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="color-palette" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Escolha seu tema
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Selecione o tema que mais combina com você. Você pode mudar a
                            qualquer momento.
                        </Text>

                        <View style={styles.themesContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.themeCard,
                                    {
                                        backgroundColor: '#ffffff',
                                        borderWidth: 3,
                                        borderColor:
                                            selectedTheme === 'light'
                                                ? theme.primary
                                                : '#E5E7EB',
                                    },
                                ]}
                                onPress={() => setSelectedTheme('light')}
                            >
                                <View style={styles.themePreview}>
                                    <View style={[styles.themeHeader, { backgroundColor: '#F3F4F6' }]}>
                                        <View style={[styles.themeDot, { backgroundColor: '#EF4444' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#F59E0B' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#10B981' }]} />
                                    </View>
                                    <View style={styles.themeContent}>
                                        <View style={[styles.themeLine, { backgroundColor: '#E5E7EB' }]} />
                                        <View style={[styles.themeLine, { backgroundColor: '#E5E7EB', width: '60%' }]} />
                                    </View>
                                </View>
                                <Text style={[styles.themeLabel, { color: '#1F2937' }]}>
                                    Claro
                                </Text>
                                {selectedTheme === 'light' && (
                                    <View style={[styles.themeCheck, { backgroundColor: theme.primary }]}>
                                        <Ionicons name="checkmark" size={20} color="#ffffff" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.themeCard,
                                    {
                                        backgroundColor: '#0F172A',
                                        borderWidth: 3,
                                        borderColor:
                                            selectedTheme === 'dark' ? theme.primary : '#334155',
                                    },
                                ]}
                                onPress={() => setSelectedTheme('dark')}
                            >
                                <View style={styles.themePreview}>
                                    <View style={[styles.themeHeader, { backgroundColor: '#1E293B' }]}>
                                        <View style={[styles.themeDot, { backgroundColor: '#EF4444' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#F59E0B' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#10B981' }]} />
                                    </View>
                                    <View style={styles.themeContent}>
                                        <View style={[styles.themeLine, { backgroundColor: '#334155' }]} />
                                        <View style={[styles.themeLine, { backgroundColor: '#334155', width: '60%' }]} />
                                    </View>
                                </View>
                                <Text style={[styles.themeLabel, { color: '#F1F5F9' }]}>
                                    Escuro
                                </Text>
                                {selectedTheme === 'dark' && (
                                    <View style={[styles.themeCheck, { backgroundColor: theme.primary }]}>
                                        <Ionicons name="checkmark" size={20} color="#ffffff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressBar,
                            {
                                backgroundColor: theme.primary,
                                width: `${((currentStep + 1) / 3) * 100}%`,
                            },
                        ]}
                    />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    {currentStep + 1} de 3
                </Text>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderStep()}
            </ScrollView>

            {/* Navigation Buttons */}
            <View style={styles.navigation}>
                {currentStep > 0 && (
                    <Button
                        variant="outline"
                        size="lg"
                        onPress={handleBack}
                        style={styles.backButton}
                    >
                        Voltar
                    </Button>
                )}
                <Button
                    variant="primary"
                    size="lg"
                    onPress={handleNext}
                    disabled={!canProceed()}
                    style={[styles.nextButton, currentStep === 0 && styles.fullWidthButton]}
                >
                    {currentStep === 2 ? 'Finalizar' : 'Continuar'}
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    stepContainer: {
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Nunito_800ExtraBold',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    featureCard: {
        marginBottom: 12,
        padding: 16,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 2,
    },
    featureDesc: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    tasksScrollView: {
        maxHeight: 400,
    },
    taskContainer: {
        marginBottom: 16,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 16,
        padding: 16,
        position: 'relative',
    },
    taskLabel: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Nunito_600SemiBold',
    },
    checkBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodSelector: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        paddingLeft: 12,
    },
    periodButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    periodLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_600SemiBold',
    },
    errorText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
        marginTop: 16,
    },
    themesContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    themeCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
    },
    themePreview: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
    },
    themeHeader: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        gap: 4,
    },
    themeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    themeContent: {
        flex: 1,
        padding: 12,
        gap: 8,
    },
    themeLine: {
        height: 8,
        borderRadius: 4,
    },
    themeLabel: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    themeCheck: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigation: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    backButton: {
        flex: 1,
    },
    nextButton: {
        flex: 1,
    },
    fullWidthButton: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        gap: 32,
    },
    loadingText: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
        textAlign: 'center',
    },
    successCard: {
        padding: 16,
        borderRadius: 16,
        width: '100%',
    },
    successRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    successMessage: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        lineHeight: 20,
    },
});
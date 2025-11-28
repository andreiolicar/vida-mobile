import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Card } from '@/components/ui';
import {
    XPBar,
    AvatarWithStreak,
    NotificationsModal,
    MindFlowNode,
    PeriodHub,
    StreakInfoModal,
} from '@/components/features';
import { RoutineInfoModal, AlertModal } from '@/components/features/modals';
import { NotificationIcon } from '@/components/icons';
import { mockDashboardData } from '@/services/mock/dashboardData';
import { mockTasks, Task } from '@/services/mock/routineData';
import { isPeriodAvailable } from '@/utils';

type AlertType = 'locked-period' | 'multiple-tasks' | null;

export default function DashboardScreen() {
    const { theme, colors } = useTheme();
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [streakInfoVisible, setStreakInfoVisible] = useState(false);
    const [routineInfoVisible, setRoutineInfoVisible] = useState(false);
    const [alertType, setAlertType] = useState<AlertType>(null);

    const isProcessing = useRef(false);

    // Animações
    const headerAnim = useRef(new Animated.Value(0)).current;
    const xpCardAnim = useRef(new Animated.Value(0)).current;
    const statsAnim = useRef(new Animated.Value(0)).current;
    const morningAnim = useRef(new Animated.Value(0)).current;
    const afternoonAnim = useRef(new Animated.Value(0)).current;
    const eveningAnim = useRef(new Animated.Value(0)).current;

    const { user, dailyProgress, insights } = mockDashboardData;

    useEffect(() => {
        startAnimations();
    }, []);

    const startAnimations = () => {
        Animated.sequence([
            // Header
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            // Cards
            Animated.parallel([
                Animated.timing(xpCardAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(statsAnim, {
                    toValue: 1,
                    duration: 300,
                    delay: 100,
                    useNativeDriver: true,
                }),
            ]),
            // Fluxo VIDA - sequencial
            Animated.timing(morningAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(afternoonAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(eveningAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Funções auxiliares do RoutineScreen
    const getTasksByPeriod = (period: 'morning' | 'afternoon' | 'evening') => {
        return tasks.filter((task) => task.period === period);
    };

    const getPeriodProgress = (period: 'morning' | 'afternoon' | 'evening') => {
        const periodTasks = getTasksByPeriod(period);
        if (periodTasks.length === 0) return 0;
        const completed = periodTasks.filter((t) => t.status === 'completed').length;
        return Math.round((completed / periodTasks.length) * 100);
    };

    const hasTaskInProgress = () => {
        return tasks.some((task) => task.status === 'in-progress');
    };

    const getTaskStatus = (
        task: Task
    ): 'locked' | 'available' | 'in-progress' | 'completed' => {
        if (!isPeriodAvailable(task.period)) return 'locked';
        if (task.status === 'completed') return 'completed';
        if (task.status === 'in-progress') return 'in-progress';
        return 'available';
    };

    // Função de toggle igual ao RoutineScreen
    const handleToggleTask = (taskId: string) => {
        if (isProcessing.current) return;

        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        if (!isPeriodAvailable(task.period)) {
            isProcessing.current = true;
            setAlertType('locked-period');

            setTimeout(() => {
                isProcessing.current = false;
            }, 500);
            return;
        }

        if (task.status === 'pending') {
            if (hasTaskInProgress()) {
                isProcessing.current = true;
                setAlertType('multiple-tasks');

                setTimeout(() => {
                    isProcessing.current = false;
                }, 500);
                return;
            }

            setTasks(
                tasks.map((t) =>
                    t.id === taskId ? { ...t, status: 'in-progress' as const } : t
                )
            );
            return;
        }

        if (task.status === 'in-progress') {
            setTasks(
                tasks.map((t) =>
                    t.id === taskId ? { ...t, status: 'completed' as const } : t
                )
            );
            return;
        }

        if (task.status === 'completed') {
            setTasks(
                tasks.map((t) =>
                    t.id === taskId ? { ...t, status: 'pending' as const } : t
                )
            );
        }
    };

    const morningTasks = getTasksByPeriod('morning');
    const afternoonTasks = getTasksByPeriod('afternoon');
    const eveningTasks = getTasksByPeriod('evening');

    return (
        <>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Header Fixo com animação */}
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: colors.card },
                        {
                            opacity: headerAnim,
                            transform: [
                                {
                                    translateY: headerAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
                                Olá,
                            </Text>
                            <Text style={[styles.userName, { color: colors.text }]}>
                                {user.name}
                            </Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity
                                style={styles.notificationButton}
                                onPress={() => setNotificationsVisible(true)}
                            >
                                <NotificationIcon
                                    size={28}
                                    hasNotifications={insights.length > 0}
                                    color={colors.text}
                                />
                            </TouchableOpacity>

                            <AvatarWithStreak
                                name={user.name}
                                streak={user.streak}
                                onStreakPress={() => setStreakInfoVisible(true)}
                            />
                        </View>
                    </View>
                </Animated.View>

                {/* Conteúdo Scrollável */}
                <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {/* Barra de XP com animação */}
                        <Animated.View
                            style={{
                                opacity: xpCardAnim,
                                transform: [
                                    {
                                        translateY: xpCardAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [30, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <Card variant="duolingo" style={styles.xpCard}>
                                <XPBar
                                    currentXP={user.currentXP}
                                    maxXP={user.nextLevelXP}
                                    level={user.level}
                                />
                            </Card>
                        </Animated.View>

                        {/* Progresso Diário com animação */}
                        <Animated.View
                            style={[
                                styles.statsRow,
                                {
                                    opacity: statsAnim,
                                    transform: [
                                        {
                                            translateY: statsAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [30, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Card variant="duolingo" style={styles.statCard}>
                                <Text style={[styles.statValue, { color: colors.text }]}>
                                    {dailyProgress.tasksCompleted}/{dailyProgress.totalTasks}
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                    Concluídas
                                </Text>
                            </Card>

                            <Card variant="duolingo" style={styles.statCard}>
                                <Text style={[styles.statValue, { color: colors.text }]}>
                                    {dailyProgress.focusMinutes}min
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                    Focado
                                </Text>
                            </Card>
                        </Animated.View>

                        {/* Título da Rotina */}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                Sua Rotina
                            </Text>
                            <TouchableOpacity
                                onPress={() => setRoutineInfoVisible(true)}
                                style={styles.infoButton}
                            >
                                <Ionicons
                                    name="information-circle"
                                    size={24}
                                    color={theme.primary}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Manhã com animação */}
                        <Animated.View
                            style={{
                                opacity: morningAnim,
                                transform: [
                                    {
                                        translateY: morningAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <View style={styles.periodSection}>
                                <PeriodHub
                                    period="morning"
                                    label="Manhã"
                                    progress={getPeriodProgress('morning')}
                                />

                                <View style={styles.tasksCluster}>
                                    {morningTasks.map((task) => (
                                        <MindFlowNode
                                            key={task.id}
                                            title={task.title}
                                            status={getTaskStatus(task)}
                                            onPress={() => handleToggleTask(task.id)}
                                        />
                                    ))}
                                </View>
                            </View>
                        </Animated.View>

                        <View style={[styles.connector, { backgroundColor: colors.border }]} />

                        {/* Tarde com animação */}
                        <Animated.View
                            style={{
                                opacity: afternoonAnim,
                                transform: [
                                    {
                                        translateY: afternoonAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <View style={styles.periodSection}>
                                <PeriodHub
                                    period="afternoon"
                                    label="Tarde"
                                    progress={getPeriodProgress('afternoon')}
                                />

                                <View style={styles.tasksCluster}>
                                    {afternoonTasks.map((task) => (
                                        <MindFlowNode
                                            key={task.id}
                                            title={task.title}
                                            status={getTaskStatus(task)}
                                            onPress={() => handleToggleTask(task.id)}
                                        />
                                    ))}
                                </View>
                            </View>
                        </Animated.View>

                        <View style={[styles.connector, { backgroundColor: colors.border }]} />

                        {/* Noite com animação */}
                        <Animated.View
                            style={{
                                opacity: eveningAnim,
                                transform: [
                                    {
                                        translateY: eveningAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <View style={styles.periodSection}>
                                <PeriodHub
                                    period="evening"
                                    label="Noite"
                                    progress={getPeriodProgress('evening')}
                                />

                                <View style={styles.tasksCluster}>
                                    {eveningTasks.map((task) => (
                                        <MindFlowNode
                                            key={task.id}
                                            title={task.title}
                                            status={getTaskStatus(task)}
                                            onPress={() => handleToggleTask(task.id)}
                                        />
                                    ))}
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <NotificationsModal
                visible={notificationsVisible}
                notifications={insights}
                onClose={() => setNotificationsVisible(false)}
            />

            <StreakInfoModal
                visible={streakInfoVisible}
                currentStreak={user.streak}
                onClose={() => setStreakInfoVisible(false)}
            />

            <RoutineInfoModal
                visible={routineInfoVisible}
                onClose={() => setRoutineInfoVisible(false)}
            />

            {/* Modal de Alertas (período bloqueado / múltiplas tarefas) */}
            <AlertModal
                visible={alertType !== null}
                type={alertType || 'locked-period'}
                onClose={() => setAlertType(null)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E7EB',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    notificationButton: {
        padding: 4,
    },
    scrollContent: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    xpCard: {
        marginBottom: 16,
        padding: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontFamily: 'Nunito_800ExtraBold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    infoButton: {
        padding: 2,
    },
    periodSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    tasksCluster: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginTop: 20,
        maxWidth: 300,
    },
    connector: {
        width: 3,
        height: 40,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 2,
    },
});
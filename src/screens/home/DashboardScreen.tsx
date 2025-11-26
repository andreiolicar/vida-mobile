import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks';
import { Card } from '@/components/ui';
import {
    XPBar,
    AvatarWithStreak,
    NotificationsModal,
    MindFlowNode,
    PeriodHub,
    StreakInfoModal,
    FluxoInfoModal,
    OnboardingModal,
} from '@/components/features';
import { NotificationIcon } from '@/components/icons';
import { mockDashboardData } from '@/services/mock/dashboardData';

const ONBOARDING_KEY = '@vida_onboarding_completed';

export default function DashboardScreen() {
    const { theme, colors } = useTheme();
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [streakInfoVisible, setStreakInfoVisible] = useState(false);
    const [fluxoInfoVisible, setFluxoInfoVisible] = useState(false);
    const [onboardingVisible, setOnboardingVisible] = useState(false);

    const { user, dailyProgress, mindFlow, insights } = mockDashboardData;

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
            if (!completed) {
                setOnboardingVisible(true);
            }
        } catch (error) {
            console.error('Error checking onboarding:', error);
        }
    };

    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
            setOnboardingVisible(false);
        } catch (error) {
            console.error('Error saving onboarding:', error);
        }
    };

    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Header Fixo */}
                <View style={[styles.header, { backgroundColor: colors.card }]}>
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
                </View>

                {/* Conteúdo Scrollável */}
                <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {/* Barra de XP */}
                        <Card variant="elevated" style={styles.xpCard}>
                            <XPBar
                                currentXP={user.currentXP}
                                maxXP={user.nextLevelXP}
                                level={user.level}
                            />
                        </Card>

                        {/* Progresso Diário Compacto */}
                        <View style={styles.statsRow}>
                            <Card variant="elevated" style={styles.statCard}>
                                <Text style={[styles.statValue, { color: theme.primary }]}>
                                    {dailyProgress.tasksCompleted}/{dailyProgress.totalTasks}
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                    Concluídas
                                </Text>
                            </Card>

                            <Card variant="elevated" style={styles.statCard}>
                                <Text style={[styles.statValue, { color: theme.warning }]}>
                                    {dailyProgress.focusMinutes}min
                                </Text>
                                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                    Focado
                                </Text>
                            </Card>
                        </View>

                        {/* Título do Fluxo VIDA com ícone info */}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                Fluxo VIDA
                            </Text>
                            <TouchableOpacity
                                onPress={() => setFluxoInfoVisible(true)}
                                style={styles.infoButton}
                            >
                                <Ionicons
                                    name="information-circle"
                                    size={24}
                                    color={theme.primary}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Manhã */}
                        <View style={styles.periodSection}>
                            <PeriodHub
                                period="morning"
                                label={mindFlow.morning.label}
                                progress={mindFlow.morning.progress}
                            />

                            <View style={styles.tasksCluster}>
                                {mindFlow.morning.tasks.map((task) => (
                                    <MindFlowNode
                                        key={task.id}
                                        title={task.title}
                                        status={task.status as any}
                                        onPress={() => console.log(task.id)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={[styles.connector, { backgroundColor: colors.border }]} />

                        {/* Tarde */}
                        <View style={styles.periodSection}>
                            <PeriodHub
                                period="afternoon"
                                label={mindFlow.afternoon.label}
                                progress={mindFlow.afternoon.progress}
                            />

                            <View style={styles.tasksCluster}>
                                {mindFlow.afternoon.tasks.map((task) => (
                                    <MindFlowNode
                                        key={task.id}
                                        title={task.title}
                                        status={task.status as any}
                                        onPress={() => console.log(task.id)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={[styles.connector, { backgroundColor: colors.border }]} />

                        {/* Noite */}
                        <View style={styles.periodSection}>
                            <PeriodHub
                                period="evening"
                                label={mindFlow.evening.label}
                                progress={mindFlow.evening.progress}
                            />

                            <View style={styles.tasksCluster}>
                                {mindFlow.evening.tasks.map((task) => (
                                    <MindFlowNode
                                        key={task.id}
                                        title={task.title}
                                        status={task.status as any}
                                        onPress={() => console.log(task.id)}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

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

            <FluxoInfoModal
                visible={fluxoInfoVisible}
                onClose={() => setFluxoInfoVisible(false)}
            />

            <OnboardingModal
                visible={onboardingVisible}
                onComplete={handleOnboardingComplete}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
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
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        padding: 16,
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
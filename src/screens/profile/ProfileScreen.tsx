import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Alert,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { useAuthStore, useUserStore } from '@/store';
import { Card, Badge } from '@/components/ui';
import { AvatarWithStreak, StreakInfoModal } from '@/components/features';
import { mockDashboardData } from '@/services/mock/dashboardData';

const { width } = Dimensions.get('window');

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    unlocked: boolean;
    progress?: number;
    maxProgress?: number;
}

export default function ProfileScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const { logout } = useAuthStore();
    const { user: storeUser } = useUserStore();

    // ✅ SOLUÇÃO: Usar mock data se userStore estiver vazio
    const user = storeUser || mockDashboardData.user;

    const [streakInfoVisible, setStreakInfoVisible] = React.useState(false);

    // Animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;
    const achievementsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimations();
        console.log('📊 User data:', user);
        console.log('🔥 Streak:', user?.streak);
    }, []);

    const startAnimations = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(achievementsAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                        console.log('🚪 Logout iniciado...');
                        logout();
                        console.log('✅ Logout concluído');
                    },
                },
            ]
        );
    };

    const handleSettings = () => {
        navigation.navigate('Settings' as never);
    };

    const handleAchievements = () => {
        navigation.navigate('Achievements' as never);
    };

    // Mock de conquistas
    const allAchievements: Achievement[] = [
        {
            id: '1',
            title: 'Primeira Tarefa',
            description: 'Complete sua primeira tarefa',
            icon: 'rocket',
            color: '#10B981',
            unlocked: true,
        },
        {
            id: '2',
            title: 'Sequência de 7 Dias',
            description: 'Mantenha uma sequência de 7 dias',
            icon: 'flame',
            color: '#F59E0B',
            unlocked: true,
        },
        {
            id: '3',
            title: 'Madrugador',
            description: 'Complete 10 tarefas matinais',
            icon: 'sunny',
            color: '#FBBF24',
            unlocked: true,
        },
        {
            id: '4',
            title: 'Centenário',
            description: 'Complete 100 tarefas',
            icon: 'trophy',
            color: '#EC4899',
            unlocked: false,
            progress: 67,
            maxProgress: 100,
        },
        {
            id: '5',
            title: 'Noturno',
            description: 'Complete 10 tarefas noturnas',
            icon: 'moon',
            color: '#8B5CF6',
            unlocked: false,
            progress: 6,
            maxProgress: 10,
        },
        {
            id: '6',
            title: 'Produtivo',
            description: 'Alcance nível 10',
            icon: 'speedometer',
            color: '#06B6D4',
            unlocked: false,
            progress: user?.level || 1,
            maxProgress: 10,
        },
        {
            id: '7',
            title: 'Dedicado',
            description: 'Acumule 1000 XP',
            icon: 'flash',
            color: '#F59E0B',
            unlocked: false,
            progress: user?.currentXP || 0,
            maxProgress: 1000,
        },
        {
            id: '8',
            title: 'Persistente',
            description: 'Sequência de 30 dias',
            icon: 'flame',
            color: '#EF4444',
            unlocked: false,
            progress: user?.streak || 0,
            maxProgress: 30,
        },
    ];

    const achievements = allAchievements.slice(0, 6);
    const totalAchievements = allAchievements.length;

    const handleHelp = () => {
        navigation.navigate('Help' as never);
    };

    const unlockedCount = allAchievements.filter((a) => a.unlocked).length;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header com Avatar */}
                    <Animated.View
                        style={[
                            styles.header,
                            {
                                opacity: headerAnim,
                                transform: [
                                    {
                                        translateY: headerAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [30, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        {/* Avatar com Streak */}
                        <View style={styles.avatarRow}>
                            <AvatarWithStreak
                                name={user.name}
                                streak={user.streak}
                                size={96}
                                onStreakPress={() => {
                                    console.log('🔥 Streak badge clicado, valor:', user.streak);
                                    setStreakInfoVisible(true);
                                }}
                            />
                        </View>

                        <Text style={[styles.name, { color: colors.text }]}>
                            {user.name}
                        </Text>
                        <Text style={[styles.email, { color: colors.textSecondary }]}>
                            {storeUser?.email || 'email@exemplo.com'}
                        </Text>

                        {/* Card de Nível + XP */}
                        <Card variant="duolingo" style={styles.levelCard}>
                            <View style={styles.levelHeader}>
                                <View style={[styles.levelBadge, { backgroundColor: theme.primary }]}>
                                    <Ionicons name="trophy" size={16} color="#ffffff" />
                                    <Text style={styles.levelBadgeText}>Nível {user.level}</Text>
                                </View>
                                <Text style={[styles.xpText, { color: colors.textSecondary }]}>
                                    {user.currentXP} / {user.nextLevelXP} XP
                                </Text>
                            </View>

                            {/* Barra de Progresso */}
                            <View style={[styles.xpTrack, { backgroundColor: `${theme.primary}20` }]}>
                                <View
                                    style={[
                                        styles.xpBar,
                                        {
                                            backgroundColor: theme.primary,
                                            width: `${((user.currentXP || 0) / (user.nextLevelXP || 100)) * 100}%`,
                                        },
                                    ]}
                                />
                            </View>

                            <Text style={[styles.xpLabel, { color: colors.textSecondary }]}>
                                {Math.round(((user.currentXP || 0) / (user.nextLevelXP || 100)) * 100)}% para o próximo nível
                            </Text>
                        </Card>
                    </Animated.View>

                    {/* Conquistas */}
                    <Animated.View
                        style={{
                            opacity: achievementsAnim,
                            transform: [
                                {
                                    translateY: achievementsAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                Conquistas
                            </Text>
                            <View style={styles.badgeRow}>
                                <Badge variant="primary" size="sm">
                                    {unlockedCount}/{totalAchievements}
                                </Badge>
                                <TouchableOpacity onPress={handleAchievements}>
                                    <Text style={[styles.viewAllText, { color: theme.primary }]}>
                                        Ver todas
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.achievementsGrid}>
                            {achievements.map((achievement) => (
                                <Card
                                    key={achievement.id}
                                    variant="duolingo"
                                    style={[
                                        styles.achievementCard,
                                        !achievement.unlocked && styles.achievementLocked,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.achievementIcon,
                                            {
                                                backgroundColor: achievement.unlocked
                                                    ? `${achievement.color}20`
                                                    : `${colors.border}40`,
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={achievement.icon}
                                            size={32}
                                            color={
                                                achievement.unlocked
                                                    ? achievement.color
                                                    : colors.textSecondary
                                            }
                                        />
                                    </View>

                                    <Text
                                        style={[
                                            styles.achievementTitle,
                                            {
                                                color: achievement.unlocked
                                                    ? colors.text
                                                    : colors.textSecondary,
                                            },
                                        ]}
                                    >
                                        {achievement.title}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.achievementDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        {achievement.description}
                                    </Text>

                                    {!achievement.unlocked &&
                                        achievement.progress !== undefined && (
                                            <View style={styles.progressContainer}>
                                                <View
                                                    style={[
                                                        styles.progressTrack,
                                                        { backgroundColor: colors.border },
                                                    ]}
                                                >
                                                    <View
                                                        style={[
                                                            styles.progressBar,
                                                            {
                                                                backgroundColor: achievement.color,
                                                                width: `${((achievement.progress || 0) /
                                                                    (achievement.maxProgress || 1)) *
                                                                    100
                                                                    }%`,
                                                            },
                                                        ]}
                                                    />
                                                </View>
                                                <Text
                                                    style={[
                                                        styles.progressText,
                                                        { color: colors.textSecondary },
                                                    ]}
                                                >
                                                    {achievement.progress}/{achievement.maxProgress}
                                                </Text>
                                            </View>
                                        )}

                                    {achievement.unlocked && (
                                        <View
                                            style={[
                                                styles.unlockedBadge,
                                                { backgroundColor: achievement.color },
                                            ]}
                                        >
                                            <Ionicons
                                                name="checkmark"
                                                size={16}
                                                color="#ffffff"
                                            />
                                        </View>
                                    )}
                                </Card>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Ações */}
                    <View style={styles.actionsSection}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            onPress={handleSettings}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="settings" size={24} color={colors.text} />
                            <Text style={[styles.actionText, { color: colors.text }]}>
                                Configurações
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            onPress={handleHelp}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="help-circle" size={24} color={colors.text} />
                            <Text style={[styles.actionText, { color: colors.text }]}>
                                Ajuda e Suporte
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                styles.logoutButton,
                                {
                                    backgroundColor: `${theme.error}10`,
                                    borderColor: theme.error
                                },
                            ]}
                            onPress={handleLogout}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="log-out" size={24} color={theme.error} />
                            <Text style={[styles.actionText, { color: theme.error }]}>
                                Sair da conta
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={theme.error}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animated.View>

            {/* Modal de Streak Info */}
            <StreakInfoModal
                visible={streakInfoVisible}
                currentStreak={user.streak}
                onClose={() => {
                    console.log('❌ Modal de streak fechado');
                    setStreakInfoVisible(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
    },
    avatarRow: {
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Nunito_800ExtraBold',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        marginBottom: 20,
    },
    levelCard: {
        width: '100%',
        padding: 16,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    levelBadgeText: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        color: '#ffffff',
    },
    xpText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
    xpTrack: {
        height: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    xpBar: {
        height: '100%',
        borderRadius: 4,
    },
    xpLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
    achievementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        gap: 12,
        marginBottom: 32,
    },
    achievementCard: {
        width: (width - 52) / 2,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
    },
    achievementLocked: {
        opacity: 0.6,
    },
    achievementIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    achievementTitle: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    achievementDesc: {
        fontSize: 12,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 16,
    },
    progressContainer: {
        width: '100%',
        marginTop: 12,
    },
    progressTrack: {
        height: 4,
        borderRadius: 2,
        marginBottom: 4,
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 10,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
    },
    unlockedBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsSection: {
        paddingHorizontal: 20,
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        gap: 12,
    },
    actionText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
    },
    logoutButton: {
        marginTop: 8,
    },
});
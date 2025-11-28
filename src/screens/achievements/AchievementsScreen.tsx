import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { useUserStore } from '@/store';
import { Card, Badge } from '@/components/ui';

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
    category: string;
}

type Category = 'Todas' | 'Tarefas' | 'Streaks' | 'XP' | 'Tempo';

export default function AchievementsScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const { user } = useUserStore();
    const [selectedCategory, setSelectedCategory] = useState<Category>('Todas');

    const categories: Category[] = ['Todas', 'Tarefas', 'Streaks', 'XP', 'Tempo'];

    // Todas as conquistas organizadas
    const allAchievements: Achievement[] = [
        // Tarefas
        {
            id: '1',
            title: 'Primeira Tarefa',
            description: 'Complete sua primeira tarefa',
            icon: 'rocket',
            color: '#10B981',
            unlocked: true,
            category: 'Tarefas',
        },
        {
            id: '2',
            title: 'Iniciante',
            description: 'Complete 10 tarefas',
            icon: 'star',
            color: '#3B82F6',
            unlocked: true,
            category: 'Tarefas',
        },
        {
            id: '3',
            title: 'Dedicado',
            description: 'Complete 50 tarefas',
            icon: 'trophy',
            color: '#8B5CF6',
            unlocked: false,
            progress: 34,
            maxProgress: 50,
            category: 'Tarefas',
        },
        {
            id: '4',
            title: 'Centenário',
            description: 'Complete 100 tarefas',
            icon: 'medal',
            color: '#EC4899',
            unlocked: false,
            progress: 34,
            maxProgress: 100,
            category: 'Tarefas',
        },
        {
            id: '5',
            title: 'Madrugador',
            description: 'Complete 10 tarefas matinais',
            icon: 'sunny',
            color: '#FBBF24',
            unlocked: true,
            category: 'Tarefas',
        },
        {
            id: '6',
            title: 'Noturno',
            description: 'Complete 10 tarefas noturnas',
            icon: 'moon',
            color: '#8B5CF6',
            unlocked: false,
            progress: 6,
            maxProgress: 10,
            category: 'Tarefas',
        },
        // Streaks
        {
            id: '7',
            title: 'Sequência de 7 Dias',
            description: 'Mantenha uma sequência de 7 dias',
            icon: 'flame',
            color: '#F59E0B',
            unlocked: true,
            category: 'Streaks',
        },
        {
            id: '8',
            title: 'Sequência de 15 Dias',
            description: 'Mantenha uma sequência de 15 dias',
            icon: 'flame',
            color: '#F59E0B',
            unlocked: false,
            progress: user?.streak || 0,
            maxProgress: 15,
            category: 'Streaks',
        },
        {
            id: '9',
            title: 'Persistente',
            description: 'Sequência de 30 dias',
            icon: 'flame',
            color: '#EF4444',
            unlocked: false,
            progress: user?.streak || 0,
            maxProgress: 30,
            category: 'Streaks',
        },
        {
            id: '10',
            title: 'Inabalável',
            description: 'Sequência de 100 dias',
            icon: 'flame',
            color: '#DC2626',
            unlocked: false,
            progress: user?.streak || 0,
            maxProgress: 100,
            category: 'Streaks',
        },
        // XP
        {
            id: '11',
            title: 'Aprendiz',
            description: 'Alcance 500 XP total',
            icon: 'flash',
            color: '#F59E0B',
            unlocked: false,
            progress: user?.totalXP || 0,
            maxProgress: 500,
            category: 'XP',
        },
        {
            id: '12',
            title: 'Experiente',
            description: 'Alcance 1000 XP total',
            icon: 'flash',
            color: '#F59E0B',
            unlocked: false,
            progress: user?.totalXP || 0,
            maxProgress: 1000,
            category: 'XP',
        },
        {
            id: '13',
            title: 'Mestre',
            description: 'Alcance 5000 XP total',
            icon: 'flash',
            color: '#FBBF24',
            unlocked: false,
            progress: user?.totalXP || 0,
            maxProgress: 5000,
            category: 'XP',
        },
        {
            id: '14',
            title: 'Produtivo',
            description: 'Alcance nível 10',
            icon: 'speedometer',
            color: '#06B6D4',
            unlocked: false,
            progress: user?.level || 1,
            maxProgress: 10,
            category: 'XP',
        },
        {
            id: '15',
            title: 'Elite',
            description: 'Alcance nível 25',
            icon: 'speedometer',
            color: '#0EA5E9',
            unlocked: false,
            progress: user?.level || 1,
            maxProgress: 25,
            category: 'XP',
        },
        // Tempo
        {
            id: '16',
            title: 'Focado',
            description: 'Acumule 100 minutos de foco',
            icon: 'time',
            color: '#10B981',
            unlocked: false,
            progress: 45,
            maxProgress: 100,
            category: 'Tempo',
        },
        {
            id: '17',
            title: 'Maratonista',
            description: 'Acumule 500 minutos de foco',
            icon: 'timer',
            color: '#059669',
            unlocked: false,
            progress: 45,
            maxProgress: 500,
            category: 'Tempo',
        },
    ];

    const filteredAchievements =
        selectedCategory === 'Todas'
            ? allAchievements
            : allAchievements.filter((a) => a.category === selectedCategory);

    const unlockedCount = allAchievements.filter((a) => a.unlocked).length;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        Conquistas
                    </Text>
                    <Badge variant="primary" size="sm">
                        {unlockedCount}/{allAchievements.length}
                    </Badge>
                </View>
                <View style={styles.placeholder} />
            </View>

            {/* Filtros */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersContainer}
                contentContainerStyle={styles.filtersContent}
            >
                {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.filterChip,
                                {
                                    backgroundColor: isSelected
                                        ? theme.primary
                                        : colors.card,
                                    borderColor: isSelected ? theme.primary : colors.border,
                                },
                            ]}
                            onPress={() => setSelectedCategory(category)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    {
                                        color: isSelected ? '#ffffff' : colors.text,
                                    },
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Lista de Conquistas */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.achievementsGrid}
                showsVerticalScrollIndicator={false}
            >
                {filteredAchievements.map((achievement) => (
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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
    },
    placeholder: {
        width: 32,
    },
    filtersContainer: {
        maxHeight: 60,
    },
    filtersContent: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
    content: {
        flex: 1,
    },
    achievementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        gap: 12,
        paddingBottom: 32,
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
        borderRadius: 2,
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
});
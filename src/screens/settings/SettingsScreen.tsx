import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/store';

export default function SettingsScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const { mode, toggleTheme } = useThemeStore();

    const isDarkMode = mode === 'dark';

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
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    Configurações
                </Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Aparência */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        APARÊNCIA
                    </Text>

                    <View
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="moon" size={24} color={colors.text} />
                            <View style={styles.settingText}>
                                <Text style={[styles.settingTitle, { color: colors.text }]}>
                                    Modo Escuro
                                </Text>
                                <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                                    Tema escuro para reduzir o cansaço visual
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: colors.border, true: theme.primary }}
                            thumbColor="#ffffff"
                        />
                    </View>
                </View>

                {/* Notificações */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        NOTIFICAÇÕES
                    </Text>

                    <View
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications" size={24} color={colors.text} />
                            <View style={styles.settingText}>
                                <Text style={[styles.settingTitle, { color: colors.text }]}>
                                    Lembretes de Tarefas
                                </Text>
                                <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                                    Receba notificações sobre suas tarefas
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={true}
                            trackColor={{ false: colors.border, true: theme.primary }}
                            thumbColor="#ffffff"
                        />
                    </View>

                    <View
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="trophy" size={24} color={colors.text} />
                            <View style={styles.settingText}>
                                <Text style={[styles.settingTitle, { color: colors.text }]}>
                                    Conquistas
                                </Text>
                                <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                                    Notificações de novas conquistas
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={true}
                            trackColor={{ false: colors.border, true: theme.primary }}
                            thumbColor="#ffffff"
                        />
                    </View>
                </View>

                {/* Conta */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        CONTA
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="person" size={24} color={colors.text} />
                            <Text style={[styles.settingTitle, { color: colors.text }]}>
                                Editar Perfil
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="lock-closed" size={24} color={colors.text} />
                            <Text style={[styles.settingTitle, { color: colors.text }]}>
                                Alterar Senha
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="shield-checkmark" size={24} color={colors.text} />
                            <Text style={[styles.settingTitle, { color: colors.text }]}>
                                Privacidade
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Sobre */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                        SOBRE
                    </Text>

                    <View
                        style={[
                            styles.settingItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <View style={styles.settingLeft}>
                            <Ionicons name="information-circle" size={24} color={colors.text} />
                            <Text style={[styles.settingTitle, { color: colors.text }]}>
                                Versão do App
                            </Text>
                        </View>
                        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
                            1.0.0
                        </Text>
                    </View>
                </View>
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
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
    },
    placeholder: {
        width: 32,
    },
    content: {
        flex: 1,
    },
    section: {
        paddingTop: 24,
        paddingBottom: 8,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 8,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 2,
    },
    settingDesc: {
        fontSize: 13,
        fontFamily: 'Nunito_400Regular',
        lineHeight: 18,
    },
    versionText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
});
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Card } from '@/components/ui';

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export default function HelpScreen() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Animações de entrada inicial
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;
    const contactAnim = useRef(new Animated.Value(0)).current;
    const faqAnim = useRef(new Animated.Value(0)).current;
    const linksAnim = useRef(new Animated.Value(0)).current;



    useEffect(() => {
        startInitialAnimations();
    }, []);

    const startInitialAnimations = () => {
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
            Animated.timing(contactAnim, {
                toValue: 1,
                duration: 300,
                delay: 50,
                useNativeDriver: true,
            }),
            Animated.timing(faqAnim, {
                toValue: 1,
                duration: 300,
                delay: 50,
                useNativeDriver: true,
            }),
            Animated.timing(linksAnim, {
                toValue: 1,
                duration: 300,
                delay: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const faqs: FAQ[] = [
        {
            id: '1',
            question: 'Como funciona o sistema de XP?',
            answer:
                'Você ganha XP ao completar tarefas. Cada tarefa tem um valor de XP baseado em sua prioridade. Ao acumular XP suficiente, você sobe de nível e desbloqueia novas conquistas!',
        },
        {
            id: '2',
            question: 'O que é a sequência (streak)?',
            answer:
                'A sequência conta quantos dias consecutivos você completa pelo menos uma tarefa. Manter uma sequência ativa te ajuda a criar hábitos consistentes e desbloqueia recompensas especiais.',
        },
        {
            id: '3',
            question: 'Como adicionar uma nova tarefa?',
            answer:
                'Na tela de Rotina, toque no botão + (FAB) no canto inferior direito. Preencha o título, escolha o período do dia e a prioridade, e sua tarefa será criada!',
        },
        {
            id: '4',
            question: 'Posso editar ou excluir tarefas?',
            answer:
                'Sim! Pressione e segure (long press) em qualquer tarefa para abrir o menu de ações, onde você pode editar ou excluir.',
        },
        {
            id: '5',
            question: 'Por que algumas tarefas estão bloqueadas?',
            answer:
                'Tarefas são bloqueadas por período do dia. Por exemplo, tarefas da tarde só ficam disponíveis após 12h. Isso ajuda a manter sua rotina organizada!',
        },
        {
            id: '6',
            question: 'Como funcionam as conquistas?',
            answer:
                'Conquistas são desbloqueadas ao atingir marcos específicos, como completar 100 tarefas ou manter uma sequência de 30 dias. Acompanhe seu progresso na aba Perfil!',
        },
    ];

    const toggleFAQ = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleEmail = () => {
        Linking.openURL('mailto:suporte@vidamobile.com');
    };

    const handleWhatsApp = () => {
        Linking.openURL('https://wa.me/5511999999999');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                {/* Header */}
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
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        Ajuda e Suporte
                    </Text>
                    <View style={styles.placeholder} />
                </Animated.View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Contato Rápido */}
                    <Animated.View
                        style={[
                            styles.section,
                            {
                                opacity: contactAnim,
                                transform: [
                                    {
                                        translateY: contactAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [30, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Precisa de ajuda imediata?
                        </Text>

                        <View style={styles.contactRow}>
                            <TouchableOpacity
                                style={[
                                    styles.contactCard,
                                    { backgroundColor: colors.card, borderColor: colors.border },
                                ]}
                                onPress={handleEmail}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.contactIcon,
                                        { backgroundColor: `${theme.primary}20` },
                                    ]}
                                >
                                    <Ionicons name="mail" size={24} color={theme.primary} />
                                </View>
                                <Text style={[styles.contactLabel, { color: colors.text }]}>
                                    Email
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.contactCard,
                                    { backgroundColor: colors.card, borderColor: colors.border },
                                ]}
                                onPress={handleWhatsApp}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.contactIcon,
                                        { backgroundColor: `${theme.success}20` },
                                    ]}
                                >
                                    <Ionicons name="logo-whatsapp" size={24} color={theme.success} />
                                </View>
                                <Text style={[styles.contactLabel, { color: colors.text }]}>
                                    WhatsApp
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* FAQ */}
                    <Animated.View
                        style={[
                            styles.section,
                            {
                                opacity: faqAnim,
                                transform: [
                                    {
                                        translateY: faqAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [30, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Perguntas Frequentes
                        </Text>

                        {faqs.map((faq, index) => {
                            const isExpanded = expandedId === faq.id;

                            return (
                                <Card
                                    key={faq.id}
                                    variant="duolingo"
                                    style={styles.faqCard}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleFAQ(faq.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.faqHeader}>
                                            <Text style={[styles.faqQuestion, { color: colors.text }]}>
                                                {faq.question}
                                            </Text>
                                            <Ionicons
                                                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                                                size={20}
                                                color={colors.textSecondary}
                                            />
                                        </View>

                                        {isExpanded && (
                                            <Text
                                                style={[
                                                    styles.faqAnswer,
                                                    { color: colors.textSecondary },
                                                ]}
                                            >
                                                {faq.answer}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </Card>
                            );
                        })}
                    </Animated.View>

                    {/* Links Úteis */}
                    <Animated.View
                        style={[
                            styles.section,
                            {
                                opacity: linksAnim,
                                transform: [
                                    {
                                        translateY: linksAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [30, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Links Úteis
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.linkItem,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.linkLeft}>
                                <Ionicons name="document-text" size={24} color={colors.text} />
                                <Text style={[styles.linkText, { color: colors.text }]}>
                                    Termos de Uso
                                </Text>
                            </View>
                            <Ionicons name="open" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.linkItem,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.linkLeft}>
                                <Ionicons name="shield-checkmark" size={24} color={colors.text} />
                                <Text style={[styles.linkText, { color: colors.text }]}>
                                    Política de Privacidade
                                </Text>
                            </View>
                            <Ionicons name="open" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.linkItem,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.linkLeft}>
                                <Ionicons name="information-circle" size={24} color={colors.text} />
                                <Text style={[styles.linkText, { color: colors.text }]}>
                                    Sobre o VIDA
                                </Text>
                            </View>
                            <Ionicons name="open" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
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
        paddingBottom: 16,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 16,
    },
    contactRow: {
        flexDirection: 'row',
        gap: 12,
    },
    contactCard: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: 'center',
        gap: 12,
    },
    contactIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactLabel: {
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
    faqCard: {
        marginBottom: 12,
        padding: 16,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        flex: 1,
        marginRight: 8,
    },
    faqAnswer: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        lineHeight: 20,
        marginTop: 12,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 8,
    },
    linkLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    linkText: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
    },
});
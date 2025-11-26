import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Input, Card, Badge, Avatar } from '@/components/ui';
import { useTheme } from '@/hooks';

export default function TestScreen() {
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Componentes UI - VIDA Mobile
                </Text>

                {/* Buttons */}
                <Card style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Buttons
                    </Text>
                    <Button variant="primary" style={styles.mb}>
                        Primary Button
                    </Button>
                    <Button variant="secondary" style={styles.mb}>
                        Secondary Button
                    </Button>
                    <Button variant="outline" style={styles.mb}>
                        Outline Button
                    </Button>
                    <Button variant="ghost" style={styles.mb}>
                        Ghost Button
                    </Button>
                    <Button variant="primary" size="sm" style={styles.mb}>
                        Small Button
                    </Button>
                    <Button variant="primary" loading>
                        Loading...
                    </Button>
                </Card>

                {/* Inputs */}
                <Card style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Inputs
                    </Text>
                    <Input
                        label="Email"
                        placeholder="seu@email.com"
                        leftIcon="mail"
                    />
                    <Input
                        label="Senha"
                        placeholder="••••••••"
                        secureTextEntry
                        leftIcon="lock-closed"
                    />
                    <Input
                        label="Com erro"
                        placeholder="Digite algo"
                        error="Este campo é obrigatório"
                    />
                </Card>

                {/* Badges */}
                <Card style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Badges
                    </Text>
                    <View style={styles.row}>
                        <Badge variant="primary" style={styles.mr}>Primary</Badge>
                        <Badge variant="success" style={styles.mr}>Success</Badge>
                        <Badge variant="warning" style={styles.mr}>Warning</Badge>
                        <Badge variant="error">Error</Badge>
                    </View>
                    <View style={styles.row}>
                        <Badge variant="info" size="sm" style={styles.mr}>Small</Badge>
                        <Badge variant="info" size="md" style={styles.mr}>Medium</Badge>
                        <Badge variant="info" size="lg">Large</Badge>
                    </View>
                </Card>

                {/* Avatars */}
                <Card style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Avatars
                    </Text>
                    <View style={styles.row}>
                        <Avatar name="João Silva" size={48} style={styles.mr} />
                        <Avatar name="Maria Santos" size={56} badge style={styles.mr} />
                        <Avatar name="Pedro Costa" size={64} badge badgeColor="#10b981" />
                    </View>
                </Card>

                {/* Cards */}
                <Card variant="elevated" style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Card Elevated
                    </Text>
                    <Text style={{ color: colors.textSecondary }}>
                        Este é um card com sombra (elevated variant)
                    </Text>
                </Card>

                <Card variant="outlined" style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Card Outlined
                    </Text>
                    <Text style={{ color: colors.textSecondary }}>
                        Este é um card com borda (outlined variant)
                    </Text>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    mb: {
        marginBottom: 12,
    },
    mr: {
        marginRight: 12,
    },
});
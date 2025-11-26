import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button, Input, Select } from '@/components/ui';
import { Task, mockCategories } from '@/services/mock/routineData';

interface TaskFormModalProps {
    visible: boolean;
    task?: Task | null;
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
}

export function TaskFormModal({
    visible,
    task,
    onClose,
    onSave,
}: TaskFormModalProps) {
    const { theme, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [isVisible, setIsVisible] = useState(visible);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [period, setPeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (visible) {
            setIsVisible(true);

            // Se está editando, preenche os campos
            if (task) {
                setTitle(task.title);
                setDescription(task.description || '');
                setPeriod(task.period);
                setCategory(task.category);
                setPriority(task.priority);
            } else {
                // Limpa os campos para nova tarefa
                setTitle('');
                setDescription('');
                setPeriod('morning');
                setCategory(mockCategories[0].name);
                setPriority('medium');
            }
            setErrors({});

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    damping: 20,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [visible, task]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = 'Título é obrigatório';
        }

        if (!category) {
            newErrors.category = 'Selecione uma categoria';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const taskData: Partial<Task> = {
            id: task?.id || `task_${Date.now()}`,
            title: title.trim(),
            description: description.trim() || undefined,
            period,
            category,
            priority,
            status: task?.status || 'pending',
            xp: calculateXP(),
            createdAt: task?.createdAt || new Date().toISOString(),
        };

        onSave(taskData);
        onClose();
    };

    const calculateXP = () => {
        const priorityXP = {
            low: 10,
            medium: 15,
            high: 25,
        };
        return priorityXP[priority];
    };

    const periodOptions = [
        { label: 'Manhã', value: 'morning', icon: 'sunny', color: '#60A5FA' },
        { label: 'Tarde', value: 'afternoon', icon: 'partly-sunny', color: '#3B82F6' },
        { label: 'Noite', value: 'evening', icon: 'moon', color: '#8B5CF6' },
    ];

    const categoryOptions = mockCategories.map((cat) => ({
        label: cat.name,
        value: cat.name,
        icon: cat.icon,
        color: cat.color,
    }));

    const priorityOptions = [
        { label: 'Baixa', value: 'low', icon: 'arrow-down', color: '#10B981' },
        { label: 'Média', value: 'medium', icon: 'remove', color: '#F59E0B' },
        { label: 'Alta', value: 'high', icon: 'arrow-up', color: '#EF4444' },
    ];

    if (!isVisible) return null;

    return (
        <Modal visible={isVisible} animationType="none" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={onClose}
                    />

                    <Animated.View
                        style={[
                            styles.container,
                            { backgroundColor: colors.background },
                            { transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.text }]}>
                                {task ? 'Editar Tarefa' : 'Nova Tarefa'}
                            </Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                            <Input
                                label="Título"
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Ex: Meditar 10 minutos"
                                error={errors.title}
                                autoFocus
                            />

                            <Input
                                label="Descrição (opcional)"
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Adicione mais detalhes..."
                                multiline
                                numberOfLines={3}
                            />

                            <Select
                                label="Período do Dia"
                                value={period}
                                options={periodOptions}
                                onSelect={(value) => setPeriod(value as any)}
                            />

                            <Select
                                label="Categoria"
                                value={category}
                                options={categoryOptions}
                                onSelect={setCategory}
                                error={errors.category}
                            />

                            <Select
                                label="Prioridade"
                                value={priority}
                                options={priorityOptions}
                                onSelect={(value) => setPriority(value as any)}
                            />

                            {/* XP Preview */}
                            <View style={[styles.xpPreview, { backgroundColor: `${theme.warning}10` }]}>
                                <Ionicons name="star" size={20} color={theme.warning} />
                                <Text style={[styles.xpText, { color: colors.text }]}>
                                    Esta tarefa vale <Text style={{ fontFamily: 'Nunito_700Bold' }}>
                                        {calculateXP()} XP
                                    </Text>
                                </Text>
                            </View>
                        </ScrollView>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Button variant="secondary" onPress={onClose} style={styles.button}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onPress={handleSave} style={styles.button}>
                                {task ? 'Salvar' : 'Criar'}
                            </Button>
                        </View>
                    </Animated.View>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    xpPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    xpText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    button: {
        flex: 1,
    },
});
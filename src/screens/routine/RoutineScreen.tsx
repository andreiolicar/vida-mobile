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
import { MindFlowNode, PeriodHub } from '@/components/features/dashboard';
import { EmptyState } from '@/components/features/tasks';
import { PeriodFilter } from '@/components/features/routine';
import {
    RoutineInfoModal,
    AlertModal,
    TaskFormModal,
    TaskActionsModal,
    ConfirmDeleteModal,
} from '@/components/features/modals';
import { mockTasks, Task } from '@/services/mock/routineData';
import { isPeriodAvailable } from '@/utils';

type Period = 'all' | 'morning' | 'afternoon' | 'evening';
type AlertType = 'locked-period' | 'multiple-tasks' | null;

export default function RoutineScreen() {
    const { theme, colors } = useTheme();
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');
    const [infoVisible, setInfoVisible] = useState(false);
    const [alertType, setAlertType] = useState<AlertType>(null);
    const [taskFormVisible, setTaskFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskActionsVisible, setTaskActionsVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

    const isProcessing = useRef(false);
    const deleteAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

    // Animações
    const headerAnim = useRef(new Animated.Value(0)).current;
    const filterAnim = useRef(new Animated.Value(0)).current;
    const morningAnim = useRef(new Animated.Value(0)).current;
    const afternoonAnim = useRef(new Animated.Value(0)).current;
    const eveningAnim = useRef(new Animated.Value(0)).current;
    const fabAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimations();
    }, []);

    const startAnimations = () => {
        Animated.sequence([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(filterAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
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
            Animated.spring(fabAnim, {
                toValue: 1,
                damping: 15,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Função para obter/criar animação de uma tarefa
    const getTaskAnim = (taskId: string) => {
        if (!deleteAnims[taskId]) {
            deleteAnims[taskId] = new Animated.Value(1);
        }
        return deleteAnims[taskId];
    };

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

    const handleAddTask = () => {
        setEditingTask(null);
        setTaskFormVisible(true);
    };

    const handleSaveTask = (taskData: Partial<Task>) => {
        if (editingTask) {
            setTasks(
                tasks.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
            );
        } else {
            setTasks([...tasks, taskData as Task]);
        }
    };

    const handleLongPress = (task: Task) => {
        setSelectedTask(task);
        setTaskActionsVisible(true);
    };

    const handleEditFromMenu = () => {
        if (selectedTask) {
            setEditingTask(selectedTask);
            setTaskFormVisible(true);
        }
    };

    const handleDeleteFromMenu = () => {
        setConfirmDeleteVisible(true);
    };

    const handleConfirmDelete = () => {
        if (selectedTask) {
            setDeletingTaskId(selectedTask.id);
            const anim = getTaskAnim(selectedTask.id);

            // Animação de bolha estourando
            Animated.parallel([
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Depois da animação, remove a tarefa
                setTasks(tasks.filter((t) => t.id !== selectedTask.id));
                setSelectedTask(null);
                setDeletingTaskId(null);
                delete deleteAnims[selectedTask.id];
            });
        }
        setConfirmDeleteVisible(false);
    };

    const morningTasks = getTasksByPeriod('morning');
    const afternoonTasks = getTasksByPeriod('afternoon');
    const eveningTasks = getTasksByPeriod('evening');

    const shouldShowPeriod = (period: 'morning' | 'afternoon' | 'evening') => {
        if (selectedPeriod === 'all') return true;
        return selectedPeriod === period;
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;

    return (
        <>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                {/* Header com animação */}
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
                            <Text style={[styles.headerTitle, { color: colors.text }]}>
                                Minha Rotina
                            </Text>
                            <Text
                                style={[styles.headerSubtitle, { color: colors.textSecondary }]}
                            >
                                {completedTasks} de {totalTasks} concluídas
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.infoButton}
                            onPress={() => setInfoVisible(true)}
                        >
                            <Ionicons
                                name="information-circle"
                                size={28}
                                color={theme.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Filtros com animação */}
                <Animated.View
                    style={{
                        opacity: filterAnim,
                        transform: [
                            {
                                translateY: filterAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <View style={styles.filterContainer}>
                        <PeriodFilter
                            selected={selectedPeriod}
                            onSelect={setSelectedPeriod}
                        />
                    </View>
                </Animated.View>

                <ScrollView
                    style={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {/* Manhã */}
                        {shouldShowPeriod('morning') && (
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

                                    {morningTasks.length > 0 ? (
                                        <View style={styles.tasksCluster}>
                                            {morningTasks.map((task) => {
                                                const anim = getTaskAnim(task.id);
                                                const isDeleting = deletingTaskId === task.id;

                                                return (
                                                    <Animated.View
                                                        key={task.id}
                                                        style={{
                                                            opacity: anim,
                                                            transform: [
                                                                {
                                                                    scale: anim.interpolate({
                                                                        inputRange: [0, 1],
                                                                        outputRange: [1.5, 1],
                                                                    }),
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <MindFlowNode
                                                            title={task.title}
                                                            status={getTaskStatus(task)}
                                                            onPress={() => !isDeleting && handleToggleTask(task.id)}
                                                            onLongPress={() => !isDeleting && handleLongPress(task)}
                                                        />
                                                    </Animated.View>
                                                );
                                            })}
                                        </View>
                                    ) : (
                                        <EmptyState message="Nenhuma tarefa para a manhã" />
                                    )}
                                </View>

                                {selectedPeriod === 'all' && (
                                    <View
                                        style={[styles.connector, { backgroundColor: colors.border }]}
                                    />
                                )}
                            </Animated.View>
                        )}

                        {/* Tarde */}
                        {shouldShowPeriod('afternoon') && (
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

                                    {afternoonTasks.length > 0 ? (
                                        <View style={styles.tasksCluster}>
                                            {afternoonTasks.map((task) => {
                                                const anim = getTaskAnim(task.id);
                                                const isDeleting = deletingTaskId === task.id;

                                                return (
                                                    <Animated.View
                                                        key={task.id}
                                                        style={{
                                                            opacity: anim,
                                                            transform: [
                                                                {
                                                                    scale: anim.interpolate({
                                                                        inputRange: [0, 1],
                                                                        outputRange: [1.5, 1],
                                                                    }),
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <MindFlowNode
                                                            title={task.title}
                                                            status={getTaskStatus(task)}
                                                            onPress={() => !isDeleting && handleToggleTask(task.id)}
                                                            onLongPress={() => !isDeleting && handleLongPress(task)}
                                                        />
                                                    </Animated.View>
                                                );
                                            })}
                                        </View>
                                    ) : (
                                        <EmptyState message="Nenhuma tarefa para a tarde" />
                                    )}
                                </View>

                                {selectedPeriod === 'all' && (
                                    <View
                                        style={[styles.connector, { backgroundColor: colors.border }]}
                                    />
                                )}
                            </Animated.View>
                        )}

                        {/* Noite */}
                        {shouldShowPeriod('evening') && (
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

                                    {eveningTasks.length > 0 ? (
                                        <View style={styles.tasksCluster}>
                                            {eveningTasks.map((task) => {
                                                const anim = getTaskAnim(task.id);
                                                const isDeleting = deletingTaskId === task.id;

                                                return (
                                                    <Animated.View
                                                        key={task.id}
                                                        style={{
                                                            opacity: anim,
                                                            transform: [
                                                                {
                                                                    scale: anim.interpolate({
                                                                        inputRange: [0, 1],
                                                                        outputRange: [1.5, 1],
                                                                    }),
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <MindFlowNode
                                                            title={task.title}
                                                            status={getTaskStatus(task)}
                                                            onPress={() => !isDeleting && handleToggleTask(task.id)}
                                                            onLongPress={() => !isDeleting && handleLongPress(task)}
                                                        />
                                                    </Animated.View>
                                                );
                                            })}
                                        </View>
                                    ) : (
                                        <EmptyState message="Nenhuma tarefa para a noite" />
                                    )}
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* FAB - Adicionar Tarefa */}
            <Animated.View
                style={[
                    styles.fab,
                    { backgroundColor: theme.primary },
                    {
                        opacity: fabAnim,
                        transform: [{ scale: fabAnim }],
                    },
                ]}
            >
                <TouchableOpacity
                    style={styles.fabButton}
                    onPress={handleAddTask}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={32} color="#ffffff" />
                </TouchableOpacity>
            </Animated.View>

            {/* Modal de Criar/Editar Tarefa */}
            <TaskFormModal
                visible={taskFormVisible}
                task={editingTask}
                onClose={() => {
                    setTaskFormVisible(false);
                    setEditingTask(null);
                }}
                onSave={handleSaveTask}
            />

            {/* Modal de Ações da Tarefa */}
            <TaskActionsModal
                visible={taskActionsVisible}
                taskTitle={selectedTask?.title || ''}
                onEdit={handleEditFromMenu}
                onDelete={handleDeleteFromMenu}
                onClose={() => {
                    setTaskActionsVisible(false);
                }}
            />

            {/* Modal de Confirmação de Exclusão */}
            <ConfirmDeleteModal
                visible={confirmDeleteVisible}
                taskTitle={selectedTask?.title || ''}
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setConfirmDeleteVisible(false);
                    setSelectedTask(null);
                }}
            />

            {/* Modal Informativo */}
            <RoutineInfoModal
                visible={infoVisible}
                onClose={() => setInfoVisible(false)}
            />

            {/* Modal de Alertas */}
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
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        marginTop: 2,
    },
    infoButton: {
        padding: 4,
    },
    filterContainer: {
        paddingVertical: 16,
    },
    scrollContent: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 40,
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
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    fabButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
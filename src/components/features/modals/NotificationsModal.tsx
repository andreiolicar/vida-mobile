import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Card } from '@/components/ui';

interface Notification {
    id: string;
    type: 'streak' | 'productivity' | 'achievement';
    title: string;
    description: string;
    time: string;
}

interface NotificationsModalProps {
    visible: boolean;
    notifications: Notification[];
    onClose: () => void;
}

export function NotificationsModal({
    visible,
    notifications,
    onClose,
}: NotificationsModalProps) {
    const { theme, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [isVisible, setIsVisible] = React.useState(visible);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
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
    }, [visible]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'streak':
                return 'flame';
            case 'productivity':
                return 'trending-up';
            case 'achievement':
                return 'trophy';
            default:
                return 'notifications';
        }
    };

    if (!isVisible) return null;

    return (
        <Modal
            visible={isVisible}
            animationType="none"
            transparent
            onRequestClose={onClose}
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
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Notificações
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        {notifications.map((notification) => (
                            <Card key={notification.id} style={styles.notification}>
                                <View style={styles.notificationContent}>
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            { backgroundColor: `${theme.primary}20` },
                                        ]}
                                    >
                                        <Ionicons
                                            name={getIcon(notification.type)}
                                            size={24}
                                            color={theme.primary}
                                        />
                                    </View>

                                    <View style={styles.textContainer}>
                                        <Text style={[styles.notificationTitle, { color: colors.text }]}>
                                            {notification.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.notificationDescription,
                                                { color: colors.textSecondary },
                                            ]}
                                        >
                                            {notification.description}
                                        </Text>
                                        <Text style={[styles.time, { color: colors.textSecondary }]}>
                                            {notification.time}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        ))}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
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
        maxHeight: '80%',
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
    notification: {
        marginBottom: 12,
    },
    notificationContent: {
        flexDirection: 'row',
        gap: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        marginBottom: 4,
    },
    time: {
        fontSize: 12,
        fontFamily: 'Nunito_400Regular',
    },
});
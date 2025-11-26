import React, { useEffect, useRef, useState } from 'react';
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

interface FluxoInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FluxoInfoModal({ visible, onClose }: FluxoInfoModalProps) {
  const { theme, colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [isVisible, setIsVisible] = useState(visible);

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
              Fluxo VIDA
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Card style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="analytics" size={32} color={theme.primary} />
              </View>

              <Text style={[styles.description, { color: colors.text }]}>
                O <Text style={{ fontFamily: 'Nunito_700Bold' }}>Fluxo VIDA</Text> organiza
                suas tarefas por período do dia, criando um mapa visual do seu progresso.
              </Text>
            </Card>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Como funciona?
            </Text>

            <Card style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: '#F59E0B' }]}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  Manhã
                </Text>
              </View>
              <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                Comece o dia com tarefas matinais. Quanto mais completas, maior o progresso
                do círculo amarelo.
              </Text>
            </Card>

            <Card style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: '#3B82F6' }]}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  Tarde
                </Text>
              </View>
              <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                Continue com atividades da tarde. O círculo azul mostra seu progresso neste
                período.
              </Text>
            </Card>

            <Card style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: '#8B5CF6' }]}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  Noite
                </Text>
              </View>
              <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                Finalize o dia com tarefas noturnas. Complete o círculo roxo para encerrar
                seu dia produtivo!
              </Text>
            </Card>

            <Card
              style={[styles.tipCard, { backgroundColor: `${theme.success}10` }]}
            >
              <View style={styles.tipHeader}>
                <Ionicons name="bulb" size={24} color={theme.success} />
                <Text style={[styles.tipTitle, { color: theme.success }]}>
                  Dica
                </Text>
              </View>
              <Text style={[styles.tipText, { color: colors.text }]}>
                Toque em cada tarefa para marcá-la como concluída. As bolhas "respiram" para
                indicar tarefas disponíveis!
              </Text>
            </Card>
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
    maxHeight: '85%',
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
  infoCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 16,
  },
  stepCard: {
    padding: 16,
    marginBottom: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    lineHeight: 20,
  },
  tipCard: {
    padding: 16,
    marginTop: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    lineHeight: 20,
  },
});
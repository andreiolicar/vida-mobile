import React from 'react';
import OnboardingWizard from '@/components/features/onboarding/OnboardingWizard';

interface OnboardingData {
    workStartTime: string;
    workEndTime: string;
    goals: string[];
    theme: 'light' | 'dark';
}

export default function OnboardingScreen() {
    const handleComplete = async (data: OnboardingData) => {
        console.log('Onboarding completed with data:', data);
        
        // TODO: Aqui você pode:
        // 1. Salvar preferências no AsyncStorage
        // 2. Enviar para o backend
        // 3. Aplicar o tema escolhido
        // 4. Gerar rotina inicial com IA
        
        // A navegação para Main acontece automaticamente
        // porque completeOnboarding() já foi chamado no wizard
    };

    return <OnboardingWizard onComplete={handleComplete} />;
}
export const mockDashboardData = {
    user: {
        name: 'João Silva',
        level: 12,
        currentXP: 450,
        nextLevelXP: 600,
        streak: 7,
        avatar: null,
    },

    dailyProgress: {
        tasksCompleted: 5,
        totalTasks: 8,
        focusMinutes: 90,
        focusGoal: 120,
    },

    todayTasks: [
        {
            id: '1',
            title: 'Estudar React Native',
            completed: true,
            category: 'Aprendizado',
            xp: 15,
            priority: 'high',
        },
        {
            id: '2',
            title: 'Fazer exercícios físicos',
            completed: true,
            category: 'Saúde',
            xp: 20,
            priority: 'medium',
        },
        {
            id: '3',
            title: 'Ler 30 minutos',
            completed: false,
            category: 'Aprendizado',
            xp: 10,
            priority: 'low',
        },
        {
            id: '4',
            title: 'Meditar 10 minutos',
            completed: false,
            category: 'Bem-estar',
            xp: 10,
            priority: 'medium',
        },
    ],

    insights: [
        {
            id: '1',
            type: 'streak',
            title: '🔥 Sequência de 7 dias!',
            description: 'Continue assim para manter seu progresso',
        },
        {
            id: '2',
            type: 'productivity',
            title: '⚡ Você está 20% mais produtivo',
            description: 'Comparado à semana passada',
        },
    ],

    weeklyStats: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        xpData: [45, 60, 55, 70, 50, 40, 65],
        tasksData: [6, 8, 7, 9, 6, 5, 8],
    },
};
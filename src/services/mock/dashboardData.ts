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
    totalTasks: 12,
    focusMinutes: 90,
    focusGoal: 120,
  },

  mindFlow: {
    morning: {
      label: 'Manhã',
      progress: 100,
      tasks: [
        { id: 'm1', title: 'Meditar 10 min', status: 'completed' },
        { id: 'm2', title: 'Café saudável', status: 'completed' },
        { id: 'm3', title: 'Planejar o dia', status: 'completed' },
      ],
    },
    afternoon: {
      label: 'Tarde',
      progress: 50,
      tasks: [
        { id: 'a1', title: 'Estudar React Native', status: 'completed' },
        { id: 'a2', title: 'Fazer exercícios', status: 'in-progress' },
        { id: 'a3', title: 'Ler 30 minutos', status: 'available' },
        { id: 'a4', title: 'Revisar código', status: 'available' },
      ],
    },
    evening: {
      label: 'Noite',
      progress: 0,
      tasks: [
        { id: 'e1', title: 'Jantar família', status: 'locked' },
        { id: 'e2', title: 'Revisar aprendizado', status: 'locked' },
        { id: 'e3', title: 'Gratidão diária', status: 'locked' },
      ],
    },
  },
  
  insights: [
    {
      id: '1',
      type: 'streak',
      title: 'Sequência de 7 dias',
      description: 'Continue assim para manter seu progresso',
      time: 'Há 2 horas',
    },
    {
      id: '2',
      type: 'productivity',
      title: 'Você está 20% mais produtivo',
      description: 'Comparado à semana passada',
      time: 'Há 5 horas',
    },
  ],
};
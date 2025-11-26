export interface Task {
    id: string;
    title: string;
    description?: string;
    period: 'morning' | 'afternoon' | 'evening';
    category: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    xp: number;
    dueDate?: string;
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
}

export const mockCategories: Category[] = [
    { id: '1', name: 'Saúde', color: '#10B981', icon: 'fitness' },
    { id: '2', name: 'Aprendizado', color: '#3B82F6', icon: 'book' },
    { id: '3', name: 'Trabalho', color: '#8B5CF6', icon: 'briefcase' },
    { id: '4', name: 'Bem-estar', color: '#F59E0B', icon: 'heart' },
    { id: '5', name: 'Social', color: '#EC4899', icon: 'people' },
];

export const mockTasks: Task[] = [
    // Manhã - TODAS CONCLUÍDAS
    {
        id: 'm1',
        title: 'Meditar 10 minutos',
        description: 'Prática de mindfulness para começar o dia',
        period: 'morning',
        category: 'Bem-estar',
        priority: 'high',
        status: 'completed',
        xp: 15,
        createdAt: '2024-01-15',
    },
    {
        id: 'm2',
        title: 'Café da manhã saudável',
        description: 'Refeição balanceada com frutas e proteínas',
        period: 'morning',
        category: 'Saúde',
        priority: 'medium',
        status: 'completed',
        xp: 10,
        createdAt: '2024-01-15',
    },
    {
        id: 'm3',
        title: 'Planejar o dia',
        description: 'Revisar agenda e prioridades',
        period: 'morning',
        category: 'Trabalho',
        priority: 'high',
        status: 'completed',
        xp: 10,
        createdAt: '2024-01-15',
    },

    // Tarde - TODAS PENDENTES (serão bloqueadas se ainda for manhã)
    {
        id: 'a1',
        title: 'Estudar React Native',
        description: 'Continuar curso de desenvolvimento mobile',
        period: 'afternoon',
        category: 'Aprendizado',
        priority: 'high',
        status: 'pending',
        xp: 25,
        createdAt: '2024-01-15',
    },
    {
        id: 'a2',
        title: 'Fazer exercícios físicos',
        description: '30 minutos de treino funcional',
        period: 'afternoon',
        category: 'Saúde',
        priority: 'high',
        status: 'pending',
        xp: 20,
        createdAt: '2024-01-15',
    },
    {
        id: 'a3',
        title: 'Ler 30 minutos',
        description: 'Continuar leitura do livro atual',
        period: 'afternoon',
        category: 'Aprendizado',
        priority: 'medium',
        status: 'pending',
        xp: 15,
        createdAt: '2024-01-15',
    },

    // Noite - TODAS PENDENTES (serão bloqueadas)
    {
        id: 'e1',
        title: 'Jantar com a família',
        description: 'Momento de conexão e gratidão',
        period: 'evening',
        category: 'Social',
        priority: 'high',
        status: 'pending',
        xp: 15,
        createdAt: '2024-01-15',
    },
    {
        id: 'e2',
        title: 'Revisar aprendizado do dia',
        description: 'Anotar insights e aprendizados',
        period: 'evening',
        category: 'Aprendizado',
        priority: 'medium',
        status: 'pending',
        xp: 10,
        createdAt: '2024-01-15',
    },
    {
        id: 'e3',
        title: 'Gratidão diária',
        description: 'Listar 3 coisas pelas quais sou grato',
        period: 'evening',
        category: 'Bem-estar',
        priority: 'medium',
        status: 'pending',
        xp: 10,
        createdAt: '2024-01-15',
    },
];
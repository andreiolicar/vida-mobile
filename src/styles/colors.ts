export const colors = {
    // Cor primária oficial VIDA
    primary: '#0052e2',
    primaryLight: '#3d7ff5',
    primaryDark: '#003ba8',

    // Feedback colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Cores dos períodos do dia (rotina) - ATUALIZADO para azul/roxo
    periods: {
        morning: '#60A5FA',    // Azul claro - manhã
        afternoon: '#3B82F6',  // Azul médio - tarde
        evening: '#8B5CF6',    // Roxo - noite
        night: '#7C3AED',      // Roxo escuro - madrugada
    },

    // Estados das tarefas
    taskStates: {
        completed: '#10B981',   // Verde
        inProgress: '#3B82F6',  // Azul
        available: '#8B5CF6',   // Roxo
        locked: '#D1D5DB',      // Cinza
    },

    // Tema Light
    light: {
        background: '#ffffff',
        surface: '#f8f9fa',
        card: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        shadow: '#00000010',
    },

    // Tema Dark
    dark: {
        background: '#0f172a',
        surface: '#1e293b',
        card: '#1e293b',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: '#334155',
        shadow: '#00000040',
    },
};

export type ColorTheme = typeof colors.light;
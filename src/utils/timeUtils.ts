export type Period = 'morning' | 'afternoon' | 'evening';

/**
 * Retorna o período atual do dia baseado no horário
 * Manhã: 5h - 11h59
 * Tarde: 12h - 17h59
 * Noite: 18h - 4h59
 */
export function getCurrentPeriod(): Period {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

/**
 * Verifica se uma tarefa de determinado período está disponível
 */
export function isPeriodAvailable(taskPeriod: Period): boolean {
    const currentPeriod = getCurrentPeriod();
    const periods: Period[] = ['morning', 'afternoon', 'evening'];

    const currentIndex = periods.indexOf(currentPeriod);
    const taskIndex = periods.indexOf(taskPeriod);

    // Tarefa está disponível se for do período atual ou de um período anterior
    return taskIndex <= currentIndex;
}

/**
 * Retorna o nome amigável do período
 */
export function getPeriodLabel(period: Period): string {
    const labels = {
        morning: 'Manhã',
        afternoon: 'Tarde',
        evening: 'Noite',
    };
    return labels[period];
}
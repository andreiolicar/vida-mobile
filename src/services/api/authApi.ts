import { apiClient } from './client';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

// ✅ MOCK FUNCTIONS (até ter backend real)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    await delay(1500); // Simula latência de rede

    if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
    }

    // Mock de resposta bem-sucedida
    return {
        user: {
            id: '1',
            name: email.split('@')[0], // Usa parte do email como nome
            email,
        },
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
    };
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    await delay(1500);

    if (!name || !email || !password) {
        throw new Error('Todos os campos são obrigatórios');
    }

    return {
        user: {
            id: Date.now().toString(),
            name,
            email,
        },
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
    };
};

// ✅ API REAL (quando backend estiver pronto)
export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // TODO: Quando backend estiver pronto, descomentar:
        // const { data } = await apiClient.post('/auth/login', credentials);
        // return data;

        // Mock temporário:
        return loginUser(credentials.email, credentials.password);
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        // TODO: Quando backend estiver pronto, descomentar:
        // const { data } = await apiClient.post('/auth/register', userData);
        // return data;

        // Mock temporário:
        return registerUser(userData.name, userData.email, userData.password);
    },

    logout: async (): Promise<void> => {
        // TODO: Quando backend estiver pronto, descomentar:
        // await apiClient.post('/auth/logout');

        console.log('🚪 Mock: Logout realizado');
        await delay(500);
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/refresh', { refreshToken });
        return data;
    },
};
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store';
import { API_CONFIG } from '@/utils/constants';

// Criar instância do Axios
export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token em todas as requisições
apiClient.interceptors.request.use(
    async (config) => {
        const token = useAuthStore.getState().accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para refresh token automático
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Se erro 401 e não é retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = useAuthStore.getState().refreshToken;

                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Tentar renovar o token
                const { data } = await axios.post(
                    `${API_CONFIG.BASE_URL}/auth/refresh`,
                    { refreshToken }
                );

                // Atualizar tokens no store
                useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

                // Refazer a requisição original com novo token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Se falhar, fazer logout
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
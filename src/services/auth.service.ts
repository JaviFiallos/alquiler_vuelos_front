import { api } from "./api.service";

export const login = async (values: any) => {
    try {
        const response = await api.post('/AuthService.svc/login', values);
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

export const forgotPasswordEmail = async (email: string) => {
    await api.post(`/AuthService.svc/forgotten-password`, { email });
}

export const recoverPassword = async (token: string, newPassword: string) => {
    await api.post(`/AuthService.svc/reset-password`, { token, newPassword });
}

export const createClient = async (userData: any) => {
    try {
        const response = await api.post("/ClientService.svc/clients", userData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        throw error;
    }
};

export const checkEmailOrDni = async (email: string, dni: string, id: number) => {
    const response = await api.post(`/UserService.svc/validate/${id}`, { email, dni });
    return response.data;
};

export const verifyEmailCode = async (email: string, code: string) => {
    return await api.post('/UserService.svc/verify-email', { email, code });
};
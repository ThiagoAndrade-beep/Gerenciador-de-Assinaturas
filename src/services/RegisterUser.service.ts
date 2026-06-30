import api from "../api/axios";
import type { RegisterRequest, RegisterResponse } from "../types/User";

export async function registerUser(user: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("auth/register", user)
    return response.data
}
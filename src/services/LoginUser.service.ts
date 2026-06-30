import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/User";

export async function loginUser(user: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("auth/login", user)
    return response.data
}
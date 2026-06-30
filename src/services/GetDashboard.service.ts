import api from "../api/axios";
import type { DashboardUser, DashboardUserResponse } from "../types/User";

export async function getDashboard(token: string | null): Promise<DashboardUser>{
    const response = await api.get<DashboardUserResponse>("dashboard", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.user
}
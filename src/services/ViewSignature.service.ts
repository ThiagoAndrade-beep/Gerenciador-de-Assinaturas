import api from "../api/axios";
import type { SignaturesResponse } from "../types/User";

export async function viewSignature(token: string): Promise<SignaturesResponse> {
    const response = await api.get<SignaturesResponse>('view-signature', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
import api from "../api/axios";
import type { AddSignatureResponse, CreateSignature } from "../types/User";

export async function addSignature(signature: CreateSignature, token: string): Promise<AddSignatureResponse> {
    const response = await api.post<AddSignatureResponse>("add-signature", signature, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
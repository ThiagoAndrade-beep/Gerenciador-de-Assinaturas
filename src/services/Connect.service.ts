import api from "../api/axios";

export async function connectTelegram(token: string) {
    const response = await api.post("connect", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}
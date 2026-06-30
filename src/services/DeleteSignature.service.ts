import api from "../api/axios";

export async function deleteSignature(token: string, id: string) {
    const response = await api.delete("delete-signature", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            signatureId: id //O problema é que o axios.delete() não recebe o body como segundo parâmetro direto igual o post(). Precisa seguir dessa forma
        }
    })

    return response.data
}
import axios from "axios";

const api = axios.create({
    baseURL: "https://gerenciador-de-assinaturas.onrender.com/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default api
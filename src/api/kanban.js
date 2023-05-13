import axios from "axios";

axios.defaults.withCredentials = true; 
const kanbanApi = axios.create({
    baseURL: "http://localhost:3000/kanban",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getKanban = async (config) => {
    const response = await kanbanApi.get("/",config)
    return response.data
}

export const addCardItem = async (cardItem) => {
    const response = await kanbanApi.post("/", cardItem)
}

export const updateCardItem = async (cardItem) => {
    const response = await kanbanApi.put("/", cardItem)
}

export const deleteCardItem = async (config) => {
    const response = await kanbanApi.delete("/",config)
}
import axios from "axios";

const kanbanApi = axios.create({
    baseURL: "http://localhost:3000/kanban",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getKanban = async () => {
    const response = await kanbanApi.get("/")
    return response.data
}

export const addCardItem = async (cardItem) => {
    const response = await kanbanApi.post("/", cardItem)
}

export const updateCardItem = async () => {
    const response = await kanbanApi.post("/", cardItem)
}

export const deleteCardItem = async (cardItem) => {
    const response = await kanbanApi.post("/", cardItem)
}
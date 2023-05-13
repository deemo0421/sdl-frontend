import axios from "axios";

const kanbanApi = axios.create({
    baseURL: "http://localhost:3000/project",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getProject = async (projectId) => {
    const response = await kanbanApi.get(`/${projectId}`)
    return response.data
}

export const addAllProject = async (userId) => {
    const response = await kanbanApi.post("/", userId)
}

export const addProject = async (cardItem) => {
    const response = await kanbanApi.post("/", cardItem)
}
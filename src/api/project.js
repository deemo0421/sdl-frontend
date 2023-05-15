import axios from "axios";

const projectApi = axios.create({
    baseURL: "http://localhost:3000/project",
    headers:{
        "Content-Type":" application/json",
        accessToken: localStorage.getItem("accessToken")
    },
})

export const getProject = async (projectId) => {
    const response = await projectApi.get(`/${projectId}`)
    return response.data
}

export const addAllProject = async (userId) => {
    const response = await projectApi.post("/", userId)
}

export const addProject = async (cardItem) => {
    const response = await projectApi.post("/", cardItem)
}
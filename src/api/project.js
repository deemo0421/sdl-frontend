import axios from "axios";

const projectApi = axios.create({
    baseURL: "http://localhost:3000/projects",
    headers:{
        "Content-Type":" application/json",
        accessToken: localStorage.getItem("accessToken")
    },
})

export const getProject = async (projectId) => {
    const response = await projectApi.get(`/${projectId}`)
    return response.data
}

export const getAllProject = async (config) => {
    const response = await projectApi.get("/",config)
    return response.data
}

export const createProject = async (data) => {
    const response = await projectApi.post("/", data)
}
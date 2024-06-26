import axios from "axios";

axios.defaults.withCredentials = true; 
const ideaWallApi = axios.create({
    baseURL: "http://localhost:3000/ideaWall",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getIdeaWall = async (config) => {
    const response = await ideaWallApi.get("/", config)
    return response.data
}

export const createIdeaWall = async (data) => {
    const response = await ideaWallApi.post("/", data)
    return response.data
}
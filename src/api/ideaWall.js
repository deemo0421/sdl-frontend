import axios from "axios";

axios.defaults.withCredentials = true; 
const ideaWallApi = axios.create({
    baseURL: "http://localhost:3000/project/ideaWall",
    headers:{
        "Content-Type":" application/json"
    },
})

export const getIdeaWall = async () => {
    const response = await ideaWallApi.get("/")
    return response.data
}

export const addIdeaWall = async (data) => {
    const response = await ideaWallApi.post("/", data)
}

export const updateIdeaWall = async () => {
    const response = await ideaWallApi.post("/", cardItem)
}

export const deleteIdeaWall = async (cardItem) => {
    const response = await ideaWallApi.post("/", cardItem)
}
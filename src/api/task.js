import axios from "axios";

axios.defaults.withCredentials = true; 
const taskApi = axios.create({
    baseURL: "http://localhost:3000/submit",
    headers:{
        "Content-Type":" multipart/form-data"
    },
})

export const submitTask = async (data) => {
    const response = await taskApi.post("/", data)
    return response.data
}
import axios from "axios";

//login & register
const loginApi = axios.create({
    baseURL: "http://localhost:3000/login",
    headers:{
        "Content-Type":" application/json"
    },
})

const registerApi = axios.create({
    baseURL: "http://localhost:3000/login",
    headers:{
        "Content-Type":" application/json"
    },
})

export const login = async (userdata) => {
    const response = await loginApi.post("/", userdata)
}

export const register = async (userdata) => {
    const response = await registerApi.post("/", userdata)
}

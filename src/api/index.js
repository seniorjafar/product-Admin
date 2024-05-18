import axios from "axios";

const mainUrl = axios.create({
    baseURL: "https://66361b42415f4e1a5e2648bb.mockapi.io/api"
})

export default mainUrl
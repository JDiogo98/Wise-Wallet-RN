import axios from "axios"



const ApiManager = axios.create({
    baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:wWxOcazW/auth/login' ,
    responseType: "json",
    withCredentials: true,

})

export default ApiManager
const { createContext, useState } = require("react");



const Authcontext = createContext();

export const AuthProvider = ({children}) =>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [csrfToken, setCsrfToken] = useState();


    const fetchCsrf = async() =>{
        try {
            const res = axios.get(`${backendUrl}/api/csrf-token`);
            console.log(res);
        } catch (error) {
            
        }
    }

}
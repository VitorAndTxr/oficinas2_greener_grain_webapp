import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AccountInterface = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/api/v1"
})

function getToken():string{
    let token = cookies.get(String(process.env.REACT_APP_NAME_TOKEN)) as string
    return `Bearer ${token}`
}

AccountInterface.interceptors.request.use(function (config) {
    config = {
        ...config,
        headers:{
            "Authorization": getToken()
        },
        
    }

    return config
}, function (error) {
    return Promise.reject(error);
});

AccountInterface.interceptors.response.use(
    function (config) {
        return config
    },
    function (error: any) {        
        if (error.response.status === 401) {
            cookies.remove(String(process.env.REACT_APP_NAME_TOKEN), { path: "/", domain: process.env.REACT_APP_DOMAIN });
            cookies.remove(String(process.env.REACT_APP_NAME_TOKEN));
            window.location.href = process.env.REACT_APP_LOGIN_REDIRECT!;
        }
        if (error.response.status === 404) {
            console.error("Houve um erro, favor tentar novamente mais tarde")
        }
        return error
    });

export default AccountInterface;


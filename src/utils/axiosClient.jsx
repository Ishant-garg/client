import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./manageLocalStorage";
 
 const axiosClient = axios.create(
    {   
        
        baseURL : 'http://localhost:4000/',
        withCredentials :true
    }
)

axiosClient.interceptors.request.use(
    (request)=> {
        const AccessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${AccessToken}`
        return request
    }
)
 
 
 
axiosClient.interceptors.response.use(
    async  (respone)=>{
        const data = respone.data;

        if(data.status === "ok"){
            return data;
        }

        const originalRequest = respone.config;
        const statusCode = data.statusCode;
        const error = data?.message;
        console.log(data);
        if(statusCode === 401 && !originalRequest._retry){
            originalRequest._retry = true

            const response = await axios
              .create({
                withCredentials :  true
            })
            .get(`${process.env.REACT_APP_SERVER_BASE_URL}auth/refresh`);

             
            if(response.data.status === 'ok'){
                setItem(KEY_ACCESS_TOKEN , response.data.result.AccessToken);
                originalRequest.headers["Authorization"] = `Bearer ${response.data.result.AccessToken}`
                return axios(originalRequest);
            } 
            else{
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login' , '_self');
                return Promise.reject(error)
            }

        } 
        return Promise.reject(error)
    }
)  
 
  
export default axiosClient
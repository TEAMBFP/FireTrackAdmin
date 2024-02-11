import Axios from 'axios';


// CHANGE THE IP ADDRESS BELOW TO YOUR LOCAL IP ADDRESS
// In my case my local IP address is 192.168.1.31

const baseURL = 'http://192.168.1.56:8000/api'
const apiService =  Axios.create({
  baseURL: baseURL,
});


apiService.interceptors.request.use(
  async function  (config)  {
    const token = await localStorage.getItem('token');
    if (token) {
      config.headers = {
        'Authorization': 'Bearer '+token,
        'Accept':'application/json'
      }
    }
    return config
  },
    function (error) {
    if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    } else {
        return Promise.reject(error);
    }
}
);

apiService.interceptors.response.use(
  async function  (config)  {
    return config
  },
  function (error) {

    if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    } else {
        return Promise.reject(error);
    }
    }
);

export default apiService;

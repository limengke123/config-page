import axios from 'axios'

const instance = axios.create({
    baseURL: '/'
})

instance.interceptors.request.use(config => config, err => err)

instance.interceptors.response.use(resp => resp, err => err)

export default instance

import axios from 'axios'

const baseService = axios.create({
    baseURL: 'https://dog.ceo/api'
})

export default baseService
